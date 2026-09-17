export type Vehicle = {
  imageUrl?: string;
  id: string;
  name: string;
  price: number;
  distance: number;
  lat: number;
  lng: number;
  rating: number;
  available: boolean;
  category: string;
  transmission: string;
  seats: number;
  fuel: string;
  pickup: string;
  trips: number;
};

export type Booking = {
  id: string;
  vehicleId: string;
  vehicleName: string;
  date: string;
  name: string;
  mobile: string;
  licence: string;
  rental: number;
  insurance: number;
  total: number;
  currency: string;
  pickup: string;
  timeLabel: string;
  status: 'Confirmed' | 'Active' | 'Completed' | 'Cancelled';
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt?: string;
};

export type Option = { value: string; label: string };

export type Config = {
  city: string;
  timezone: string;
  currency: string;
  originLat: number;
  originLng: number;
  insuranceFee: number;
  pickupTime: string;
  returnTime: string;
  timeLabel: string;
  trackingPollMs: number;
  defaultRadius: string;
  defaultBudget: string;
  defaultSort: string;
  radiusOptions: Option[];
  budgetOptions: Option[];
  sortOptions: Option[];
  paymentMethods: Option[];
  today: string;
  defaultDate: string;
};

export type SearchResult = { results: Vehicle[]; recommendedId: string | null; count: number };

export type Tracking = {
  bookingId: string;
  bookingStatus: Booking['status'];
  status: string;
  distance: number | null;
  etaMinutes: number | null;
  location: string | null;
  lat: number | null;
  lng: number | null;
  updatedAt: string | null;
};

export type Policy = { id: string; title: string; source: string; answer: string };

export type Ticket = { id: string; email: string; message: string; bookingId: string | null; status: string; createdAt: string };

export type PolicyCitation = {
  document_id: string; title: string; version: string; source: string;
  locator: string; chunk_id: string; quote: string;
};
export type RagAnswer = {
  status: 'answered' | 'abstained' | 'blocked' | 'requires_backend';
  answer: string; citations: PolicyCitation[]; request_id: string;
  index_version: string; mode: string; latency_ms: number;
  usage?: Record<string, number>; trace_id?: string | null;
};
export type RentalQuote = {
  vehicleId: string; date: string; rental: number; insurance: number; total: number;
  currency: string; available: boolean; pickup: string; timeLabel: string;
};
export type AssistantAction = {
  type: 'search' | 'vehicle' | 'checkout' | 'trips' | 'tracking';
  label: string; vehicleId?: string; date?: string; bookingId?: string;
};
export type AssistantReply = {
  tool: string; answer: string; request_id: string; trace_id?: string | null;
  status?: RagAnswer['status']; citations?: PolicyCitation[]; actions: AssistantAction[];
  vehicles?: Vehicle[]; quote?: RentalQuote;
  filters?: {date: string; budget: string; radius: string; category: string; transmission: string};
};
