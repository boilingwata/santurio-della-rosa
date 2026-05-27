"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import languageIcon from "@/assets/buttons/language.png";
import { languageOptions, type Locale } from "@/lib/locale";
import { useLocale } from "./LocaleProvider";

export default function LanguageDropdown() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const selectLocale = (next: Locale) => {
    setLocale(next);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label="Language"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((current) => !current)}
        className="relative h-7 w-7 cursor-pointer opacity-85 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-110 hover:opacity-100 hover:drop-shadow-[0_0_10px_rgba(241,229,213,0.55)] active:scale-95"
      >
        <Image
          src={languageIcon}
          alt=""
          fill
          sizes="28px"
          className="object-contain"
        />
      </button>

      {open ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 top-full z-40 mt-2 min-w-[5.5rem] overflow-hidden rounded-md border border-[#F1E5D5]/20 bg-[#1a0d14]/95 py-1 shadow-[0_12px_28px_rgba(19,8,17,0.55)] backdrop-blur-sm"
        >
          {languageOptions.map((option) => {
            const isSelected = locale === option.value;
            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => selectLocale(option.value)}
                  className={`w-full cursor-pointer px-4 py-2 text-left font-cormorant text-sm tracking-wide transition-colors ${
                    isSelected
                      ? "bg-[#F1E5D5]/15 text-[#F1E5D5]"
                      : "text-[#c4bab0] hover:bg-[#F1E5D5]/10 hover:text-[#F1E5D5]"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
