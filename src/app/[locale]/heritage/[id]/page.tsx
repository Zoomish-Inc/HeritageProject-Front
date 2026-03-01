import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMockHeritageById, MOCK_HERITAGE_OBJECTS } from '@/mocks/heritage';
import type { Locale } from '@/types/heritage';
import { HeritageDetailClient } from './HeritageDetailClient';

type Props = {
  params: { locale: string; id: string };
};

// SSR: generate static params for all objects
export async function generateStaticParams() {
  const locales: Locale[] = ['ru', 'uz'];
  return MOCK_HERITAGE_OBJECTS.flatMap((obj) =>
    locales.map((locale) => ({ locale, id: obj.slug }))
  );
}

// SSR: generate metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const obj = getMockHeritageById(params.id);
  if (!obj) return { title: 'Not Found' };
  const locale = params.locale as Locale;
  return {
    title: `${obj.name[locale]} | Наследие Ферганы`,
    description: obj.shortDescription[locale],
  };
}

// SSR Page component — data fetched on server
export default async function HeritagePage({ params }: Props) {
  // In production: fetch from backend
  // const res = await fetch(`${process.env.API_URL}/api/v1/heritage/${params.id}/`, { next: { revalidate: 3600 } });
  // if (!res.ok) notFound();
  // const data = await res.json();

  // Using mock data for now
  const obj = getMockHeritageById(params.id);
  if (!obj) notFound();

  return <HeritageDetailClient initialData={obj} />;
}
