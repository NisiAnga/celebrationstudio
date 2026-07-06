"use client";

import React from 'react';
import { AdminOrder, OrderStatus } from '../../../types';
import {
  getOrdersFromSupabase, updateOrderStatus,
  restoreInventoryQuantities, subscribeToNewOrders, getSupabaseConfig
} from '../../../lib/supabase';
import {
  ShoppingBag, User, Phone, Mail, MapPin, Calendar,
  Truck, Package, CheckCircle, XCircle, Clock, RefreshCw,
  ChevronDown, ChevronUp, Sparkles, LogOut, AlertTriangle,
  TrendingUp, ClipboardList, BadgeCheck, Zap, RotateCcw,
  ArrowRight, Archive, Inbox
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SESSION_AUTH_KEY = 'celebration_studio_admin_auth';

// ─── Helpers ────────────────────────────────────────────────────────────────

function fmtDate(d: string) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
function fmtTime(d: string) {
  if (!d) return '';
  return new Date(d).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}
function fmtDateTime(d: string) {
  if (!d) return '—';
  return `${fmtDate(d)} · ${fmtTime(d)}`;
}

// ─── Status config & machine ─────────────────────────────────────────────────

type StatusCfg = {
  label: string;
  color: string;        // badge colours
  rowColor: string;     // table row accent
  dot: string;
  icon: React.ElementType;
};

const STATUS_CONFIG: Record<OrderStatus, StatusCfg> = {
  pending:             { label: 'Pending',              color: 'bg-amber-50 text-amber-700 border-amber-200',      rowColor: 'bg-amber-50/30',     dot: 'bg-amber-400',     icon: Clock },
  confirmed:           { label: 'Confirmed',            color: 'bg-emerald-50 text-emerald-700 border-emerald-200', rowColor: 'bg-emerald-50/20',   dot: 'bg-emerald-500',   icon: CheckCircle },
  need_to_collect:     { label: 'Need to Collect',      color: 'bg-sky-50 text-sky-700 border-sky-200',             rowColor: 'bg-sky-50/20',       dot: 'bg-sky-500',       icon: Truck },
  collected_delivered: { label: 'Collected / Delivered', color: 'bg-violet-50 text-violet-700 border-violet-200',   rowColor: 'bg-violet-50/20',    dot: 'bg-violet-500',    icon: Package },
  received:            { label: 'Received',             color: 'bg-teal-50 text-teal-700 border-teal-200',          rowColor: 'bg-teal-50/30',      dot: 'bg-teal-500',      icon: RotateCcw },
  cancelled:           { label: 'Cancelled',            color: 'bg-red-50 text-red-600 border-red-200',             rowColor: 'bg-red-50/20',       dot: 'bg-red-400',       icon: XCircle },
};

// Next valid transitions for each status (in order shown as buttons)
const NEXT_TRANSITIONS: Record<OrderStatus, { to: OrderStatus; label: string; icon: React.ElementType; style: string }[]> = {
  pending:             [
    { to: 'confirmed',           label: 'Confirm',             icon: CheckCircle, style: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
    { to: 'cancelled',           label: 'Cancel',              icon: XCircle,     style: 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' },
  ],
  confirmed:           [
    { to: 'need_to_collect',     label: 'Need to Collect',     icon: Truck,       style: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100' },
    { to: 'cancelled',           label: 'Cancel',              icon: XCircle,     style: 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' },
  ],
  need_to_collect:     [
    { to: 'collected_delivered', label: 'Collected / Delivered', icon: Package,   style: 'bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100' },
    { to: 'cancelled',           label: 'Cancel',              icon: XCircle,     style: 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' },
  ],
  collected_delivered: [
    { to: 'received',            label: 'Mark Received',       icon: RotateCcw,   style: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100' },
    { to: 'cancelled',           label: 'Cancel',              icon: XCircle,     style: 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' },
  ],
  received:  [],  // terminal — inventory already restored
  cancelled: [],  // terminal
};

// ─── Status Badge ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${cfg.color} whitespace-nowrap`}>
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

// ─── Stat Card ───────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, icon: Icon, accent }: {
  label: string; value: string | number; sub?: string;
  icon: React.ElementType; accent: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-blush p-5 flex items-start gap-4 shadow-xs">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${accent}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold">{label}</p>
        <p className="text-2xl font-bold text-gray-900 font-serif-luxury leading-tight">{value}</p>
        {sub && <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Pending Order Card ──────────────────────────────────────────────────────

function PendingOrderCard({
  order, onAction, updatingId
}: {
  order: AdminOrder;
  onAction: (id: string, to: OrderStatus) => void;
  updatingId: string | null;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const isUpdating = updatingId === order.id;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="bg-white rounded-2xl border-2 border-amber-200 shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          {/* Customer */}
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-amber-600" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-serif-luxury text-base font-bold text-gray-900">{order.customer_name}</h3>
                <StatusBadge status={order.status} />
              </div>
              <div className="flex flex-wrap gap-x-4 mt-0.5">
                {order.whatsapp_number && (
                  <a href={`https://wa.me/${order.whatsapp_number.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1 text-[11px] text-emerald-600 hover:underline font-medium">
                    <Phone className="w-3 h-3" />{order.whatsapp_number}
                  </a>
                )}
                {order.email && (
                  <span className="flex items-center gap-1 text-[11px] text-gray-400">
                    <Mail className="w-3 h-3" />{order.email}
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* Amount */}
          <div className="text-right">
            <p className="text-[10px] text-gray-400 font-mono">#{order.id}</p>
            <p className="text-xl font-bold text-terracotta font-serif-luxury">Rs. {order.total_amount.toLocaleString()}</p>
            <p className="text-[10px] text-gray-400">{fmtDateTime(order.created_at)}</p>
          </div>
        </div>

        {/* Rental & delivery info */}
        <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-camel" />
            {fmtDate(order.start_date)} → {fmtDate(order.end_date)}
            <span className="ml-1 font-semibold text-olive bg-olive/10 px-1.5 py-0.5 rounded-full">{order.rental_days}d</span>
          </span>
          {order.delivery_needed && (
            <span className="flex items-center gap-1.5 text-sky-600">
              <Truck className="w-3.5 h-3.5" />Delivery required
            </span>
          )}
        </div>

        {/* Items summary */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {order.items.slice(0, expanded ? order.items.length : 3).map((it, idx) => (
            <span key={idx} className="inline-flex items-center gap-1 text-[11px] bg-blush-light border border-blush px-2 py-0.5 rounded-full text-gray-600">
              <Package className="w-3 h-3 text-camel" />{it.item_name} ×{it.quantity}
            </span>
          ))}
          {!expanded && order.items.length > 3 && (
            <span className="text-[11px] text-gray-400 px-1">+{order.items.length - 3} more</span>
          )}
        </div>
      </div>

      {/* Expandable details */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div key="details" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="border-t border-amber-100 px-5 py-4 bg-amber-50/20 space-y-3">
              <div className="rounded-xl overflow-hidden border border-amber-100">
                <table className="w-full text-xs">
                  <thead className="bg-amber-50/60">
                    <tr>
                      <th className="text-left px-3 py-2 text-gray-500 font-semibold">Item</th>
                      <th className="text-center px-3 py-2 text-gray-500 font-semibold">Qty</th>
                      <th className="text-right px-3 py-2 text-gray-500 font-semibold">Rate/day</th>
                      <th className="text-right px-3 py-2 text-gray-500 font-semibold">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-50 bg-white">
                    {order.items.map((it, idx) => (
                      <tr key={idx}>
                        <td className="px-3 py-2 text-gray-800 font-medium">{it.item_name}</td>
                        <td className="px-3 py-2 text-center font-mono">{it.quantity}</td>
                        <td className="px-3 py-2 text-right font-mono">Rs. {it.price}</td>
                        <td className="px-3 py-2 text-right font-semibold font-mono">
                          Rs. {(it.price * it.quantity * order.rental_days).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-amber-50/40 border-t border-amber-100">
                    <tr>
                      <td colSpan={3} className="px-3 py-2 text-right font-semibold text-xs text-gray-700">Grand Total</td>
                      <td className="px-3 py-2 text-right text-terracotta font-bold font-serif-luxury text-sm">
                        Rs. {order.total_amount.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              {order.delivery_needed && order.delivery_address && (
                <div className="bg-white rounded-xl border border-amber-100 p-3">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold flex items-center gap-1 mb-1">
                    <MapPin className="w-3 h-3" /> Delivery Address
                  </p>
                  <p className="text-xs text-gray-700">{order.delivery_address}</p>
                </div>
              )}
              {order.notes && (
                <div className="bg-white rounded-xl border border-amber-100 p-3">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">Notes</p>
                  <p className="text-xs text-gray-700">{order.notes}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer actions */}
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-t border-amber-100 bg-white">
        <button onClick={() => setExpanded(v => !v)}
          className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-camel font-semibold uppercase tracking-wider transition-colors cursor-pointer">
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {expanded ? 'Collapse' : 'Details'}
        </button>
        <div className="flex items-center gap-2">
          {isUpdating ? (
            <RefreshCw className="w-4 h-4 text-camel animate-spin" />
          ) : (
            NEXT_TRANSITIONS.pending.map(t => (
              <button key={t.to} onClick={() => onAction(order.id, t.to)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${t.style}`}>
                <t.icon className="w-3.5 h-3.5" />{t.label}
              </button>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Orders Table Row ─────────────────────────────────────────────────────────

function OrderTableRow({
  order, onAction, updatingId
}: {
  order: AdminOrder;
  onAction: (id: string, to: OrderStatus) => void;
  updatingId: string | null;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const isUpdating = updatingId === order.id;
  const cfg = STATUS_CONFIG[order.status];
  const transitions = NEXT_TRANSITIONS[order.status];
  const isTerminal = transitions.length === 0;

  return (
    <>
      <motion.tr
        layout
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        className={`border-b border-blush/40 ${cfg.rowColor} transition-colors`}
      >
        {/* Order ID + date */}
        <td className="px-4 py-3 text-[11px] text-gray-500 font-mono whitespace-nowrap">
          <span className="text-gray-700 font-semibold">#{order.id}</span>
          <span className="block text-gray-400 text-[10px]">{fmtDate(order.created_at)}</span>
        </td>

        {/* Customer */}
        <td className="px-4 py-3">
          <p className="text-sm font-semibold text-gray-900 font-serif-luxury leading-tight">{order.customer_name}</p>
          {order.whatsapp_number && (
            <a href={`https://wa.me/${order.whatsapp_number.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"
              className="flex items-center gap-1 text-[11px] text-emerald-600 hover:underline">
              <Phone className="w-3 h-3" />{order.whatsapp_number}
            </a>
          )}
        </td>

        {/* Items summary */}
        <td className="px-4 py-3">
          <div className="flex flex-wrap gap-1">
            {order.items.slice(0, 2).map((it, idx) => (
              <span key={idx} className="text-[10px] bg-blush px-1.5 py-0.5 rounded-full text-gray-600 font-medium whitespace-nowrap">
                {it.item_name} ×{it.quantity}
              </span>
            ))}
            {order.items.length > 2 && (
              <span className="text-[10px] text-gray-400">+{order.items.length - 2}</span>
            )}
          </div>
        </td>

        {/* Rental dates */}
        <td className="px-4 py-3 whitespace-nowrap">
          <p className="text-xs text-gray-700">{fmtDate(order.start_date)}</p>
          <p className="text-[10px] text-gray-400 flex items-center gap-1">
            <ArrowRight className="w-3 h-3" />{fmtDate(order.end_date)}
            <span className="ml-1 text-olive font-semibold">{order.rental_days}d</span>
          </p>
        </td>

        {/* Total */}
        <td className="px-4 py-3 whitespace-nowrap text-right">
          <span className="text-sm font-bold text-terracotta font-serif-luxury">
            Rs. {order.total_amount.toLocaleString()}
          </span>
        </td>

        {/* Status */}
        <td className="px-4 py-3">
          <StatusBadge status={order.status} />
        </td>

        {/* Actions */}
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            {isUpdating ? (
              <RefreshCw className="w-4 h-4 text-camel animate-spin" />
            ) : isTerminal ? (
              <span className="text-[10px] text-gray-400 italic">
                {order.status === 'received' ? '✓ Complete' : '✗ Cancelled'}
              </span>
            ) : (
              <>
                {/* Status dropdown */}
                <select
                  value={order.status}
                  onChange={(e) => onAction(order.id, e.target.value as OrderStatus)}
                  className="text-[11px] font-semibold border border-blush rounded-lg px-2.5 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-camel/30 focus:border-camel cursor-pointer transition-all"
                >
                  <option value={order.status} disabled>
                    {STATUS_CONFIG[order.status].label}
                  </option>
                  {((['confirmed', 'need_to_collect', 'collected_delivered', 'received'] as OrderStatus[])
                    .filter(s => s !== order.status)
                    .map(s => (
                      <option key={s} value={s}>
                        {STATUS_CONFIG[s].label}
                      </option>
                    ))
                  )}
                </select>

                {/* Cancel button */}
                <button
                  onClick={() => onAction(order.id, 'cancelled')}
                  title="Cancel this order"
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-all cursor-pointer whitespace-nowrap"
                >
                  <XCircle className="w-3.5 h-3.5" /> Cancel
                </button>
              </>
            )}

            {/* Expand toggle */}
            <button onClick={() => setExpanded(v => !v)}
              className="p-1 rounded-lg text-gray-400 hover:text-camel hover:bg-blush transition-all cursor-pointer"
              title={expanded ? 'Collapse' : 'View details'}>
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </td>
      </motion.tr>

      {/* Expandable detail row */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.tr key="exp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <td colSpan={7} className="px-6 py-4 bg-blush-light/30 border-b border-blush">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Items table */}
                <div className="rounded-xl overflow-hidden border border-blush">
                  <table className="w-full text-xs">
                    <thead className="bg-blush/40">
                      <tr>
                        <th className="text-left px-3 py-1.5 text-gray-500 font-semibold">Item</th>
                        <th className="text-center px-3 py-1.5 text-gray-500 font-semibold">Qty</th>
                        <th className="text-right px-3 py-1.5 text-gray-500 font-semibold">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blush/60 bg-white">
                      {order.items.map((it, idx) => (
                        <tr key={idx}>
                          <td className="px-3 py-1.5 text-gray-700">{it.item_name}</td>
                          <td className="px-3 py-1.5 text-center font-mono">{it.quantity}</td>
                          <td className="px-3 py-1.5 text-right font-mono text-gray-700">
                            Rs. {(it.price * it.quantity * order.rental_days).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-blush/20 border-t border-blush">
                      <tr>
                        <td colSpan={2} className="px-3 py-1.5 text-right font-semibold text-gray-600">Total</td>
                        <td className="px-3 py-1.5 text-right font-bold text-terracotta font-serif-luxury">
                          Rs. {order.total_amount.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                {/* Meta */}
                <div className="space-y-2">
                  {order.delivery_needed && order.delivery_address && (
                    <div className="bg-white rounded-xl border border-blush p-3">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold flex items-center gap-1 mb-1">
                        <MapPin className="w-3 h-3" /> Delivery
                      </p>
                      <p className="text-xs text-gray-700">{order.delivery_address}</p>
                    </div>
                  )}
                  {order.notes && (
                    <div className="bg-white rounded-xl border border-blush p-3">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">Notes</p>
                      <p className="text-xs text-gray-700">{order.notes}</p>
                    </div>
                  )}
                  {order.email && (
                    <div className="bg-white rounded-xl border border-blush p-3">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">Email</p>
                      <a href={`mailto:${order.email}`} className="text-xs text-camel hover:underline">{order.email}</a>
                    </div>
                  )}
                </div>
              </div>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminOrdersPage() {
  // Auth gate
  const [authState, setAuthState] = React.useState<'checking' | 'locked' | 'unlocked'>('checking');
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    setAuthState(sessionStorage.getItem(SESSION_AUTH_KEY) === 'true' ? 'unlocked' : 'locked');
  }, []);
  const handleLogout = () => { sessionStorage.removeItem(SESSION_AUTH_KEY); setAuthState('locked'); };

  // Orders state
  const [orders, setOrders] = React.useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const [updatingId, setUpdatingId] = React.useState<string | null>(null);
  const [newOrderIds, setNewOrderIds] = React.useState<Set<string>>(new Set());
  // Table filter: which statuses to show (non-pending)
  const [tableFilter, setTableFilter] = React.useState<'active' | 'completed' | 'all'>('active');

  const fetchOrders = React.useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      setOrders(await getOrdersFromSupabase());
    } catch (err: any) {
      setLoadError(err.message || 'Failed to load orders.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load + Realtime subscription
  React.useEffect(() => {
    if (authState !== 'unlocked') return;
    fetchOrders();
    const { url, anonKey } = getSupabaseConfig();
    if (!url || !anonKey) return;
    const unsub = subscribeToNewOrders((newOrder) => {
      setOrders(prev => [newOrder, ...prev]);
      setNewOrderIds(prev => new Set(prev).add(newOrder.id));
      setTimeout(() => setNewOrderIds(prev => { const n = new Set(prev); n.delete(newOrder.id); return n; }), 8000);
    });
    return unsub;
  }, [authState, fetchOrders]);

  // Status change handler
  const handleAction = async (id: string, to: OrderStatus) => {
    const order = orders.find(o => o.id === id);
    if (!order) return;

    setUpdatingId(id);
    try {
      await updateOrderStatus(id, to);

      // Restore inventory when items are returned (received) OR order is cancelled
      if (to === 'received' || to === 'cancelled') {
        const restorePayload = order.items.map(it => ({
          itemId: it.item_id,
          restoreQty: it.quantity,
        }));
        await restoreInventoryQuantities(restorePayload);
      }

      // Optimistic update
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: to } : o));
    } catch (err: any) {
      alert(`Failed to update order: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  // Derived
  const pendingOrders = React.useMemo(() => orders.filter(o => o.status === 'pending'), [orders]);
  const nonPendingOrders = React.useMemo(() => {
    const nonPending = orders.filter(o => o.status !== 'pending');
    if (tableFilter === 'active')   return nonPending.filter(o => o.status !== 'received' && o.status !== 'cancelled');
    if (tableFilter === 'completed') return nonPending.filter(o => o.status === 'received' || o.status === 'cancelled');
    return nonPending;
  }, [orders, tableFilter]);

  const stats = React.useMemo(() => ({
    total:     orders.length,
    pending:   pendingOrders.length,
    active:    orders.filter(o => ['confirmed','need_to_collect','collected_delivered'].includes(o.status)).length,
    received:  orders.filter(o => o.status === 'received').length,
    revenue:   orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.total_amount, 0),
  }), [orders, pendingOrders]);

  // ── Auth screens ──────────────────────────────────────────────────────────
  if (authState === 'checking') return (
    <div className="min-h-screen bg-blush-light flex items-center justify-center">
      <RefreshCw className="w-7 h-7 text-camel animate-spin" />
    </div>
  );
  if (authState === 'locked') return (
    <div className="min-h-screen bg-blush-light flex flex-col items-center justify-center gap-6 p-4">
      <div className="text-center space-y-2">
        <Sparkles className="w-10 h-10 text-terracotta mx-auto" />
        <h1 className="font-serif-luxury text-2xl font-bold text-gray-900">Session Expired</h1>
        <p className="text-sm text-gray-500">Please sign in again to access the admin portal.</p>
      </div>
      <a href="/admin" className="px-6 py-3 bg-terracotta text-white rounded-xl text-sm font-semibold hover:bg-terracotta-dark transition-all shadow-md">
        Go to Admin Login
      </a>
    </div>
  );

  // ── Main UI ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-blush-light text-gray-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-blush shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-blush border border-blush/80 flex items-center justify-center shrink-0">
              <img src="/2.png" alt="Logo" className="w-full h-full object-cover"
                onError={e => { e.currentTarget.style.display = 'none'; }} />
            </div>
            <div>
              <span className="font-serif-luxury font-bold text-gray-950 text-sm tracking-widest block leading-none">CELEBRATION STUDIO</span>
              <span className="text-[9px] text-camel tracking-wider font-semibold uppercase block mt-0.5">Orders Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />Live
            </span>
            <button onClick={fetchOrders} disabled={isLoading} title="Refresh"
              className="p-2 rounded-xl border border-blush bg-white text-gray-500 hover:bg-blush-light transition-all cursor-pointer disabled:opacity-50">
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <a href="/admin?tab=stock" className="px-3 py-2 rounded-xl text-xs font-semibold uppercase border border-blush bg-white text-gray-600 hover:bg-blush-light transition-all">Admin</a>
            <a href="/" className="px-3 py-2 rounded-xl text-xs font-semibold uppercase border border-blush bg-white text-gray-600 hover:bg-blush-light transition-all">Storefront</a>
            <button onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold uppercase border border-red-100 bg-white text-red-500 hover:bg-red-50 transition-all cursor-pointer">
              <LogOut className="w-3.5 h-3.5" />Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Orders"  value={stats.total}    icon={ClipboardList} accent="bg-camel/10 text-camel" />
          <StatCard label="Pending"        value={stats.pending}  icon={Clock}         accent="bg-amber-50 text-amber-600" sub="Awaiting confirmation" />
          <StatCard label="In Progress"    value={stats.active}   icon={Truck}         accent="bg-sky-50 text-sky-600" sub="Confirmed → Delivered" />
          <StatCard label="Revenue (net)"  value={`Rs. ${stats.revenue.toLocaleString()}`} icon={TrendingUp} accent="bg-terracotta/10 text-terracotta" sub="Excl. cancelled" />
        </div>

        {/* Error */}
        {loadError && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div><strong>Could not load orders.</strong> {loadError}
              <button onClick={fetchOrders} className="ml-2 underline font-semibold">Retry</button>
            </div>
          </div>
        )}

        {/* ── SECTION 1: Pending Order Cards ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Inbox className="w-5 h-5 text-amber-500" />
              <h2 className="font-serif-luxury text-xl font-bold text-gray-900">Incoming Orders</h2>
              {pendingOrders.length > 0 && (
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full animate-pulse">
                  {pendingOrders.length} new
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400">Confirm or cancel new bookings</p>
          </div>

          {isLoading && pendingOrders.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <RefreshCw className="w-7 h-7 text-camel animate-spin mx-auto" />
              <p className="text-xs text-gray-400">Loading…</p>
            </div>
          ) : pendingOrders.length === 0 ? (
            <div className="py-14 text-center bg-white border border-dashed border-blush rounded-3xl">
              <ShoppingBag className="w-8 h-8 text-gray-200 mx-auto mb-2" />
              <p className="text-sm text-gray-500 font-serif-luxury">No pending orders</p>
              <p className="text-xs text-gray-400 mt-1">New client bookings will appear here in real-time.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <AnimatePresence mode="popLayout">
                {pendingOrders.map(order => (
                  <div key={order.id} className="relative">
                    {newOrderIds.has(order.id) && (
                      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="absolute -top-3 left-4 z-10 flex items-center gap-1 bg-terracotta text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
                        <Zap className="w-3 h-3" />New Order!
                      </motion.div>
                    )}
                    <PendingOrderCard order={order} onAction={handleAction} updatingId={updatingId} />
                  </div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>

        {/* ── SECTION 2: Confirmed / In-Progress / Completed Table ── */}
        <section>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Archive className="w-5 h-5 text-camel" />
              <h2 className="font-serif-luxury text-xl font-bold text-gray-900">Orders Table</h2>
            </div>
            {/* Table filter tabs */}
            <div className="flex items-center gap-2">
              {([
                { key: 'active',    label: 'Active',    count: orders.filter(o => ['confirmed','need_to_collect','collected_delivered'].includes(o.status)).length },
                { key: 'completed', label: 'Completed', count: stats.received + orders.filter(o=>o.status==='cancelled').length },
                { key: 'all',       label: 'All',       count: orders.filter(o=>o.status!=='pending').length },
              ] as { key: typeof tableFilter; label: string; count: number }[]).map(tab => (
                <button key={tab.key} onClick={() => setTableFilter(tab.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    tableFilter === tab.key ? 'bg-camel text-white' : 'bg-white border border-blush text-gray-500 hover:bg-blush-light'
                  }`}>
                  {tab.label}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${tableFilter === tab.key ? 'bg-white/20' : 'bg-blush'}`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {nonPendingOrders.length === 0 ? (
            <div className="py-14 text-center bg-white border border-dashed border-blush rounded-3xl">
              <BadgeCheck className="w-8 h-8 text-gray-200 mx-auto mb-2" />
              <p className="text-sm text-gray-500 font-serif-luxury">
                {tableFilter === 'active' ? 'No active orders in progress.' : 'No completed orders yet.'}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-blush shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-blush/40 border-b border-blush">
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Order</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Items</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Rental Period</th>
                      <th className="text-right px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence mode="popLayout">
                      {nonPendingOrders.map(order => (
                        <OrderTableRow
                          key={order.id}
                          order={order}
                          onAction={handleAction}
                          updatingId={updatingId}
                        />
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Inventory restore note */}
          {tableFilter !== 'active' && stats.received > 0 && (
            <p className="text-[11px] text-teal-600 flex items-center gap-1.5 mt-3">
              <RotateCcw className="w-3.5 h-3.5" />
              <strong>{stats.received}</strong> order{stats.received > 1 ? 's' : ''} marked Received — inventory stock has been automatically restored.
            </p>
          )}
        </section>

      </main>
    </div>
  );
}
