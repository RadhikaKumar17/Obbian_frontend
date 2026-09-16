"use client";

import Modal from "@/components/modal";
import { useObbian } from "@/components/obbian-provider";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { useCreateTicket } from "@/hooks/use-support";

export default function ContactSupportDialog() {
  const { setToast, contact, setContact, booking } = useObbian();
  const createTicket = useCreateTicket();
  if (!contact) return null;
  return (
    <Modal title="Contact Obbian support" onClose={() => setContact(false)}>
      <p className="muted mb-5">
        Leave a support request about your booking. Our team responds by
        email — this is not for emergency roadside assistance.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          createTicket.mutate(
            {
              email: String(data.get("email") || "").trim(),
              message: String(data.get("message") || "").trim(),
              bookingId: booking?.id ?? null,
            },
            {
              onSuccess: () => {
                setContact(false);
                setToast("Support request submitted");
              },
              onError: (error) => setToast(error instanceof Error ? error.message : "Something went wrong."),
            },
          );
        }}
      >
        <label className="block">
          Email
          <Input
            name="email"
            type="email"
            required
            className="mb-4 mt-2"
            placeholder="you@example.com"
          />
        </label>
        <label className="block">
          How can we help?
          <Textarea
            name="message"
            required
            minLength={10}
            rows={4}
            className="mb-5 mt-2"
            placeholder="Tell us about your booking or question…"
          />
        </label>
        <Button type="submit" disabled={createTicket.isPending}>Submit request</Button>
      </form>
    </Modal>
  );
}
