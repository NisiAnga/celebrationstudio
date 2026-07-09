"use client";

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, Trash2, Calendar, ShieldCheck, Sparkles, 
  MapPin, UserCheck, CreditCard, ChevronRight, CheckCircle, 
  Phone, HelpCircle, X, ChevronDown, ListFilter,
  RefreshCw, Search
} from 'lucide-react';
import { RentalItem, CartItem, BookingDetails, Order, BankDetails, SupabaseSyncStatus } from '../types';
import { ItemCard } from '../components/ItemCard';
import { BookingForm } from '../components/BookingForm';
import { ReceiptModal } from '../components/ReceiptModal';
import { DEFAULT_INVENTORY_ITEMS } from '../lib/googleSheets';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { getInventoryFromSupabase, updateSupabaseInventoryQuantities, saveOrderToSupabase, getSupabaseConfig, subscribeToInventoryChanges } from '../lib/supabase';

const LOCAL_STORAGE_BANK_KEY = 'celebration_studio_bank';
const LOCAL_STORAGE_WHATSAPP_KEY = 'celebration_studio_whatsapp';

const DEFAULT_BANK_DETAILS: BankDetails = {
  bankName: 'Bank of Ceylon (BOC)',
  accountName: 'Celebration Studio Pvt Ltd',
  accountNumber: '8492049282',
  routingOrBranchCode: '082 - Colombo Grand Branch',
  accountType: 'Current Account'
};

const DEFAULT_STUDIO_WHATSAPP = '+94771234567';

