"use client";

import { useEffect, useRef, useState } from 'react';
import { useObbian } from '@/components/obbian-provider';
import Go from '@/components/ui/go';
import CarVisual from '@/components/ui/car-visual';
import MapPanel from '@/components/ui/map-panel';
import PolicyCitations from '@/components/ui/policy-citations';
import { ArrowRightIcon, ChevronRightIcon, SendIcon, SparkleIcon, StarIcon } from '@/components/ui/icons';
import { dateLabel, money } from '@/lib/data';
import { vehiclePaint, vehiclePhotos } from '@/lib/vehicle-images';

// Labels for the tool the agent chose, shown so users can see where an answer came from.
const toolLabels: Record<string, string> = {
  search: 'Vehicle search', quote: 'Price quote', trips: 'Your trips', tracking: 'Live tracking', policy: 'Policy library',
};

export default function AiAssistantPanel() {
  const { date, budget, assistantMessages, assistantError, askingAssistant, askAssistant, followAssistantAction, select, results, origin, radius, setUserLocation } = useObbian();
  const [question, setQuestion] = useState('');
  const log = useRef<HTMLDivElement>(null);
  // Scroll the conversation itself rather than the page, so loading history never moves the viewport.
  useEffect(() => { if (assistantMessages.length) log.current?.scrollTo({ top: log.current.scrollHeight, behavior: 'smooth' }); }, [assistantMessages.length, askingAssistant]);
  return <aside className="panel flex h-fit min-w-0 flex-col gap-4 !p-4 xl:sticky xl:top-8" aria-label="AI Assistant">
    <div className="flex items-center justify-between">
      <h2 className="flex items-center gap-2 text-base font-semibold"><SparkleIcon size={17} className="text-brand" /> AI Assistant</h2>
      <span className="flex items-center gap-1.5 text-xs text-muted">
        <span className={`size-1.5 rounded-full ${assistantError ? 'bg-danger' : askingAssistant ? 'animate-pulse bg-amber-500' : 'bg-brand'}`} />
        {assistantError ? 'Unavailable' : askingAssistant ? 'Thinking' : 'Online'}
      </span>
    </div>
    <div ref={log} role="log" aria-label="Assistant conversation" aria-busy={askingAssistant} className="scroll-soft -mr-2 max-h-[420px] space-y-4 overflow-y-auto pr-2">
      {!assistantMessages.length && <>
        <p className="text-sm leading-6 text-muted">Find a ride, check its price, prepare a reservation, or ask about rental policies.</p>
        <button type="button" disabled={askingAssistant} onClick={() => askAssistant(`Find me an automatic SUV near me for ${date} under INR ${budget} per day.`)} className="ml-auto block max-w-[90%] rounded-2xl rounded-br-sm bg-tint px-4 py-2 text-left text-sm text-brand-strong transition hover:bg-tint-strong disabled:opacity-60">Find me an automatic SUV near me for {dateLabel(date).toLowerCase()} under {money(Number(budget))}/day.</button>
      </>}
      {assistantMessages.map((message, index) => <div key={index} className="space-y-3">
        <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-tint px-4 py-2 text-sm text-brand-strong">{message.question}</p>
        <div className="w-fit max-w-[92%] rounded-2xl rounded-bl-sm border border-line px-4 py-2 text-sm">
          {toolLabels[message.tool] && <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">{toolLabels[message.tool]}</p>}
          <p className="whitespace-pre-line leading-6">{message.answer}</p>
          <PolicyCitations citations={message.citations} />
        </div>
        {!!message.vehicles?.length && <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line">{message.vehicles.slice(0,5).map(vehicle => <button key={vehicle.id} type="button" className="flex w-full items-center gap-3 p-3 text-left transition hover:bg-wash" onClick={() => { if(message.filters?.date) followAssistantAction({type:'vehicle',label:'View vehicle',vehicleId:vehicle.id,date:message.filters.date}); else select(vehicle); }}>
          <CarVisual photos={vehiclePhotos(vehicle)} name="" paint={vehiclePaint(vehicle.id)} category={vehicle.category} className="h-10 w-16 shrink-0 rounded-md" />
          <span className="min-w-0 flex-1 text-sm"><span className="block truncate font-semibold">{vehicle.name}</span><span className="flex items-center gap-1 text-xs text-muted">{money(vehicle.price)} / day · <StarIcon size={11} className="text-amber-500" /> {vehicle.rating}</span></span>
          <ChevronRightIcon size={16} className="shrink-0 text-muted" />
        </button>)}</div>}
        {!!message.actions?.length && <div className="flex flex-wrap gap-2">{message.actions.map((action,i) => <button key={i} type="button" className={`btn !min-h-9 !px-4 !py-1.5 !text-[13px] ${i ? 'btn-secondary' : ''}`} onClick={() => followAssistantAction(action)}>{action.label}</button>)}</div>}
      </div>)}
      {askingAssistant && <p role="status" className="flex items-center gap-2.5 text-sm text-muted">
        <span className="flex gap-1" aria-hidden="true">{[0, 150, 300].map(delay => <span key={delay} className="size-1.5 animate-bounce rounded-full bg-brand" style={{ animationDelay: `${delay}ms` }} />)}</span>
        Checking your request…
      </p>}
    </div>
    {assistantError && <p role="alert" className="alert">{assistantError}</p>}
    <MapPanel compact vehicles={results} origin={origin} radiusKm={Number(radius)} onOriginChange={setUserLocation} onVehicleSelect={select} />
    <div className="flex flex-wrap gap-2">{['Show me my trips','What is the cancellation policy?','Track my vehicle'].map(text => <button key={text} type="button" disabled={askingAssistant} onClick={() => askAssistant(text)} className="pill !min-h-7 !px-3 !py-1 !text-xs disabled:opacity-60">{text}</button>)}</div>
    <form className="flex gap-2" onSubmit={event => { event.preventDefault(); if(question.trim()){ askAssistant(question); setQuestion(''); } }}>
      <label className="sr-only" htmlFor="assistant-message">Ask the vehicle assistant</label>
      <input id="assistant-message" value={question} onChange={e => setQuestion(e.target.value)} placeholder="Ask anything about your trip…" maxLength={2000} minLength={3} required className="field !py-2" />
      <button type="submit" aria-label="Send" disabled={askingAssistant || question.trim().length < 3} className="btn !min-h-10 !px-3"><SendIcon size={17} /></button>
    </form>
    <div className="[&>a]:w-full"><Go href="/search" secondary>Search vehicles <ArrowRightIcon size={16} /></Go></div>
  </aside>;
}
