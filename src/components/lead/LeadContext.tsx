"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type OpenOptions = {
  tariff?: string;
  program?: string;
  source?: string;
};

type LeadContextValue = {
  isOpen: boolean;
  preset: OpenOptions;
  open: (opts?: OpenOptions) => void;
  close: () => void;
};

const LeadContext = createContext<LeadContextValue | null>(null);

export function LeadProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preset, setPreset] = useState<OpenOptions>({});

  const open = useCallback((opts: OpenOptions = {}) => {
    setPreset(opts);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <LeadContext.Provider value={{ isOpen, preset, open, close }}>
      {children}
    </LeadContext.Provider>
  );
}

export function useLead() {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error("useLead must be used within LeadProvider");
  return ctx;
}
