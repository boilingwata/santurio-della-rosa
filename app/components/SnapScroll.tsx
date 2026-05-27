"use client";

import { useEffect, useRef, useState } from "react";
import homeBackground from "@/assets/artwork/nhatho san dai.png";
import charactersBackground from "@/assets/artwork/santhuong.png";
import newsBackground from "@/assets/artwork/nhatho.png";
import featuresBackground from "@/assets/artwork/phong ngu.png";

const sectionIds = ["home", "characters", "news", "features"] as const;
const wheelThreshold = 18;
const touchThreshold = 24;
const snapDurationMs = 980;
const snapCooldownMs = snapDurationMs + 180;

type Direction = "down" | "up";
type SectionId = (typeof sectionIds)[number];

const sectionBackgrounds = {
  home: homeBackground.src,
  characters: charactersBackground.src,
  news: newsBackground.src,
  features: featuresBackground.src,
} satisfies Record<SectionId, string>;

const isSectionId = (value: string): value is SectionId =>
  sectionIds.some((sectionId) => sectionId === value);

const easeInOutCubic = (progress: number) =>
  progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

export default function SnapScroll() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<Direction>("down");
  const [transitionKey, setTransitionKey] = useState(0);
  const [targetBackground, setTargetBackground] = useState(sectionBackgrounds.home);
  const activeIndexRef = useRef(0);
  const isSnappingRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const wheelDeltaRef = useRef(0);
  const wheelResetTimeoutRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const transitionTimeoutRef = useRef<number | null>(null);
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    prefersReducedMotionRef.current = prefersReducedMotion;

    const getNearestSectionIndex = () => {
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section, index) => {
        const distance = Math.abs(section.getBoundingClientRect().top);
        if (distance < nearestDistance) {
          nearestIndex = index;
          nearestDistance = distance;
        }
      });

      return nearestIndex;
    };

    const animateScrollTo = (targetY: number, onComplete: () => void) => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      if (prefersReducedMotion) {
        window.scrollTo(0, targetY);
        onComplete();
        return;
      }

      const startY = window.scrollY;
      const distance = targetY - startY;
      const startTime = performance.now();

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / snapDurationMs, 1);
        const easedProgress = easeInOutCubic(progress);

        window.scrollTo(0, startY + distance * easedProgress);

        if (progress < 1) {
          animationFrameRef.current = window.requestAnimationFrame(step);
          return;
        }

        animationFrameRef.current = null;
        onComplete();
      };

      animationFrameRef.current = window.requestAnimationFrame(step);
    };

    const snapTo = (index: number, nextDirection: Direction) => {
      const boundedIndex = Math.max(0, Math.min(index, sections.length - 1));

      if (boundedIndex === activeIndexRef.current && isSnappingRef.current) {
        return;
      }

      const nextSection = sections[boundedIndex];
      const nextSectionId = nextSection.id as SectionId;
      activeIndexRef.current = boundedIndex;
      isSnappingRef.current = true;

      if (!prefersReducedMotionRef.current) {
        setDirection(nextDirection);
        setTargetBackground(sectionBackgrounds[nextSectionId]);
        setTransitionKey((key) => key + 1);
        setIsTransitioning(true);
      }

      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
      }

      window.history.replaceState(null, "", `#${nextSection.id}`);

      animateScrollTo(nextSection.offsetTop, () => {
        isSnappingRef.current = false;
        activeIndexRef.current = getNearestSectionIndex();
      });

      transitionTimeoutRef.current = window.setTimeout(() => {
        setIsTransitioning(false);
        transitionTimeoutRef.current = null;
      }, snapCooldownMs);
    };

    const snapByDelta = (delta: number) => {
      if (isSnappingRef.current || Math.abs(delta) < wheelThreshold) {
        return;
      }

      const currentIndex = getNearestSectionIndex();
      const nextDirection = delta > 0 ? "down" : "up";
      const sectionOffset = nextDirection === "down" ? 1 : -1;
      const nextIndex = currentIndex + sectionOffset;

      if (nextIndex < 0 || nextIndex >= sections.length) {
        return;
      }

      snapTo(nextIndex, nextDirection);
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();

      const deltaMultiplier = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : 1;
      wheelDeltaRef.current += event.deltaY * deltaMultiplier;

      if (wheelResetTimeoutRef.current !== null) {
        window.clearTimeout(wheelResetTimeoutRef.current);
      }

      wheelResetTimeoutRef.current = window.setTimeout(() => {
        wheelDeltaRef.current = 0;
        wheelResetTimeoutRef.current = null;
      }, 120);

      if (Math.abs(wheelDeltaRef.current) < wheelThreshold) {
        return;
      }

      const delta = wheelDeltaRef.current;
      wheelDeltaRef.current = 0;
      snapByDelta(delta);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      const touchStartY = touchStartYRef.current;
      const currentY = event.touches[0]?.clientY;

      if (touchStartY === null || currentY === undefined) {
        return;
      }

      const delta = touchStartY - currentY;
      if (Math.abs(delta) < touchThreshold) {
        return;
      }

      event.preventDefault();
      touchStartYRef.current = currentY;
      snapByDelta(delta);
    };

    const onAnchorClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest('a[href^="#"]');
      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      const targetId = anchor.hash.slice(1);
      if (!isSectionId(targetId)) {
        return;
      }

      const targetIndex = sectionIds.indexOf(targetId);
      if (targetIndex === -1) {
        return;
      }

      event.preventDefault();

      const currentIndex = getNearestSectionIndex();
      const nextDirection = targetIndex >= currentIndex ? "down" : "up";
      snapTo(targetIndex, nextDirection);
    };

    activeIndexRef.current = getNearestSectionIndex();
    document.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("click", onAnchorClick);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
      }

      if (wheelResetTimeoutRef.current !== null) {
        window.clearTimeout(wheelResetTimeoutRef.current);
      }

      document.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("click", onAnchorClick);
    };
  }, []);

  if (!isTransitioning) {
    return null;
  }

  return (
    <div
      key={transitionKey}
      aria-hidden="true"
      className={`section-transition-wipe section-transition-wipe-${direction}`}
    >
      <div
        className="section-transition-wipe__scene"
        style={{ backgroundImage: `url("${targetBackground}")` }}
      />
      <div className="section-transition-wipe__glow" />
      <div className="section-transition-wipe__veil" />
    </div>
  );
}
