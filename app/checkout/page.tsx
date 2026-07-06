"use client";

import React from 'react';
import { CartItem, RentalItem, Order, BankDetails, OrderStatus } from '../../types';
import { 
  ShoppingBag, MessageCircle, ArrowLeft, Package, Tag, 
  Calendar, User, Phone, Mail, MapPin, Truck, HelpCircle, 
  CheckCircle, ArrowRight, RefreshCw, Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  getInventoryFromSupabase, 
  saveOrderToSupabase, 
  updateSupabaseInventoryQuantities,
  getSupabaseConfig 
} from '../../lib/supabase';
import { DEFAULT_INVENTORY_ITEMS } from '../../lib/googleSheets';

const LOCAL_STORAGE_WHATSAPP_KEY = 'celebration_studio_whatsapp';
const LOCAL_STORAGE_BANK_KEY = 'celebration_studio_bank_details';
const DEFAULT_WHATSAPP = '+94767877283';

const DEFAULT_BANK_DETAILS: BankDetails = {
  bankName: 'Bank of Ceylon (BOC)',
  accountName: 'Celebration Studio Pvt Ltd',
  accountNumber: '8492049282',
  routingOrBranchCode: '082 - Colombo Grand Branch',
  accountType: 'Current Account'
};

function formatInvoiceMessage(
  orderRef: string,
  clientName: string,
  startDate: string,
  endDate: string,
  rentalDays: number,
  cart: CartItem[],
  subtotal: number,
  deliveryAddress: string,
  deliveryFee: number,
  totalAmount: number,
  bank: BankDetails,
  whatsapp: string
): string {
  const itemLines = cart.map(c => 
    `* ${c.item.name} x ${c.quantity} - Rs. ${c.item.price}/day (Rs. ${c.item.price * c.quantity * rentalDays})`
  );

  return [
    '🌸 *CELEBRATION STUDIO - Rental Invoice* 🌸',
    'Thank you for renting with us! Here are your order details:',
    '',
    `Order Reference: ${orderRef}`,
    `Client Name: ${clientName}`,
    `Rental Period: ${startDate} to ${endDate} (${rentalDays} ${rentalDays === 1 ? 'day' : 'days'})`,
    '',
    'Rental Items:',
    ...itemLines,
    '',
    `Rental Subtotal: Rs. ${subtotal}`,
    `Delivery Address: ${deliveryAddress}`,
    `Delivery Fee: Rs. ${deliveryFee}`,
    `Total Amount: Rs. ${totalAmount}`,
    '',
    '---------------------------',
    'Manual Payment Instructions:',
    `Since we do not support automated gateways, please transfer Rs. ${totalAmount} via bank transfer to hold your reservation, and share a screenshot of the payment slip here.`,
    '',
    'Bank Credentials:',
    `* Bank: ${bank.bankName}`,
    `* Account Holder: ${bank.accountName}`,
    `* Account Number: ${bank.accountNumber}`,
    `* Branch: ${bank.routingOrBranchCode}`,
    '',
    `Need help? Visit us at Celebration Studio, or message us on WhatsApp: ${whatsapp}`,
    '',
    'We look forward to making your special occasion magical! ✨🥂'
  ].join('\n');
}

