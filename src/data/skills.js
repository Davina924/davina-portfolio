/*
 * `usedIn` lists the step ids where a tool was used.
 * Hovering a step highlights its tools in the Toolkit section.
 */
export const SKILL_GROUPS = [
  {
    title: 'Enterprise & automation',
    items: [
      { name: 'Odoo', usedIn: ['learn', 'teach'] },
      { name: 'SAP S/4HANA', usedIn: ['learn'] },
      { name: 'Power Apps', usedIn: [] },
      { name: 'Power Automate', usedIn: [] },
    ],
  },
  {
    title: 'Data',
    items: [
      { name: 'Power BI', usedIn: ['build'] },
      { name: 'Excel', usedIn: ['coordinate'] },
      { name: 'SQL', usedIn: [] },
      { name: 'Python', usedIn: [] },
    ],
  },
  {
    title: 'Build & languages',
    items: [
      { name: 'Flutter', usedIn: ['build'] },
      { name: 'Indonesian (native)', usedIn: ['teach', 'coordinate'] },
      { name: 'English (conversational)', usedIn: ['coordinate'] },
    ],
  },
];
