import { TCategoryValues } from '@/types';

export const WEBSITE_HOST_URL =
  process.env.WEBSITE_HOST_URL || 'http://localhost:3000';

export const techCategories: { title: string; value: TCategoryValues }[] = [
  { title: 'Frontend development', value: 'frontendDevelopment' },
  { title: 'CMS', value: 'cms' },
  {
    title: 'Deployment & version control',
    value: 'deploymentAndVersionControl',
  },
  { title: 'Design', value: 'design' },
  { title: 'Development tools', value: 'developmentTools' },
  {
    title: 'Communication & project management',
    value: 'communicationAndProjectManagement',
  },
];
