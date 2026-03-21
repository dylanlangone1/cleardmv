'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StateSelector } from '@/components/landing/StateSelector';
import { IssueChips } from '@/components/landing/IssueChips';
import type { IssueType } from '@/types/chat';
import { getStateData } from '@/data/states';
import { ArrowRight, Loader2, MessageSquare, ClipboardList, Shield } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<IssueType | null>(null);
  const [prompt, setPrompt]               = useState('');
  const [loading, setLoading]             = useState(false);

  const stateData = selectedState ? getStateData(selectedState) : null;

  function handleIssueSelect(id: IssueType) {
    const next = id === selectedIssue ? null : id;
    setSelectedIssue(next);
    const starterMap: Record<IssueType, string> = {
      toll_hold:    "I have a registration hold due to unpaid toll violations.",
      registration: "I need help with my vehicle registration.",
      license:      "My driver's license has been suspended.",
      title:        "I need help with a vehicle title transfer.",
      appointment:  "I need to schedule a DMV appointment.",
      general:      "",
    };
    if (next && starterMap[next]) setPrompt(starterMap[next]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedState || (!prompt.trim() && !selectedIssue)) return;
    setLoading(true);
    const params = new URLSearchParams();
    if (selectedIssue) params.set('issue', selectedIssue);
    if (prompt.trim()) params.set('q', prompt.trim());
    router.push(`/${selectedState}/chat?${params.toString()}`);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative flex-1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute top-20 right-0 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-24">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs text-blue-300 font-medium">AI-Powered DMV Help</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4 tracking-tight">
            The DMV doesn&apos;t have<br />
            to be a{' '}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              nightmare.
            </span>
          </h1>
          <p className="text-lg text-slate-400 mb-10 max-w-xl">
            Registration holds, toll violations, license reinstatements, title transfers —
            describe your situation and get step-by-step guidance, exact forms, and direct links.
          </p>

          {/* Main form card */}
          <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-sm">

            <StateSelector selected={selectedState} onSelect={setSelectedState} />

            <div className={`space-y-4 transition-all duration-300 ${selectedState ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
                  Step 2 — Describe your situation
                </p>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={
                    stateData
                      ? `What's your ${stateData.dmvName} issue? Describe it in plain English…`
                      : "What's your DMV issue? Describe it in plain English…"
                  }
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 resize-none transition-all"
                />
              </div>

              <IssueChips selected={selectedIssue} onSelect={handleIssueSelect} />

              <button
                type="submit"
                disabled={loading || !selectedState || (!prompt.trim() && !selectedIssue)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-2xl px-6 py-3.5 transition-all text-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Starting…
                  </>
                ) : (
                  <>
                    Get Help Now
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="text-center text-xs text-slate-600 mt-4">
            Coming from TollFighter?{' '}
            <a href="/handoff" className="text-blue-500 hover:underline">Resolve your DMV hold →</a>
          </p>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────── */}
      <section className="border-t border-white/5 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center mb-12">How it works</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: '1', icon: '📍', title: 'Pick your state', desc: "Select your state DMV or RMV — we have specific, accurate data for each one." },
              { step: '2', icon: '💬', title: 'Describe your issue', desc: "Tell us what's going on in plain English. No forms to fill out, no ticket numbers needed to start." },
              { step: '3', icon: '✅', title: 'Get a clear path forward', desc: "AI walks you through exact steps, forms, fees, and direct links — no fluff." },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-1">Step {item.step}</div>
                  <h3 className="font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature grid ──────────────────────────────────────────────── */}
      <section className="border-t border-white/5 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center mb-3">What we handle</h2>
          <p className="text-slate-400 text-center text-sm mb-12">Everything DMV — not just tolls.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🚧', title: 'Toll Violations & Holds', desc: 'Clear registration holds from unpaid tolls — step-by-step with exact fees.' },
              { icon: '📋', title: 'Registration Help', desc: 'Renew, reinstate, or transfer your registration without the confusion.' },
              { icon: '🪪', title: 'License Reinstatement', desc: "Understand exactly what's needed to get your license back." },
              { icon: '🚗', title: 'Title Transfers', desc: 'Buying or selling a car? We\'ll walk you through the paperwork.' },
              { icon: '📅', title: 'Appointments & Forms', desc: 'Direct links to book appointments and download the right forms.' },
              { icon: '🤖', title: 'AI That Knows DMV Rules', desc: 'State-specific knowledge, not generic advice. We know the difference between NH DMV and MA RMV.' },
            ].map((f) => (
              <div key={f.title} className="bg-white/3 border border-white/8 rounded-2xl p-5 hover:border-white/15 transition-colors">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-white text-sm mb-1.5">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust bar ─────────────────────────────────────────────────── */}
      <section className="border-t border-white/5 py-12 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: <Shield className="w-5 h-5" />, label: 'Private & Secure', sub: 'We never store personal data' },
              { icon: <MessageSquare className="w-5 h-5" />, label: 'Plain English', sub: 'No government jargon' },
              { icon: <ClipboardList className="w-5 h-5" />, label: 'State-Specific', sub: 'Accurate for your state' },
            ].map((t) => (
              <div key={t.label} className="flex flex-col items-center gap-2">
                <div className="text-blue-400">{t.icon}</div>
                <div className="font-semibold text-sm text-white">{t.label}</div>
                <div className="text-xs text-slate-500">{t.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
