"use client";

import { useObbian } from "@/components/obbian-provider";
import ConfirmationPanel from "@/components/panels/confirmation-panel";
import EmptyBookingPanel from "@/components/panels/empty-booking-panel";
import Header from "@/components/ui/header";
import { dateLabel } from "@/lib/data";

export default function ConfirmationScreen() {
  const { booking, bookedCar } = useObbian();
  return (
    <>
      <Header
        title="Reservation confirmed"
        subtitle={`Your ${bookedCar?.name ?? "vehicle"} is ready for ${booking ? dateLabel(booking.date).toLowerCase() : "your trip"}`}
      />
      {booking ? (
        <ConfirmationPanel />
      ) : (
        <EmptyBookingPanel />
      )}
    </>
  );
}
