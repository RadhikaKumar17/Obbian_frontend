"use client";

import { useObbian } from "@/components/obbian-provider";
import Panel from "@/components/ui/panel";

export default function PolicyEvidencePanel() {
  const { router, setContact, messages } = useObbian();
  const latest = messages.at(-1);
  return (
    <Panel className="flex h-fit flex-col">
      <h2 className="text-lg font-semibold">Answer evidence</h2>
      <p className="mt-1.5 text-sm text-muted">{latest?.citations.length ? `${latest.citations.length} retrieved source${latest.citations.length === 1 ? '' : 's'}` : 'No cited answer yet'}</p>
      <div className="mt-5 space-y-3">{latest?.citations.map((citation, index) => <div key={citation.chunk_id} className="rounded-xl border border-line bg-wash p-4 text-sm">
        <p className="flex items-start gap-2 font-semibold"><span className="grid size-5 shrink-0 place-items-center rounded-md bg-tint-strong text-[11px] text-brand">{index + 1}</span>{citation.title}</p>
        <p className="mt-1.5 text-xs text-muted">{citation.version} · {citation.locator}</p>
        <blockquote className="mt-3 border-l-2 border-tint-strong pl-3 leading-6">{citation.quote}</blockquote>
      </div>)}</div>
      {latest && latest.latency_ms > 0 && <p className="mt-4 text-xs text-muted">Answered in {(latest.latency_ms / 1000).toFixed(1)}s · index {latest.index_version}</p>}
      <p className="mt-5 text-sm leading-6 text-muted">Answers use the approved policy library. If a detail is missing, contact support for confirmation.</p>
      <div className="mt-auto pt-8"><button className="btn btn-secondary w-full" onClick={() => { setContact(true); router.push('/support'); }}>Talk to a human</button></div>
    </Panel>
  );
}
