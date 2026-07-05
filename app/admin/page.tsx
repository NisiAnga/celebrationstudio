"use client";

import React from 'react';
import { AdminPanel } from '../../components/AdminPanel';
import { DEFAULT_INVENTORY_ITEMS } from '../../lib/googleSheets';
import { getInventoryFromSupabase, getSupabaseConfig } from '../../lib/supabase';
import { RentalItem, BankDetails, SupabaseSyncStatus } from '../../types';

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

export default function AdminApp() {
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

  return (
    <div className="min-h-screen bg-blush-light text-gray-900 font-sans p-6 md:p-12 max-w-7xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-blush border border-blush/80 flex items-center justify-center shrink-0">
            <img 
              src="/2.png" 
              alt="Celebration Studio mini logo" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <span className="font-serif-luxury font-bold text-gray-950 text-sm tracking-widest block leading-none">CELEBRATION STUDIO ADMIN</span>
        </div>
        <a 
          href="/" 
          className="px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase border border-blush bg-white text-gray-600 hover:bg-blush-light transition-all"
        >
          View Storefront
        </a>
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
      />
    </div>
  );
}
