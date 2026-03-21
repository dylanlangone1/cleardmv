import type { StateData } from '@/types/state';

export const NH_STATE_DATA: StateData = {
  code: 'NH',
  name: 'New Hampshire',
  dmvName: 'NH Division of Motor Vehicles',
  emoji: '🌲',
  urls: {
    mainSite: 'https://www.nh.gov/dmv',
    appointmentBooking: 'https://www.nh.gov/dmv/offices',
    registrationRenewal: 'https://www.nh.gov/dmv/registration',
    tollHoldInfo: 'https://www.ezpassnh.com',
    feeSchedule: 'https://www.nh.gov/dmv/registration/register-vehicle/fees.htm',
    licenseReinstatement: 'https://www.nh.gov/dmv/licenses/reinstatement.htm',
  },
  phone: {
    main: '603-227-4000',
    tollRelated: '603-485-3878',
    hours: 'Mon–Fri 8:00am–4:15pm ET',
  },
  forms: {
    registration: {
      name: 'TDMV 19A',
      label: 'Application for Title and/or Registration',
      url: 'https://www.nh.gov/dmv/forms',
    },
    titleTransfer: {
      name: 'TDMV 19A',
      label: 'Application for Title and/or Registration',
      url: 'https://www.nh.gov/dmv/forms',
    },
  },
  tollAuthorities: ['NH E-ZPass / EZPassNH', 'NH DOT Turnpikes'],
  tollHoldProcess: {
    step1: 'Pay the outstanding toll invoices and all associated fees directly at ezpassnh.com or by calling NH E-ZPass at 603-485-3878.',
    step2: 'Once paid, allow 24–48 hours for NH E-ZPass to notify the NH DMV that the hold can be released.',
    step3: 'Pay the NH DMV $50 registration suspension fee online at nh.gov/dmv or in person at any DMV office.',
    step4: 'Renew or reinstate your registration online or at a DMV office.',
    notes: 'NH does NOT require an in-person DMV visit if you use online payment. The $50 suspension fee is separate from the toll debt itself.',
  },
  appointmentRequired: false,
  allowsOnlineReinstatement: true,
  fees: {
    registrationRenewal: 'Varies by weight class — typically $31.20–$52.50/year',
    suspensionTermination: '$50',
    duplicateTitle: '$25',
    licenseReinstatement: '$100 reinstatement fee + any outstanding fines',
  },
  notes: 'NH E-ZPass and the NH DMV are separate agencies. Paying the toll debt does NOT automatically clear the DMV hold — you must also pay the $50 DMV suspension fee separately.',
};
