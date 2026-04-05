import type { StateData } from '@/types/state';

export const RI_STATE_DATA: StateData = {
  code: 'RI',
  name: 'Rhode Island',
  dmvName: 'RI Division of Motor Vehicles',
  emoji: '🌉',
  urls: {
    mainSite: 'https://dmv.ri.gov',
    appointmentBooking: 'https://dmv.ri.gov/appointments',
    registrationRenewal: 'https://dmv.ri.gov/vehicles/registration',
    tollHoldInfo: 'https://www.ritba.org',
    feeSchedule: 'https://dmv.ri.gov/fees',
    licenseReinstatement: 'https://dmv.ri.gov/licenses/reinstatement',
    disputePortal: 'https://www.ezpassritba.com',
  },
  phone: {
    main: '401-588-3020',
    tollRelated: '401-738-1636',
    hours: 'Mon–Fri 8:30am–4:00pm ET',
  },
  forms: {
    registration: {
      name: 'BAR-MVR-7',
      label: 'Vehicle Registration Application',
      url: 'https://dmv.ri.gov/forms',
    },
    titleTransfer: {
      name: 'BAR-MVR-5',
      label: 'Application for Certificate of Title',
      url: 'https://dmv.ri.gov/forms',
    },
  },
  tollAuthorities: ['RI Turnpike and Bridge Authority (RITBA)', 'E-ZPass RI'],
  tollHoldProcess: {
    step1: 'Pay the outstanding tolls and fees at ezpassritba.com or by calling RITBA at 401-738-1636.',
    step2: 'RITBA will notify RI DMV within 48 hours of payment confirmation.',
    step3: 'The RI DMV may require a $30 reinstatement fee — confirm by calling 401-588-3020.',
    step4: 'Renew your registration online at dmv.ri.gov or in person at 600 New London Avenue, Cranston.',
    notes: 'Rhode Island is a small state with a single main DMV office in Cranston. In-person wait times can be long without an appointment.',
  },
  appointmentRequired: true,
  allowsOnlineReinstatement: true,
  fees: {
    registrationRenewal: '$30–$72 depending on vehicle weight (2-year)',
    suspensionTermination: '$30',
    duplicateTitle: '$52',
    licenseReinstatement: '$50–$200 depending on offense',
  },
};
