'use client';
import { usePathname } from 'next/navigation';
import Obbian from './obbian';
const routes = ['/', '/search', '/vehicle', '/checkout', '/confirmation', '/tracking', '/policy', '/trips', '/saved', '/support'];
export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <>{routes.includes(pathname) && <Obbian />}{children}</>;
}
