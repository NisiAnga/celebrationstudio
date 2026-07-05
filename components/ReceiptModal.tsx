"use client";

import React from 'react';
import { Order, BankDetails } from '../types';
import { Check, X, Printer, Copy, Send, PhoneCall, ExternalLink, HelpCircle } from 'lucide-react';

interface ReceiptModalProps {
  order: Order;
  bankDetails: BankDetails;
  studioWhatsapp: string;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  order,
  bankDetails,
  studioWhatsapp,
  onClose
}) => {
  const [copied, setCopied] = React.useState(false);

  // Formatting message for WhatsApp
  const formattedWhatsappMessage = React.useMemo(() => {
    const itemsList = order.items
      .map(item => `• *${item.item.name}* x ${item.quantity} - $${item.item.price}/day ($${item.item.price * item.quantity * order.rentalDays})`)
      .join('\n');

    const deliveryText = order.booking.deliveryNeeded
      ? `*Delivery Address:* ${order.booking.deliveryAddress}\n*Delivery Fee:* $65`
      : `*Studio Pickup:* Yes (12 Rose Garden Lane, Colombo 07)`;

    return `✨ *CELEBRATION STUDIO - Rental Invoice* ✨
Thank you for renting with us! Here are your order details:

*Order Reference:* #CS-${order.id}
*Client Name:* ${order.booking.customerName}
*Rental Period:* ${order.booking.startDate} to ${order.booking.endDate} (${order.rentalDays} ${order.rentalDays === 1 ? 'day' : 'days'})

*Rental Items:*
${itemsList}

*Rental Subtotal:* $${order.totalAmount - (order.booking.deliveryNeeded ? 65 : 0)}
${deliveryText}
*Total Amount:* $${order.totalAmount}

---------------------------
*Manual Payment Instructions:*
Since we do not support automated gateways, please transfer $${order.totalAmount} via bank transfer to hold your reservation, and share a screenshot of the payment slip here.

*Bank Credentials:*
• *Bank:* ${bankDetails.bankName}
• *Account Holder:* ${bankDetails.accountName}
• *Account Number:* ${bankDetails.accountNumber}
• *Branch:* ${bankDetails.routingOrBranchCode}

*Need help?* Visit us at Celebration Studio, or message us on WhatsApp: ${studioWhatsapp}

We look forward to making your special occasion magical! 🌸✨`;
  }, [order, bankDetails, studioWhatsapp]);

  const handleCopyText = () => {
    navigator.clipboard.writeText(formattedWhatsappMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // WhatsApp click triggers
  const getWhatsAppLink = (recipientPhone: string) => {
    // Sanitize phone number (keep only digits)
    const cleanPhone = recipientPhone.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(formattedWhatsappMessage)}`;
  };

  const customerPhoneClean = order.booking.whatsappNumber;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto animate-fadeIn duration-300">
      <div className="bg-blush-light rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-blush my-8 flex flex-col max-h-[90vh]">
        
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-terracotta to-camel p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 p-1.5 rounded-full transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-2.5 rounded-full">
              <Check className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-white/80">Reservation Placed Successfully</span>
              <h2 className="font-serif-luxury text-[24px] font-bold tracking-wide">Order #CS-{order.id}</h2>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* Important alert regarding Manual Payments */}
          <div className="p-4 bg-amber-50/70 border border-amber-200/60 rounded-2xl flex gap-3 text-amber-900 text-xs leading-relaxed">
            <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold">Action Required: No Automatic Payment Gateway</strong>
              To confirm and lock down your booked items, you must manually complete a bank transfer and share the payment slip with us via WhatsApp. Choose one of the sending options below.
            </div>
          </div>

          {/* Elegant Printable Invoice */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xs border border-blush/60 space-y-6 print:border-none print:shadow-none print:p-0" id="printable-receipt">
            <div className="flex justify-between items-start border-b border-blush/40 pb-5">
              <div>
                <h1 className="font-serif-luxury text-[22px] font-bold text-gray-900 leading-none">Celebration Studio</h1>
                <span className="text-[10px] text-camel uppercase tracking-wider font-medium">Exquisite Event Rentals & Designs</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block">Booking Reference</span>
                <span className="font-mono text-sm font-semibold text-terracotta">#CS-{order.id}</span>
              </div>
            </div>

            {/* Event Dates & Client Coordinates */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-gray-400 block font-light">Reserved For</span>
                <span className="font-semibold text-gray-800 text-sm block">{order.booking.customerName}</span>
                <span className="text-gray-500 font-mono block">{order.booking.whatsappNumber}</span>
                {order.booking.email && <span className="text-gray-500 block">{order.booking.email}</span>}
              </div>
              <div className="space-y-1 text-right">
                <span className="text-gray-400 block font-light">Rental Period</span>
                <span className="font-semibold text-gray-800 block">
                  {order.booking.startDate} <span className="text-camel font-light">to</span> {order.booking.endDate}
                </span>
                <span className="text-[10px] bg-olive/10 text-olive-dark font-semibold px-2 py-0.5 rounded-full inline-block mt-0.5">
                  {order.rentalDays} {order.rentalDays === 1 ? 'Day Rental' : 'Days Rental'}
                </span>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="border-t border-b border-blush/40 py-4 space-y-3">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">Booked Rental Items</span>
              <div className="space-y-2.5">
                {order.items.map((cartItem, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <div className="flex-1">
                      <span className="font-medium text-gray-900 block">{cartItem.item.name}</span>
                      <span className="text-gray-400 text-[10px] font-light">Category: {cartItem.item.category}</span>
                    </div>
                    <div className="text-right flex items-center gap-6 font-mono text-gray-700">
                      <span>{cartItem.quantity} x ${cartItem.item.price}/day</span>
                      <span className="font-semibold text-gray-900 w-16">
                        ${cartItem.item.price * cartItem.quantity * order.rentalDays}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkout Totals */}
            <div className="space-y-1.5 text-xs text-right max-w-xs ml-auto">
              <div className="flex justify-between text-gray-500">
                <span>Items Subtotal:</span>
                <span className="font-mono">${order.totalAmount - (order.booking.deliveryNeeded ? 65 : 0)}</span>
              </div>
              {order.booking.deliveryNeeded && (
                <div className="flex justify-between text-gray-500">
                  <span>Luxury Delivery & Setup:</span>
                  <span className="font-mono">$65</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-gray-900 text-sm pt-2 border-t border-blush/40">
                <span className="font-serif-luxury text-base">Total Due Amount:</span>
                <span className="font-mono text-base text-terracotta">${order.totalAmount}</span>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="p-3 bg-blush-light rounded-xl text-[11px] text-gray-600 border border-blush/40">
              <span className="font-bold text-gray-800 block mb-1">Fulfillment Logistics</span>
              {order.booking.deliveryNeeded ? (
                <p><strong>Deliver To:</strong> {order.booking.deliveryAddress}</p>
              ) : (
                <p><strong>Studio Pickup:</strong> Self-pickup at 12 Rose Garden Lane, Colombo 07. Return by {order.booking.endDate}.</p>
              )}
              {order.booking.notes && (
                <p className="mt-1 text-gray-500 italic"><strong>Notes:</strong> "{order.booking.notes}"</p>
              )}
            </div>

            {/* Bank Transfer details inside Receipt */}
            <div className="p-4 bg-olive/5 border border-olive/20 rounded-xl space-y-2 text-xs">
              <span className="font-serif-luxury font-bold text-olive-dark block text-sm">Official Bank Transfer Details</span>
              <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 font-light text-gray-700">
                <div>Bank Name: <strong className="font-semibold text-gray-900">{bankDetails.bankName}</strong></div>
                <div>Account Name: <strong className="font-semibold text-gray-900">{bankDetails.accountName}</strong></div>
                <div>Account Number: <strong className="font-semibold text-gray-900 font-mono">{bankDetails.accountNumber}</strong></div>
                <div>Branch / Routing: <strong className="font-semibold text-gray-900">{bankDetails.routingOrBranchCode}</strong></div>
              </div>
            </div>
          </div>

          {/* Sharing Buttons & Manual Coordinates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            
            {/* Primary Option: PUSH receipt to Customer WhatsApp */}
            <a
              href={getWhatsAppLink(customerPhoneClean)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl p-4 flex items-center justify-between shadow-md hover:shadow-lg transition-all text-left group"
            >
              <div className="space-y-1">
                <span className="text-[10px] bg-emerald-500/30 text-white px-2 py-0.5 rounded-full inline-block font-semibold uppercase tracking-wider">
                  Option A: Send To Client
                </span>
                <span className="block font-serif-luxury text-base font-bold leading-tight">
                  WhatsApp Customer
                </span>
                <span className="block text-[11px] font-light text-emerald-100">
                  Opens chat with {order.booking.customerName}
                </span>
              </div>
              <Send className="w-6 h-6 text-emerald-100 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary Option: PULL details/Notify Studio WhatsApp */}
            <a
              href={getWhatsAppLink(studioWhatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-camel hover:bg-camel-dark text-white font-semibold rounded-2xl p-4 flex items-center justify-between shadow-md hover:shadow-lg transition-all text-left group"
            >
              <div className="space-y-1">
                <span className="text-[10px] bg-camel-dark/30 text-white px-2 py-0.5 rounded-full inline-block font-semibold uppercase tracking-wider">
                  Option B: Client Confirms
                </span>
                <span className="block font-serif-luxury text-base font-bold leading-tight">
                  WhatsApp Studio
                </span>
                <span className="block text-[11px] font-light text-camel-100">
                  Sends receipt copy directly to Studio
                </span>
              </div>
              <PhoneCall className="w-6 h-6 text-camel-100 group-hover:scale-105 transition-transform" />
            </a>

          </div>

          {/* Auxiliary Print & Copy Utility Row */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleCopyText}
              className="px-4 py-2.5 bg-white text-xs font-semibold text-gray-700 hover:bg-blush border border-blush rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" /> Copied Receipt Text
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gray-500" /> Copy Plain Text
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-white text-xs font-semibold text-gray-700 hover:bg-blush border border-blush rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-gray-500" /> Print Invoice (PDF)
            </button>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-blush border-t border-blush-dark px-6 py-4 flex justify-between items-center text-xs text-gray-500 font-light">
          <span>* Physical checks take 24h to verify against items in sheet.</span>
          <button
            onClick={onClose}
            className="text-terracotta hover:text-terracotta-dark font-semibold text-xs tracking-wider uppercase cursor-pointer"
          >
            Done
          </button>
        </div>
        
      </div>
    </div>
  );
};
