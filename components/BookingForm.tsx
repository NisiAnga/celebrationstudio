"use client";

import React from 'react';
import { CartItem, BookingDetails } from '../types';
import { Calendar, User, Phone, Mail, MapPin, Truck, HelpCircle, ArrowRight } from 'lucide-react';

interface BookingFormProps {
  cart: CartItem[];
  onSubmit: (details: BookingDetails) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ cart, onSubmit }) => {
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
    return diffDays === 0 ? 1 : diffDays; // Minimum 1 day
  }, [startDate, endDate]);

  const subtotal = React.useMemo(() => {
    return cart.reduce((acc, cartItem) => acc + (cartItem.item.price * cartItem.quantity), 0) * (rentalDays || 1);
  }, [cart, rentalDays]);

  const deliveryFee = deliveryNeeded ? 6500 : 0;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (cart.length === 0) {
      setValidationError('Your booking cart is empty. Add exquisite items first!');
      return;
    }

    if (!customerName.trim()) {
      setValidationError('Please specify a client name.');
      return;
    }

    if (!whatsappNumber.trim()) {
      setValidationError('Please enter a WhatsApp contact number for confirmation.');
      return;
    }

    // Clean phone number check
    const cleanPhone = whatsappNumber.replace(/[^0-9+]/g, '');
    if (cleanPhone.length < 7) {
      setValidationError('Please enter a valid WhatsApp contact number (with country code preferred).');
      return;
    }

    if (!startDate || !endDate) {
      setValidationError('Please select both rental start and return dates.');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) {
      setValidationError('The rental return date cannot precede the pickup date.');
      return;
    }

    if (deliveryNeeded && !deliveryAddress.trim()) {
      setValidationError('Please provide a delivery address for our luxury delivery service.');
      return;
    }

    onSubmit({
      customerName,
      whatsappNumber: cleanPhone,
      email,
      startDate,
      endDate,
      deliveryAddress: deliveryNeeded ? deliveryAddress : 'Studio Pickup',
      deliveryNeeded,
      notes
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-blush shadow-xs space-y-6">
      <div className="border-b border-blush pb-4">
        <h3 className="font-serif-luxury text-[20px] font-bold text-gray-900 tracking-wide">
          Booking Logistics
        </h3>
        <p className="text-xs text-gray-500 font-light mt-1">
          Complete the details below to reserve your exquisite celebration items.
        </p>
      </div>

      {validationError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
          {validationError}
        </div>
      )}

      {/* Date Range Selection */}
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
            className="w-full text-xs px-3 py-2.5 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel bg-blush-light/50 font-mono"
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
            className="w-full text-xs px-3 py-2.5 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel bg-blush-light/50 disabled:opacity-50 font-mono"
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

      {/* Client Information */}
      <div className="space-y-4 pt-2">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700 block flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-camel" /> Client Full Name
          </label>
          <input
            type="text"
            placeholder="e.g. Eleanor Vance"
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
              placeholder="e.g. +1 (555) 019-2834"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              required
              className="w-full text-xs pl-3.5 pr-20 py-2.5 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel"
            />
            <span className="absolute right-3 top-2 text-[10px] bg-emerald-50 text-emerald-700 px-2 py-1 rounded-sm font-semibold uppercase tracking-wider">
              WhatsApp
            </span>
          </div>
          <p className="text-[10px] text-gray-400 font-light pl-1">
            Required for order details and physical payment verification updates.
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700 block flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-camel" /> Email Address
          </label>
          <input
            type="email"
            placeholder="e.g. eleanor@vance.com (Optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel"
          />
        </div>
      </div>

      {/* Delivery & Setup Configuration */}
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
          <div className="space-y-1.5 animate-fadeIn duration-200">
            <label className="text-xs font-semibold text-gray-600 block flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-camel" /> Delivery Venue Address
            </label>
            <textarea
              rows={2}
              placeholder="Provide event location coordinates and special accessibility directions..."
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              required={deliveryNeeded}
              className="w-full text-xs px-3.5 py-2 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel resize-none"
            />
            <div className="p-2.5 bg-blush/40 text-[11px] text-gray-600 rounded-lg flex items-start gap-2">
              <span className="font-semibold text-camel">Note:</span>
              <span>A flat setup & luxury logistics fee of Rs. 6500 is added to your total. Our studio team handles elegant layout and pickup on-site.</span>
            </div>
          </div>
        ) : (
          <div className="p-2.5 bg-blush/40 text-[11px] text-gray-600 rounded-lg flex items-start gap-2">
            <span className="font-semibold text-camel">Pickup:</span>
            <span>Free studio pickup & returns at 12 Rose Garden Lane, Colombo 07. Rental starts on pickup date.</span>
          </div>
        )}
      </div>

      {/* Special Theme Notes */}
      <div className="space-y-1.5 pt-2 border-t border-blush/60">
        <label className="text-xs font-semibold text-gray-700 block">
          Special Notes & Design Preferences
        </label>
        <textarea
          rows={2}
          placeholder="e.g. 'Seeking a specific color scheme blend' or 'Need early morning venue drop-off'..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel resize-none"
        />
      </div>

      {/* Checkout Totals Summary */}
      <div className="pt-4 border-t border-blush bg-blush-light/30 -mx-6 px-6 pb-2 rounded-b-2xl">
        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-gray-500">
            <span>Rental Subtotal ({rentalDays || 1} {rentalDays === 1 ? 'day' : 'days'}):</span>
            <span className="font-mono font-medium">Rs. {subtotal}</span>
          </div>
          {deliveryNeeded && (
            <div className="flex justify-between text-gray-500">
              <span>White-glove Delivery & Setup:</span>
              <span className="font-mono font-medium">Rs. {deliveryFee}</span>
            </div>
          )}
          <div className="flex justify-between text-sm font-semibold text-gray-900 pt-2 border-t border-dashed border-blush">
            <span className="font-serif-luxury text-base">Grand Total:</span>
            <span className="font-mono text-terracotta text-lg">Rs. {total}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={cart.length === 0}
          className="w-full bg-terracotta hover:bg-terracotta-dark disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg mt-4 text-xs tracking-wider uppercase font-semibold"
        >
          Book Studio Items
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
