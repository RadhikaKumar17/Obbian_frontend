import type { Metadata } from 'next';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';
import './globals.css';
import AppShell from '@/components/app-shell';
import QueryProvider from '@/components/query-provider';
export const metadata: Metadata = { title: 'Obbian — Rides for a better tomorrow', description: 'Find, compare and reserve your next ride with Obbian.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><QueryProvider><AppShell>{children}</AppShell></QueryProvider></body></html>; }
