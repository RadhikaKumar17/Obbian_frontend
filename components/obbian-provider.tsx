"use client";

import { useAssistant } from "@/hooks/use-assistant";
import { useConfig } from "@/hooks/use-config";
import { downloadReceipt, useBookings, useCreateBooking, useUpdateBooking } from "@/hooks/use-bookings";
import { useGeolocation } from "@/hooks/use-geolocation";
import { useLiveTracking } from "@/hooks/use-live-tracking";
import { useAskPolicy } from "@/hooks/use-policies";
import { useSaved, useToggleSave } from "@/hooks/use-saved";
import { useTracking } from "@/hooks/use-tracking";
import { useSearch, useVehicles, type GeoPoint } from "@/hooks/use-vehicles";
import type { Booking, Vehicle, RagAnswer, AssistantReply, AssistantAction } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}

function useObbianState() {
  const path = usePathname();
  const router = useRouter();

  const configQuery = useConfig();
  const config = configQuery.data;

  const [date, setDateState] = useState("");
  useEffect(() => {
    if (config && !date) setDateState(config.defaultDate);
  }, [config, date]);
  function setDate(value: string) {
    setDateState(value || config?.defaultDate || "");
  }

  const [category, setCategory] = useState("SUV");
  const [transmission, setTransmission] = useState("Automatic");
  const [radius, setRadius] = useState("10");
  const [budget, setBudget] = useState("3000");
  const [sort, setSort] = useState("recommended");
  useEffect(() => {
    if (config) {
      setRadius((r) => (r === "10" ? config.defaultRadius : r));
      setBudget((b) => (b === "3000" ? config.defaultBudget : b));
      setSort((s) => (s === "recommended" ? config.defaultSort : s));
    }
  }, [config]);

  const [userLocation, setUserLocation] = useState<GeoPoint | null>(null);
  const geolocation = useGeolocation();
  const origin = userLocation ?? (config ? { lat: config.originLat, lng: config.originLng } : null);

  const vehiclesQuery = useVehicles(date, origin);
  const vehicles = vehiclesQuery.data ?? [];
  const searchQuery = useSearch({ date, budget, radius, sort, category, transmission, origin });
  const results = searchQuery.data?.results ?? [];
  const recommendedId = searchQuery.data?.recommendedId ?? null;

  const savedQuery = useSaved();
  const saved = savedQuery.data ?? [];
  const toggleSaveMutation = useToggleSave();

  const bookingsQuery = useBookings();
  const bookings = bookingsQuery.data ?? [];
  const createBooking = useCreateBooking();
  const updateBooking = useUpdateBooking();

  const [hasSelectedVehicle, setHasSelectedVehicle] = useState(false);
  const [vehicleId, setVehicleId] = useState("creta");
  const [selectedBooking, setSelectedBooking] = useState("");
  useEffect(() => {
    if (!selectedBooking && bookings.length) {
      const confirmed = bookings.find((b) => b.status === "Confirmed") || bookings[0];
      if (confirmed) setSelectedBooking(confirmed.id);
    }
  }, [bookings, selectedBooking]);

  const [toast, setToast] = useState("");
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(t);
  }, [toast]);
  useEffect(() => {
    if (geolocation.error) setToast(geolocation.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geolocation.error]);

  const [tab, setTab] = useState("Upcoming");
  const [manage, setManage] = useState<Booking | null>(null);
  const [newDate, setNewDate] = useState("");

  const [helpQuery, setHelpQuery] = useState("");
  const [faq, setFaq] = useState("");
  const [contact, setContact] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<({ question: string } & RagAnswer)[]>([]);
  const askPolicy = useAskPolicy();
  const chatEnd = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messages.length) chatEnd.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);

  const car = vehicles.find((v) => v.id === vehicleId) || vehicles[0];
  const booking = bookings.find((b) => b.id === selectedBooking) || bookings.find((b) => b.status === "Confirmed");
  const bookedCar = vehicles.find((v) => v.id === booking?.vehicleId) || car;

  const tracking = useTracking(booking?.id ?? "", config?.trackingPollMs ?? 10000).data ?? null;
  useLiveTracking(booking?.id ?? "");

  const assistant = useAssistant();
  const [assistantMessages, setAssistantMessages] = useState<({ question: string } & AssistantReply)[]>([]);
  const [assistantError, setAssistantError] = useState("");

  function askAssistant(message: string) {
    if (!message.trim() || assistant.isPending) return;
    setAssistantError("");
    const history = assistantMessages.flatMap(m => [
      { role: 'user' as const, content: m.question.slice(0, 600) },
      { role: 'assistant' as const, content: m.answer.slice(0, 600) },
    ]).slice(-6);
    assistant.mutate({ message, history, context: { date, budget, radius, category, transmission,
      lat: origin?.lat, lng: origin?.lng, vehicleId: hasSelectedVehicle ? vehicleId : undefined, bookingId: booking?.id } }, {
      onSuccess: response => {
        setAssistantMessages(previous => [...previous, { question: message, ...response }]);
        if (response.filters) {
          setDate(response.filters.date); setBudget(response.filters.budget); setRadius(response.filters.radius);
          setCategory(response.filters.category); setTransmission(response.filters.transmission);
        }
      },
      onError: error => setAssistantError(errorMessage(error)),
    });
  }

  function followAssistantAction(action: AssistantAction) {
    if (action.date) setDate(action.date);
    if (action.vehicleId) { setVehicleId(action.vehicleId); setHasSelectedVehicle(true); }
    if (action.bookingId) setSelectedBooking(action.bookingId);
    const routes = { search: '/search', vehicle: '/vehicle', checkout: '/checkout', trips: '/trips', tracking: '/tracking' };
    router.push(routes[action.type]);
  }

  const ready = Boolean(config) && vehiclesQuery.isSuccess && savedQuery.isSuccess && bookingsQuery.isSuccess && Boolean(date);

  function select(v: Vehicle) {
    setHasSelectedVehicle(true);
    setVehicleId(v.id);
    router.push("/vehicle");
  }

  function toggleSave(id: string) {
    toggleSaveMutation.mutate(
      { id, save: !saved.includes(id) },
      { onError: (error) => setToast(errorMessage(error)) },
    );
  }

  async function receipt(b: Booking) {
    try {
      await downloadReceipt(b.id);
    } catch (error) {
      setToast(errorMessage(error));
    }
  }

  const idempotencyKeyRef = useRef<string | null>(null);
  function reserve(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!car) return;
    const data = new FormData(e.currentTarget);
    if (!idempotencyKeyRef.current) idempotencyKeyRef.current = crypto.randomUUID();
    createBooking.mutate(
      {
        input: {
          vehicleId: car.id,
          date,
          name: String(data.get("name") || "").trim(),
          mobile: String(data.get("mobile") || "").trim(),
          licence: String(data.get("licence") || "").trim(),
          paymentMethod: String(data.get("paymentMethod") || ""),
          termsAccepted: data.get("termsAccepted") === "on",
        },
        idempotencyKey: idempotencyKeyRef.current,
      },
      {
        onSuccess: (created) => {
          idempotencyKeyRef.current = null;
          setSelectedBooking(created.id);
          router.push("/confirmation");
        },
        onError: (error) => setToast(errorMessage(error)),
      },
    );
  }

  function cancelBooking(id: string) {
    return updateBooking.mutateAsync({ id, action: "cancel" });
  }
  function rescheduleBooking(id: string, nextDate: string) {
    return updateBooking.mutateAsync({ id, action: "reschedule", date: nextDate });
  }
  function completeBooking(id: string) {
    return updateBooking.mutateAsync({ id, action: "complete" });
  }

  function locateMe() {
    geolocation.locate((coords) => {
      setUserLocation(coords);
      setToast("Searching near your location");
    });
  }

  function ask(q: string) {
    if (!q.trim() || askPolicy.isPending) return;
    setQuestion("");
    askPolicy.mutate(q, {
      onSuccess: (response) => {
        setMessages((m) => [...m, { question: q, ...response }]);
      },
      onError: (error) => setToast(errorMessage(error)),
    });
  }

  return {
    path, router, ready,
    assistantMessages, assistantError, askingAssistant: assistant.isPending, askAssistant, followAssistantAction,
    config, vehicles,
    saved, bookings, vehicleId, setVehicleId, selectedBooking, setSelectedBooking,
    date, setDate, radius, setRadius, budget, setBudget, sort, setSort, category, setCategory, transmission, setTransmission,
    toast, setToast, tab, setTab, manage, setManage, newDate, setNewDate,
    tracking,
    userLocation, setUserLocation, origin, locateMe, locating: geolocation.loading,
    helpQuery, setHelpQuery, faq, setFaq, contact, setContact,
    question, setQuestion, messages, asking: askPolicy.isPending, chatEnd,
    car, booking, bookedCar, results, recommendedId,
    reserving: createBooking.isPending,
    completing: updateBooking.isPending,
    select, toggleSave, receipt, reserve, ask, cancelBooking, rescheduleBooking, completeBooking,
  };
}

const ObbianContext = createContext<ReturnType<typeof useObbianState> | null>(null);

export function ObbianProvider({ children }: { children: ReactNode }) {
  const state = useObbianState();
  return <ObbianContext.Provider value={state}>{children}</ObbianContext.Provider>;
}

export function useObbian() {
  const context = useContext(ObbianContext);
  if (!context) throw new Error("useObbian must be used inside ObbianProvider");
  return context;
}
