import { HomeSection } from '@/components/sections/HomeSection';
import { useMemo } from 'react';
import { useStructuredData } from '@/lib/hooks';
import { organizationSchema } from '@/lib/structuredData';
import { team, certifications } from '@/data/content';

export function HomePage() {
  useStructuredData(useMemo(() => organizationSchema(team, certifications), []));
  return <HomeSection />;
}
