import type { StateData } from '@/types/state';
import { ExternalLink, Phone, Calendar, FileText, DollarSign } from 'lucide-react';

interface Props {
  stateData: StateData;
}

export function StateSidebar({ stateData: s }: Props) {
  const links = [
    s.urls.mainSite         && { icon: <ExternalLink className="w-3.5 h-3.5" />, label: `${s.dmvName}`, href: s.urls.mainSite },
    s.urls.appointmentBooking && { icon: <Calendar className="w-3.5 h-3.5" />, label: 'Book Appointment', href: s.urls.appointmentBooking },
    s.urls.registrationRenewal && { icon: <FileText className="w-3.5 h-3.5" />, label: 'Renew Registration', href: s.urls.registrationRenewal },
    s.urls.tollHoldInfo      && { icon: <FileText className="w-3.5 h-3.5" />, label: 'Toll Hold Info', href: s.urls.tollHoldInfo },
    s.urls.feeSchedule       && { icon: <DollarSign className="w-3.5 h-3.5" />, label: 'Fee Schedule', href: s.urls.feeSchedule },
    s.urls.licenseReinstatement && { icon: <FileText className="w-3.5 h-3.5" />, label: 'License Reinstatement', href: s.urls.licenseReinstatement },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; href: string }[];

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col gap-4 pt-1">
      {/* State badge */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{s.emoji}</span>
          <div>
            <div className="font-bold text-white text-sm">{s.name}</div>
            <div className="text-xs text-slate-500">{s.dmvName}</div>
          </div>
        </div>

        {/* Phone */}
        <a
          href={`tel:${s.phone.main.replace(/[^0-9]/g, '')}`}
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors mb-1"
        >
          <Phone className="w-3.5 h-3.5 text-blue-400" />
          {s.phone.main}
        </a>
        <p className="text-xs text-slate-600 ml-6">{s.phone.hours}</p>
      </div>

      {/* Quick links */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Quick Links</p>
        <div className="space-y-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <span className="text-blue-400">{l.icon}</span>
              {l.label}
            </a>
          ))}
        </div>
      </div>

      {/* Key fees */}
      {Object.keys(s.fees).length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Key Fees</p>
          <div className="space-y-1.5">
            {Object.entries(s.fees).slice(0, 4).map(([k, v]) => (
              <div key={k}>
                <div className="text-xs text-slate-500 capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}</div>
                <div className="text-xs text-white font-medium">{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-slate-700 px-1">
        Fees and rules subject to change — always verify at the official DMV site.
      </p>
    </aside>
  );
}
