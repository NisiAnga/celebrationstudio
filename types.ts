export interface RentalItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  available: number;
  image: string;
  description: string;
  images?: string[];
}

export interface CartItem {
  item: RentalItem;
  quantity: number;
}

export interface BookingDetails {
  customerName: string;
  whatsappNumber: string;
  email: string;
  startDate: string;
  endDate: string;
  deliveryAddress: string;
  deliveryNeeded: boolean;
  notes?: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'need_to_collect'
  | 'collected_delivered'
  | 'received'
  | 'cancelled';

export interface Order {
  id: string;
  booking: BookingDetails;
  items: CartItem[];
  totalAmount: number;
  rentalDays: number;
  createdAt: string;
  status: OrderStatus;
}

export interface AdminOrderItem {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
}

export interface AdminOrder {
  id: string;
  customer_name: string;
  whatsapp_number: string;
  email: string;
  start_date: string;
  end_date: string;
  delivery_needed: boolean;
  delivery_address: string;
  notes: string;
  total_amount: number;
  rental_days: number;
  status: OrderStatus;
  items: AdminOrderItem[];
  created_at: string;
}

export interface BankDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
  routingOrBranchCode: string;
  accountType: string;
}

export interface SupabaseSyncStatus {
  connected: boolean;
  supabaseUrl: string | null;
  lastSynced: string | null;
  loading: boolean;
  error: string | null;
}
