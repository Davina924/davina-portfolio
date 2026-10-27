import { CERTIFICATE_IMAGES } from './certificateImages.js';

export const EDUCATION = {
  title: 'Information Systems',
  period: '2023 – 2027 (expected)',
  organization: 'Institut Teknologi Sepuluh Nopember',
  stat: { value: 3.63, decimals: 2, label: '/ 4.00 GPA' },
  description:
    'Business Process Management, Enterprise System, Agile Project Management, Applied Technology and Digital Transformation, Software Design and Development.',
};

export const CERTIFICATIONS = [
  {
    id: 'sap-s4hana-gbi',
    title: 'Introduction to SAP S/4HANA with GBI 4.2',
    issuer: 'SAP University Alliances',
    period: 'Nov – Dec 2024',
    tags: ['SD', 'MM', 'PP'],
    image: CERTIFICATE_IMAGES.sapS4hanaGbi,
  },
  {
    id: 'sap-business-suite',
    title: 'Exploring End-to-End Business Processes in SAP Business Suite',
    issuer: 'SAP',
    image: CERTIFICATE_IMAGES.sapBusinessSuite,
  },
  {
    id: 'autonomous-supply-chain',
    title: 'Discovering Autonomous Supply Chain Management',
    image: CERTIFICATE_IMAGES.autonomousSupplyChain,
  },
];

export const TEACHING = {
  title: 'Odoo Teaching Assistant',
  period: 'Aug – Nov 2025',
  organization: 'Enterprise Systems Laboratory, ITS',
  stat: { value: 60, prefix: '2 × ', suffix: '+', label: 'students across two classes' },
  description:
    'Ran practical Odoo ERP sessions, wrote examination questions, and graded throughout the term.',
  certificate: {
    title: 'Odoo Teaching Assistant',
    issuer: 'Enterprise Systems Laboratory, ITS',
    image: CERTIFICATE_IMAGES.odooTeachingAssistant,
  },
};

export const PROJECTS = [
  {
    id: 'blibli-dashboard',
    title: 'Blibli Business Performance Dashboard',
    period: '2025',
    organization: 'Coursework',
    description:
      'An interactive Power BI dashboard built on the Balanced Scorecard, tracking KPIs and achievement across financial, customer, internal process, and learning and growth perspectives.',
    tags: ['Power BI', 'Balanced Scorecard', 'KPIs'],
  },
  {
    id: 'focusbuddy',
    title: 'FocusBuddy',
    period: '2026',
    organization: 'Coursework',
    description:
      'A mobile app that breaks big tasks into smaller steps with AI help, with a dashboard of completed versus pending tasks.',
    tags: ['Flutter', 'Dart', 'Supabase', 'AI API'],
  },
];

export const VOLUNTEERING = [
  {
    id: 'its-camp-2025',
    title: 'Vice Head of Public Relations',
    period: 'Jun – Aug 2025',
    organization: 'ITS CAMP 2025',
    stat: { value: 30, suffix: '+', label: 'external partners' },
    description: 'Co-led PR for the university-wide freshman orientation and managed 10 staff.',
    certificate: {
      title: 'Vice Head of Public Relations',
      issuer: 'ITS CAMP 2025',
      image: CERTIFICATE_IMAGES.itsCamp2025,
    },
  },
  {
    id: 'inclenation-2025',
    title: 'Expert Staff of Mentor Division',
    period: 'Jun – Oct 2025',
    organization: 'INCLENATION 2025',
    stat: { value: 10, label: 'mentors guided' },
    description:
      'Ran briefings, rehearsals and evaluations for a faculty-level freshman orientation.',
    certificate: {
      title: 'Expert Staff of Mentor Division',
      issuer: 'INCLENATION 2025',
      image: CERTIFICATE_IMAGES.inclenation2025,
    },
  },
];
