"use client";

import { useEffect, useRef, useState } from 'react';
import { useObbian } from '@/components/obbian-provider';
import Panel from '@/components/ui/panel';
import Input from '@/components/ui/input';
import Go from '@/components/ui/go';
import PolicyCitations from '@/components/ui/policy-citations';
import { ArrowRightIcon, CarIcon, ChevronRightIcon, SendIcon, SparkleIcon } from '@/components/ui/icons';
import { dateLabel, money } from '@/lib/data';

// Labels for the tool the agent chose, shown so users can see where an answer came from.
const toolLabels: Record<string, string> = {
  search: 'Vehicle search', quote: 'Price quote', trips: 'Your trips', tracking: 'Live tracking', policy: 'Policy library',
};

export default function AiAssistantPanel() {
  const { date, budget, assistantMessages, assistantError, askingAssistant, askAssistant, followAssistantAction, select } = useObbian();
  const [question, setQuestion] = useState('');
  const log = useRef<HTMLDivElement>(null);
  // Scroll the conversation itself rather than the page, so loading history never moves the viewport.
  useEffect(() => { if (assistantMessages.length) log.current?.scrollTo({ top: log.current.scrollHeight, behavior: 'smooth' }); }, [assistantMessages.length, askingAssistant]);
  return <Panel className="flex min-h-[330px] flex-col !p-0">
    <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
      <div className="flex items-center gap-3">
        <span className="icon-tile !size-10"><SparkleIcon size={19} /></span>
        <div>
          <h2 className="text-base font-semibold leading-5">Obbian AI Assistant</h2>
          <p className="text-xs text-muted">Search, quotes, trips and policies</p>
        </div>
      </div>
      <span className="flex items-center gap-1.5 text-xs font-medium text-muted">
        <span className={`size-2 rounded-full ${assistantError ? 'bg-danger' : askingAssistant ? 'animate-pulse bg-amber-500' : 'bg-success'}`} />
        {assistantError ? 'Unavailable' : askingAssistant ? 'Thinking' : 'Ready'}
      </span>
    </div>
    <div ref={log} role="log" aria-label="Assistant conversation" aria-busy={askingAssistant} className="scroll-soft max-h-[520px] flex-1 space-y-4 overflow-y-auto px-5 py-4">
      {!assistantMessages.length && <>
        <p className="text-sm leading-6 text-muted">Find a ride, check its price, prepare a reservation, or ask about rental policies.</p>
        <button type="button" disabled={askingAssistant} onClick={() => askAssistant(`Find me an automatic SUV near me for ${date} under INR ${budget} per day.`)} className="w-full rounded-2xl border border-tint-strong bg-tint p-4 text-left text-sm font-medium leading-6 text-brand transition hover:bg-tint-strong disabled:opacity-60">Find me an automatic SUV near me for {dateLabel(date).toLowerCase()} under {money(Number(budget))}/day.</button>
      </>}
      {assistantMessages.map((message, index) => <div key={index} className="space-y-3">
        <p className="ml-auto w-fit max-w-[88%] rounded-2xl rounded-br-md bg-tint px-4 py-2.5 text-sm leading-6">{message.question}</p>
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-tint text-brand"><SparkleIcon size={14} /></span>
          <div className="min-w-0 flex-1 rounded-2xl rounded-tl-md border border-line bg-white px-4 py-3">
            {toolLabels[message.tool] && <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-accent">{toolLabels[message.tool]}</p>}
            <p className="whitespace-pre-line text-sm leading-6">{message.answer}</p>
            <PolicyCitations citations={message.citations} />
            {!!message.vehicles?.length && <div className="mt-3 space-y-2">{message.vehicles.slice(0,5).map(vehicle => <button key={vehicle.id} type="button" className="flex w-full items-center gap-3 rounded-xl border border-line bg-white p-2.5 text-left text-sm transition hover:border-brand hover:bg-wash" onClick={() => { if(message.filters?.date) followAssistantAction({type:'vehicle',label:'View vehicle',vehicleId:vehicle.id,date:message.filters.date}); else select(vehicle); }}><span className="grid size-10 shrink-0 place-items-center rounded-lg bg-tint text-brand"><CarIcon size={20} /></span><span className="min-w-0 flex-1"><span className="block truncate font-semibold">{vehicle.name}</span><span className="block truncate text-xs text-muted">{vehicle.distance} km · {vehicle.transmission}</span></span><strong className="shrink-0 text-sm">{money(vehicle.price)}<span className="text-xs font-normal text-muted">/day</span></strong><ChevronRightIcon size={16} className="shrink-0 text-muted" /></button>)}</div>}
            {!!message.actions?.length && <div className="mt-3 flex flex-wrap gap-2">{message.actions.map((action,i) => <button key={i} type="button" className={`btn !min-h-9 !px-3.5 !py-1.5 !text-[13px] ${i ? 'btn-secondary' : ''}`} onClick={() => followAssistantAction(action)}>{action.label}</button>)}</div>}
          </div>
        </div>
      </div>)}
      {askingAssistant && <p role="status" className="flex items-center gap-2.5 text-sm text-muted">
        <span className="grid size-7 place-items-center rounded-full bg-tint text-brand"><SparkleIcon size={14} /></span>
        <span className="flex gap-1" aria-hidden="true">{[0, 150, 300].map(delay => <span key={delay} className="size-1.5 animate-bounce rounded-full bg-brand" style={{ animationDelay: `${delay}ms` }} />)}</span>
        Checking your request…
      </p>}
    </div>
    <div className="border-t border-line px-5 pb-5 pt-4">
      {assistantError && <p role="alert" className="alert mb-3">{assistantError}</p>}
      <div className="flex flex-wrap gap-2">{['Show me my trips','What is the cancellation policy?','Track my vehicle'].map(text => <button key={text} type="button" disabled={askingAssistant} onClick={() => askAssistant(text)} className="chip text-left transition hover:bg-tint-strong disabled:opacity-60">{text}</button>)}</div>
      <form className="mt-3 flex gap-2" onSubmit={event => { event.preventDefault(); if(question.trim()){ askAssistant(question); setQuestion(''); } }}>
        <label className="sr-only" htmlFor="assistant-message">Ask the vehicle assistant</label>
        <Input id="assistant-message" value={question} onChange={e => setQuestion(e.target.value)} placeholder="Ask about a vehicle or policy…" maxLength={2000} minLength={3} required className="!bg-wash" />
        <button type="submit" aria-label="Send" disabled={askingAssistant || question.trim().length < 3} className="btn-icon"><SendIcon size={18} /></button>
      </form>
      <div className="mt-4 flex justify-end [&>a]:w-full"><Go href="/search" secondary>Search vehicles <ArrowRightIcon size={16} /></Go></div>
    </div>
  </Panel>;
}
