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
        eyebrow="Step 2 of 3"
        title="Checkout"
        subtitle="Almost there — confirm who's driving and how you'll pay."
      />
      <form
        onSubmit={reserve}
        className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]"
      >
        <DriverDetailsPanel />
        <OrderSummaryPanel />
      </form>
    </>
  );
}
