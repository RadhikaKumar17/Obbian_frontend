"use client";

import { useObbian } from "@/components/obbian-provider";
import Input from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

export default function DriverDetailsPanel() {
  const { config } = useObbian();
  const methods = config?.paymentMethods ?? [];
  const [chosen, setChosen] = useState("");
  const payment = chosen || methods[0]?.value || "";
  return (
    <div className="min-w-0 space-y-6">
      <section className="panel">
        <h2 className="text-xl font-semibold">Driver details</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-xs text-muted">Full name</span>
            <Input
              required
              name="name"
              autoComplete="name"
              minLength={2}
              maxLength={80}
              defaultValue="Radhika Kumar"
              className="mt-1"
            />
          </label>
          <label className="block">
            <span className="text-xs text-muted">Mobile number</span>
            <Input
              required
              name="mobile"
              type="tel"
              autoComplete="tel"
              pattern="[+]?[0-9]{10,13}"
              placeholder="+919876543210"
              className="mt-1"
            />
          </label>
          <label className="block">
            <span className="text-xs text-muted">Driving licence</span>
            <Input
              required
              name="licence"
              minLength={6}
              maxLength={24}
              placeholder="Enter licence number"
              className="mt-1"
            />
          </label>
        </div>
      </section>
      <section className="panel">
        <h2 id="payment-method" className="text-xl font-semibold">Payment method</h2>
        <input type="hidden" name="paymentMethod" value={payment} />
        <div role="radiogroup" aria-labelledby="payment-method" className="mt-4 grid gap-3 sm:grid-cols-3">
          {methods.map((method) => (
            <button
              key={method.value}
              type="button"
              role="radio"
              aria-checked={payment === method.value}
              onClick={() => setChosen(method.value)}
              className={`rounded-2xl border p-4 text-left transition ${payment === method.value ? "border-brand bg-tint text-brand-strong" : "border-line hover:bg-wash"}`}
            >
              <span className="block font-semibold">{method.label}</span>
              <span className="text-xs opacity-70">{payment === method.value ? "Selected" : "Tap to select"}</span>
            </button>
          ))}
        </div>
        <label className="mt-5 flex items-center gap-3 text-sm">
          <Input
            type="checkbox"
            name="termsAccepted"
            required
            className="size-4 accent-brand"
          />
          <span>
            I agree to the{" "}
            <Link className="link underline" href="/policy">
              rental terms
            </Link>
          </span>
        </label>
      </section>
    </div>
  );
}
