import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { SOSModal } from '@/components/SOSModal';

interface SOSContextValue {
  open: boolean;
  openSOS: () => void;
  closeSOS: () => void;
  setOpen: (open: boolean) => void;
}

const SOSContext = createContext<SOSContextValue | undefined>(undefined);

export const SOSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const openSOS = useCallback(() => setOpen(true), []);
  const closeSOS = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ open, openSOS, closeSOS, setOpen }), [open, openSOS, closeSOS]);

  return (
    <SOSContext.Provider value={value}>
      {children}
      <SOSModal open={open} onOpenChange={setOpen} />
    </SOSContext.Provider>
  );
};

export const useSOS = (): SOSContextValue => {
  const ctx = useContext(SOSContext);
  if (!ctx) {
    // Safe fallback so components never crash outside the provider
    return { open: false, openSOS: () => {}, closeSOS: () => {}, setOpen: () => {} };
  }
  return ctx;
};
