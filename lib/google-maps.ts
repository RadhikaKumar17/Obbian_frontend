let loading: Promise<void> | undefined;

export function loadGoogleMaps(): Promise<void> {
  if (loading) return loading;
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!key) return Promise.reject(new Error('Map unavailable. You can still browse and reserve vehicles.'));
  loading = new Promise((resolve, reject) => {
    const callbackWindow = window as Window & { obbianMapsReady?: () => void; gm_authFailure?: () => void };
    const script = document.createElement('script');
    const timer = window.setTimeout(() => reject(new Error('Map loading timed out. Please reload to try again.')), 20000);
    callbackWindow.obbianMapsReady = () => { clearTimeout(timer); resolve(); };
    callbackWindow.gm_authFailure = () => {
      clearTimeout(timer);
      window.dispatchEvent(new Event('obbian-map-error'));
      reject(new Error('Map unavailable. Please try again later.'));
    };
    script.src = `https://maps.googleapis.com/maps/api/js?${new URLSearchParams({ key, v: 'weekly', loading: 'async', libraries: 'marker', callback: 'obbianMapsReady' })}`;
    script.async = true;
    script.onerror = () => { clearTimeout(timer); reject(new Error('Could not load the map. Check your connection and reload.')); };
    document.head.appendChild(script);
  });
  return loading;
}
