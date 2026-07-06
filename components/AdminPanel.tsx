"use client";

import React from 'react';
import { User } from 'firebase/auth';
import { BankDetails, SupabaseSyncStatus, RentalItem } from '../types';
import { 
  Settings, Check, RefreshCw, Database, 
  AlertTriangle, Phone, HelpCircle, Save, ShieldAlert, Sparkles,
  Trash2, Plus, X, Upload
} from 'lucide-react';
import { 
  getSupabaseConfig, saveSupabaseConfig, seedSupabaseInventory,
  uploadProductImage, addInventoryItemToSupabase, deleteInventoryItemFromSupabase,
  updateInventoryStockInSupabase
} from '../lib/supabase';

interface AdminPanelProps {
  user: User | null;
  token: string | null;
  onAuthChange: (user: User | null, token: string | null) => void;
  syncStatus: SupabaseSyncStatus;
  onSyncStatusChange: (status: Partial<SupabaseSyncStatus>) => void;
  bankDetails: BankDetails;
  onBankDetailsChange: (details: BankDetails) => void;
  studioWhatsapp: string;
  onStudioWhatsappChange: (phone: string) => void;
  inventory: RentalItem[];
  onRefreshInventory: () => void;
  initialTab?: 'supabase' | 'bank' | 'stock';
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  syncStatus,
  onSyncStatusChange,
  bankDetails,
  onBankDetailsChange,
  studioWhatsapp,
  onStudioWhatsappChange,
  inventory,
  onRefreshInventory,
  initialTab = 'supabase'
}) => {
  const [activeTab, setActiveTab] = React.useState<'supabase' | 'bank' | 'stock'>(initialTab);
  const [bankForm, setBankForm] = React.useState<BankDetails>({ ...bankDetails });
  const [phoneForm, setPhoneForm] = React.useState(studioWhatsapp);
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState('');

  // Form toggles
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // New item form states
  const [newItemName, setNewItemName] = React.useState('');
  const [newItemCategory, setNewItemCategory] = React.useState('Backdrops');
  const [newItemPrice, setNewItemPrice] = React.useState('');
  const [newItemStock, setNewItemStock] = React.useState('');
  const [newItemDescription, setNewItemDescription] = React.useState('');
  const [newItemImageMode, setNewItemImageMode] = React.useState<'file' | 'url'>('file');
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = React.useState<string[]>([]);
  const [pastedUrls, setPastedUrls] = React.useState<string[]>([]);
  const [urlInput, setUrlInput] = React.useState('');

  const handleMultiFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrls(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFilePreview = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddUrl = (e: React.MouseEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      setPastedUrls(prev => [...prev, urlInput.trim()]);
      setUrlInput('');
    }
  };

  const removePastedUrl = (index: number) => {
    setPastedUrls(prev => prev.filter((_, i) => i !== index));
  };

  const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !newItemPrice || !newItemStock) {
      setErrorMsg('Please populate name, price, and stock levels.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      let finalImages: string[] = [];

      if (newItemImageMode === 'file') {
        if (selectedFiles.length > 0) {
          const uploadPromises = selectedFiles.map(async (file) => {
            try {
              return await uploadProductImage(file);
            } catch (uploadErr) {
              console.warn('Storage Bucket upload failed, falling back to base64:', uploadErr);
              return await toBase64(file);
            }
          });
          finalImages = await Promise.all(uploadPromises);
        }
      } else {
        finalImages = [...pastedUrls];
        if (urlInput.trim()) {
          finalImages.push(urlInput.trim());
        }
      }

      const mainImageUrl = finalImages[0] || 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600';

      const generatedId = `item_${Date.now()}`;
      const priceNum = parseFloat(newItemPrice) || 0;
      const stockNum = parseInt(newItemStock, 10) || 0;

      const newItem: RentalItem = {
        id: generatedId,
        name: newItemName.trim(),
        category: newItemCategory,
        price: priceNum,
        stock: stockNum,
        available: stockNum,
        image: mainImageUrl,
        description: newItemDescription.trim(),
        images: finalImages.length > 0 ? finalImages : [mainImageUrl]
      };

      await addInventoryItemToSupabase(newItem);
      await onRefreshInventory();

      setSuccessMsg('Successfully added new rental item to inventory!');
      setTimeout(() => setSuccessMsg(''), 4000);

      setNewItemName('');
      setNewItemCategory('Backdrops');
      setNewItemPrice('');
      setNewItemStock('');
      setNewItemDescription('');
      setSelectedFiles([]);
      setPreviewUrls([]);
      setPastedUrls([]);
      setUrlInput('');
      setShowAddForm(false);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(`Failed to add item: ${err.message || 'Verify your Supabase write permissions.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteItem = async (itemId: string, itemName: string) => {
    if (!window.confirm(`Are you sure you want to delete "${itemName}" from the database?`)) {
      return;
    }

    setIsSyncing(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await deleteInventoryItemFromSupabase(itemId);
      await onRefreshInventory();
      setSuccessMsg(`Successfully deleted "${itemName}" from the database.`);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(`Failed to delete item: ${err.message || 'Verify database permissions.'}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleUpdateStock = async (item: RentalItem, newStock: number) => {
    if (isNaN(newStock) || newStock < 0) return;
    if (newStock === item.stock) return;

    setIsSyncing(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const delta = newStock - item.stock;
      const newAvailable = Math.max(0, item.available + delta);

      await updateInventoryStockInSupabase(item.id, newStock, newAvailable);
      await onRefreshInventory();
      setSuccessMsg(`Successfully updated stock for "${item.name}".`);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(`Failed to update stock: ${err.message || 'Verify database permissions.'}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const [errorMsg, setErrorMsg] = React.useState('');

  // Supabase input states
  const [supabaseUrlInput, setSupabaseUrlInput] = React.useState('');
  const [supabaseAnonKeyInput, setSupabaseAnonKeyInput] = React.useState('');

  // Load configs on component mount
  React.useEffect(() => {
    const { url, anonKey } = getSupabaseConfig();
    setSupabaseUrlInput(url || '');
    setSupabaseAnonKeyInput(anonKey || '');
  }, []);

  React.useEffect(() => {
    setBankForm({ ...bankDetails });
  }, [bankDetails]);

  React.useEffect(() => {
    setPhoneForm(studioWhatsapp);
  }, [studioWhatsapp]);

  const handleSaveSupabaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!supabaseUrlInput.trim() || !supabaseAnonKeyInput.trim()) {
      setErrorMsg('Please enter both Supabase Project URL and Anon API Key.');
      return;
    }

    try {
      saveSupabaseConfig(supabaseUrlInput.trim(), supabaseAnonKeyInput.trim());
      
      onSyncStatusChange({
        supabaseUrl: supabaseUrlInput.trim(),
        connected: false, // Will re-validate on refresh
        error: null
      });

      setSuccessMsg('Supabase credentials stored locally! Testing connection...');
      setTimeout(() => setSuccessMsg(''), 3000);

      // Trigger instant inventory reload to verify connectivity
      handleTestConnection();
    } catch (err: any) {
      setErrorMsg(`Failed to save configuration: ${err.message || err}`);
    }
  };

  const handleTestConnection = async () => {
    setIsSyncing(true);
    onSyncStatusChange({ loading: true, error: null });
    setErrorMsg('');

    try {
      await onRefreshInventory();
      setSuccessMsg('Successfully connected to Supabase database and synchronized live stocks!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(`Connection failed: ${err.message || 'Verify your Supabase table schema exists.'}`);
      onSyncStatusChange({
        connected: false,
        error: err.message || 'Supabase connectivity error.'
      });
    } finally {
      setIsSyncing(false);
      onSyncStatusChange({ loading: false });
    }
  };

  const handleSeedDatabase = async () => {
    setIsSyncing(true);
    setErrorMsg('');
    setSuccessMsg('');
    
    try {
      await seedSupabaseInventory();
      setSuccessMsg('Database populated! Seeding completed successfully.');
      setTimeout(() => setSuccessMsg(''), 4000);
      
      // Reload inventory
      await onRefreshInventory();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(`Seeding failed: ${err.message || 'Make sure you have run the database table queries first.'}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSaveBank = (e: React.FormEvent) => {
    e.preventDefault();
    onBankDetailsChange(bankForm);
    onStudioWhatsappChange(phoneForm);
    setSuccessMsg('Studio payment & WhatsApp contacts updated successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const sqlInventorySchema = `CREATE TABLE inventory (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  stock INTEGER NOT NULL,
  available INTEGER NOT NULL,
  image TEXT,
  description TEXT
);`;

  const sqlOrdersSchema = `CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  email TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  delivery_needed BOOLEAN NOT NULL,
  delivery_address TEXT,
  notes TEXT,
  total_amount NUMERIC NOT NULL,
  rental_days INTEGER NOT NULL,
  status TEXT NOT NULL,
  items JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);`;

  const sqlUpdateSchema = `ALTER TABLE inventory ADD COLUMN images JSONB;`;

  return (
    <div id="admin-panel-container" className="bg-white rounded-3xl p-6 md:p-8 border border-blush shadow-xs space-y-8">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blush pb-5">
        <div>
          <h2 className="font-serif-luxury text-[24px] font-bold text-gray-950 tracking-wide flex items-center gap-2">
            <Settings className="w-6 h-6 text-terracotta" /> Studio Administration
          </h2>
          <p className="text-xs text-gray-500 font-light mt-1">
            Configure Supabase database synchronization, manual bank accounts, and WhatsApp numbers.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 animate-fadeIn font-medium">
          <Check className="w-4 h-4 text-emerald-600" /> {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2 animate-fadeIn font-medium">
          <AlertTriangle className="w-4 h-4 text-red-500" /> {errorMsg}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-blush/60 gap-4 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('supabase')}
          className={`pb-3 relative cursor-pointer ${activeTab === 'supabase' ? 'text-terracotta border-b-2 border-terracotta' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Supabase Connection
        </button>
        <button
          onClick={() => setActiveTab('bank')}
          className={`pb-3 relative cursor-pointer ${activeTab === 'bank' ? 'text-terracotta border-b-2 border-terracotta' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Payment & Phone Setup
        </button>
        <button
          onClick={() => setActiveTab('stock')}
          className={`pb-3 relative cursor-pointer ${activeTab === 'stock' ? 'text-terracotta border-b-2 border-terracotta' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Live Inventory Rows
        </button>
      </div>

      {/* Tab: Supabase Connection */}
      {activeTab === 'supabase' && (
        <div className="space-y-6">
          <div className="p-5 bg-blush-light rounded-2xl border border-blush flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-1.5 flex-1">
              <span className="text-[10px] uppercase font-bold text-camel tracking-wider block">Supabase Status</span>
              <h3 className="font-serif-luxury font-bold text-gray-900 text-lg flex items-center gap-2">
                <Database className="w-5 h-5 text-terracotta" />
                {syncStatus.connected ? 'Connected Live' : 'Offline / Standard Memory Mode'}
              </h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed max-w-xl">
                {syncStatus.connected 
                  ? `All event rentals and stock allocations are syncing in real-time with Supabase: ${syncStatus.supabaseUrl}`
                  : 'Currently operating in-memory. Save your Supabase connection parameters below to activate real-time synchronization.'}
              </p>
            </div>

            {syncStatus.connected && (
              <div className="shrink-0 flex gap-2">
                <button
                  onClick={handleTestConnection}
                  disabled={isSyncing}
                  className="px-4 py-2.5 bg-camel hover:bg-camel-dark disabled:opacity-50 text-white text-xs font-semibold rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} /> Sync Now
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Configuration Form */}
            <div className="lg:col-span-5 bg-white border border-blush p-5 rounded-2xl space-y-4">
              <h4 className="font-serif-luxury font-bold text-gray-950 text-sm tracking-wide">Connection Settings</h4>
              
              <form onSubmit={handleSaveSupabaseConfig} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-gray-700 block">Supabase Project URL</label>
                  <input
                    type="text"
                    placeholder="https://yourprojectid.supabase.co"
                    value={supabaseUrlInput}
                    onChange={(e) => setSupabaseUrlInput(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-blush"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-gray-700 block">Supabase Anon API Key</label>
                  <input
                    type="password"
                    placeholder="eyJhbGciOi..."
                    value={supabaseAnonKeyInput}
                    onChange={(e) => setSupabaseAnonKeyInput(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-blush font-mono"
                    required
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Credentials
                  </button>
                </div>
              </form>

              {/* Seeding Tool */}
              <div className="pt-4 border-t border-blush/40 space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-camel" />
                  <span className="text-[11px] font-bold text-gray-800">Seed Default Catalog</span>
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed font-light">
                  If your `inventory` table is empty, click below to insert the default exquisite catalog items (Terracotta arch, Silk runners, Lounge sofa, etc.).
                </p>
                <button
                  onClick={handleSeedDatabase}
                  disabled={isSyncing}
                  className="w-full px-4 py-2 bg-gray-50 hover:bg-blush border border-blush text-gray-700 font-semibold text-xs rounded-xl transition-all cursor-pointer disabled:opacity-50"
                >
                  Seed Luxury Inventory
                </button>
              </div>
            </div>

            {/* SQL Setup Guide */}
            <div className="lg:col-span-7 bg-gray-50/50 border border-blush/60 p-5 rounded-2xl space-y-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-camel" />
                <h4 className="font-serif-luxury font-bold text-gray-950 text-sm tracking-wide">SQL Schema Generation</h4>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed font-light">
                To activate Supabase sync, open the <strong>SQL Editor</strong> in your Supabase Dashboard and run the following queries to create the <code>inventory</code> and <code>orders</code> tables:
              </p>

              <div className="space-y-3 font-mono text-[10px]">
                <div className="space-y-1">
                  <span className="font-semibold text-gray-700 block">1. Inventory Table Query</span>
                  <pre className="bg-gray-900 text-gray-200 p-3 rounded-lg overflow-x-auto max-h-32">
                    {sqlInventorySchema}
                  </pre>
                </div>

                <div className="space-y-1">
                  <span className="font-semibold text-gray-700 block">2. Orders Log Table Query</span>
                  <pre className="bg-gray-900 text-gray-200 p-3 rounded-lg overflow-x-auto max-h-32">
                    {sqlOrdersSchema}
                  </pre>
                </div>

                <div className="space-y-1">
                  <span className="font-semibold text-gray-700 block">3. Multi-Image Column Query (Run if database already exists)</span>
                  <pre className="bg-gray-900 text-gray-200 p-3 rounded-lg overflow-x-auto max-h-32">
                    {sqlUpdateSchema}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Bank & WhatsApp Setup */}
      {activeTab === 'bank' && (
        <form onSubmit={handleSaveBank} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* WhatsApp settings */}
            <div className="space-y-4">
              <h3 className="font-serif-luxury font-bold text-gray-900 text-lg flex items-center gap-2">
                <Phone className="w-5 h-5 text-emerald-600" />
                WhatsApp Routing Contacts
              </h3>
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Studio Owner WhatsApp Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. +94771234567"
                  value={phoneForm}
                  onChange={(e) => setPhoneForm(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel"
                  required
                />
                <p className="text-[10px] text-gray-400 font-light">
                  Required when customers click "Confirm via WhatsApp" from the checkout summary. Include the country code.
                </p>
              </div>
            </div>

            {/* Bank details settings */}
            <div className="space-y-4">
              <h3 className="font-serif-luxury font-bold text-gray-900 text-lg">
                Manual Bank Transfer Account
              </h3>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-gray-700 block">Bank Name</label>
                  <input
                    type="text"
                    value={bankForm.bankName}
                    onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-blush"
                    required
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-gray-700 block">Account Holder Name</label>
                  <input
                    type="text"
                    value={bankForm.accountName}
                    onChange={(e) => setBankForm({ ...bankForm, accountName: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-blush"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-gray-700 block">Account Number</label>
                    <input
                      type="text"
                      value={bankForm.accountNumber}
                      onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-blush font-mono"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-gray-700 block">Branch Code / Routing</label>
                    <input
                      type="text"
                      value={bankForm.routingOrBranchCode}
                      onChange={(e) => setBankForm({ ...bankForm, routingOrBranchCode: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-blush"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-blush flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md cursor-pointer"
            >
              Save Configurations
            </button>
          </div>
        </form>
      )}

      {/* Tab: Live Inventory rows */}
      {activeTab === 'stock' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-blush/40 pb-4">
            <div>
              <h3 className="font-serif-luxury font-bold text-gray-900 text-lg">
                Live Stock Rows ({inventory.length} items)
              </h3>
              {syncStatus.connected && (
                <span className="text-[10px] text-emerald-700 font-mono mt-0.5 block">
                  ● Real-time synced with Supabase
                </span>
              )}
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-terracotta hover:bg-terracotta-dark text-white text-xs font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-1.5 cursor-pointer"
            >
              {showAddForm ? (
                <>
                  <X className="w-3.5 h-3.5" /> Close Form
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" /> Add New Item
                </>
              )}
            </button>
          </div>

          {/* Form to Add New Item */}
          {showAddForm && (
            <div className="p-6 bg-blush-light/50 border border-blush rounded-3xl space-y-4 animate-fadeIn">
              <h4 className="font-serif-luxury font-bold text-gray-950 text-base tracking-wide flex items-center gap-2">
                <Plus className="w-4 h-4 text-terracotta" /> Add New Rental Item
              </h4>
              
              <form onSubmit={handleAddItem} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-gray-700 block">Item Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Vintage Velvet Arch Drapery"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel bg-white"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-gray-700 block">Category</label>
                    <select
                      value={newItemCategory}
                      onChange={(e) => setNewItemCategory(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel bg-white cursor-pointer"
                    >
                      <option value="Backdrops">Backdrops</option>
                      <option value="Table Runners">Table Runners</option>
                      <option value="Sign Boards">Sign Boards</option>
                      <option value="Packages">Packages</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-gray-700 block">Price Per Day (Rs.)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="e.g. 75"
                      value={newItemPrice}
                      onChange={(e) => setNewItemPrice(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel bg-white"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-gray-700 block">Total Stock Qty</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="e.g. 5"
                      value={newItemStock}
                      onChange={(e) => setNewItemStock(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-gray-700 block">Item Description</label>
                  <textarea
                    placeholder="Describe the aesthetic, colors, materials, and size..."
                    value={newItemDescription}
                    onChange={(e) => setNewItemDescription(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel bg-white h-20 resize-none"
                  />
                </div>

                {/* Image Section */}
                <div className="border-t border-blush/60 pt-4 space-y-4">
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <span className="text-[11px] text-gray-700">Image Source:</span>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="imageMode"
                        checked={newItemImageMode === 'file'}
                        onChange={() => setNewItemImageMode('file')}
                        className="accent-terracotta"
                      />
                      Upload Product Photos (Multiple)
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="imageMode"
                        checked={newItemImageMode === 'url'}
                        onChange={() => setNewItemImageMode('url')}
                        className="accent-terracotta"
                      />
                      Add Image URLs
                    </label>
                  </div>

                  <div className="space-y-4">
                    {newItemImageMode === 'file' ? (
                      <div className="space-y-3">
                        <label className="w-full h-24 border-2 border-dashed border-blush-dark hover:border-camel rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors bg-white">
                          <Upload className="w-5 h-5 text-camel animate-pulse" />
                          <span className="text-[11px] text-gray-700 font-semibold">Click to select files</span>
                          <span className="text-[9px] text-gray-400">Supports selecting multiple images at once</span>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleMultiFileChange}
                            className="hidden"
                          />
                        </label>
                        
                        {/* File preview thumbnails */}
                        {previewUrls.length > 0 && (
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-semibold text-gray-500 block">Selected Images ({selectedFiles.length})</span>
                            <div className="flex flex-wrap gap-3">
                              {previewUrls.map((pUrl, idx) => (
                                <div key={idx} className="relative w-16 h-16 rounded-xl border border-blush bg-white overflow-hidden shadow-xs shrink-0 group/preview">
                                  <img src={pUrl} alt="Upload preview" className="w-full h-full object-cover" />
                                  <button
                                    type="button"
                                    onClick={() => removeFilePreview(idx)}
                                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-xs cursor-pointer text-[9px] font-bold"
                                    title="Remove photo"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3 bg-white p-4 border border-blush rounded-2xl">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="https://images.unsplash.com/... or paste link"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-blush focus:outline-hidden focus:ring-1 focus:ring-camel focus:border-camel bg-white"
                          />
                          <button
                            type="button"
                            onClick={handleAddUrl}
                            className="px-4 py-2 bg-camel hover:bg-camel-dark text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs shrink-0"
                          >
                            + Add Image
                          </button>
                        </div>

                        {/* Pasted URLs thumbnails */}
                        {pastedUrls.length > 0 && (
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-semibold text-gray-500 block">Added Image Links ({pastedUrls.length})</span>
                            <div className="flex flex-wrap gap-3">
                              {pastedUrls.map((pUrl, idx) => (
                                <div key={idx} className="relative w-16 h-16 rounded-xl border border-blush bg-white overflow-hidden shadow-xs shrink-0 group/preview">
                                  <img src={pUrl} alt="URL preview" className="w-full h-full object-cover" />
                                  <button
                                    type="button"
                                    onClick={() => removePastedUrl(idx)}
                                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-xs cursor-pointer text-[9px] font-bold"
                                    title="Remove URL"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-terracotta hover:bg-terracotta-dark disabled:opacity-50 text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Adding Item...
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" /> Save to Supabase
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Table list */}
          <div className="overflow-x-auto border border-blush rounded-2xl bg-white shadow-xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-blush text-gray-700 uppercase text-[10px] tracking-wider font-semibold">
                <tr>
                  <th className="px-5 py-3">Photo</th>
                  <th className="px-5 py-3">Item Name</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3 text-right">Rent/Day</th>
                  <th className="px-5 py-3 text-center">Total Stock</th>
                  <th className="px-5 py-3 text-center">Available Stock</th>
                  <th className="px-5 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blush/60 text-gray-600 font-light">
                {inventory.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-8 text-center text-gray-400 italic">
                      No items currently in inventory. Click "+ Add New Item" or "Seed Luxury Inventory" to get started.
                    </td>
                  </tr>
                ) : (
                  inventory.map((item) => (
                    <tr key={item.id} className="hover:bg-blush-light/30 transition-colors">
                      <td className="px-5 py-2.5">
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-blush/80 shadow-xs bg-gray-50 flex items-center justify-center shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=100';
                            }}
                          />
                        </div>
                      </td>
                      <td className="px-5 py-3.5 font-medium text-gray-900">{item.name}</td>
                      <td className="px-5 py-3.5">{item.category}</td>
                      <td className="px-5 py-3.5 text-right font-mono font-medium">Rs. {item.price}</td>
                      <td className="px-5 py-3.5 text-center">
                        <input
                          type="number"
                          min="0"
                          defaultValue={item.stock}
                          onBlur={(e) => handleUpdateStock(item, parseInt(e.target.value, 10))}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              (e.target as HTMLInputElement).blur();
                            }
                          }}
                          disabled={isSyncing}
                          className="w-16 text-center border border-blush rounded-lg py-1 px-1.5 focus:outline-none focus:ring-1 focus:ring-camel focus:border-camel font-mono text-xs font-semibold bg-white"
                        />
                      </td>
                      <td className="px-5 py-3.5 text-center font-mono">
                        <span className={`px-2 py-0.5 rounded-sm font-semibold ${item.available <= 0 ? 'bg-red-50 text-red-600' : 'bg-olive/10 text-olive-dark'}`}>
                          {item.available}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <button
                          onClick={() => handleDeleteItem(item.id, item.name)}
                          disabled={isSyncing}
                          className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-colors disabled:opacity-50 cursor-pointer inline-flex items-center justify-center"
                          title="Delete Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
