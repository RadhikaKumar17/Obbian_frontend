"use client";

import { useObbian } from "@/components/obbian-provider";
import DriverDetailsPanel from "@/components/panels/driver-details-panel";
import OrderSummaryPanel from "@/components/panels/order-summary-panel";
import Header from "@/components/ui/header";

export default function CheckoutScreen() {
  const { reserve } = useObbian();
  return (
    <>
      <Header
        title="Confirm and pay"
        subtitle="Complete the reservation securely"
      />
      <form
        onSubmit={reserve}
        className="grid gap-6 lg:grid-cols-[1.36fr_1fr]"
      >
        <DriverDetailsPanel />
        <OrderSummaryPanel />
      </form>
    </>
  );
}
