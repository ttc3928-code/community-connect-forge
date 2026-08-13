import React from 'react';
import { LifeBuoy } from 'lucide-react';
import { useSOS } from '@/contexts/SOSContext';
import { useLocation } from '@/lib/router-compat';

/**
 * Always-available crisis button. Fixed bottom-right on every page
 * except the auth screens.
 */
export const SOSFloatingButton: React.FC = () => {
  const { openSOS, open } = useSOS();
  const location = useLocation();

  const hidden =
    open ||
    location.pathname.startsWith('/auth') ||
    location.pathname.startsWith('/reset-password');

  if (hidden) return null;

  return (
    <button
      type="button"
      onClick={openSOS}
      aria-label="Emergency help"
      className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full bg-destructive px-4 py-3 text-sm font-semibold text-destructive-foreground shadow-lg shadow-destructive/30 transition-transform hover:scale-105 active:scale-95"
    >
      <LifeBuoy className="h-5 w-5" />
      <span className="hidden sm:inline">Emergency</span>
    </button>
  );
};

export default SOSFloatingButton;
