"use client";

import type { ReactNode } from "react";
import { LocaleProvider } from "./LocaleProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return <LocaleProvider>{children}</LocaleProvider>;
}
