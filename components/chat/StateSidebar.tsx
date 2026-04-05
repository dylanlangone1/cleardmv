import type { StateData } from '@/types/state';
import { ExternalLink, Phone, Calendar, FileText, DollarSign, Shield } from 'lucide-react';

interface Props {
  stateData: StateData;
}

export function StateSidebar({ stateData: s }: Props) {
  const links = [
    s.urls.mainSite          && { icon: <ExternalLink className="w-3.5 h-3.5" />, label: `${s.dmvName}`, href: s.urls.mainSite },
    s.urls.appointmentBooking && { icon: <Calendar className="w-3.5 h-3.5" />, label: 'Book Appointment', href: s.urls.appointmentBooking },
    s.urls.registrationRenewal && { icon: <FileText className="w-3.5 h-3.5" />, label: 'Renew Registration', href: s.urls.registrationRenewal },
    s.urls.tollHoldInfo       && { icon: <FileText className="w-3.5 h-3.5" />, label: 'Toll Hold Info', href: s.urls.tollHoldInfo },
    s.urls.feeSchedule        && { icon: <DollarSign className="w-3.5 h-3.5" />, label: 'Fee Schedule', href: s.urls.feeSchedule },
    s.urls.licenseReinstatement && { icon: <FileText className="w-3.5 h-3.5" />, label: 'License Reinstatement', href: s.urls.licenseReinstatement },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; href: string }[];

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col gap-4 pt-1">
      {/* State badge */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{s.emoji}</span>
          <div>
            <div className="font-bold text-slate-900 text-sm">{s.name}</div>
            <div className="text-xs text-gray-500">{s.dmvName}</div>
          </div>
        </div>

        <a
          href={`tel:${s.phone.main.replace(/[^0-9]/g, '')}`}
          className="flex items-center gap-2 text-xs text-gray-600 hover:text-slate-900 transition-colors mb-1"
        >
          <Phone className="w-3.5 h-3.5 text-blue-500" />
          {s.phone.main}
        </a>
        <p className="text-xs text-gray-400 ml-6">{s.phone.hours}</p>
      </div>

      {/* Quick links */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Quick Links</p>
        <div className="space-y-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-gray-600 hover:text-slate-900 transition-colors"
            >
              <span className="text-blue-500">{l.icon}</span>
              {l.label}
            </a>
          ))}
        </div>
      </div>

      {/* Key fees */}
      {Object.keys(s.fees).length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Key Fees</p>
          <div className="space-y-1.5">
            {Object.entries(s.fees).slice(0, 4).map(([k, v]) => (
              <div key={k}>
                <div className="text-xs text-gray-400 capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}</div>
                <div className="text-xs text-slate-900 font-medium">{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TollFighter + DMV Appointment */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-2">
        <a
          href="https://tollfighter.com/assess"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-orange-600 hover:text-orange-800 font-semibold transition-colors"
        >
          <Shield className="w-3.5 h-3.5" />
          Fight your toll violations
        </a>
        {s.urls.appointmentBooking && (
          <a
            href={s.urls.appointmentBooking}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl px-3 py-2 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5" />
            Book DMV Appointment
          </a>
        )}
      </div>

      <p className="text-xs text-gray-400 px-1">
        Fees and rules subject to change — always verify at the official DMV site.
      </p>
    </aside>
  );
}
