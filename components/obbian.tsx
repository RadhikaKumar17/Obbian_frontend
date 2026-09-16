"use client";

import ContactSupportDialog from "@/components/dialogs/contact-support-dialog";
import ManageBookingDialog from "@/components/dialogs/manage-booking-dialog";
import { ObbianProvider, useObbian } from "@/components/obbian-provider";
import CheckoutScreen from "@/components/screens/checkout-screen";
import ConfirmationScreen from "@/components/screens/confirmation-screen";
import DiscoverScreen from "@/components/screens/discover-screen";
import PolicyScreen from "@/components/screens/policy-screen";
import SavedScreen from "@/components/screens/saved-screen";
import SearchScreen from "@/components/screens/search-screen";
import SupportScreen from "@/components/screens/support-screen";
import TrackingScreen from "@/components/screens/tracking-screen";
import TripsScreen from "@/components/screens/trips-screen";
import VehicleScreen from "@/components/screens/vehicle-screen";
import Sidebar from "@/components/sidebar";

export default function Obbian() {
  return <ObbianProvider><ObbianContent /></ObbianProvider>;
}

function ObbianContent() {
  const { path, ready, toast } = useObbian();
  if (!ready)
    return (
      <div
        className="flex min-h-screen items-center justify-center text-brand"
        role="status"
      >
        Loading Obbian…
      </div>
    );
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="mx-auto min-h-screen max-w-[1800px] px-5 py-7 md:ml-[220px] md:px-[34px]">
        {path === "/" && <DiscoverScreen />}
        {path === "/search" && <SearchScreen />}
        {path === "/vehicle" && <VehicleScreen />}
        {path === "/checkout" && <CheckoutScreen />}
        {path === "/confirmation" && <ConfirmationScreen />}
        {path === "/tracking" && <TrackingScreen />}
        {path === "/policy" && <PolicyScreen />}
        {path === "/trips" && <TripsScreen />}
        {path === "/saved" && <SavedScreen />}
        {path === "/support" && <SupportScreen />}
      </main>
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 max-w-[90vw] -translate-x-1/2 rounded-xl bg-ink px-6 py-4 text-white shadow-xl"
        >
          {toast}
        </div>
      )}
      <ManageBookingDialog />
      <ContactSupportDialog />
    </div>
  );
}
