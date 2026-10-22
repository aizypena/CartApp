import { useCallback, useEffect, useState } from 'react';

// Custom hook: shows a short-lived message that auto-dismisses after `duration` ms.
export function useToast(duration = 1800) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message) => {
    // A fresh object (with id) restarts the timer even if the same message repeats
    setToast({ id: Date.now(), message });
  }, []);

  // useEffect with cleanup: clear the pending timer when a new toast replaces it or on unmount
  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), duration);
    return () => clearTimeout(timer);
  }, [toast, duration]);

  return { toast, showToast };
}
