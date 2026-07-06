import { createClient } from '@supabase/supabase-js';
import { RentalItem, Order, AdminOrder, OrderStatus } from '../types';
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

  return data.map(item => {
    let imagesArr: string[] = [];
    if (Array.isArray(item.images)) {
      imagesArr = item.images;
    } else if (typeof item.images === 'string') {
      try {
        const parsed = JSON.parse(item.images);
        if (Array.isArray(parsed)) {
          imagesArr = parsed;
        }
      } catch (_) {
        imagesArr = item.images.split(',').map((s: string) => s.trim()).filter(Boolean);
      }
    }
    
    // Fallback if no images found
    if (imagesArr.length === 0) {
      imagesArr = item.image ? [item.image] : ['https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600'];
    }

    return {
      id: item.id,
      name: item.name,
      category: item.category,
      price: Number(item.price) || 0,
      stock: Number(item.stock) || 0,
      available: Number(item.available) || 0,
      image: item.image || imagesArr[0],
      description: item.description || '',
      images: imagesArr
    };
  });
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
 * Fetches all orders from the Supabase "orders" table, newest first.
 */
export async function getOrdersFromSupabase(): Promise<AdminOrder[]> {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase client not configured.');
  }

  const { data, error } = await client
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }

  return (data || []).map(row => ({
    id: row.id,
    customer_name: row.customer_name || '',
    whatsapp_number: row.whatsapp_number || '',
    email: row.email || '',
    start_date: row.start_date || '',
    end_date: row.end_date || '',
    delivery_needed: !!row.delivery_needed,
    delivery_address: row.delivery_address || '',
    notes: row.notes || '',
    total_amount: Number(row.total_amount) || 0,
    rental_days: Number(row.rental_days) || 1,
    status: (row.status as AdminOrder['status']) || 'pending',
    items: Array.isArray(row.items) ? row.items : [],
    created_at: row.created_at || new Date().toISOString(),
  }));
}

/**
 * Updates the status of an order in the Supabase "orders" table.
 */
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<void> {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase client not configured.');
  }

  const { error } = await client
    .from('orders')
    .update({ status })
    .eq('id', orderId);

  if (error) {
    throw new Error(`Failed to update order status: ${error.message}`);
  }
}

/**
 * Restores (increments) the available count in the inventory table when
 * an order is marked as "received" (items returned to stock).
 */
export async function restoreInventoryQuantities(
  itemsToRestore: { itemId: string; restoreQty: number }[]
): Promise<void> {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase client not configured.');
  }

  for (const { itemId, restoreQty } of itemsToRestore) {
    // 1. Fetch current available count
    const { data, error: fetchError } = await client
      .from('inventory')
      .select('available, stock')
      .eq('id', itemId)
      .single();

    if (fetchError) {
      console.error(`Failed to fetch stock for item ${itemId}:`, fetchError);
      continue;
    }

    const currentAvailable = Number(data?.available) || 0;
    const totalStock      = Number(data?.stock)     || 0;
    // Don't exceed total stock when restoring
    const newAvailable = Math.min(totalStock, currentAvailable + restoreQty);

    // 2. Increment available
    const { error: updateError } = await client
      .from('inventory')
      .update({ available: newAvailable })
      .eq('id', itemId);

    if (updateError) {
      throw new Error(`Failed to restore stock in Supabase for ${itemId}: ${updateError.message}`);
    }
  }
}

/**
 * Subscribes to new order INSERT events on the "orders" table.
 * Fires the callback with the new AdminOrder so the admin panel
 * can prepend it to the list without a full re-fetch.
 * Returns an unsubscribe function — call it on component unmount.
 * Requires Realtime enabled on the orders table in the Supabase dashboard.
 */
