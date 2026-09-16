"use client";

import Modal from "@/components/modal";
import { useObbian } from "@/components/obbian-provider";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { localDate } from "@/lib/data";

export default function ManageBookingDialog() {
  const { setToast, manage, setManage, newDate, setNewDate, cancelBooking, rescheduleBooking } = useObbian();
  if (!manage) return null;
  return (
    <Modal title={`Manage ${manage.id}`} onClose={() => setManage(null)}>
      <p className="muted mb-5">
        Change your pickup date or cancel your reservation.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          rescheduleBooking(manage.id, newDate)
            .then(() => {
              setManage(null);
              setToast("Pickup date updated");
            })
            .catch((error) => setToast(error instanceof Error ? error.message : "Something went wrong."));
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
              cancelBooking(manage.id)
                .then(() => {
                  setManage(null);
                  setToast("Booking cancelled");
                })
                .catch((error) => setToast(error instanceof Error ? error.message : "Something went wrong."));
            }}
          >
            Cancel reservation
          </Button>
        </div>
      </form>
      <p className="muted mt-5">
        Cancellation follows the standard rental cancellation policy.
      </p>
    </Modal>
  );
}
