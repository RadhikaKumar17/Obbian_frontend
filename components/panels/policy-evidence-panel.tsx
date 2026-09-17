"use client";

import { useObbian } from "@/components/obbian-provider";
import Panel from "@/components/ui/panel";

export default function PolicyEvidencePanel() {
  const { router, setContact, messages } = useObbian();
  const latest = messages.at(-1);
  return (
    <Panel className="flex flex-col">
      <h2 className="text-lg font-semibold">Answer evidence</h2>
      <p className="mt-5 text-sm text-muted">{latest?.citations.length ? `${latest.citations.length} retrieved source${latest.citations.length === 1 ? '' : 's'}` : 'No cited answer yet'}</p>
      <div className="mt-5 space-y-3">{latest?.citations.map((citation, index) => <div key={citation.chunk_id} className="rounded-xl bg-wash p-4 text-sm">
        <p className="font-semibold">[{index + 1}] {citation.title}</p>
        <p className="mt-1 text-xs text-muted">{citation.version} · {citation.locator}</p>
        <blockquote className="mt-3 leading-6">{citation.quote}</blockquote>
      </div>)}</div>
      <p className="mt-6 text-sm text-muted">Answers use the approved policy library. If a detail is missing, contact support for confirmation.</p>
      <div className="mt-auto pt-10"><button className="btn w-full" onClick={() => { setContact(true); router.push('/support'); }}>Talk to a human</button></div>
    </Panel>
  );
}
