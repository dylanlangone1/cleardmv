'use client';

import { useState } from 'react';
import type { DMVState } from '@/types/dmv';

const STATE_FEES: Record<DMVState, {
  dmvFee: number;
  dmvFeeLabel: string;
  registrationRange: string;
  notes: string;
  payOnlineUrl?: string;
}> = {
  NH: {
    dmvFee: 50,
    dmvFeeLabel: 'Suspension Termination Fee',
    registrationRange: '$31–$52/year',
    notes: 'NH E-ZPass and NH DMV are separate. Paying tolls does NOT clear the DMV hold — you must also pay the $50 DMV fee.',
    payOnlineUrl: 'https://www.nh.gov/dmv/licenses/reinstatement.htm',
  },
  MA: {
    dmvFee: 0,
    dmvFeeLabel: 'No DMV fee for toll holds',
    registrationRange: '$60/2 years',
    notes: 'MA does not charge a reinstatement fee for toll-related holds. Under the Road to Opportunity Act (2024), your license cannot be suspended for unpaid tolls.',
    payOnlineUrl: 'https://www.mass.gov/how-to/renew-your-vehicle-registration',
  },
  NY: {
    dmvFee: 70,
    dmvFeeLabel: 'Suspension Termination Fee',
    registrationRange: '$26+/year',
    notes: 'Two-step process: pay the toll authority FIRST, then pay the $70 DMV fee. Paying DMV without paying the toll authority will NOT clear the hold.',
    payOnlineUrl: 'https://dmv.ny.gov',
  },
  CT: {
    dmvFee: 175,
    dmvFeeLabel: 'Reinstatement Fee (highest in NE)',
    registrationRange: '$120/2 years',
    notes: 'CT has NO highway tolls — your hold is from an out-of-state authority. Pay the originating state first. $175 fee CAN be paid online at portal.ct.gov/dmv or by phone (860-263-5720).',
    payOnlineUrl: 'https://portal.ct.gov/dmv',
  },
  VT: {
    dmvFee: 50,
    dmvFeeLabel: 'Suspension Termination Fee',
    registrationRange: '$69/2 years',
    notes: 'VT has NO toll roads. Your hold is from a neighboring state (NH, NY, or MA). Resolve with the originating state first — VT DMV auto-clears the hold after.',
    payOnlineUrl: 'https://dmv.vermont.gov/licenses/suspension-reinstatement',
  },
  ME: {
    dmvFee: 50,
    dmvFeeLabel: 'Reinstatement Fee',
    registrationRange: 'Starting at $35/year',
    notes: 'Contact Maine BMV at 207-624-9000 to confirm your hold has been released after paying tolls.',
    payOnlineUrl: 'https://www.maine.gov/sos/bmv/licenses/reinstatement',
  },
  RI: {
    dmvFee: 30,
    dmvFeeLabel: 'Reinstatement Fee (cheapest in NE)',
    registrationRange: '$30–$72/2 years',
    notes: 'RI has a 90-day dispute window — the longest in New England. RITBA notifies RI DMV within 48 hours of payment.',
    payOnlineUrl: 'https://dmv.ri.gov/licenses/reinstatement',
  },
};

interface Props {
  defaultState?: DMVState;
  defaultTollAmount?: number;
}

export function ReinstatementCalculator({ defaultState, defaultTollAmount }: Props) {
  const [state, setState] = useState<DMVState | ''>(defaultState ?? '');
  const [tollAmount, setTollAmount] = useState(defaultTollAmount ?? 0);

  const fees = state ? STATE_FEES[state] : null;
  const total = fees ? tollAmount + fees.dmvFee : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      <h3 className="text-sm font-bold text-slate-800 mb-3">Reinstatement Cost Calculator</h3>
      <p className="text-xs text-gray-500 mb-4">See exactly what it costs to clear your registration hold.</p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-xs font-medium text-gray-600 block mb-1">State</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value as DMVState | '')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none"
          >
            <option value="">Select state</option>
            <option value="NH">New Hampshire</option>
            <option value="MA">Massachusetts</option>
            <option value="NY">New York</option>
            <option value="CT">Connecticut</option>
            <option value="VT">Vermont</option>
            <option value="ME">Maine</option>
            <option value="RI">Rhode Island</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600 block mb-1">Toll Amount Owed</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input
              type="number"
              min={0}
              step={0.01}
              value={tollAmount || ''}
              onChange={(e) => setTollAmount(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full border border-gray-300 rounded-lg pl-7 pr-3 py-2 text-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none"
            />
          </div>
        </div>
      </div>

      {fees && (
        <div className="space-y-2">
          <div className="bg-gray-50 rounded-xl p-3 space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Toll amount owed</span>
              <span className="font-medium">${tollAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{fees.dmvFeeLabel}</span>
              <span className={`font-medium ${fees.dmvFee === 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {fees.dmvFee === 0 ? 'FREE' : `$${fees.dmvFee.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Registration renewal</span>
              <span>{fees.registrationRange}</span>
            </div>
            <div className="border-t border-gray-200 pt-1.5 flex justify-between text-sm font-bold">
              <span className="text-slate-800">Total (before registration)</span>
              <span className="text-slate-900">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl px-3 py-2">
            <p className="text-xs text-blue-700">{fees.notes}</p>
          </div>

          {fees.payOnlineUrl && (
            <a
              href={fees.payOnlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-4 py-2.5 text-sm transition-colors"
            >
              Pay {state} DMV Fee Online →
            </a>
          )}
        </div>
      )}
    </div>
  );
}
