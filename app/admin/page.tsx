"use client";

import React from 'react';
import { AdminPanel } from '../../components/AdminPanel';
import { DEFAULT_INVENTORY_ITEMS } from '../../lib/googleSheets';
import { getInventoryFromSupabase, getSupabaseConfig } from '../../lib/supabase';
import { RentalItem, BankDetails, SupabaseSyncStatus } from '../../types';
import { Lock, Eye, EyeOff, Sparkles, LogOut, ShieldCheck, AlertTriangle } from 'lucide-react';

const LOCAL_STORAGE_BANK_KEY = 'celebration_studio_bank';
const LOCAL_STORAGE_WHATSAPP_KEY = 'celebration_studio_whatsapp';
const SESSION_AUTH_KEY = 'celebration_studio_admin_auth';

const DEFAULT_BANK_DETAILS: BankDetails = {
  bankName: 'Bank of Ceylon (BOC)',
  accountName: 'Celebration Studio Pvt Ltd',
  accountNumber: '8492049282',
  routingOrBranchCode: '082 - Colombo Grand Branch',
  accountType: 'Current Account'
};

const DEFAULT_STUDIO_WHATSAPP = '+94771234567';

// ---------------------------------------------------------------------------
// Login Screen
// ---------------------------------------------------------------------------
function AdminLoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [shake, setShake] = React.useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Brief artificial delay for UX (prevents timing attacks & feels polished)
    await new Promise(r => setTimeout(r, 600));

    const validUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin';
    const validPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'celebration2026';

    if (username.trim() === validUsername && password === validPassword) {
      sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
      onSuccess();
    } else {
      setError('Incorrect username or password. Please try again.');
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blush-light flex items-center justify-center p-4">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-terracotta/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-camel/5 blur-3xl" />
      </div>

      <div
        className={`relative w-full max-w-sm ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
        style={shake ? { animation: 'shake 0.5s ease-in-out' } : {}}
      >
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-blush p-8 space-y-7">

          {/* Logo & header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-blush border border-blush-dark flex items-center justify-center mx-auto overflow-hidden">
              <img
                src="/2.png"
                alt="Celebration Studio"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <Sparkles className="w-7 h-7 text-terracotta hidden" />
            </div>
            <div>
              <h1 className="font-serif-luxury text-2xl font-bold text-gray-900 tracking-wide leading-tight">
                Admin Portal
              </h1>
              <p className="text-[11px] uppercase tracking-widest text-camel font-semibold mt-1">
                Celebration Studio
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 font-light">
              <ShieldCheck className="w-3.5 h-3.5 text-olive" />
              <span>Secure access required</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-blush" />

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Error banner */}
            {error && (
              <div className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-700">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 block" htmlFor="admin-username">
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-blush focus:outline-none focus:ring-2 focus:ring-camel/40 focus:border-camel bg-blush-light/50 transition-all placeholder:text-gray-300"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 block" htmlFor="admin-password">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full text-sm pl-4 pr-11 py-2.5 rounded-xl border border-blush focus:outline-none focus:ring-2 focus:ring-camel/40 focus:border-camel bg-blush-light/50 transition-all placeholder:text-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-camel transition-colors p-1"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-terracotta hover:bg-terracotta-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm tracking-wide mt-2"
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Verifying…
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-[10px] text-gray-300 font-light">
            Credentials are managed in your <span className="font-mono">.env.local</span> file.
          </p>
        </div>
      </div>

      {/* Shake keyframes injected inline */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15%       { transform: translateX(-8px); }
          30%       { transform: translateX(8px); }
          45%       { transform: translateX(-6px); }
          60%       { transform: translateX(6px); }
          75%       { transform: translateX(-3px); }
          90%       { transform: translateX(3px); }
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Admin App (shown only after successful login)
// ---------------------------------------------------------------------------
export default function AdminApp() {
  // Three states: 'checking' | 'locked' | 'unlocked'
  const [authState, setAuthState] = React.useState<'checking' | 'locked' | 'unlocked'>('checking');
  const [initialTab, setInitialTab] = React.useState<'supabase' | 'bank' | 'stock'>('supabase');

  const [bankDetails, setBankDetails] = React.useState<BankDetails>(DEFAULT_BANK_DETAILS);
  const [studioWhatsapp, setStudioWhatsapp] = React.useState<string>(DEFAULT_STUDIO_WHATSAPP);

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

  const [inventory, setInventory] = React.useState<RentalItem[]>(DEFAULT_INVENTORY_ITEMS);
  const [isInventoryLoading, setIsInventoryLoading] = React.useState(false);

  // Check session on mount
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const authed = sessionStorage.getItem(SESSION_AUTH_KEY) === 'true';
    setAuthState(authed ? 'unlocked' : 'locked');

    // Read ?tab= from URL to deep-link into a specific admin tab
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab === 'stock' || tab === 'bank' || tab === 'supabase') {
      setInitialTab(tab);
    }
  }, []);

  // Load saved settings once unlocked
  React.useEffect(() => {
    if (authState !== 'unlocked') return;
    if (typeof window === 'undefined') return;

    const savedBank = localStorage.getItem(LOCAL_STORAGE_BANK_KEY);
    if (savedBank) {
      try { setBankDetails(JSON.parse(savedBank)); } catch (_) {}
    }
    const savedWhatsapp = localStorage.getItem(LOCAL_STORAGE_WHATSAPP_KEY);
    if (savedWhatsapp) setStudioWhatsapp(savedWhatsapp);
  }, [authState]);

  // Sync / Load inventory from Supabase
  const fetchInventory = React.useCallback(async () => {
    setIsInventoryLoading(true);
    setSyncStatus(prev => ({ ...prev, loading: true, error: null }));

    try {
      const items = await getInventoryFromSupabase();
      setInventory(items && items.length > 0 ? items : DEFAULT_INVENTORY_ITEMS);
      setSyncStatus(prev => ({
        ...prev,
        connected: true,
        lastSynced: new Date().toLocaleTimeString(),
        loading: false,
        error: null
      }));
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
    if (authState === 'unlocked') fetchInventory();
  }, [authState, fetchInventory]);

  const handleBankDetailsChange = (details: BankDetails) => {
    setBankDetails(details);
    localStorage.setItem(LOCAL_STORAGE_BANK_KEY, JSON.stringify(details));
  };

  const handleStudioWhatsappChange = (phone: string) => {
    setStudioWhatsapp(phone);
    localStorage.setItem(LOCAL_STORAGE_WHATSAPP_KEY, phone);
  };

  const handleSyncStatusChange = (statusUpdates: Partial<SupabaseSyncStatus>) => {
    setSyncStatus(prev => ({ ...prev, ...statusUpdates }));
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_AUTH_KEY);
    setAuthState('locked');
  };

  // Loading splash while checking session
  if (authState === 'checking') {
    return (
      <div className="min-h-screen bg-blush-light flex items-center justify-center">
        <svg className="w-8 h-8 text-camel animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
        </svg>
      </div>
    );
  }

  // Login screen
  if (authState === 'locked') {
    return <AdminLoginScreen onSuccess={() => setAuthState('unlocked')} />;
  }

  // Admin panel
  return (
    <div className="min-h-screen bg-blush-light text-gray-900 font-sans p-6 md:p-12 max-w-7xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-blush border border-blush/80 flex items-center justify-center shrink-0">
            <img
              src="/2.png"
              alt="Celebration Studio mini logo"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <span className="font-serif-luxury font-bold text-gray-950 text-sm tracking-widest block leading-none">
            CELEBRATION STUDIO ADMIN
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/admin/orders"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase border border-terracotta/30 bg-terracotta/5 text-terracotta hover:bg-terracotta hover:text-white transition-all"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
            Orders
          </a>
          <a
            href="/"
            className="px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase border border-blush bg-white text-gray-600 hover:bg-blush-light transition-all"
          >
            View Storefront
          </a>
          <button
            onClick={handleLogout}
            title="Sign out"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase border border-red-100 bg-white text-red-500 hover:bg-red-50 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </div>

      <AdminPanel
        user={null}
        token={null}
        onAuthChange={() => {}}
        syncStatus={syncStatus}
        onSyncStatusChange={handleSyncStatusChange}
        bankDetails={bankDetails}
        onBankDetailsChange={handleBankDetailsChange}
        studioWhatsapp={studioWhatsapp}
        onStudioWhatsappChange={handleStudioWhatsappChange}
        inventory={inventory}
        onRefreshInventory={fetchInventory}
        initialTab={initialTab}
      />
    </div>
  );
}
