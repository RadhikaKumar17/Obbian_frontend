import type { Metadata } from 'next';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import './globals.css';
import AppShell from '@/components/app-shell';
export const metadata: Metadata = { title: 'Obbian — Rides for a better tomorrow', description: 'Find, compare and reserve your next ride with Obbian.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><AppShell>{children}</AppShell></body></html>; }
