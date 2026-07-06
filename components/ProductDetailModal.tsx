"use client";

import React from 'react';
import { RentalItem } from '../types';
import { X, ShoppingBag, Plus, Minus, Check, Calendar } from 'lucide-react';

interface ProductDetailModalProps {
  item: RentalItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: RentalItem, quantity: number) => void;
  cartQuantity: number;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
  cartQuantity
}) => {
  const [activeImageIdx, setActiveImageIdx] = React.useState(0);
  const [localQty, setLocalQty] = React.useState(1);
  const [addedAnimation, setAddedAnimation] = React.useState(false);

  // Reset indices on item change
  React.useEffect(() => {
    setActiveImageIdx(0);
    setLocalQty(cartQuantity > 0 ? cartQuantity : 1);
  }, [item, cartQuantity]);

  if (!isOpen || !item) return null;

  // Resolve images array
  const images = Array.isArray(item.images) && item.images.length > 0 
    ? item.images 
    : [item.image];

  const activeImage = images[activeImageIdx] || item.image;
  const isOutOfStock = item.available <= 0;

  const increment = () => {
    if (localQty < item.available) {
      setLocalQty(prev => prev + 1);
    }
  };

  const decrement = () => {
    if (localQty > 1) {
      setLocalQty(prev => prev - 1);
    }
  };

  const handleAddClick = () => {
    onAddToCart(item, localQty);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 md:p-6 animate-fadeIn">
      {/* Modal Dialog Container */}
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative border border-blush flex flex-col md:flex-row animate-scaleUp">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-gray-400 hover:text-gray-900 rounded-full transition-all border border-blush/60 shadow-xs cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Product Gallery */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-blush/40">
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-blush shadow-xs bg-gray-50 flex items-center justify-center">
            <img
              src={activeImage}
              alt={`${item.name} active display`}
              className="w-full h-full object-cover transition-all duration-300"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600';
              }}
            />
            
            <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-olive-dark text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full shadow-xs">
              {item.category}
            </span>
          </div>

          {/* Thumbnails row */}
          {images.length > 1 && (
            <div className="mt-4 flex gap-2.5 overflow-x-auto py-2 pr-2 scrollbar-none">
              {images.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIdx(index)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${index === activeImageIdx ? 'border-terracotta scale-95 shadow-md' : 'border-blush/60 hover:border-camel'}`}
                >
                  <img
                    src={imgUrl}
                    alt={`${item.name} gallery thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=100';
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h2 className="font-serif-luxury text-2xl md:text-3xl font-semibold text-gray-900 tracking-wide leading-tight mb-2">
                {item.name}
              </h2>
              
              <div className="flex items-baseline gap-3">
                <span className="font-serif-luxury text-2xl font-bold text-terracotta">
                  Rs. {item.price}
                </span>
                <span className="text-xs text-gray-400 font-light">/ daily rental rate</span>
              </div>
            </div>

            <div className="border-t border-b border-blush/40 py-4 space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 block">Description</span>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                {item.description || "Bring cozy, timeless luxury to your celebratory space. Handpicked by our design studio for premium aesthetics and flawless event setups."}
              </p>
            </div>

            {/* Inventory Status */}
            <div className="flex items-center gap-3 text-xs">
              <span className="text-gray-400 font-light">Inventory Availability:</span>
              {isOutOfStock ? (
                <span className="px-2.5 py-0.5 bg-red-50 text-red-600 rounded-md font-semibold text-[10px] uppercase">
                  Fully Booked
                </span>
              ) : (
                <span className="px-2.5 py-0.5 bg-olive/10 text-olive-dark rounded-md font-semibold text-[10px] uppercase">
                  {item.available} Units Available
                </span>
              )}
            </div>
          </div>

          {/* Cart Interaction Controls */}
          <div className="mt-8 pt-4 border-t border-blush/40 space-y-4">
            {!isOutOfStock && (
              <div className="flex items-center justify-between bg-blush-light/50 p-2 rounded-2xl border border-blush/60">
                <span className="text-xs text-gray-500 font-medium pl-2">Select Rental Quantity:</span>
                <div className="flex items-center gap-3 bg-white border border-blush/80 rounded-xl px-2 py-1 shadow-xs">
                  <button
                    onClick={decrement}
                    disabled={localQty <= 1}
                    className="p-1 hover:bg-blush-light text-gray-400 hover:text-gray-700 rounded-lg transition-colors disabled:opacity-30 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-xs font-semibold text-gray-900 w-6 text-center">
                    {localQty}
                  </span>
                  <button
                    onClick={increment}
                    disabled={localQty >= item.available}
                    className="p-1 hover:bg-blush-light text-gray-400 hover:text-gray-700 rounded-lg transition-colors disabled:opacity-30 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={handleAddClick}
              disabled={isOutOfStock}
              className={`w-full py-3.5 rounded-2xl text-xs font-semibold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer ${isOutOfStock ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed' : addedAnimation ? 'bg-emerald-600 text-white shadow-emerald-100' : 'bg-terracotta hover:bg-terracotta-dark text-white'}`}
            >
              {isOutOfStock ? (
                <span>Fully Booked</span>
              ) : addedAnimation ? (
                <>
                  <Check className="w-4 h-4" /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" /> {cartQuantity > 0 ? "Update Cart Quantity" : "Add to Rental Cart"}
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
