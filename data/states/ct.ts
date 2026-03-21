import type { StateData } from '@/types/state';

export const CT_STATE_DATA: StateData = {
  code: 'CT',
  name: 'Connecticut',
  dmvName: 'CT DMV',
  emoji: '⛵',
  urls: {
    mainSite: 'https://portal.ct.gov/dmv',
    appointmentBooking: 'https://www.ctdmv.com',
    registrationRenewal: 'https://portal.ct.gov/dmv/Registration/Registration-Renewal',
    tollHoldInfo: 'https://portal.ct.gov/dmv/suspension',
    feeSchedule: 'https://portal.ct.gov/dmv/Common/Fees',
    licenseReinstatement: 'https://portal.ct.gov/dmv/licenses-permits-ids/reinstatement',
    disputePortal: 'https://www.ctfastrak.com',
  },
  phone: {
    main: '860-263-5700',
    tollRelated: '877-762-7824',
    hours: 'Mon–Fri 8:00am–4:30pm ET',
  },
  forms: {
    registration: {
      name: 'H-13B',
      label: 'Application for Registration and Title',
      url: 'https://portal.ct.gov/dmv/forms',
    },
    titleTransfer: {
      name: 'H-13B',
      label: 'Application for Registration and Title',
      url: 'https://portal.ct.gov/dmv/forms',
    },
  },
  tollAuthorities: ['CT Fastrak', 'CT DOT Tolls'],
  tollHoldProcess: {
    step1: 'Pay the outstanding CT Fastrak or toll bill at ctfastrak.com or by calling 877-762-7824.',
    step2: 'CT DOT will notify the DMV within 3–5 business days.',
    step3: 'Pay the $175 suspension reinstatement fee to the CT DMV.',
    step4: 'Renew registration online at portal.ct.gov/dmv or via AAA (AAA offices in CT handle many DMV transactions).',
    notes: 'Pro tip: AAA offices in Connecticut serve as DMV agents and can handle registration renewals, replacements, and some other transactions — often with shorter wait times than DMV offices.',
  },
  appointmentRequired: true,
  allowsOnlineReinstatement: false,
  fees: {
    registrationRenewal: '$120 for 2-year passenger registration',
    suspensionTermination: '$175',
    duplicateTitle: '$25',
    licenseReinstatement: '$175 reinstatement fee',
  },
  notes: 'CT has one of the higher reinstatement fees in New England at $175. AAA serves as a DMV agent for many common transactions.',
};