export default function App() {
  // Administrative custom parameters
  const [bankDetails, setBankDetails] = React.useState<BankDetails>(DEFAULT_BANK_DETAILS);
  const [studioWhatsapp, setStudioWhatsapp] = React.useState<string>(DEFAULT_STUDIO_WHATSAPP);

  // Supabase integration state
  const [syncStatus, setSyncStatus] = React.useState<SupabaseSyncStatus>(() => {
    const config = getSupabaseConfig();
    return {
      connected: false,
      supabaseUrl: config.url,
      lastSynced: null,
      loading: false,
      error: null
    };
  });

  // Inventory state
  const [inventory, setInventory] = React.useState<RentalItem[]>(DEFAULT_INVENTORY_ITEMS);
  const [isInventoryLoading, setIsInventoryLoading] = React.useState(false);

  // Cart state
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const isCartLoaded = React.useRef(false);

  // Load saved cart from sessionStorage on mount / when inventory is available
  React.useEffect(() => {
    if (isCartLoaded.current || inventory.length === 0) return;
    try {
      const raw = sessionStorage.getItem('celebration_studio_checkout_cart');
      if (raw) {
        const minimalCart = JSON.parse(raw) as { id: string; quantity: number }[];
        const loadedCart = minimalCart
          .map(item => {
            const found = inventory.find(inv => inv.id === item.id);
            if (!found) return null;
            return { item: found, quantity: item.quantity };
          })
          .filter((c): c is CartItem => c !== null);
        setCart(loadedCart);
      }
    } catch (e) {
      console.error('Failed to restore cart:', e);
    } finally {
      isCartLoaded.current = true;
    }
  }, [inventory]);

  // Sync cart changes back to sessionStorage
  React.useEffect(() => {
    if (!isCartLoaded.current) return;
    const minimalCart = cart.map(c => ({
      id: c.item.id,
      quantity: c.quantity
    }));
    sessionStorage.setItem('celebration_studio_checkout_cart', JSON.stringify(minimalCart));
  }, [cart]);

  // Modals & Navigation Toggles
  const [currentOrder, setCurrentOrder] = React.useState<Order | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [successAnimation, setSuccessAnimation] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<RentalItem | null>(null);

  // Sync / Load inventory from Supabase
  const fetchInventory = React.useCallback(async () => {
    setIsInventoryLoading(true);
    setSyncStatus(prev => ({ ...prev, loading: true, error: null }));

    try {
      const items = await getInventoryFromSupabase();
      if (items && items.length > 0) {
        setInventory(items);
        setSyncStatus(prev => ({
          ...prev,
          connected: true,
          lastSynced: new Date().toLocaleTimeString(),
          loading: false,
          error: null
        }));
      } else {
        // Fallback to defaults if table is empty
        setInventory(DEFAULT_INVENTORY_ITEMS);
        setSyncStatus(prev => ({
          ...prev,
          connected: true,
          lastSynced: new Date().toLocaleTimeString(),
          loading: false,
          error: null
        }));
      }
    } catch (err: any) {
      console.warn('Failed to load inventory from Supabase:', err);
      setInventory(DEFAULT_INVENTORY_ITEMS);
      setSyncStatus(prev => ({
        ...prev,
        connected: false,
        loading: false,
        error: err.message || 'Supabase config missing or incorrect schema.'
      }));
    } finally {
      setIsInventoryLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedBank = localStorage.getItem(LOCAL_STORAGE_BANK_KEY);
      if (savedBank) {
        try {
          setBankDetails(JSON.parse(savedBank));
        } catch (e) {
          console.error(e);
        }
      }
      const savedWhatsapp = localStorage.getItem(LOCAL_STORAGE_WHATSAPP_KEY);
      if (savedWhatsapp) {
        setStudioWhatsapp(savedWhatsapp);
      }
    }
  }, []);

  React.useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  // Supabase Realtime subscription: patch individual inventory items in-place
  // whenever any device updates stock (orders, admin panel, etc.).
  // Uses a unique channel name per session to avoid conflicts across browser tabs.
  // Also polls every 30 seconds as a fallback in case Realtime is not enabled
  // on the inventory table in the Supabase dashboard.
  React.useEffect(() => {
    const { url, anonKey } = getSupabaseConfig();
    if (!url || !anonKey) return;

    // Unique channel name prevents collisions when multiple tabs are open
    const channelId = `inventory-storefront-${Math.random().toString(36).slice(2, 8)}`;

    const unsubscribeRealtime = subscribeToInventoryChanges(
      channelId,
      (updatedItem) => {
        setInventory(prevInv =>
          prevInv.map(item => item.id === updatedItem.id ? updatedItem : item)
        );
      }
    );

    // Polling fallback — re-fetch full inventory every 30 s
    // Covers the case where Supabase Realtime isn't enabled
    const pollInterval = setInterval(() => {
      fetchInventory();
    }, 30_000);

    return () => {
      unsubscribeRealtime();
      clearInterval(pollInterval);
    };
  }, [fetchInventory]);

  // Cart operations
  const handleAddToCart = (item: RentalItem, qty: number) => {
    setCart(prevCart => {
      const existing = prevCart.find(c => c.item.id === item.id);
      if (existing) {
        return prevCart.map(c => c.item.id === item.id ? { ...c, quantity: qty } : c);
      }
      return [...prevCart, { item, quantity: qty }];
    });
  };

  const handleRemoveFromCart = (item: RentalItem) => {
    setCart(prevCart => prevCart.filter(c => c.item.id !== item.id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Checkout handling
  const handlePlaceOrder = async (bookingDetails: BookingDetails) => {
    // 1. Double-check stocks against live local inventory state
    const insufficient: string[] = [];
    cart.forEach(cartItem => {
      const invItem = inventory.find(i => i.id === cartItem.item.id);
      if (invItem && invItem.available < cartItem.quantity) {
        insufficient.push(`${cartItem.item.name} (Only ${invItem.available} left)`);
      }
    });

    if (insufficient.length > 0) {
      alert(`Some selected items do not have enough stock available:\n\n${insufficient.join('\n')}\n\nPlease reduce your rental quantity.`);
      return;
    }

    // Calculate rental days
    const start = new Date(bookingDetails.startDate);
    const end = new Date(bookingDetails.endDate);
    const diffTime = end.getTime() - start.getTime();
    const rentalDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))) || 1;

    // Calculate totals
    const subtotal = cart.reduce((acc, c) => acc + (c.item.price * c.quantity), 0) * rentalDays;
    const totalAmount = subtotal + (bookingDetails.deliveryNeeded ? 65 : 0);

    const orderId = Math.floor(1000 + Math.random() * 9000).toString();

    const newOrder: Order = {
      id: orderId,
      booking: bookingDetails,
      items: cart,
      totalAmount,
      rentalDays,
      createdAt: new Date().toLocaleDateString(),
      status: 'pending'
    };

    // 2. Optimistic local update — immediately deduct from storefront so UI
    //    reflects the new availability without waiting for any async call.
    const snapshotCart = [...cart]; // keep a reference before clearing
    setInventory(prevInv => prevInv.map(invItem => {
      const cartMatch = snapshotCart.find(c => c.item.id === invItem.id);
      if (cartMatch) {
        return {
          ...invItem,
          available: Math.max(0, invItem.available - cartMatch.quantity)
        };
      }
      return invItem;
    }));

    // 3. Clear cart and show receipt immediately (UX feels instant)
    setCurrentOrder(newOrder);
    setCart([]);
    setIsCartOpen(false);
    setSuccessAnimation(true);
    setTimeout(() => setSuccessAnimation(false), 4000);

    // 4. Disconnected from Database for Orders/Checkout:
    //    We do not write the order or deduct database inventory. The optimistic local
    //    deduction applied above remains active for the current storefront session.
    //    No sync/DB calls are made here.
  };

  // Filter products
  const categories = ['All', 'Backdrops', 'Table Runners', 'Sign Boards', 'Other', 'Packages'];

  const filteredInventory = React.useMemo(() => {
    let items = inventory;
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Other') {
        const definedCategories = ['backdrops', 'table runners', 'sign boards', 'packages'];
        items = inventory.filter(item => {
          const cat = (item.category || '').toLowerCase().trim();
          return !definedCategories.includes(cat);
        });
      } else {
        items = inventory.filter(item => {
          const cat = (item.category || '').toLowerCase().trim();
          return cat === selectedCategory.toLowerCase().trim();
        });
      }
    }
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      items = items.filter(item =>
        (item.name || '').toLowerCase().includes(query) ||
        (item.description || '').toLowerCase().includes(query) ||
        (item.category || '').toLowerCase().includes(query)
      );
    }
    return items;
  }, [inventory, selectedCategory, searchQuery]);

  const cartTotalItems = React.useMemo(() => {
    return cart.reduce((acc, c) => acc + c.quantity, 0);
  }, [cart]);

  return (
    <div className="min-h-screen bg-blush-light text-gray-900 selection:bg-terracotta/20 font-sans relative pb-16">
      
      {/* Decorative floral vines background overlay in luxury corners */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[url('https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=300')] opacity-5 pointer-events-none mix-blend-multiply bg-cover bg-no-repeat rounded-br-full"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-[url('https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=300')] opacity-5 pointer-events-none mix-blend-multiply bg-cover bg-no-repeat rounded-bl-full"></div>

      {/* Main Luxury Header Navigation Bar */}
      <nav className="border-b border-blush/60 sticky top-0 bg-white/90 backdrop-blur-md z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSelectedCategory('All')}
              className="text-left flex items-center gap-2 cursor-pointer"
            >
              {/* Responsive Logo wrapper */}
              <div className="w-10 h-10 rounded-full overflow-hidden bg-blush border border-blush/80 flex items-center justify-center shrink-0">
                <img 
                  src="2.png" 
                  alt="Celebration Studio mini logo" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <Sparkles className="w-4 h-4 text-terracotta" id="logo-fallback-icon" />
              </div>
              <div>
                <span className="font-serif-luxury font-bold text-gray-950 text-sm tracking-widest block leading-none">CELEBRATION STUDIO</span>
                <span className="text-[9px] text-camel tracking-wider font-semibold uppercase block mt-0.5">Event Rentals</span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Shopping cart button */}
            <button
              onClick={() => {
                const minimalCart = cart.map(c => ({
                  id: c.item.id,
                  quantity: c.quantity
                }));
                sessionStorage.setItem('celebration_studio_checkout_cart', JSON.stringify(minimalCart));
                window.location.href = '/checkout';
              }}
              className="relative bg-terracotta hover:bg-terracotta-dark text-white p-2.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center cursor-pointer"
              title="View Rental Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartTotalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-camel text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full font-mono border-2 border-white animate-pulse">
                  {cartTotalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Header Presentation (Luxury Cover Photo Banner) */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="relative rounded-3xl overflow-hidden h-72 md:h-80 shadow-md border border-blush/80 flex flex-col items-center justify-center text-center px-6">
          {/* Cover photo background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out hover:scale-[1.02]"
            style={{ backgroundImage: "url('/store_cover.png')" }}
          />
          {/* Backdrop overlay for rich aesthetic & logo contrast */}
          <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]" />

          {/* Foreground content: Logo and Brand Typography */}
          <div className="relative z-10 space-y-4">
            <div className="flex justify-center">
              <img 
                src="2.png" 
                alt="Celebration Studio Luxury Logo" 
                className="h-20 w-20 md:h-24 md:w-24 object-contain rounded-full shadow-lg bg-white border border-white/60 p-1 transition-all duration-300 hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div className="space-y-1">
              <h1 className="font-serif-luxury text-3xl md:text-5xl font-medium tracking-wider text-white drop-shadow-md">
                Celebration Studio
              </h1>
              <p className="text-[10px] md:text-xs uppercase tracking-widest text-[#f5d0a9] font-bold drop-shadow-xs">
                Exquisite Event Rentals & Designs
              </p>
              <p className="max-w-lg mx-auto text-xs text-white/90 font-light leading-relaxed drop-shadow-xs">
                Curating romantic, cozy, and luxury items in Terracotta, Blush, Camel, and Olive tones to render your weddings and celebrations completely unforgettable.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        <div className="space-y-8">
          {/* Supabase connection indicator in Storefront */}
          {syncStatus.connected && (
            <div className="p-3 bg-emerald-50/80 border border-emerald-100 rounded-2xl flex justify-between items-center text-emerald-800 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                <span>Connected and syncing live with Supabase inventory database.</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">Online</span>
            </div>
          )}

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-blush/40 pb-4">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              <ListFilter className="w-4 h-4 text-gray-400 shrink-0" />
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-camel text-white shadow-xs'
                      : 'bg-white text-gray-500 hover:bg-blush/60 hover:text-gray-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:max-w-xs shrink-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-10 py-1.5 bg-white border border-blush/80 rounded-full text-xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-camel/50 focus:border-camel transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-650 cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Items Grid & Booking Split Pane */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Product Grid (Takes 2/3 space on large screens) */}
            <div className="lg:col-span-2 space-y-6">
              {isInventoryLoading ? (
                <div className="py-24 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-camel animate-spin mx-auto" />
                  <p className="text-xs text-gray-400 font-mono">Synchronizing exquisite inventory levels...</p>
                </div>
              ) : filteredInventory.length === 0 ? (
                <div className="py-24 text-center bg-white border border-blush rounded-3xl space-y-3">
                  <HelpCircle className="w-8 h-8 text-gray-300 mx-auto" />
                  <p className="text-sm font-medium text-gray-600 font-serif-luxury">
                    {searchQuery ? "No items found matching your search." : "No items found in this category."}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                    }}
                    className="text-xs text-terracotta hover:underline font-semibold"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredInventory.map(item => {
                    const cartMatch = cart.find(c => c.item.id === item.id);
                    return (
                      <ItemCard
                        key={item.id}
                        item={item}
                        cartQuantity={cartMatch ? cartMatch.quantity : 0}
                        onAddToCart={handleAddToCart}
                        onRemoveFromCart={handleRemoveFromCart}
                        onViewDetails={(item) => setSelectedProduct(item)}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* Booking & Cart Sidebar (Takes 1/3 space on large screens) */}
            <div className="space-y-6">
              
              {/* Miniature Floating Cart Overlay */}
              <div className="bg-white rounded-2xl p-6 border border-blush shadow-xs space-y-4">
                <div className="flex justify-between items-center border-b border-blush pb-3">
                  <h3 className="font-serif-luxury text-[20px] font-bold text-gray-900 tracking-wide flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-terracotta" /> Rental Cart
                  </h3>
                  <span className="font-mono text-xs bg-blush px-2.5 py-0.5 rounded-full text-camel-dark font-bold">
                    {cartTotalItems} items
                  </span>
                </div>

                {cart.length === 0 ? (
                  <div className="py-8 text-center text-xs text-gray-400 font-light space-y-2">
                    <p>Your studio rental cart is currently empty.</p>
                    <p className="text-[11px] text-camel">Choose terracotta arches, blush napkins, and leather cushions to fill your celebration!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="divide-y divide-blush/40 max-h-60 overflow-y-auto pr-1">
                      {cart.map(cartItem => (
                        <div key={cartItem.item.id} className="py-3 flex justify-between items-center gap-3 text-xs">
                          <div className="flex-1">
                            <span className="font-semibold text-gray-800 block line-clamp-1">{cartItem.item.name}</span>
                            <span className="text-gray-400 text-[10px] block">Rent: Rs. {cartItem.item.price}/day</span>
                          </div>
                          <div className="text-right flex items-center gap-4">
                            <span className="font-mono font-medium text-gray-700 bg-blush-light px-2 py-0.5 rounded-md">
                              {cartItem.quantity} qty
                            </span>
                            <button
                              onClick={() => handleRemoveFromCart(cartItem.item)}
                              className="text-gray-400 hover:text-red-500 p-1 rounded-sm transition-colors cursor-pointer"
                              title="Delete item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleClearCart}
                      className="w-full text-center py-1.5 text-[10px] text-gray-400 hover:text-red-500 uppercase font-semibold tracking-wider transition-colors"
                    >
                      Clear complete cart
                    </button>
                  </div>
                )}
              </div>

              {/* Book Studio Items — navigate to dedicated checkout page */}
              {cart.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={() => {
                      // Save minimal cart info (ids and quantity) to avoid sessionStorage quota limit
                      const minimalCart = cart.map(c => ({
                        id: c.item.id,
                        quantity: c.quantity
                      }));
                      sessionStorage.setItem(
                        'celebration_studio_checkout_cart',
                        JSON.stringify(minimalCart)
                      );
                      window.location.href = '/checkout';
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-terracotta hover:bg-terracotta-dark text-white font-bold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98] cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Book Studio Items
                  </button>
                  <p className="text-center text-[10px] text-gray-400 mt-2">
                    Review your order and checkout via WhatsApp
                  </p>
                </motion.div>
              )}

            </div>

          </div>
        </div>

      </main>

      {/* Floating Success Indicator banner */}
      <AnimatePresence>
        {successAnimation && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 bg-emerald-950 text-white p-4 rounded-2xl shadow-2xl border border-emerald-800 z-50 flex items-center gap-3.5 max-w-sm"
          >
            <div className="bg-emerald-500 p-1.5 rounded-full shrink-0">
              <CheckCircle className="w-5 h-5 text-emerald-950" />
            </div>
            <div>
              <h4 className="text-xs font-bold font-serif-luxury text-emerald-300">Order Dispatched!</h4>
              <p className="text-[10px] text-emerald-100/80 font-light leading-snug">Stocks updated and orders logged to Supabase. Configure WhatsApp receipt options below.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invoice receipt overlay modal */}
      {currentOrder && (
        <ReceiptModal
          order={currentOrder}
          bankDetails={bankDetails}
          studioWhatsapp={studioWhatsapp}
          onClose={() => setCurrentOrder(null)}
        />
      )}

      {/* Product Details overlay modal */}
      <ProductDetailModal
        item={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        cartQuantity={selectedProduct ? (cart.find(c => c.item.id === selectedProduct.id)?.quantity || 0) : 0}
      />

      {/* Elegant Aesthetic Studio Footer */}
      <footer className="border-t border-blush/60 bg-white/70 py-8 text-center text-[11px] text-gray-400 font-light mt-16 max-w-7xl mx-auto px-4">
        <p>© 2026 Celebration Studio Ltd. Crafted for luxury, cozy, exquisite events & designs.</p>
        <p className="mt-1">All rights reserved. Dynamically integrated with Supabase Cloud Database.</p>
      </footer>

    </div>
  );
}
