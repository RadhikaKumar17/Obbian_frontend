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
import { DemoAuthProvider } from "@/components/demo-auth-provider";
import Sidebar from "@/components/sidebar";
import { LogoMark, Spinner } from "@/components/ui/icons";

export default function Obbian() {
  return <DemoAuthProvider><ObbianProvider><ObbianContent /></ObbianProvider></DemoAuthProvider>;
}

function ObbianContent() {
  const { path, ready, toast } = useObbian();
  if (!ready)
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center gap-4 text-sm font-medium text-brand"
        role="status"
      >
        <LogoMark size={48} />
        <span className="flex items-center gap-2"><Spinner size={16} />Loading Obbian…</span>
      </div>
    );
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:pl-56"><main key={path} className="mx-auto min-h-screen max-w-[1400px] animate-fade-up p-5 md:p-8">
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
      </main></div>
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 max-w-[90vw] -translate-x-1/2 animate-fade-up rounded-2xl bg-ink px-5 py-3.5 text-sm font-medium text-white shadow-lift"
        >
          {toast}
        </div>
      )}
      <ManageBookingDialog />
      <ContactSupportDialog />
    </div>
  );
}
