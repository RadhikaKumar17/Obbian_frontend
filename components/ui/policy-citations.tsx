import type { PolicyCitation } from '@/lib/types';
import { BookIcon } from '@/components/ui/icons';

export default function PolicyCitations({ citations = [] }: { citations?: PolicyCitation[] }) {
  if (!citations.length) return null;
  return <div className="mt-4 space-y-2" aria-label="Policy sources">{citations.map((citation, index) => (
    <details key={citation.chunk_id} className="group rounded-xl border border-line bg-white text-xs open:shadow-card">
      <summary className="flex cursor-pointer list-none items-center gap-2 p-3 font-semibold text-brand [&::-webkit-details-marker]:hidden">
        <span className="grid size-5 shrink-0 place-items-center rounded-md bg-tint text-[11px]">{index + 1}</span>
        <BookIcon size={14} className="shrink-0" />
        <span className="min-w-0 flex-1 truncate">{citation.title}</span>
        <span className="shrink-0 font-normal text-muted">{citation.version}</span>
      </summary>
      <div className="border-t border-line p-3">
        <p className="text-muted">{citation.locator}</p>
        <blockquote className="mt-2 whitespace-pre-line border-l-2 border-tint-strong pl-3 leading-6 text-ink">{citation.quote}</blockquote>
      </div>
    </details>
  ))}</div>;
}
