export type { Booking, Vehicle } from '@/lib/types';

export const money = (n: number) => '₹' + n.toLocaleString('en-IN');
export function localDate(d = new Date()) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
export function tomorrow() { const d = new Date(); d.setDate(d.getDate() + 1); return localDate(d); }
export function dateLabel(date: string) { return date === tomorrow() ? 'Tomorrow' : new Date(date + 'T12:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); }
