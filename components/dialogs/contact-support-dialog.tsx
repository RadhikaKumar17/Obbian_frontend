"use client";

import Modal from "@/components/modal";
import { useObbian } from "@/components/obbian-provider";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";

export default function ContactSupportDialog() {
  const { setToast, contact, setContact } = useObbian();
  if (!contact) return null;
  return (
    <Modal title="Contact Obbian support" onClose={() => setContact(false)}>
      <p className="muted mb-5">
        Leave a demo support request about your booking. This preview does
        not send messages or provide emergency assistance.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setContact(false);
          setToast(
            "Demo request recorded for this session — no message was sent.",
          );
        }}
      >
        <label className="block">
          Email
          <Input
            type="email"
            required
            className="mb-4 mt-2"
            placeholder="you@example.com"
          />
        </label>
        <label className="block">
          How can we help?
          <Textarea
            required
            minLength={10}
            rows={4}
            className="mb-5 mt-2"
            placeholder="Tell us about your booking or question…"
          />
        </label>
        <Button type="submit">Submit demo request</Button>
      </form>
    </Modal>
  );
}
