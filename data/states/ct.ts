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
  tollAuthorities: ['CT Fastrak (bus rapid transit only — no highway tolls in CT)'],
  tollHoldProcess: {
    step1: 'IMPORTANT: Connecticut has NO highway tolls. If you have a toll hold, it is from an OUT-OF-STATE toll authority (usually NH, NY, or MA). Contact the originating state\'s toll authority to pay or dispute: NH E-ZPass (603-485-3878), NY E-ZPass (800-333-8655), or MA EZDriveMA (877-627-7745).',
    step2: 'Once the out-of-state toll authority confirms your payment, they will notify CT DMV within 3–5 business days.',
    step3: 'Pay the $175 CT DMV reinstatement fee ONLINE at portal.ct.gov/dmv, by phone at 860-263-5720, or by mail. You do NOT need to visit in person.',
    step4: 'Once the reinstatement fee is processed (up to 10 business days), renew your registration online at portal.ct.gov/dmv.',
    notes: 'The $175 reinstatement fee is the highest in New England but CAN be paid online — many people don\'t know this. You do NOT need to visit a DMV office. Processing takes up to 10 business days after payment.',
  },
  appointmentRequired: true,
  allowsOnlineReinstatement: true,
  fees: {
    registrationRenewal: '$120 for 2-year passenger registration',
    suspensionTermination: '$175',
    duplicateTitle: '$25',
    licenseReinstatement: '$175 reinstatement fee',
  },
  notes: 'Connecticut has NO highway tolls — CTfastrak is a bus-only corridor. All CT toll holds originate from neighboring states (NH, NY, MA). The $175 reinstatement fee is the highest in NE but CAN be paid online at portal.ct.gov/dmv or by phone at 860-263-5720. You do NOT need to visit in person. If you want to dispute the underlying toll, visit tollfighter.com to generate an AI dispute letter.',
};
