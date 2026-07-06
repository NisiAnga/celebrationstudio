import { createClient } from '@supabase/supabase-js';
import { RentalItem, Order } from '../types';
import { DEFAULT_INVENTORY_ITEMS } from './googleSheets';

const LOCAL_STORAGE_SUPABASE_URL_KEY = 'celebration_studio_supabase_url';
const LOCAL_STORAGE_SUPABASE_ANON_KEY = 'celebration_studio_supabase_anon_key';

/**
 * Retrieves the currently saved Supabase configuration, looking in local storage
 * first (for manual user override) and then falling back to env variables.
 */
export function getSupabaseConfig(): { url: string | null; anonKey: string | null } {
  if (typeof window === 'undefined') {
    return { url: null, anonKey: null };
  }
  const env = (import.meta as any).env || {};
  const url = localStorage.getItem(LOCAL_STORAGE_SUPABASE_URL_KEY) || 
              process.env.NEXT_PUBLIC_SUPABASE_URL || 
              process.env.VITE_SUPABASE_URL || 
              env.VITE_SUPABASE_URL || 
              null;
  const anonKey = localStorage.getItem(LOCAL_STORAGE_SUPABASE_ANON_KEY) || 
                  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
                  process.env.VITE_SUPABASE_ANON_KEY || 
                  env.VITE_SUPABASE_ANON_KEY || 
                  null;
  return { url, anonKey };
}

/**
 * Saves or updates manual Supabase overrides in local storage.
 */
export function saveSupabaseConfig(url: string, anonKey: string) {
  if (typeof window === 'undefined') return;
  if (url) {
    localStorage.setItem(LOCAL_STORAGE_SUPABASE_URL_KEY, url);
  } else {
    localStorage.removeItem(LOCAL_STORAGE_SUPABASE_URL_KEY);
  }

  if (anonKey) {
    localStorage.setItem(LOCAL_STORAGE_SUPABASE_ANON_KEY, anonKey);
  } else {
    localStorage.removeItem(LOCAL_STORAGE_SUPABASE_ANON_KEY);
  }
}

/**
 * Checks if configuration is present, and lazily returns a SupabaseClient.
 */
export function getSupabaseClient() {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) {
    return null;
  }
  return createClient(url, anonKey);
}

/**
 * Fetches the entire rental inventory from the Supabase "inventory" table.
 */
export async function getInventoryFromSupabase(): Promise<RentalItem[]> {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase connection details are missing. Please configure them in Settings.');
  }

  const { data, error } = await client
    .from('inventory')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    throw new Error(`Supabase Query Error: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return [];
  }

  return data.map(item => ({
    id: item.id,
    name: item.name,
    category: item.category,
    price: Number(item.price) || 0,
    stock: Number(item.stock) || 0,
    available: Number(item.available) || 0,
    image: item.image || 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600',
    description: item.description || ''
  }));
}

/**
 * Deducts stock from "inventory" table when an order is successfully placed.
 */
export async function updateSupabaseInventoryQuantities(
  itemsToUpdate: { itemId: string; deductQty: number }[]
): Promise<void> {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase client not configured.');
  }

  for (const { itemId, deductQty } of itemsToUpdate) {
    // 1. Fetch current available count
    const { data, error: fetchError } = await client
      .from('inventory')
      .select('available')
      .eq('id', itemId)
      .single();

    if (fetchError) {
      console.error(`Failed to fetch current stock for item ${itemId}:`, fetchError);
      continue;
    }

    const currentAvailable = Number(data?.available) || 0;
    const newAvailable = Math.max(0, currentAvailable - deductQty);

    // 2. Perform individual stock deduction
    const { error: updateError } = await client
      .from('inventory')
      .update({ available: newAvailable })
      .eq('id', itemId);

    if (updateError) {
      throw new Error(`Failed to update stock in Supabase for ${itemId}: ${updateError.message}`);
    }
  }
}

/**
 * Logs details of a placed order to the Supabase "orders" table for permanent tracing.
 */
export async function saveOrderToSupabase(order: Order): Promise<void> {
  const client = getSupabaseClient();
  if (!client) {
    return; // Non-blocking if offline/unconfigured
  }

  const orderPayload = {
    id: order.id,
    customer_name: order.booking.customerName,
    whatsapp_number: order.booking.whatsappNumber,
    email: order.booking.email,
    start_date: order.booking.startDate,
    end_date: order.booking.endDate,
    delivery_needed: order.booking.deliveryNeeded,
    delivery_address: order.booking.deliveryAddress || '',
    notes: order.booking.notes || '',
    total_amount: order.totalAmount,
    rental_days: order.rentalDays,
    status: order.status,
    items: order.items.map(i => ({
      item_id: i.item.id,
      item_name: i.item.name,
      price: i.item.price,
      quantity: i.quantity
    })) // Store clean JSON representation
  };

  const { error } = await client
    .from('orders')
    .insert([orderPayload]);

  if (error) {
    console.error('Supabase logging order error:', error);
    throw new Error(`Failed to save booking order: ${error.message}`);
  }
}

/**
 * Seeds default beautiful luxury inventory items directly to Supabase table
 * so that users get started immediately.
 */
export async function seedSupabaseInventory(): Promise<void> {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase connection details are missing.');
  }

  // Pre-process items to match DB rows format
  const rows = DEFAULT_INVENTORY_ITEMS.map(item => ({
    id: item.id,
    name: item.name,
    category: item.category,
    price: item.price,
    stock: item.stock,
    available: item.available,
    image: item.image,
    description: item.description
  }));

  const { error } = await client
    .from('inventory')
    .upsert(rows);

  if (error) {
    throw new Error(`Failed to seed inventory table: ${error.message}`);
  }
}

/**
 * Uploads a product image file to Supabase Storage in the 'inventory-images' bucket.
 */
export async function uploadProductImage(file: File): Promise<string> {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase client not configured.');
  }

  // Generate a random unique name for the file to prevent collisions
  const fileExt = file.name.split('.').pop() || 'png';
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
  const filePath = `items/${fileName}`;

  const { data, error } = await client.storage
    .from('inventory-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    throw error;
  }

  // Get the public URL for the uploaded file
  const { data: publicUrlData } = client.storage
    .from('inventory-images')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}

/**
 * Adds a new item to the 'inventory' table in Supabase.
 */
export async function addInventoryItemToSupabase(item: RentalItem): Promise<void> {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase client not configured.');
  }

  const { error } = await client
    .from('inventory')
    .insert([item]);

  if (error) {
    throw error;
  }
}

/**
 * Deletes an item from the 'inventory' table in Supabase.
 */
export async function deleteInventoryItemFromSupabase(itemId: string): Promise<void> {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase client not configured.');
  }

  const { error } = await client
    .from('inventory')
    .delete()
    .eq('id', itemId);

  if (error) {
    throw error;
  }
}
