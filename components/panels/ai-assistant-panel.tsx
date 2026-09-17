"use client";

import { useEffect, useRef, useState } from 'react';
import { useObbian } from '@/components/obbian-provider';
import Panel from '@/components/ui/panel';
import Input from '@/components/ui/input';
import Go from '@/components/ui/go';
import PolicyCitations from '@/components/ui/policy-citations';
import { dateLabel, money } from '@/lib/data';

export default function AiAssistantPanel() {
  const { date, budget, assistantMessages, assistantError, askingAssistant, askAssistant, followAssistantAction, select } = useObbian();
  const [question, setQuestion] = useState('');
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { if (assistantMessages.length) end.current?.scrollIntoView({behavior:'smooth',block:'nearest'}); }, [assistantMessages.length]);
  return <Panel className="flex min-h-[330px] flex-col">
    <h2 className="text-lg font-semibold">✦ Obbian AI Assistant</h2>
    <p className="mt-2 text-sm text-muted">Find a ride, check its price, prepare a reservation, or ask about rental policies.</p>
    <div role="log" aria-label="Assistant conversation" aria-busy={askingAssistant} className="mt-5 max-h-[520px] space-y-5 overflow-y-auto">
      {!assistantMessages.length && <button type="button" disabled={askingAssistant} onClick={() => askAssistant(`Find me an automatic SUV near me for ${date} under INR ${budget} per day.`)} className="w-full rounded-2xl bg-tint p-4 text-left text-sm text-brand">Find me an automatic SUV near me for {dateLabel(date).toLowerCase()} under {money(Number(budget))}/day.</button>}
      {assistantMessages.map((message, index) => <div key={index}>
        <p className="ml-6 rounded-xl bg-tint p-3 text-sm">{message.question}</p>
        <div className="mt-3 rounded-xl bg-wash p-4">
          <p className="whitespace-pre-line text-sm leading-6">{message.answer}</p>
          <PolicyCitations citations={message.citations} />
          {!!message.vehicles?.length && <div className="mt-3 space-y-2">{message.vehicles.slice(0,5).map(vehicle => <button key={vehicle.id} type="button" className="flex w-full items-center justify-between gap-2 rounded-lg border border-line bg-white p-3 text-left text-sm hover:border-blue-400" onClick={() => { if(message.filters?.date) followAssistantAction({type:'vehicle',label:'View vehicle',vehicleId:vehicle.id,date:message.filters.date}); else select(vehicle); }}><span>🚙 {vehicle.name}<span className="block text-xs text-muted">{vehicle.distance} km · {vehicle.transmission}</span></span><strong>{money(vehicle.price)}/day</strong></button>)}</div>}
          {!!message.actions?.length && <div className="mt-4 flex flex-wrap gap-2">{message.actions.map((action,i) => <button key={i} type="button" className="btn" onClick={() => followAssistantAction(action)}>{action.label}</button>)}</div>}
        </div>
      </div>)}
      {askingAssistant && <p role="status" className="text-sm text-brand">Checking your request…</p>}
      <div ref={end} />
    </div>
    {assistantError && <p role="alert" className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{assistantError}</p>}
    <form className="mt-5 flex gap-2" onSubmit={event => { event.preventDefault(); if(question.trim()){ askAssistant(question); setQuestion(''); } }}>
      <label className="sr-only" htmlFor="assistant-message">Ask the vehicle assistant</label>
      <Input id="assistant-message" value={question} onChange={e => setQuestion(e.target.value)} placeholder="Ask about a vehicle or policy…" maxLength={2000} minLength={3} required />
      <button type="submit" disabled={askingAssistant || question.trim().length < 3} className="btn disabled:opacity-50">Send</button>
    </form>
    <div className="mt-4 flex flex-wrap gap-2">{['Show me my trips','What is the cancellation policy?','Track my vehicle'].map(text => <button key={text} type="button" disabled={askingAssistant} onClick={() => askAssistant(text)} className="chip text-left">{text}</button>)}</div>
    <div className="mt-5 flex justify-end"><Go href="/search">Search vehicles →</Go></div>
  </Panel>;
}
