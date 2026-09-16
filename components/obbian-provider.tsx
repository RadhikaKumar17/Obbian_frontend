"use client";

import { seedPast } from "@/data/seed-past";
import { answerPolicy, dateLabel, localDate, money, tomorrow, vehicles, type Booking, type Vehicle } from "@/lib/data";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

function useObbianState() {
  const path = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState<string[]>(["creta", "seltos", "xuv300"]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [vehicleId, setVehicleId] = useState("creta");
  const [selectedBooking, setSelectedBooking] = useState("");
  const [date, setDate] = useState("");
  const [radius, setRadius] = useState("10");
  const [budget, setBudget] = useState("3000");
  const [sort, setSort] = useState("recommended");
  const [toast, setToast] = useState("");
  const [tab, setTab] = useState("Upcoming");
  const [manage, setManage] = useState<Booking | null>(null);
  const [newDate, setNewDate] = useState("");
  const [distance, setDistance] = useState(2.1);
  const [paused, setPaused] = useState(false);
  const [helpQuery, setHelpQuery] = useState("");
  const [faq, setFaq] = useState("");
  const [contact, setContact] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<
    { question: string; answer: string; source?: string }[]
  >([]);
  const [asking, setAsking] = useState(false);
  const chatEnd = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let fallback = true;
    try {
      const raw = localStorage.getItem("obbian-v1");
      if (raw) {
        const s = JSON.parse(raw);
        if (Array.isArray(s.saved) && Array.isArray(s.bookings)) {
          setSaved(
            s.saved.filter((id: string) => vehicles.some((v) => v.id === id)),
          );
          setBookings(
            s.bookings.filter((b: Booking) =>
              vehicles.some((v) => v.id === b.vehicleId),
            ),
          );
          setVehicleId(
            vehicles.some((v) => v.id === s.vehicleId) ? s.vehicleId : "creta",
          );
          setSelectedBooking(s.selectedBooking || "");
          setDate(s.date && s.date >= localDate() ? s.date : tomorrow());
          fallback = false;
        }
      }
    } catch { }
    if (fallback) {
      setDate(tomorrow());
      setBookings([
        {
          id: "OBB-48291",
          vehicleId: "creta",
          date: tomorrow(),
          status: "Confirmed",
          total: 2899,
          name: "Radhika Kumar",
        },
        ...seedPast,
      ]);
      setSelectedBooking("OBB-48291");
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem(
          "obbian-v1",
          JSON.stringify({ saved, bookings, vehicleId, selectedBooking, date }),
        );
      } catch { }
  }, [ready, saved, bookings, vehicleId, selectedBooking, date]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(t);
  }, [toast]);
  useEffect(() => {
    if (path != "/tracking" || paused) return;
    const t = setInterval(
      () => setDistance((d) => Math.max(0, Number((d - 0.1).toFixed(1)))),
      3000,
    );
    return () => clearInterval(t);
  }, [path, paused]);
  useEffect(() => {
    if (messages.length)
      chatEnd.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);
  const car = vehicles.find((v) => v.id === vehicleId) || vehicles[0];
  const booking =
    bookings.find((b) => b.id === selectedBooking) ||
    bookings.find((b) => b.status === "Confirmed");
  const bookedCar = vehicles.find((v) => v.id === booking?.vehicleId) || car;
  const results = vehicles
    .filter(
      (v) =>
        v.available &&
        v.price <= Number(budget) &&
        v.distance <= Number(radius),
    )
    .sort((a, b) =>
      sort === "price"
        ? a.price - b.price
        : sort === "rating"
          ? b.rating - a.rating
          : a.distance - b.distance,
    );
  function select(v: Vehicle) {
    setVehicleId(v.id);
    router.push("/vehicle");
  }
  function toggleSave(id: string) {
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }
  function receipt(b: Booking) {
    const v = vehicles.find((v) => v.id === b.vehicleId);
    const blob = new Blob(
      [
        `OBBIAN — DEMO RECEIPT\nBooking: ${b.id}\nVehicle: ${v?.name}\nDate: ${dateLabel(b.date)}\nDriver: ${b.name}\nStatus: ${b.status}\nTotal: ${money(b.total)}\nThis is a frontend demonstration. No payment was collected.\n`,
      ],
      { type: "text/plain;charset=utf-8" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${b.id}-receipt.txt`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function reserve(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const b: Booking = {
      id: `OBB-${Date.now().toString().slice(-7)}`,
      vehicleId: car.id,
      date,
      status: "Confirmed",
      total: car.price + 249,
      name: String(data.get("name")).trim(),
    };
    setBookings((bs) => [b, ...bs]);
    setSelectedBooking(b.id);
    setDistance(2.1);
    router.push("/confirmation");
  }
  function ask(q: string) {
    if (!q.trim() || asking) return;
    setAsking(true);
    setQuestion("");
    const policy = answerPolicy(q);
    setMessages((m) => [
      ...m,
      {
        question: q,
        answer:
          policy?.answer ||
          "I don’t have a matching answer in the demo policy library. Please contact support for help with this question.",
        source: policy?.source,
      },
    ]);
    setAsking(false);
  }

  return { path, router, ready, setReady, saved, setSaved, bookings, setBookings, vehicleId, setVehicleId, selectedBooking, setSelectedBooking, date, setDate, radius, setRadius, budget, setBudget, sort, setSort, toast, setToast, tab, setTab, manage, setManage, newDate, setNewDate, distance, setDistance, paused, setPaused, helpQuery, setHelpQuery, faq, setFaq, contact, setContact, question, setQuestion, messages, setMessages, asking, setAsking, chatEnd, car, booking, bookedCar, results, select, toggleSave, receipt, reserve, ask };
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
