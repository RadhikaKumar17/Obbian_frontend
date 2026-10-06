"use client";

import { createContext, useCallback, useContext, useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import Input from '@/components/ui/input';
import { LeafIcon, LogoMark, PinIcon, ShieldIcon, SparkleIcon, Spinner } from '@/components/ui/icons';

type User = { id: string; name: string; email: string };
const AuthContext = createContext<{ user: User; logout: () => Promise<void>; busy: boolean; error: string } | null>(null);
const message = (error: unknown) => error instanceof Error ? error.message : 'Unable to connect. Please try again.';

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const client = useQueryClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const clearSession = useCallback(() => {
    setUser(null);
    void client.cancelQueries().then(() => client.clear());
  }, [client]);

  useEffect(() => {
    let active = true;
    api.get<{user: User | null}>('/api/auth/me')
      .then(result => { if (active) setUser(result.user); })
      .catch(err => { if (active) setError(message(err)); })
      .finally(() => { if (active) setChecking(false); });
    const expired = () => { clearSession(); setError('Your session ended. Please log in again.'); };
    window.addEventListener('obbian-session-expired', expired);
    return () => { active = false; window.removeEventListener('obbian-session-expired', expired); };
  }, [clearSession]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setError('');
    try {
      await api.post('/api/auth/login', { email, password });
      const result = await api.get<{user: User | null}>('/api/auth/me');
      if (!result.user) throw new Error('The browser could not keep your login session. Allow cookies for this demo and try again.');
      await client.cancelQueries(); client.clear();
      setUser(result.user); setPassword('');
    } catch (err) { setError(message(err)); }
    finally { setBusy(false); }
  }

  async function logout() {
    setBusy(true); setError('');
    try {
      await api.post('/api/auth/logout');
      clearSession(); setPassword(''); router.replace('/');
    } catch (err) { setError(message(err)); }
    finally { setBusy(false); }
  }

  if (checking) return <div role="status" className="flex min-h-screen flex-col items-center justify-center gap-4 text-sm font-medium text-brand"><LogoMark size={48} /><span className="flex items-center gap-2"><Spinner size={16} />Checking your session…</span></div>;
  if (user) return <AuthContext.Provider value={{ user, logout, busy, error }}>{children}</AuthContext.Provider>;
  return (
    <main className="grid min-h-screen bg-wash lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-brand p-12 text-white lg:flex lg:flex-col lg:justify-between" aria-hidden="true">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-white/15"><LeafIcon size={22} /></span>
          <span className="text-lg font-bold uppercase tracking-[.14em]">Obbian</span>
        </div>
        <div>
          <p className="max-w-md text-[40px] font-bold leading-[1.1] tracking-[-1px]">Find your next ride. <span className="text-tint-strong">Smarter.</span></p>
          <ul className="mt-8 space-y-4 text-[15px] text-white/90">
            <li className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-lg bg-white/15"><SparkleIcon size={18} /></span>An AI assistant that searches, quotes and tracks for you</li>
            <li className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-lg bg-white/15"><ShieldIcon size={18} /></span>Policy answers quoted from the source, with citations</li>
            <li className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-lg bg-white/15"><PinIcon size={18} /></span>Live vehicle tracking to your pickup point</li>
          </ul>
        </div>
        <p className="text-sm text-white/70">Rides for a better tomorrow</p>
        <span className="pointer-events-none absolute -bottom-32 -right-24 size-96 rounded-full bg-white/5" />
        <span className="pointer-events-none absolute -right-10 top-24 size-56 rounded-full bg-white/5" />
      </aside>
      <div className="flex items-center justify-center px-5 py-10">
        <section className="w-full max-w-md animate-fade-up rounded-3xl border border-line bg-white p-7 shadow-card sm:p-9" aria-labelledby="login-title">
          <div className="flex items-center gap-3 lg:hidden">
            <LogoMark />
            <div>
              <p className="text-lg font-bold uppercase tracking-[.14em]">Obbian</p>
              <p className="text-[11px] text-muted">Rides for a better tomorrow</p>
            </div>
          </div>
          <h1 id="login-title" className="mt-7 text-2xl font-bold tracking-[-.4px] lg:mt-0">Welcome to the demo</h1>
          <p className="mt-2 text-sm leading-6 text-muted">Log in to explore nearby vehicles, view trips, and manage reservations.</p>
          <form onSubmit={login} className="mt-6 space-y-4">
            <label className="block text-sm font-medium">Email address<Input required type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full" placeholder="demo@obbian.com" /></label>
            <label className="block text-sm font-medium">Password<Input required type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full" /></label>
            <label className="flex items-center gap-2 text-sm text-muted"><input type="checkbox" className="size-4 accent-brand" checked={showPassword} onChange={e => setShowPassword(e.target.checked)} />Show password</label>
            {error && <p role="alert" className="alert">{error}</p>}
            <button type="submit" disabled={busy} className="btn w-full disabled:opacity-50">{busy && <Spinner size={16} />}{busy ? 'Logging in…' : 'Log in'}</button>
          </form>
          <div className="mt-6 rounded-2xl bg-tint p-4 text-sm">
            <p className="font-semibold text-brand">Try the demo account</p>
            <p className="mt-2">Email: <span className="font-mono">demo@obbian.com</span></p>
            <p className="mt-1">Password: <span className="font-mono">Obbian123!</span></p>
            <button type="button" disabled={busy} className="mt-3 font-semibold text-brand underline underline-offset-4" onClick={() => { setEmail('demo@obbian.com'); setPassword('Obbian123!'); setError(''); }}>Fill demo credentials</button>
          </div>
          <p className="mt-4 text-xs leading-5 text-muted">This is a shared demo account. Trips and saved vehicles are visible to everyone using these credentials. Use sample details when booking.</p>
        </section>
      </div>
    </main>
  );
}

export function useDemoAuth() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('DemoAuthProvider is required.');
  return auth;
}
