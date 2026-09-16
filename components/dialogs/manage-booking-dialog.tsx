"use client";

import Modal from "@/components/modal";
import { useObbian } from "@/components/obbian-provider";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { localDate } from "@/lib/data";

export default function ManageBookingDialog() {
  const { setBookings, setToast, manage, setManage, newDate, setNewDate } = useObbian();
  if (!manage) return null;
  return (
    <Modal title={`Manage ${manage.id}`} onClose={() => setManage(null)}>
      <p className="muted mb-5">
        Change your pickup date or cancel your demo reservation.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setBookings((bs) =>
            bs.map((b) =>
              b.id === manage.id ? { ...b, date: newDate } : b,
            ),
          );
          setManage(null);
          setToast("Pickup date updated");
        }}
      >
        <label className="block">
          New pickup date
          <Input
            aria-label="New pickup date"
            type="date"
            min={localDate()}
            required
            className="my-3"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
        </label>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button type="submit">Save changes</Button>
          <Button
            secondary
            onClick={() => {
              setBookings((bs) =>
                bs.map((b) =>
                  b.id === manage.id ? { ...b, status: "Cancelled" } : b,
                ),
              );
              setManage(null);
              setToast("Demo booking cancelled");
            }}
          >
            Cancel reservation
          </Button>
        </div>
      </form>
      <p className="muted mt-5">
        Cancellation is final for this demo booking. No real payment or
        refund is processed.
      </p>
    </Modal>
  );
}
