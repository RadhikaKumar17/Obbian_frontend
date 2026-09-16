import { notFound } from 'next/navigation';
const routes = ['', 'search', 'vehicle', 'checkout', 'confirmation', 'tracking', 'policy', 'trips', 'saved', 'support'];
export default async function Page({ params }: { params: Promise<{slug?: string[]}> }) {
  const {slug = []} = await params;
  if (!routes.includes(slug.join('/'))) notFound();
  return null;
}
