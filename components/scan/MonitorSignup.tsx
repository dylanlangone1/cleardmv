'use client';

import { useState } from 'react';
import { Bell, CheckCircle2, Loader2 } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_TOLLFIGHTER_API_URL ?? 'https://toll-fighter-production.up.railway.app';

interface Props {
  plate: string;
  state: string;
}

export function MonitorSignup({ plate, state }: Props) {
  const [email,     setEmail]     = useState('');
  const [loading,   setLoading]   = useState(false);
  const [done,      setDone]      = useState(false);
  const [error,     setError]     = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/v1/dmv/monitor`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email: email.trim(), plate, state }),
      });
      const data = await res.json() as { ok?: boolean; message?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong');
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to set up alert');
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-2xl p-4">
        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-green-800">Alerts active for {plate}</p>
          <p className="text-xs text-green-700 mt-0.5">
            We&apos;ll email you if your registration status changes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Bell className="w-4 h-4 text-blue-600" />
        <p className="text-sm font-semibold text-blue-900">Get alerts for {plate}</p>
      </div>
      <p className="text-xs text-blue-700 mb-3">
        Enter your email and we&apos;ll notify you if your registration status changes — free.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          required
          className="flex-1 text-sm px-3 py-2 rounded-xl border border-blue-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
        />
        <button
          type="submit"
          disabled={loading || !email.trim()}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Bell className="w-3.5 h-3.5" />}
          {loading ? 'Setting up…' : 'Alert me'}
        </button>
      </form>
      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
    </div>
  );
}
