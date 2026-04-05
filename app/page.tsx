'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScanResults } from '@/components/scan/ScanResults';
import { ReinstatementCalculator } from '@/components/ReinstatementCalculator';
import { useDmvScan } from '@/hooks/useDmvScan';
import type { DMVState } from '@/types/dmv';
import { Search, Loader2, ChevronDown, Shield, Zap, CheckCircle2 } from 'lucide-react';

const STATES: { code: DMVState; name: string; emoji: string }[] = [
  { code: 'NH', name: 'New Hampshire', emoji: '🌲' },
  { code: 'NY', name: 'New York',      emoji: '🗽' },
  { code: 'MA', name: 'Massachusetts', emoji: '🦞' },
  { code: 'ME', name: 'Maine',         emoji: '🌲' },
  { code: 'RI', name: 'Rhode Island',  emoji: '🌉' },
  { code: 'CT', name: 'Connecticut',   emoji: '⚓' },
  { code: 'VT', name: 'Vermont',       emoji: '🍁' },
];

const VALID_STATES = new Set(STATES.map((s) => s.code));

const STEP_LABELS: Record<string, string> = {
  pending: 'Connecting to portal…',
  running: 'Scanning your record…',
};

// ── Inner component (reads search params) ─────────────────────────────────────
function HomeContent() {
  const searchParams = useSearchParams();

  // Read URL params — TollFighter links here with ?plate=ABC&state=NH
  const urlPlate = (searchParams.get('plate') ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
  const urlState = (searchParams.get('state') ?? '').toUpperCase().slice(0, 2) as DMVState;
  const validUrlState = VALID_STATES.has(urlState) ? urlState : null;

  const [state,    setState]    = useState<DMVState>(validUrlState ?? 'NH');
  const [plate,    setPlate]    = useState(urlPlate);
  const [vinLast8, setVin]      = useState('');
  const [open,     setOpen]     = useState(false);
  const { isScanning, status, result, error, submitting, startScan, reset } = useDmvScan();

  const selectedState = STATES.find((s) => s.code === state)!;
  const isLoading     = submitting || isScanning;
  const requiresVin   = state === 'NH';

  // Auto-start scan when both plate and state arrive via URL params
  useEffect(() => {
    if (urlPlate && validUrlState && validUrlState !== 'NH') {
      // Non-NH states don't need VIN — fire immediately
      void startScan({ state: validUrlState, plate: urlPlate });
    }
    // NH needs VIN — just pre-fill, don't auto-start
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!plate.trim()) return;
    void startScan({
      state,
      plate:    plate.trim().toUpperCase(),
      vinLast8: vinLast8.trim().toUpperCase() || undefined,
    });
  }

  function handleStateChange(code: DMVState) {
    setState(code);
    setOpen(false);
    if (code !== 'NH') setVin('');
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-50 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full max-w-lg space-y-6">

          {result ? (
            <>
              <ScanResults result={result} onReset={reset} />
              <ReinstatementCalculator defaultState={result.state} />
            </>
          ) : (
            <>
              {/* Headline */}
              <div className="text-center space-y-3 mb-2">
                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-xs text-blue-600 font-medium">DMV issues found &amp; fixed instantly</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
                  Enter your plate.<br />
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    We handle the rest.
                  </span>
                </h1>
                <p className="text-gray-500 text-base">
                  Instant DMV record check — registration holds, suspensions, expired plates, fines. Free scan, AI-guided fixes.
                </p>
              </div>

              {/* Scan form */}
              <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-3xl p-5 space-y-3 shadow-sm">
                <div className="flex gap-2">
                  {/* State picker */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setOpen((v) => !v)}
                      className="flex items-center gap-1.5 h-12 px-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-semibold text-slate-700 hover:border-gray-300 transition-colors min-w-[80px]"
                    >
                      <span>{selectedState.emoji}</span>
                      <span>{selectedState.code}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
                    </button>

                    {open && (
                      <div className="absolute top-full mt-1 left-0 z-50 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden min-w-[180px]">
                        {STATES.map((s) => (
                          <button
                            key={s.code}
                            type="button"
                            onClick={() => handleStateChange(s.code)}
                            className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors ${state === s.code ? 'text-blue-600 font-semibold' : 'text-slate-700'}`}
                          >
                            <span>{s.emoji}</span>
                            <span>{s.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Plate input */}
                  <input
                    type="text"
                    value={plate}
                    onChange={(e) => setPlate(e.target.value.toUpperCase())}
                    placeholder="PLATE123"
                    maxLength={8}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    className="flex-1 h-12 bg-gray-50 border border-gray-200 rounded-2xl px-4 text-slate-900 text-base font-bold tracking-widest placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-all uppercase"
                  />
                </div>

                {/* VIN field — NH only */}
                {requiresVin && (
                  <div className="space-y-1">
                    <input
                      type="text"
                      value={vinLast8}
                      onChange={(e) => setVin(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8))}
                      placeholder="Last 8 of VIN (e.g. AB123456)"
                      maxLength={8}
                      autoComplete="off"
                      className="w-full h-11 bg-gray-50 border border-gray-200 rounded-2xl px-4 text-slate-900 text-sm font-mono tracking-widest placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-all uppercase"
                    />
                    <p className="text-xs text-gray-400 px-1">
                      NH requires your VIN for registration lookup — found on your dashboard or registration card.
                      {!vinLast8 && ' Skip this to get AI-guided help instead.'}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !plate.trim()}
                  className="w-full h-12 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all text-sm"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {STEP_LABELS[status ?? 'pending'] ?? 'Scanning…'}
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Scan Plate — Free
                    </>
                  )}
                </button>

                {/* Progress dots while scanning */}
                {isLoading && (
                  <div className="flex items-center justify-center gap-2 pt-1">
                    {['pending', 'running', 'completed'].map((step, i) => {
                      const order   = ['pending', 'running', 'completed'];
                      const current = order.indexOf(status ?? 'pending');
                      const idx     = order.indexOf(step);
                      return (
                        <div key={step} className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full transition-all ${
                            idx < current  ? 'bg-blue-500' :
                            idx === current ? 'bg-blue-400 animate-pulse' :
                            'bg-gray-200'
                          }`} />
                          {i < 2 && <div className={`w-8 h-px ${idx < current ? 'bg-blue-300' : 'bg-gray-200'}`} />}
                        </div>
                      );
                    })}
                  </div>
                )}
              </form>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-sm text-red-600 text-center">
                  {error}
                </div>
              )}

              {/* Trust signals */}
              <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
                <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> No data stored</span>
                <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> ~30 sec scan</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Free</span>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── What we find ──────────────────────────────────────────────── */}
      {!result && (
        <section className="border-t border-gray-100 bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-bold text-center text-slate-900 mb-2">What we check</h2>
            <p className="text-gray-500 text-sm text-center mb-10">
              Every flag that could affect your driving or registration.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: '🚧', title: 'Registration Holds',     desc: 'Unpaid tolls, fines, or flags stopping your renewal.' },
                { icon: '📋', title: 'Registration Status',    desc: 'Active, expired, or suspended — with exact expiry date.' },
                { icon: '🪪', title: 'License Flags',          desc: 'Suspensions, revocations, or expiration warnings.' },
                { icon: '💸', title: 'Outstanding Fines',      desc: 'Unpaid fees attached to your plate or record.' },
                { icon: '🔧', title: 'Auto-Fix Options',       desc: 'Issues we can resolve online are flagged with a direct fix link.' },
                { icon: '🤖', title: 'AI-Guided Resolution',   desc: 'For anything complex, the AI walks you through it step by step.' },
              ].map((f) => (
                <div key={f.title} className="bg-white border border-gray-200 rounded-2xl p-4 hover:border-gray-300 transition-colors shadow-sm">
                  <div className="text-xl mb-2">{f.icon}</div>
                  <div className="text-sm font-semibold text-slate-900 mb-1">{f.title}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

// ── Page export — Suspense required for useSearchParams ───────────────────────
export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
