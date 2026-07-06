"use client";

import React from 'react';
import { RentalItem } from '../types';
import { Plus, Minus, Check, ShoppingBag, AlertTriangle } from 'lucide-react';

interface ItemCardProps {
  item: RentalItem;
  cartQuantity: number;
  onAddToCart: (item: RentalItem, quantity: number) => void;
  onRemoveFromCart: (item: RentalItem) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  cartQuantity,
  onAddToCart,
  onRemoveFromCart
}) => {
  const [localQty, setLocalQty] = React.useState(1);

  React.useEffect(() => {
    // Reset local quantity if cart quantity changes or becomes 0
    if (cartQuantity === 0) {
      setLocalQty(1);
    } else {
      setLocalQty(cartQuantity);
    }
  }, [cartQuantity]);

  const increment = () => {
    if (localQty < item.available) {
      const newQty = localQty + 1;
      setLocalQty(newQty);
      if (cartQuantity > 0) {
        onAddToCart(item, newQty);
      }
    }
  };

  const decrement = () => {
    if (localQty > 1) {
      const newQty = localQty - 1;
      setLocalQty(newQty);
      if (cartQuantity > 0) {
        onAddToCart(item, newQty);
      }
    }
  };

  const handleAddClick = () => {
    onAddToCart(item, localQty);
  };

  const handleRemoveClick = () => {
    onRemoveFromCart(item);
  };

  const isOutOfStock = item.available <= 0;

  return (
    <div id={`item-card-${item.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-blush flex flex-col h-full">
      {/* Image Container with subtle zoom on hover */}
      <div className="relative aspect-4/3 w-full bg-blush overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback elegant placeholder if image fails to load
            e.currentTarget.src = `https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600`;
          }}
        />
        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-olive-dark text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full shadow-xs">
          {item.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex justify-between items-start gap-2 mb-1.5">
            <h3 className="font-serif-luxury text-[18px] font-semibold text-gray-900 tracking-wide line-clamp-1 group-hover:text-terracotta transition-colors">
              {item.name}
            </h3>
            <div className="text-right">
              <span className="font-serif-luxury text-[18px] font-bold text-terracotta">
                ${item.price}
              </span>
              <span className="text-[10px] text-gray-400 block -mt-1">/ day</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 font-light leading-relaxed mb-4 line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Stock & Cart Controls */}
        <div className="mt-auto space-y-3 pt-3 border-t border-blush/60">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400 font-light">Availability</span>
            {isOutOfStock ? (
              <span className="text-red-500 font-medium flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded-sm">
                <AlertTriangle className="w-3.5 h-3.5" /> Out of Stock
              </span>
            ) : item.available <= 2 ? (
              <span className="text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-sm">
                Only {item.available} left
              </span>
            ) : (
              <span className="text-olive font-medium bg-olive/10 px-2 py-0.5 rounded-sm">
                {item.available} available
              </span>
            )}
          </div>

          {cartQuantity > 0 ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 bg-blush-light rounded-xl border border-blush p-1">
                <button
                  onClick={decrement}
                  disabled={localQty <= 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blush text-gray-600 disabled:opacity-40 transition-colors"
                  title="Decrease Quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-medium text-sm text-gray-800 font-mono">
                  {localQty} rented
                </span>
                <button
                  onClick={increment}
                  disabled={localQty >= item.available}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blush text-gray-600 disabled:opacity-40 transition-colors"
                  title="Increase Quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <button
                onClick={handleRemoveClick}
                className="w-full py-1.5 text-[11px] text-red-500 hover:text-red-600 hover:bg-red-50/50 rounded-lg transition-all text-center font-medium uppercase tracking-wider"
              >
                Remove from cart
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-blush-light rounded-xl border border-blush p-1 w-1/3 justify-between">
                <button
                  onClick={() => setLocalQty(q => Math.max(1, q - 1))}
                  disabled={localQty <= 1 || isOutOfStock}
                  className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-blush text-gray-600 disabled:opacity-30 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-mono font-medium text-gray-700">
                  {isOutOfStock ? 0 : localQty}
                </span>
                <button
                  onClick={() => setLocalQty(q => Math.min(item.available, q + 1))}
                  disabled={localQty >= item.available || isOutOfStock}
                  className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-blush text-gray-600 disabled:opacity-30 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <button
                onClick={handleAddClick}
                disabled={isOutOfStock}
                className="flex-1 bg-camel hover:bg-camel-dark disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium text-xs py-2.5 px-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
