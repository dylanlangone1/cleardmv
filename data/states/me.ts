import type { StateData } from '@/types/state';

export const ME_STATE_DATA: StateData = {
  code: 'ME',
  name: 'Maine',
  dmvName: 'Maine Bureau of Motor Vehicles (BMV)',
  emoji: '🦞',
  urls: {
    mainSite: 'https://www.maine.gov/sos/bmv',
    appointmentBooking: 'https://www.maine.gov/sos/bmv/registration',
    registrationRenewal: 'https://www.maine.gov/sos/bmv/registration',
    tollHoldInfo: 'https://www.maine.gov/mdot/ezpassmaine',
    feeSchedule: 'https://www.maine.gov/sos/bmv/fees',
    licenseReinstatement: 'https://www.maine.gov/sos/bmv/licenses/reinstatement',
    disputePortal: 'https://www.ezpassmaineturnpike.com',
  },
  phone: {
    main: '207-624-9000',
    tollRelated: '877-682-9433',
    hours: 'Mon–Fri 8:00am–5:00pm ET',
  },
  forms: {
    registration: {
      name: 'BMV Form',
      label: 'Vehicle Registration Application',
      url: 'https://www.maine.gov/sos/bmv/forms',
    },
  },
  tollAuthorities: ['E-ZPass Maine Turnpike', 'Maine Turnpike Authority'],
  tollHoldProcess: {
    step1: 'Pay the outstanding toll violations at ezpassmaineturnpike.com or by calling 877-682-9433.',
    step2: 'Maine Turnpike Authority will notify the BMV within 2–5 business days after payment.',
    step3: 'Contact the Maine BMV at 207-624-9000 to confirm your hold has been released.',
    step4: 'Renew your registration online at maine.gov/sos/bmv or by mail.',
    notes: 'Maine is a smaller state with reasonable phone wait times. If the online portal shows the hold is cleared, you can renew registration by mail.',
  },
  appointmentRequired: false,
  allowsOnlineReinstatement: true,
  fees: {
    registrationRenewal: 'Varies — starting around $35/year for passenger vehicles',
    suspensionTermination: '$50',
    duplicateTitle: '$33',
    licenseReinstatement: '$50 reinstatement fee',
  },
};
