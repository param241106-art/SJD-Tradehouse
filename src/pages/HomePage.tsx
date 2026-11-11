import { HomeSection } from '@/components/sections/HomeSection';
import { useMemo } from 'react';
import { useStructuredData } from '@/lib/hooks';
import { organizationSchema } from '@/lib/structuredData';
import { certifications } from '@/data/content';

export function HomePage() {
  useStructuredData(useMemo(() => organizationSchema(certifications), []));
  return <HomeSection />;
}
