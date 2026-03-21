import type { StateData } from '@/types/state';

export const NY_STATE_DATA: StateData = {
  code: 'NY',
  name: 'New York',
  dmvName: 'NYS DMV',
  emoji: '🗽',
  urls: {
    mainSite: 'https://dmv.ny.gov',
    appointmentBooking: 'https://dmv.ny.gov/appointments',
    registrationRenewal: 'https://dmv.ny.gov/online-transactions/registration-renewal',
    tollHoldInfo: 'https://dmv.ny.gov/registration/toll-violation-suspension',
    feeSchedule: 'https://dmv.ny.gov/registration/registration-fees',
    licenseReinstatement: 'https://dmv.ny.gov/driver-license/restore-your-revoked-license',
    disputePortal: 'https://www.e-zpassny.com',
  },
  phone: {
    main: '518-473-5595',
    tollRelated: '800-333-8655',
    hours: 'Mon–Fri 8:30am–4:30pm ET',
  },
  forms: {
    registration: {
      name: 'MV-82',
      label: 'Vehicle Registration/Title Application',
      url: 'https://dmv.ny.gov/forms/mv82.pdf',
    },
    titleTransfer: {
      name: 'MV-82',
      label: 'Vehicle Registration/Title Application (also handles title)',
      url: 'https://dmv.ny.gov/forms/mv82.pdf',
    },
    licenseReinstatement: {
      name: 'MV-15',
      label: 'Driving Record Request',
      url: 'https://dmv.ny.gov/forms/mv15.pdf',
    },
  },
  tollAuthorities: ['E-ZPass NY', 'NY State Thruway Authority', 'Triborough Bridge and Tunnel Authority (MTA)', 'Port Authority of NY & NJ'],
  tollHoldProcess: {
    step1: 'First, pay or formally dispute the toll violation with the issuing toll authority (E-ZPass NY, MTA, Port Authority, etc.) at their respective websites. This must happen BEFORE the DMV will lift the hold.',
    step2: 'Allow 48–72 hours for the toll authority to notify the DMV electronically that the debt is satisfied.',
    step3: 'Pay the $70 suspension termination fee to the NYS DMV online at dmv.ny.gov or in person.',
    step4: 'Reinstate your registration online at dmv.ny.gov — no in-person visit required.',
    notes: 'NY has a two-step process: toll authority first, then DMV. Paying the DMV fee without paying the toll authority first will NOT clear the hold. The $70 DMV fee is non-refundable.',
  },
  appointmentRequired: false,
  allowsOnlineReinstatement: true,
  fees: {
    registrationRenewal: 'Varies by vehicle weight, starting at $26/year',
    suspensionTermination: '$70',
    duplicateTitle: '$20',
    licenseReinstatement: '$100 civil penalty + applicable fees',
  },
};
