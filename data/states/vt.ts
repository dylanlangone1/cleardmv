import type { StateData } from '@/types/state';

export const VT_STATE_DATA: StateData = {
  code: 'VT',
  name: 'Vermont',
  dmvName: 'Vermont DMV',
  emoji: '🍁',
  urls: {
    mainSite: 'https://dmv.vermont.gov',
    appointmentBooking: 'https://dmv.vermont.gov/offices',
    registrationRenewal: 'https://dmv.vermont.gov/registrations',
    tollHoldInfo: 'https://dmv.vermont.gov/licenses/suspension-reinstatement',
    feeSchedule: 'https://dmv.vermont.gov/registrations/fees',
    licenseReinstatement: 'https://dmv.vermont.gov/licenses/suspension-reinstatement',
  },
  phone: {
    main: '802-828-2000',
    hours: 'Mon–Fri 7:45am–4:30pm ET',
  },
  forms: {
    registration: {
      name: 'VT-TR-1',
      label: 'Application for Title and Registration',
      url: 'https://dmv.vermont.gov/sites/dmv/files/documents/TR-1.pdf',
    },
    titleTransfer: {
      name: 'VT-TR-1',
      label: 'Application for Title and Registration',
      url: 'https://dmv.vermont.gov/sites/dmv/files/documents/TR-1.pdf',
    },
  },
  tollAuthorities: ['Green Mountain Passport (Vermont does not have traditional toll roads)', 'E-ZPass accepted at some border crossings'],
  tollHoldProcess: {
    step1: 'Vermont has very limited toll roads. If you have an out-of-state toll hold affecting your VT registration, contact the issuing state\'s toll authority first.',
    step2: 'Once the out-of-state toll is resolved, contact VT DMV at 802-828-2000 to clear the hold on your record.',
    step3: 'Pay any applicable VT DMV reinstatement fees.',
    step4: 'Renew registration online at dmv.vermont.gov or by mail.',
    notes: 'Vermont does not have traditional toll roads, so toll-related registration holds are uncommon. Most VT holds from tolls originate from neighboring states (NH, NY, MA).',
  },
  appointmentRequired: true,
  allowsOnlineReinstatement: true,
  fees: {
    registrationRenewal: '$69 for 2-year passenger registration',
    suspensionTermination: '$50',
    duplicateTitle: '$33',
    licenseReinstatement: '$71 reinstatement fee',
  },
  notes: 'Vermont has NO toll roads. If you have a toll-related registration hold, it originated from a neighboring state (usually NH via I-89/I-93 or NY via I-87). Contact the originating state\'s toll authority to resolve. Once cleared, VT DMV automatically lifts the hold at next registration cycle. Call VT DMV at 802-828-2000 to confirm. For NH tolls: ezpassnh.com or 603-485-3878. For NY tolls: e-zpassny.com or 800-333-8655.',
};
