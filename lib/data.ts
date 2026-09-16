export type Vehicle = { id: string; name: string; price: number; distance: number; rating: number; available: boolean };
export const vehicles: Vehicle[] = [
 {id:'creta',name:'Hyundai Creta',price:2650,distance:2.1,rating:4.7,available:true},
 {id:'seltos',name:'Kia Seltos',price:2850,distance:3.4,rating:4.6,available:true},
 {id:'nexon',name:'Tata Nexon',price:2499,distance:4.8,rating:4.5,available:true},
 {id:'xuv300',name:'Mahindra XUV300',price:2700,distance:6.2,rating:4.5,available:false},
];
export const money = (n: number) => '₹' + n.toLocaleString('en-IN');
export function tomorrow() { const d = new Date(); d.setDate(d.getDate()+1); return localDate(d); }
export function localDate(d = new Date()) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
export function dateLabel(date: string) { return date === tomorrow() ? 'Tomorrow' : new Date(date+'T12:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}); }
export type Booking = { id: string; vehicleId: string; date: string; status: 'Confirmed'|'Active'|'Completed'|'Cancelled'; total: number; name: string };
export const policies = [
 {id:'cancellation',title:'Cancellation and refunds',source:'Cancellation Policy v1.4',answer:'Cancellations are free more than 24 hours before pickup. Within 24 hours, a 50% cancellation fee applies. A no-show is non-refundable.',keywords:['cancel','refund','no-show']},
 {id:'deposit',title:'Security deposit timeline',source:'Refund Processing Guide',answer:'The demo security deposit is released after the vehicle inspection. Allow 5–7 business days for it to appear in your original payment account.',keywords:['deposit']},
 {id:'insurance',title:'Insurance and damage',source:'Insurance Coverage Guide',answer:'The ₹249 demo insurance option covers eligible accidental damage, subject to the rental agreement and excess. Personal belongings, negligence and unauthorised drivers are excluded. Contact support to review a specific incident.',keywords:['insurance','damage','cover']},
 {id:'fuel',title:'Fuel and late returns',source:'Fuel & Return Policy',answer:'Return the vehicle with the same fuel level as pickup. If you expect to be late, contact support before your return time to arrange an extension and confirm any additional charge.',keywords:['fuel','late','return','petrol']},
 {id:'payment',title:'Payment failed',source:'Payment Help',answer:'Check your payment details and try again. If your bank shows a debit without a confirmed booking, contact support with the transaction reference before retrying.',keywords:['payment','paid','card']},
 {id:'pickup',title:'Pickup checklist',source:'Pickup Guide',answer:'Bring your valid driving licence and photo ID. Check the vehicle with the pickup team, document any existing damage, and confirm the fuel level before starting your trip.',keywords:['pickup','licence','license','document']},
];
export function answerPolicy(question: string) { const q=question.toLowerCase(); if(q.includes('deposit')) return policies.find(p=>p.id==='deposit'); return policies.find(p=>p.keywords.some(k=>q.includes(k))); }
