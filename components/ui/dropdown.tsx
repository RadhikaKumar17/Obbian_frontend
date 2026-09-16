"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

export type DropdownOption = { value: string; label: string };
export type DropdownProps = {
  options: readonly DropdownOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  id?: string;
  "aria-label": string;
  className?: string;
  disabled?: boolean;
  align?: "start" | "end";
};

export default function Dropdown({ options, value, defaultValue, onChange, name, id, className = "", disabled = false, align = "start", "aria-label": label }: DropdownProps) {
  const generatedId = useId();
  const listId = `${id || generatedId}-listbox`;
  const [internalValue, setInternalValue] = useState(defaultValue ?? options[0]?.value ?? "");
  const selectedValue = value ?? internalValue;
  const selectedIndex = options.findIndex(option => option.value === selectedValue);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef({ text: "", time: 0 });

  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  useEffect(() => {
    if (open) document.getElementById(`${listId}-${activeIndex}`)?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex, listId]);

  function choose(index: number) {
    const option = options[index];
    if (!option) return;
    setInternalValue(option.value);
    onChange?.(option.value);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!options.length) return;
    const current = open ? activeIndex : Math.max(selectedIndex, 0);
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(event.key === "Home" ? 0 : event.key === "End" ? options.length - 1 : !open ? current : (current + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) choose(activeIndex);
      else { setActiveIndex(current); setOpen(true); }
    } else if (event.key === "Escape") {
      if (open) { event.preventDefault(); event.stopPropagation(); setOpen(false); }
    } else if (event.key === "Tab") {
      setOpen(false);
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      const now = Date.now();
      const query = now - searchRef.current.time > 700 ? event.key : searchRef.current.text + event.key;
      searchRef.current = { text: query, time: now };
      const match = options.findIndex(option => option.label.toLowerCase().startsWith(query.toLowerCase()));
      if (match >= 0) { setActiveIndex(match); setOpen(true); }
    }
  }

  return (
    <div ref={rootRef} className="relative min-w-0" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      {name && <input type="hidden" name={name} value={selectedValue} disabled={disabled} />}
      <button ref={triggerRef} id={id} type="button" role="combobox" aria-label={label} aria-haspopup="listbox" aria-expanded={open} aria-controls={listId} aria-activedescendant={open ? `${listId}-${activeIndex}` : undefined} disabled={disabled || !options.length} onKeyDown={handleKeyDown} onClick={() => { setActiveIndex(Math.max(selectedIndex, 0)); setOpen(!open); }} className={`flex min-h-10 w-full items-center justify-between gap-4 text-left disabled:cursor-not-allowed disabled:opacity-50 ${className || "field"}`}>
        <span>{options[selectedIndex]?.label || "Select an option"}</span>
        <span aria-hidden="true" className={`text-brand transition-transform ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>
      {open && <ul id={listId} role="listbox" aria-label={label} className={`absolute ${align === "end" ? "right-0" : "left-0"} top-full z-40 mt-2 max-h-64 w-max min-w-full max-w-[calc(100vw-3rem)] overflow-y-auto rounded-xl border border-line bg-white p-1.5 shadow-lg`}>
        {options.map((option, index) => <li key={option.value} id={`${listId}-${index}`} role="option" aria-selected={selectedValue === option.value} onPointerMove={() => setActiveIndex(index)} onMouseDown={event => event.preventDefault()} onClick={() => choose(index)} className={`flex cursor-pointer items-center justify-between gap-5 rounded-lg px-3 py-3 text-sm ${activeIndex === index ? "bg-tint text-brand" : "text-ink"}`}>
          <span>{option.label}</span><span aria-hidden="true" className="w-4 text-brand">{selectedValue === option.value ? "✓" : ""}</span>
        </li>)}
      </ul>}
    </div>
  );
}
