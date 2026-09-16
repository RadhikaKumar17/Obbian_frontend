import { useCallback, useState } from "react";

export function useGeolocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const locate = useCallback((onSuccess: (coords: { lat: number; lng: number }) => void) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setError("Geolocation isn't available in this browser.");
      return;
    }
    setLoading(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLoading(false);
        onSuccess({ lat: position.coords.latitude, lng: position.coords.longitude });
      },
      (err) => {
        setLoading(false);
        setError(err.code === err.PERMISSION_DENIED ? "Location permission denied." : "Couldn't get your location.");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

  return { locate, loading, error };
}
