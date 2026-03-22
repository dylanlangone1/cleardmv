'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams }               from 'next/navigation';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_TOLLFIGHTER_API_URL ?? 'https://toll-fighter-production.up.railway.app';

function UnsubscribeContent() {
  const params = useSearchParams();
  const email  = params.get('email')  ?? '';
  const plate  = params.get('plate')  ?? '';
  const state  = params.get('state')  ?? '';

  const [status, setStatus]   = useState<'loading' | 'success' | 'error' | 'invalid'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!email || !plate || !state) {
      setStatus('invalid');
      return;
    }

    const url = new URL(`${API_URL}/api/v1/dmv/monitor/unsubscribe`);
    url.searchParams.set('email', email);
    url.searchParams.set('plate', plate);
    url.searchParams.set('state', state);

    fetch(url.toString())
      .then((r) => r.json())
      .then((data: { ok?: boolean; message?: string; error?: string }) => {
        if (data.ok) {
          setStatus('success');
          setMessage(data.message ?? 'Unsubscribed successfully.');
        } else {
          setStatus('error');
          setMessage(data.error ?? 'Something went wrong. Please try again.');
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Could not reach the server. Please try again later.');
      });
  }, [email, plate, state]);

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-8 max-w-md w-full shadow-sm text-center">

      {status === 'loading' && (
        <>
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-4" />
          <h1 className="text-lg font-bold text-slate-800">Unsubscribing…</h1>
          <p className="text-sm text-gray-500 mt-2">Removing alerts for {plate} ({state}).</p>
        </>
      )}

      {status === 'success' && (
        <>
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
          <h1 className="text-lg font-bold text-slate-800">You&apos;re unsubscribed</h1>
          <p className="text-sm text-gray-500 mt-2">{message}</p>
          <p className="text-xs text-gray-400 mt-4">
            Changed your mind?{' '}
            <a href={`/?state=${state}&plate=${plate}`} className="text-blue-600 hover:underline">
              Run a new scan to sign up again.
            </a>
          </p>
        </>
      )}

      {status === 'error' && (
        <>
          <XCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
          <h1 className="text-lg font-bold text-slate-800">Something went wrong</h1>
          <p className="text-sm text-gray-500 mt-2">{message}</p>
          <p className="text-xs text-gray-400 mt-4">
            Need help?{' '}
            <a href="mailto:alerts@cleardmv.com" className="text-blue-600 hover:underline">
              Email us at alerts@cleardmv.com
            </a>
          </p>
        </>
      )}

      {status === 'invalid' && (
        <>
          <XCircle className="w-10 h-10 text-gray-400 mx-auto mb-4" />
          <h1 className="text-lg font-bold text-slate-800">Invalid link</h1>
          <p className="text-sm text-gray-500 mt-2">
            This unsubscribe link is missing required parameters. Please use the link from your email.
          </p>
        </>
      )}

      <a
        href="/"
        className="inline-block mt-6 text-xs text-gray-400 hover:text-gray-600 transition-colors"
      >
        ← Back to ClearDMV
      </a>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Suspense fallback={
        <div className="bg-white border border-gray-200 rounded-3xl p-8 max-w-md w-full shadow-sm text-center">
          <Loader2 className="w-10 h-10 text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-500">Loading…</p>
        </div>
      }>
        <UnsubscribeContent />
      </Suspense>
    </main>
  );
}
