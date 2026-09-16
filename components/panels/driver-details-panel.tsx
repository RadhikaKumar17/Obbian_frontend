"use client";

import Dropdown from "@/components/ui/dropdown";
import Input from "@/components/ui/input";
import Panel from "@/components/ui/panel";
import Link from "next/link";

export default function DriverDetailsPanel() {
  return (
    <Panel>
      <h2 className="mb-6 text-xl font-semibold">Driver details</h2>
      <div className="space-y-5">
        <label className="block">
          <span className="muted">Full name</span>
          <Input
            required
            name="name"
            autoComplete="name"
            minLength={2}
            maxLength={80}
            defaultValue="Radhika Kumar"
            className="mt-2"
          />
        </label>
        <label className="block">
          <span className="muted">Mobile number</span>
          <Input
            required
            name="mobile"
            type="tel"
            autoComplete="tel"
            pattern="[+]?[0-9]{10,13}"
            placeholder="+919876543210"
            className="mt-2"
          />
        </label>
        <label className="block">
          <span className="muted">Driving licence</span>
          <Input
            required
            name="licence"
            minLength={6}
            maxLength={24}
            placeholder="Enter licence number"
            className="mt-2"
          />
        </label>
        <div>
          <label htmlFor="payment-method" className="muted">Payment method</label>
          <Dropdown
            id="payment-method"
            aria-label="Payment method"
            name="payment"
            defaultValue="visa"
            className="field mt-2"
            options={[
              { value: "visa", label: "Demo Visa •••• 4242" },
              { value: "upi", label: "Demo UPI" },
            ]}
          />
        </div>
        <label className="flex items-center gap-3">
          <Input
            type="checkbox"
            required
            className="size-4 accent-brand"
          />
          <span>
            I agree to the{" "}
            <Link className="text-brand underline" href="/policy">
              rental terms
            </Link>
          </span>
        </label>
      </div>
    </Panel>
  );
}
