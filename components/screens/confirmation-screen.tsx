"use client";

import { useObbian } from "@/components/obbian-provider";
import ConfirmationPanel from "@/components/panels/confirmation-panel";
import EmptyBookingPanel from "@/components/panels/empty-booking-panel";
import Header from "@/components/ui/header";

export default function ConfirmationScreen() {
  const { booking } = useObbian();
  if (booking) return <ConfirmationPanel />;
  return (
    <>
      <Header eyebrow="Step 3 of 3" title="Reservation confirmed" />
      <EmptyBookingPanel />
    </>
  );
}
