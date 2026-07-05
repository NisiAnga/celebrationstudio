export interface RentalItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  available: number;
  image: string;
  description: string;
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

export interface Order {
  id: string;
  booking: BookingDetails;
  items: CartItem[];
  totalAmount: number;
  rentalDays: number;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'cancelled';
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
