"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";
import logo from "@/assets/LOGO/chutranghong.png";
import highlight from "@/assets/square frames/highlight.png";
import soundIcon from "@/assets/buttons/sound.png";
import shareIcon from "@/assets/buttons/share.png";
import LanguageDropdown from "./LanguageDropdown";
import { useLocale } from "./LocaleProvider";
import { navLabels } from "@/lib/locale";

const links = [
  { href: "#home", id: "home" as const },
  { href: "#characters", id: "characters" as const },
  { href: "#news", id: "news" as const },
  { href: "#features", id: "features" as const },
];

export default function Navbar() {
  const { locale } = useLocale();
  const [activeSection, setActiveSection] = useState("home");
  const labels = navLabels[locale];

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const setFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (links.some((link) => link.id === hash)) {
        setActiveSection(hash);
      }
    };

    setFromHash();

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          const nextSection = visible.target.id;
          setActiveSection(nextSection);

          if (window.location.hash !== `#${nextSection}`) {
            window.history.replaceState(null, "", `#${nextSection}`);
          }
        }
      },
      { threshold: [0.55, 0.75] },
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("hashchange", setFromHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", setFromHash);
    };
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-30 h-14 bg-gradient-to-b from-[#1a0d14]/65 via-[#1a0d14]/40 to-transparent backdrop-blur-[2px]">
      <div className="relative mx-auto flex h-full max-w-[1500px] items-center px-6">
        <a
          href="#home"
          aria-label="Santuario della Rosa - Home"
          className="absolute left-4 top-0 z-10 h-[68px] w-[200px] transition-transform hover:-translate-y-px"
        >
          <Image
            src={logo}
            alt="Santuario della Rosa"
            fill
            priority
            sizes="200px"
            className="object-contain p-2"
          />
        </a>

        <ul className="ml-[224px] flex h-full items-stretch">
          {links.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.href} className="relative flex items-stretch">
                <a
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  style={
                    isActive
                      ? {
                          backgroundImage: `url(${highlight.src})`,
                          backgroundSize: "130% 220%",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }
                      : undefined
                  }
                  className={
                    isActive
                      ? "flex h-full cursor-default items-center justify-center px-7 font-isabella text-2xl text-[#F1E5D5]"
                      : "flex h-full cursor-pointer items-center justify-center px-7 font-isabella text-2xl text-[#F1E5D5] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(241,229,213,0.55)] active:scale-95"
                  }
                >
                  {labels[link.id]}
                </a>
              </li>
            );
          })}
        </ul>

        <span
          aria-hidden="true"
          className="mx-auto select-none whitespace-nowrap font-cormorant text-sm uppercase tracking-[0.45em] text-[#F1E5D5]"
        >
          Santuario Della Rosa
        </span>

        <div className="flex items-center gap-5">
          <IconButton src={soundIcon} label="Toggle sound" />
          <IconButton src={shareIcon} label="Share" />
          <LanguageDropdown />
        </div>
      </div>
    </nav>
  );
}

function IconButton({
  src,
  label,
}: {
  src: ImageProps["src"];
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="relative h-7 w-7 cursor-pointer opacity-85 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-110 hover:opacity-100 hover:drop-shadow-[0_0_10px_rgba(241,229,213,0.55)] active:scale-95"
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="28px"
        className="object-contain"
      />
    </button>
  );
}
