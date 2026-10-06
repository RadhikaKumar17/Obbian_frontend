"use client";

import { useObbian } from "@/components/obbian-provider";

export default function PolicyEvidencePanel() {
  const { router, setContact, messages } = useObbian();
  const latest = messages.at(-1);
  return (
    <section className="panel h-fit" aria-labelledby="answer-evidence">
      <h2 id="answer-evidence" className="eyebrow !font-sans">Sources</h2>
      <p className="mt-2 text-sm text-muted">{latest?.citations.length ? `${latest.citations.length} retrieved source${latest.citations.length === 1 ? '' : 's'}` : 'No cited answer yet'}</p>
      <div className="mt-4 space-y-3">{latest?.citations.map((citation, index) => <div key={citation.chunk_id} className="rounded-xl border border-line p-4 text-sm">
        <p className="font-semibold">[{index + 1}] {citation.title}</p>
        <p className="mt-1 text-xs text-muted">{citation.version} · {citation.locator}</p>
        <blockquote className="mt-2 leading-6 text-muted">“{citation.quote}”</blockquote>
      </div>)}</div>
      {latest && latest.latency_ms > 0 && <p className="mt-4 text-xs text-muted">Answered in {(latest.latency_ms / 1000).toFixed(1)}s · index {latest.index_version}</p>}
      <p className="mt-4 text-sm leading-6 text-muted">Answers use the approved policy library. If a detail is missing, contact support for confirmation.</p>
      <button className="btn btn-secondary mt-5 w-full !py-3" onClick={() => { setContact(true); router.push('/support'); }}>Talk to a human</button>
    </section>
  );
}
