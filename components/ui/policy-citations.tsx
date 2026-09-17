import type { PolicyCitation } from '@/lib/types';

export default function PolicyCitations({ citations = [] }: { citations?: PolicyCitation[] }) {
  if (!citations.length) return null;
  return <div className="mt-4 space-y-2" aria-label="Policy sources">{citations.map((citation, index) => (
    <details key={citation.chunk_id} className="rounded-lg border border-line bg-white p-3 text-xs">
      <summary className="cursor-pointer font-semibold text-brand">[{index + 1}] {citation.title} · {citation.version}</summary>
      <p className="mt-2 text-muted">{citation.locator}</p>
      <blockquote className="mt-2 whitespace-pre-line leading-6">{citation.quote}</blockquote>
    </details>
  ))}</div>;
}