export function subscribeToNewOrders(
  onNewOrder: (order: AdminOrder) => void
): () => void {
  const client = getSupabaseClient();
  if (!client) return () => {};

  const channel = client
    .channel('orders-realtime')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'orders' },
      (payload) => {
        const row = payload.new as Record<string, unknown>;
        const order: AdminOrder = {
          id: row.id as string,
          customer_name: (row.customer_name as string) || '',
          whatsapp_number: (row.whatsapp_number as string) || '',
          email: (row.email as string) || '',
          start_date: (row.start_date as string) || '',
          end_date: (row.end_date as string) || '',
          delivery_needed: !!(row.delivery_needed),
          delivery_address: (row.delivery_address as string) || '',
          notes: (row.notes as string) || '',
          total_amount: Number(row.total_amount) || 0,
          rental_days: Number(row.rental_days) || 1,
          status: (row.status as AdminOrder['status']) || 'pending',
          items: Array.isArray(row.items) ? (row.items as AdminOrder['items']) : [],
          created_at: (row.created_at as string) || new Date().toISOString(),
        };
        onNewOrder(order);
      }
    )
    .subscribe();

  return () => { client.removeChannel(channel); };
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
 * Tries with the `images` JSONB column first; if the column doesn't exist
 * (pre-migration DB), retries with only the base columns so the insert succeeds.
 */
export async function addInventoryItemToSupabase(item: RentalItem): Promise<void> {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase client not configured.');
  }

  const fullRow = {
    id: item.id,
    name: item.name,
    category: item.category,
    price: item.price,
    stock: item.stock,
    available: item.available,
    image: item.image,
    description: item.description || '',
    images: item.images && item.images.length > 0 ? item.images : null,
  };

  const { error } = await client.from('inventory').insert([fullRow]);

  if (error) {
    // If the error is about the 'images' column not existing, retry without it
    const msg = (error as any).message || '';
    const isColumnMissing = msg.toLowerCase().includes('images') ||
      msg.toLowerCase().includes('schema cache') ||
      msg.toLowerCase().includes('column') ||
      (error as any).code === '42703'; // PostgreSQL undefined_column

    if (isColumnMissing) {
      const { images: _dropped, ...rowWithoutImages } = fullRow;
      const { error: retryError } = await client.from('inventory').insert([rowWithoutImages]);
      if (retryError) {
        throw new Error(retryError.message || JSON.stringify(retryError));
      }
      // Succeeded without images – remind in console
      console.warn('Item saved without multi-image support. Run: ALTER TABLE inventory ADD COLUMN images JSONB; to enable it.');
    } else {
      throw new Error((error as any).message || JSON.stringify(error));
    }
  }
}


/**
 * Subscribes to real-time changes on the 'inventory' table.
 * Fires `onItemChange` whenever a row is updated so the storefront
 * can patch individual items without a full re-fetch.
 * Returns an unsubscribe function — call it on component unmount.
 */
export function subscribeToInventoryChanges(
  onItemChange: (updatedItem: RentalItem) => void
): () => void {
  const client = getSupabaseClient();
  if (!client) {
    // Return a no-op unsubscribe if Supabase isn't configured
    return () => {};
  }

  const channel = client
    .channel('inventory-realtime')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'inventory' },
      (payload) => {
        const row = payload.new as Record<string, unknown>;
        let imagesArr: string[] = [];
        if (Array.isArray(row.images)) {
          imagesArr = row.images as string[];
        } else if (typeof row.images === 'string') {
          try {
            const parsed = JSON.parse(row.images as string);
            if (Array.isArray(parsed)) imagesArr = parsed;
          } catch (_) {
            imagesArr = (row.images as string).split(',').map((s) => s.trim()).filter(Boolean);
          }
        }
        if (imagesArr.length === 0) {
          imagesArr = row.image ? [row.image as string] : [];
        }

        const item: RentalItem = {
          id: row.id as string,
          name: row.name as string,
          category: row.category as string,
          price: Number(row.price) || 0,
          stock: Number(row.stock) || 0,
          available: Number(row.available) || 0,
          image: (row.image as string) || imagesArr[0] || '',
          description: (row.description as string) || '',
          images: imagesArr,
        };
        onItemChange(item);
      }
    )
    .subscribe();

  return () => {
    client.removeChannel(channel);
  };
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