export default function CheckoutPage() {
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [inventory, setInventory] = React.useState<RentalItem[]>([]);
  const [studioWhatsapp, setStudioWhatsapp] = React.useState(DEFAULT_WHATSAPP);
  const [bankDetails, setBankDetails] = React.useState<BankDetails>(DEFAULT_BANK_DETAILS);
  const [mounted, setMounted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [createdOrderRef, setCreatedOrderRef] = React.useState('');

  // Form fields
  const [customerName, setCustomerName] = React.useState('');
  const [whatsappNumber, setWhatsappNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [deliveryNeeded, setDeliveryNeeded] = React.useState(false);
  const [deliveryAddress, setDeliveryAddress] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [validationError, setValidationError] = React.useState('');

  const today = React.useMemo(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }, []);

  // Calculate rental days
  const rentalDays = React.useMemo(() => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    if (diffTime < 0) return 0;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 0 ? 1 : diffDays;
  }, [startDate, endDate]);

  const subtotal = React.useMemo(() => {
    return cart.reduce((acc, c) => acc + (c.item.price * c.quantity), 0) * (rentalDays || 1);
  }, [cart, rentalDays]);

  const deliveryFee = deliveryNeeded ? 6500 : 0;
  const total = subtotal + deliveryFee;

  React.useEffect(() => {
    async function loadCartAndInventory() {
      let minimalCart: { id: string; quantity: number }[] = [];
      try {
        const raw = sessionStorage.getItem('celebration_studio_checkout_cart');
        if (raw) {
          minimalCart = JSON.parse(raw);
        }
      } catch (err) {
        console.error('Failed to parse checkout cart:', err);
      }

      // Load configurations
      try {
        const savedWhatsapp = localStorage.getItem(LOCAL_STORAGE_WHATSAPP_KEY);
        if (savedWhatsapp) setStudioWhatsapp(savedWhatsapp);

        const savedBank = localStorage.getItem(LOCAL_STORAGE_BANK_KEY);
        if (savedBank) setBankDetails(JSON.parse(savedBank));
      } catch (_) {}

      let items: RentalItem[] = [];
      try {
        items = await getInventoryFromSupabase();
        setInventory(items);
      } catch (err) {
        console.warn('Failed to load inventory from Supabase, falling back to defaults:', err);
      }

      if (!items || items.length === 0) {
        items = DEFAULT_INVENTORY_ITEMS;
        setInventory(items);
      }

      if (minimalCart.length > 0) {
        // Reconstruct CartItem[]
        const fullCart: CartItem[] = minimalCart
          .map(item => {
            const found = items.find(inv => inv.id === item.id);
            if (!found) return null;
            return {
              item: found,
              quantity: item.quantity
            };
          })
          .filter((c): c is CartItem => c !== null);

        setCart(fullCart);
      }

      setMounted(true);
    }

    loadCartAndInventory();
  }, []);

  const handleUpdateQty = (itemId: string, newQty: number) => {
    const updated = cart.map(c => {
      if (c.item.id === itemId) {
        const clampedQty = Math.max(1, Math.min(c.item.available, newQty));
        return { ...c, quantity: clampedQty };
      }
      return c;
    });
    setCart(updated);

    // Save minimal cart info back to sessionStorage
    const minimalCart = updated.map(c => ({
      id: c.item.id,
      quantity: c.quantity
    }));
    sessionStorage.setItem('celebration_studio_checkout_cart', JSON.stringify(minimalCart));
  };

  const handleRemoveItem = (itemId: string) => {
    const updated = cart.filter(c => c.item.id !== itemId);
    setCart(updated);

    // Save minimal cart info back to sessionStorage
    const minimalCart = updated.map(c => ({
      id: c.item.id,
      quantity: c.quantity
    }));
    sessionStorage.setItem('celebration_studio_checkout_cart', JSON.stringify(minimalCart));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (cart.length === 0) {
      setValidationError('Your checkout cart is empty.');
      return;
    }

    if (!customerName.trim()) {
      setValidationError('Please specify a client name.');
      return;
    }

    if (!whatsappNumber.trim()) {
      setValidationError('Please enter a WhatsApp contact number.');
      return;
    }

    const cleanPhone = whatsappNumber.replace(/[^0-9+]/g, '');
    if (cleanPhone.length < 7) {
      setValidationError('Please enter a valid WhatsApp contact number.');
      return;
    }

    if (!startDate || !endDate) {
      setValidationError('Please select both rental start and end dates.');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) {
      setValidationError('The rental return date cannot precede the pickup date.');
      return;
    }

    if (deliveryNeeded && !deliveryAddress.trim()) {
      setValidationError('Please provide a delivery address.');
      return;
    }

    // 1. Double-check stock against live levels
    const insufficient: string[] = [];
    cart.forEach(cartItem => {
      const invItem = inventory.find(i => i.id === cartItem.item.id);
      if (invItem && invItem.available < cartItem.quantity) {
        insufficient.push(`${cartItem.item.name} (Only ${invItem.available} left)`);
      }
    });

    if (insufficient.length > 0) {
      setValidationError(`Some selected items do not have enough stock available:\n\n${insufficient.join(', ')}\n\nPlease edit your cart.`);
      return;
    }

    setIsSubmitting(true);

    try {
      // 2. Generate Order Reference
      const numericId = Math.floor(1000 + Math.random() * 9000).toString();
      const orderRef = `#CS-${numericId}`;
      setCreatedOrderRef(orderRef);

      const bookingPayload = {
        customerName,
        whatsappNumber: cleanPhone,
        email,
        startDate,
        endDate,
        deliveryAddress: deliveryNeeded ? deliveryAddress : 'Studio Pickup',
        deliveryNeeded,
        notes
      };

      const orderPayload: Order = {
        id: numericId,
        booking: bookingPayload,
        items: cart,
        totalAmount: total,
        rentalDays,
        createdAt: new Date().toLocaleDateString(),
        status: 'pending'
      };

      // 3. Deduct stock in Supabase database
      const deductPayload = cart.map(c => ({
        itemId: c.item.id,
        deductQty: c.quantity
      }));
      await updateSupabaseInventoryQuantities(deductPayload);

      // 4. Save order to Supabase database (triggers real-time update in Admin Orders)
      await saveOrderToSupabase(orderPayload);

      // 5. Open WhatsApp with formatted invoice text
      const finalMsg = formatInvoiceMessage(
        orderRef,
        customerName,
        startDate,
        endDate,
        rentalDays,
        cart,
        subtotal,
        deliveryNeeded ? deliveryAddress : 'Studio Pickup (12 Rose Garden Lane, Colombo 07)',
        deliveryFee,
        total,
        bankDetails,
        studioWhatsapp
      );

      const whatsappClean = studioWhatsapp.replace(/\D/g, '');
      const waUrl = `https://wa.me/${whatsappClean}?text=${encodeURIComponent(finalMsg)}`;
      
      // Clear local checkout cart
      sessionStorage.removeItem('celebration_studio_checkout_cart');
      
      setIsSuccess(true);
      
      // Delay opening WhatsApp slightly to allow success state to render nicely
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 800);

    } catch (err: any) {
      console.error(err);
      setValidationError(err.message || 'Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEmpty = mounted && cart.length === 0;

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-blush-light flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-8 border border-blush max-w-md w-full text-center space-y-6 shadow-xl"
        >
          <div className="bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-emerald-500">
            <CheckCircle className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif-luxury text-2xl font-bold text-gray-900">Order Placed Successfully!</h2>
            <p className="text-xs text-camel tracking-widest uppercase font-semibold">Reference: {createdOrderRef}</p>
            <p className="text-xs text-gray-500 font-light px-4">
              Your rental reservation has been logged. We are opening WhatsApp to send your complete invoice summary.
            </p>
          </div>
          <div className="pt-2 border-t border-blush/60">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 w-full py-3 bg-terracotta hover:bg-terracotta-dark text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Shop
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blush-light font-sans">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-blush shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <a
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-camel transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Shop
          </a>
          <div className="text-center">
            <h1 className="font-serif-luxury text-lg font-bold text-gray-900 tracking-wide leading-tight">
              Checkout & Invoice
            </h1>
            <p className="text-[10px] text-camel tracking-widest font-semibold uppercase">
              Celebration Studio
            </p>
          </div>
          <div className="w-24" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {!mounted ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-blush p-4 animate-pulse flex gap-4">
                <div className="w-24 h-24 rounded-xl bg-blush shrink-0" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-blush rounded w-3/4" />
                  <div className="h-3 bg-blush rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : isEmpty ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-24 text-center bg-white border border-dashed border-blush rounded-3xl space-y-4"
          >
            <ShoppingBag className="w-12 h-12 text-gray-200 mx-auto" />
            <p className="font-serif-luxury text-xl text-gray-600">Your cart is empty</p>
            <p className="text-xs text-gray-400">Go back and add items to your order.</p>
            <a
              href="/"
              className="inline-flex items-center gap-2 mt-2 px-6 py-2.5 bg-terracotta text-white rounded-xl text-sm font-semibold hover:bg-terracotta-dark transition-all shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              Browse Items
            </a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Order Items summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-blush shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-blush pb-3">
                  <Package className="w-5 h-5 text-camel" />
                  <h2 className="font-serif-luxury text-lg font-bold text-gray-900">
                    Selected Items
                  </h2>
                  <span className="px-2.5 py-0.5 bg-blush text-camel text-xs font-bold rounded-full ml-auto">
                    {cart.length}
                  </span>
                </div>

                <div className="divide-y divide-blush/40 max-h-96 overflow-y-auto pr-1">
                  {cart.map((cartItem) => (
                    <div key={cartItem.item.id} className="py-4 flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-blush/60 bg-blush-light shrink-0">
                        <img
                          src={cartItem.item.image}
                          alt={cartItem.item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=200';
                          }}
                        />
                      </div>
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <h4 className="font-semibold text-gray-800 text-xs truncate">
                          {cartItem.item.name}
                        </h4>
                        <p className="text-[10px] text-gray-400 font-mono">
                          Code: {cartItem.item.id}
                        </p>
                        <p className="text-[10px] text-camel font-medium uppercase tracking-wider">
                          Rs. {cartItem.item.price.toLocaleString()} / day
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-blush rounded-lg overflow-hidden bg-blush-light/30">
                          <button
                            type="button"
                            onClick={() => handleUpdateQty(cartItem.item.id, cartItem.quantity - 1)}
                            disabled={cartItem.quantity <= 1}
                            className="w-6 h-6 text-xs flex items-center justify-center font-bold text-gray-500 hover:bg-blush hover:text-gray-700 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-[11px] font-mono font-bold text-gray-700">
                            {cartItem.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateQty(cartItem.item.id, cartItem.quantity + 1)}
                            disabled={cartItem.quantity >= cartItem.item.available}
                            className="w-6 h-6 text-xs flex items-center justify-center font-bold text-gray-500 hover:bg-blush hover:text-gray-700 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
                            title={cartItem.quantity >= cartItem.item.available ? `Only ${cartItem.item.available} available` : ''}
                          >
                            +
                          </button>
                        </div>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(cartItem.item.id)}
                          className="p-1 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Billing Summary Box */}
                <div className="pt-4 border-t border-blush bg-blush-light/20 -mx-6 px-6 pb-2 rounded-b-2xl space-y-2.5 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal ({rentalDays || 1} {rentalDays === 1 ? 'day' : 'days'}):</span>
                    <span className="font-mono font-medium">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  {deliveryNeeded && (
                    <div className="flex justify-between text-gray-500">
                      <span>Delivery & Setup:</span>
                      <span className="font-mono font-medium">Rs. {deliveryFee.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-semibold text-gray-900 pt-2 border-t border-dashed border-blush">
                    <span className="font-serif-luxury text-base">Grand Total:</span>
                    <span className="font-mono text-terracotta text-lg font-bold">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Billing / Logistics Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleCheckout} className="bg-white rounded-2xl p-6 border border-blush shadow-xs space-y-6">
                <div className="border-b border-blush pb-4">
                  <h3 className="font-serif-luxury text-lg font-bold text-gray-900 tracking-wide">
                    Booking Logistics
                  </h3>
                  <p className="text-xs text-gray-500 font-light mt-1">
                    Complete the details below to generate and dispatch your rental invoice.
                  </p>
                </div>

                {validationError && (
                  <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                    {validationError}
                  </div>
                )}

                {/* Rental Period */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 block flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-camel" /> Pickup / Start Date
                    </label>
                    <input
                      type="date"
                      min={today}
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        if (endDate && new Date(e.target.value) > new Date(endDate)) {
                          setEndDate('');
                        }
                      }}
                      required
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel bg-blush-light/30 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 block flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-camel" /> Return / End Date
                    </label>
                    <input
                      type="date"
                      min={startDate || today}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                      disabled={!startDate}
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel bg-blush-light/30 disabled:opacity-50 font-mono"
                    />
                  </div>
                </div>

                {rentalDays > 0 && (
                  <div className="bg-olive/5 border border-olive/10 rounded-xl p-3 text-xs flex justify-between items-center text-olive-dark">
                    <span>Rental Duration:</span>
                    <span className="font-semibold font-serif-luxury text-sm">
                      {rentalDays} {rentalDays === 1 ? 'Day' : 'Days'}
                    </span>
                  </div>
                )}

                {/* Client Info */}
                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 block flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-camel" /> Client Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Niseni Angammana"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 block flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-camel" /> WhatsApp Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="e.g. +94767877283"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        required
                        className="w-full text-xs pl-3.5 pr-20 py-2.5 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel"
                      />
                      <span className="absolute right-3 top-2 text-[10px] bg-emerald-50 text-emerald-700 px-2 py-1 rounded-sm font-semibold uppercase tracking-wider">
                        WhatsApp
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 block flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-camel" /> Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. client@example.com (Optional)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel"
                    />
                  </div>
                </div>

                {/* Delivery Option */}
                <div className="space-y-3 pt-2 border-t border-blush/60">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 cursor-pointer select-none">
                      <Truck className="w-4 h-4 text-camel" /> Require Delivery & Setup?
                    </label>
                    <input
                      type="checkbox"
                      checked={deliveryNeeded}
                      onChange={(e) => setDeliveryNeeded(e.target.checked)}
                      className="w-4 h-4 text-camel focus:ring-camel border-blush rounded-sm accent-camel cursor-pointer"
                    />
                  </div>

                  {deliveryNeeded ? (
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-600 block flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-camel" /> Delivery Venue Address
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Provide event location venue details..."
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        required={deliveryNeeded}
                        className="w-full text-xs px-3.5 py-2 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel resize-none"
                      />
                      <div className="p-2.5 bg-blush/40 text-[11px] text-gray-600 rounded-lg">
                        <span className="font-semibold text-camel">Note: </span>
                        A logistics and white-glove setup fee of Rs. 6,500 is applied.
                      </div>
                    </div>
                  ) : (
                    <div className="p-2.5 bg-blush/40 text-[11px] text-gray-600 rounded-lg">
                      <span className="font-semibold text-camel">Pickup: </span>
                      Free client studio pickup & returns at 12 Rose Garden Lane, Colombo 07.
                    </div>
                  )}
                </div>

                {/* Design notes */}
                <div className="space-y-1.5 pt-2 border-t border-blush/60">
                  <label className="text-xs font-semibold text-gray-700 block">
                    Special Design Notes & Preferences
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Provide color choices, setup requests, or specific timing details..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel resize-none"
                  />
                </div>

                {/* Form Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="w-full flex items-center justify-center gap-3 py-3.5 px-6 bg-[#25D366] hover:bg-[#1ebe5a] disabled:bg-gray-300 text-white font-bold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <MessageCircle className="w-4 h-4" />
                  )}
                  Checkout via WhatsApp
                </button>
              </form>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
