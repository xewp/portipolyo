"use client";

import { useEffect, useRef, useState, type FocusEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { navigation, site } from "../../data/site";
import { transitionEase } from "../../lib/motion";
import { useTheme } from "./ThemeProvider";

function ThemeIcon({ dark }: { dark: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      {dark ? (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </>
      ) : (
        <path d="M20.4 14A8.7 8.7 0 0 1 10 3.6 8.7 8.7 0 1 0 20.4 14Z" />
      )}
    </svg>
  );
}

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const previousScroll = useRef(0);
  const scrollDirection = useRef(0);
  const scrollDistance = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - previousScroll.current;
    previousScroll.current = latest;
    if (reduceMotion || menuOpen || focusWithin || latest < 96) {
      setHidden(false);
      scrollDistance.current = 0;
      return;
    }

    const direction = Math.sign(delta);
    if (direction !== scrollDirection.current) scrollDistance.current = 0;
    scrollDirection.current = direction;
    scrollDistance.current += Math.abs(delta);
    if (scrollDistance.current > 8) setHidden(direction > 0);
  });

  useEffect(() => {
    if (reduceMotion || menuOpen || focusWithin) setHidden(false);
  }, [reduceMotion, menuOpen, focusWithin]);

  useEffect(() => {
    if (!menuOpen) return;
    const drawer = drawerRef.current;
    if (!drawer) return;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const backgroundElements = Array.from(document.body.children)
      .filter((element): element is HTMLElement => element instanceof HTMLElement && !element.contains(drawer))
      .map((element) => ({ element, inert: element.inert }));
    backgroundElements.forEach(({ element }) => { element.inert = true; });
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    const getFocusable = () => Array.from(drawer.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )).filter((element) => element.getClientRects().length > 0);

    const frame = requestAnimationFrame(() => getFocusable()[0]?.focus());

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = getFocusable();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first) {
        event.preventDefault();
        drawer?.focus();
      } else if (event.shiftKey && (document.activeElement === first || !drawer?.contains(document.activeElement))) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !drawer?.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    }

    function onFocusIn(event: globalThis.FocusEvent) {
      if (event.target instanceof Node && !drawer?.contains(event.target)) getFocusable()[0]?.focus();
    }

    function onResize() {
      if (window.innerWidth >= 768) setMenuOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("resize", onResize);
      backgroundElements.forEach(({ element, inert }) => { element.inert = inert; });
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      if (menuButtonRef.current?.getClientRects().length) menuButtonRef.current.focus();
      else headerRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    };
  }, [menuOpen]);

  function handleBlur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusWithin(false);
  }

  const themeLabel = `Switch to ${theme === "light" ? "dark" : "light"} mode`;
  const iconButtonClass = "inline-flex h-11 w-11 items-center justify-center border border-line bg-paper text-ink hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

  return (
    <>
      <motion.header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-md"
        initial={false}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: reduceMotion ? 0 : 0.35, ease: transitionEase }}
        onFocusCapture={() => { setFocusWithin(true); setHidden(false); }}
        onBlurCapture={handleBlur}
      >
        <div className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-14">
          <a href="#top" aria-label={`${site.name}, back to top`} data-cursor="large" className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            <span className="flex h-9 w-9 items-center justify-center bg-ink text-xs font-bold tracking-tight text-paper" aria-hidden="true">{site.initials}</span>
            <span className="font-display text-base font-bold tracking-tight sm:text-lg">{site.name}</span>
          </a>

          <div className="flex items-center gap-2 md:gap-6 lg:gap-10">
            <nav aria-label="Main navigation" className="hidden items-center gap-5 md:flex lg:gap-8">
              {navigation.map((item) => (
                <a key={item.href} href={item.href} data-cursor="large" className="group inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                  <span className="text-[10px] text-muted">{item.number}</span>
                  <span className="group-hover:text-accent">{item.label}</span>
                </a>
              ))}
            </nav>
            <button type="button" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel} data-cursor="large" className={iconButtonClass}>
              <ThemeIcon dark={theme === "dark"} />
            </button>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="portfolio-mobile-navigation"
              data-cursor="large"
              className={`${iconButtonClass} md:hidden`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h18M3 16h18" /></svg>
            </button>
          </div>
        </div>
      </motion.header>

      {mounted && createPortal(
        <AnimatePresence>
          {menuOpen && (
            <motion.div className="fixed inset-0 z-[70]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0.15 : 0.25 }}>
              <div className="absolute inset-0 bg-ink/35" onClick={() => setMenuOpen(false)} aria-hidden="true" />
              <motion.div
                ref={drawerRef}
                id="portfolio-mobile-navigation"
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-navigation-title"
                tabIndex={-1}
                className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col overflow-y-auto border-l border-line bg-paper px-6 pb-8 pt-5 text-ink sm:px-8"
                initial={{ x: reduceMotion ? 0 : "100%" }}
                animate={{ x: 0 }}
                exit={{ x: reduceMotion ? 0 : "100%" }}
                transition={{ duration: reduceMotion ? 0.15 : 0.4, ease: transitionEase }}
              >
                <div className="flex items-center justify-between gap-4 border-b border-line pb-5">
                  <span id="mobile-navigation-title" className="text-xs font-semibold uppercase tracking-[0.12em]">Navigation</span>
                  <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation menu" data-cursor="large" className={iconButtonClass}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg>
                  </button>
                </div>
                <nav aria-label="Mobile navigation" className="my-auto py-12">
                  {navigation.map((item) => (
                    <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} data-cursor="large" className="flex items-baseline gap-4 border-b border-line py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                      <span className="text-xs text-muted">{item.number}</span>
                      <span className="font-display text-5xl font-bold tracking-tight">{item.label}</span>
                      <span aria-hidden="true" className="ml-auto text-xl text-accent">↗</span>
                    </a>
                  ))}
                </nav>
                <div className="flex items-center justify-between gap-4 border-t border-line pt-5">
                  <span className="text-sm font-semibold">{site.name}</span>
                  <button type="button" onClick={toggleTheme} aria-label={themeLabel} data-cursor="large" className={iconButtonClass}>
                    <ThemeIcon dark={theme === "dark"} />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
