export type Vehicle = {
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
