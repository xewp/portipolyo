import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ══════════════════════════════════════════════════════════
   Browser helpers
   ══════════════════════════════════════════════════════════ */

const getBrowser = () => {
  const ua = navigator.userAgent;
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Edg")) return "Microsoft Edge";
  if (ua.includes("OPR") || ua.includes("Opera")) return "Opera";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  return "Unknown";
};

const getOS = () => {
  const ua = navigator.userAgent;
  if (ua.includes("Win")) return "Windows";
  if (ua.includes("Mac")) return "macOS";
  if (ua.includes("Android")) return "Android";
  if (/iPhone|iPad|iPod/.test(ua)) return "iOS";
  if (ua.includes("Linux")) return "Linux";
  return navigator.platform || "Unknown";
};

const getDevice = () => {
  const ua = navigator.userAgent;
  if (/iPad|Tablet/i.test(ua)) return "Tablet";
  if (/Mobi|Android|iPhone/i.test(ua)) return "Mobile";
  return "Desktop";
};

const getResolution = () =>
  `${window.screen.width} × ${window.screen.height}`;
const getLanguage = () => navigator.language || "Unknown";
const getTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown";
const getUserAgent = () => {
  const ua = navigator.userAgent;
  return ua.length > 70 ? ua.slice(0, 70) + "…" : ua;
};

const fetchIPInfo = async () => {
  try {
    const r = await fetch("https://ipapi.co/json/");
    if (!r.ok) throw new Error();
    const d = await r.json();
    return {
      ip: d.ip || "Unknown",
      city: d.city || "Unknown",
      region: d.region || "",
      country: d.country_name || "Unknown",
      isp: d.org || "Unknown",
    };
  } catch {
    return {
      ip: "Unavailable",
      city: "Unknown",
      region: "",
      country: "Unknown",
      isp: "Unknown",
    };
  }
};

/* ══════════════════════════════════════════════════════════
   Background — blobs + grain + vignette
   ══════════════════════════════════════════════════════════ */

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const blobData = [
  { s: 520, x: "25%", y: "18%", d: 24, dx: 40, dy: -35 },
  { s: 380, x: "62%", y: "55%", d: 30, dx: -30, dy: 45 },
  { s: 300, x: "72%", y: "20%", d: 22, dx: 25, dy: 30 },
  { s: 260, x: "12%", y: "65%", d: 28, dx: -20, dy: -25 },
];

const Background = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-[#131313]" />
    {blobData.map((b, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: b.s,
          height: b.s,
          left: b.x,
          top: b.y,
          background: `radial-gradient(circle, rgba(255,255,255,${
            i % 2 === 0 ? 0.025 : 0.018
          }) 0%, transparent 70%)`,
          filter: "blur(100px)",
        }}
        animate={{
          x: [0, b.dx, -b.dx * 0.6, 0],
          y: [0, b.dy, -b.dy * 0.5, 0],
        }}
        transition={{ duration: b.d, repeat: Infinity, ease: "linear" }}
      />
    ))}
    <div
      className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
      style={{ backgroundImage: GRAIN, backgroundSize: "128px 128px" }}
    />
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)",
      }}
    />
  </div>
);

/* ══════════════════════════════════════════════════════════
   Thinking — 2×2 dot grid + text
   ══════════════════════════════════════════════════════════ */

const ThinkingDots = () => (
  <motion.div
    className="flex items-center gap-3"
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="grid grid-cols-2 gap-[5px]">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="w-[5px] h-[5px] rounded-full bg-white/40"
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
    <span className="font-vt323 text-xl text-white/35 tracking-wide">
      thinking…
    </span>
  </motion.div>
);

/* ══════════════════════════════════════════════════════════
   FakeAIAssistant
   ══════════════════════════════════════════════════════════ */

const FakeAIAssistant = ({ isOpen, onClose }) => {
  /* ── State ───────────────────────────────────────────── */
  const [phase, setPhase] = useState("idle");
  // idle → thinking → sequence → disclaimer → reveal → answer → done
  const [userMsg, setUserMsg] = useState("");
  const [typingText, setTypingText] = useState(""); // visible typing
  const [cursorOn, setCursorOn] = useState(true);

  // Sequence phase (typewriter lines)
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(null);
  const [typedLen, setTypedLen] = useState(0);

  // Disclaimer + answer phase (full-screen typewriter)
  const [bigText, setBigText] = useState("");
  const [bigTypedLen, setBigTypedLen] = useState(0);

  // Reveal phase (2 items per page)
  const [revealItems, setRevealItems] = useState(null);

  const abortRef = useRef(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  /* ── Cursor blink ────────────────────────────────────── */
  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  /* ── Auto-scroll (sequence phase) ────────────────────── */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, typedLen]);

  /* ── Focus hidden input on open/idle ─────────────────── */
  useEffect(() => {
    if (isOpen && phase === "idle") {
      const t = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [isOpen, phase]);

  /* ── Reset on close ──────────────────────────────────── */
  useEffect(() => {
    if (!isOpen) {
      abortRef.current = true;
      const t = setTimeout(() => {
        setPhase("idle");
        setUserMsg("");
        setTypingText("");
        setLines([]);
        setCurrentLine(null);
        setTypedLen(0);
        setBigText("");
        setBigTypedLen(0);
        setRevealItems(null);
        abortRef.current = false;
      }, 400);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  /* ── Escape for closing modal ────────────────────────── */
  useEffect(() => {
    if (!isOpen) return;
    const handle = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [isOpen, onClose]);

  /* ── Helpers ─────────────────────────────────────────── */
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const addLine = (text, type = "system") => {
    setLines((p) => [
      ...p,
      { text, type, id: `${Date.now()}-${Math.random()}` },
    ]);
  };

  const typeLine = async (text, type = "system", speed = 28) => {
    if (abortRef.current) return;
    setCurrentLine({ text, type });
    setTypedLen(0);
    for (let i = 1; i <= text.length; i++) {
      if (abortRef.current) {
        setCurrentLine(null);
        return;
      }
      setTypedLen(i);
      await sleep(speed + Math.random() * 18);
    }
    addLine(text, type);
    setCurrentLine(null);
    setTypedLen(0);
  };

  const typeFullscreen = async (text, speed = 26) => {
    if (abortRef.current) return;
    setBigText(text);
    setBigTypedLen(0);
    for (let i = 1; i <= text.length; i++) {
      if (abortRef.current) return;
      setBigTypedLen(i);
      await sleep(speed + Math.random() * 12);
    }
  };

  /* ── Sequence runner ─────────────────────────────────── */
  useEffect(() => {
    if (phase !== "sequence") return;

    const run = async () => {
      // Fire IP fetch early
      const ipPromise = fetchIPInfo();

      // Suspense messages
      const steps = [
        { text: "Searching...", pause: 800 },
        { text: "Analyzing...", pause: 600 },
        { text: "Connecting...", pause: 1000 },
        { text: "Reading browser information...", pause: 700 },
        { text: "Locating network...", pause: 900 },
        { text: "Matching device...", pause: 600 },
        { text: "Processing...", pause: 1200 },
      ];

      for (const { text, pause } of steps) {
        if (abortRef.current) return;
        await typeLine(text, "system", 24);
        await sleep(pause + Math.random() * 400);
      }

      // ── Disclaimer ────────────────────────────────────
      if (abortRef.current) return;
      await sleep(800);
      setLines([]);
      setCurrentLine(null);
      setPhase("disclaimer");
      await sleep(500);

      await typeFullscreen(
        "here is your information shared by your browser.\nnone of this needs your permission.\nyour browser shares this publicly."
      );
      await sleep(3000);

      // ── Reveal: 2 items per page ──────────────────────
      if (abortRef.current) return;
      const ip = await ipPromise;
      const loc = [ip.city, ip.region, ip.country]
        .filter(Boolean)
        .join(", ");

      const pages = [
        [
          ["Public IP Address", ip.ip],
          ["Approximate Location", loc],
        ],
        [
          ["ISP / Network", ip.isp],
          ["Browser", getBrowser()],
        ],
        [
          ["Operating System", getOS()],
          ["Device Type", getDevice()],
        ],
        [
          ["Screen Resolution", getResolution()],
          ["Language", getLanguage()],
        ],
        [
          ["Time Zone", getTimezone()],
          ["User Agent", getUserAgent()],
        ],
      ];

      setPhase("reveal");
      await sleep(500);

      for (const page of pages) {
        if (abortRef.current) return;
        setRevealItems(page);
        await sleep(3800);
        setRevealItems(null);
        await sleep(400);
      }

      // ── Final answer ──────────────────────────────────
      if (abortRef.current) return;
      setPhase("answer");
      setBigTypedLen(0);
      await sleep(500);

      await typeFullscreen(
        "as for your question...\ni don't want to waste tokens on that,\nsearch it yourself :)",
        32
      );

      setPhase("done");
    };

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  /* ── Cursor element ──────────────────────────────────── */
  const Cursor = () => (
    <span
      className={`inline-block w-[2.5px] h-[0.8em] ml-[2px] align-baseline transition-opacity duration-75 ${
        cursorOn ? "bg-white/60" : "opacity-0"
      }`}
    />
  );

  /* ── Line renderer (sequence phase) ──────────────────── */
  const renderLine = (line) => {
    if (line.type === "divider")
      return <div className="h-px bg-white/[0.06] my-3" />;
    return (
      <div className="font-vt323 text-lg sm:text-xl leading-relaxed tracking-wide text-white/30">
        {line.text}
      </div>
    );
  };

  /* ── Shared enter/exit transitions ───────────────────── */
  const screenTransition = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  };

  /* ══════════════════════════════════════════════════════
     Render
     ══════════════════════════════════════════════════════ */
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Background />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-6 z-50 font-ibm text-[11px] text-white/15 hover:text-white/40 transition-colors duration-300 tracking-widest uppercase"
            aria-label="Close"
          >
            esc
          </button>

          {/* ── Content ─────────────────────────────── */}
          <div
            ref={scrollRef}
            className="relative z-20 h-full overflow-y-auto"
            onClick={() => {
              if (phase === "idle") inputRef.current?.focus();
            }}
          >
            <div className="min-h-full flex items-center px-8 sm:px-14 md:px-20 lg:px-28">
              <div className="w-full max-w-3xl py-20">
                <AnimatePresence mode="wait">
                  {/* ════ IDLE ════════════════════════ */}
                  {phase === "idle" && (
                    <motion.div key="idle" {...screenTransition}>
                      <h1 className="font-vt323 text-white text-[2.2rem] sm:text-[2.8rem] md:text-[3.4rem] leading-tight tracking-wide">
                        what do you want to ask?
                      </h1>

                      {/* Visible typing area */}
                      <div className="mt-4 min-h-[2.5rem] relative">
                        <span className="font-vt323 text-white/50 text-xl sm:text-2xl tracking-wide">
                          {typingText}
                        </span>
                        <Cursor />
                        <input
                          ref={inputRef}
                          type="text"
                          autoFocus
                          value={typingText}
                          onChange={(e) => setTypingText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              const msg = typingText.trim();
                              if (!msg) return;
                              setUserMsg(msg);
                              setTypingText("");
                              e.target.blur();
                              setPhase("thinking");
                              const delay = 2000 + Math.random() * 2000;
                              setTimeout(() => {
                                if (abortRef.current) return;
                                setPhase("sequence");
                              }, delay);
                            }
                          }}
                          className="absolute inset-0 w-full h-full opacity-[0.01] text-transparent caret-transparent z-30 cursor-text pointer-events-auto bg-transparent border-none outline-none"
                          autoComplete="off"
                          spellCheck="false"
                          aria-label="Type your question"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* ════ THINKING ════════════════════ */}
                  {phase === "thinking" && (
                    <motion.div
                      key="thinking"
                      {...screenTransition}
                      className="space-y-6"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 28,
                        }}
                      >
                        <span className="inline-block px-4 py-2 rounded-lg bg-white/[0.07] font-ibm text-sm text-white/50 tracking-wide">
                          {userMsg}
                        </span>
                      </motion.div>
                      <ThinkingDots />
                    </motion.div>
                  )}

                  {/* ════ SEQUENCE (typewriter lines) ═ */}
                  {phase === "sequence" && (
                    <motion.div
                      key="sequence"
                      {...screenTransition}
                      className="space-y-1.5"
                    >
                      {/* User bubble stays at top */}
                      <div className="mb-6">
                        <span className="inline-block px-4 py-2 rounded-lg bg-white/[0.07] font-ibm text-sm text-white/50 tracking-wide">
                          {userMsg}
                        </span>
                      </div>

                      {lines.map((line) => (
                        <div key={line.id}>{renderLine(line)}</div>
                      ))}

                      {currentLine && (
                        <div className="font-vt323 text-lg sm:text-xl leading-relaxed tracking-wide text-white/30">
                          {currentLine.text.slice(0, typedLen)}
                          <Cursor />
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* ════ DISCLAIMER ══════════════════ */}
                  {phase === "disclaimer" && (
                    <motion.div key="disclaimer" {...screenTransition}>
                      <div className="font-vt323 text-white/40 text-[1.4rem] sm:text-[1.8rem] md:text-[2rem] leading-relaxed tracking-wide">
                        {bigText
                          .slice(0, bigTypedLen)
                          .split("\n")
                          .map((line, i, arr) => (
                            <span key={i}>
                              {line}
                              {i < arr.length - 1 && <br />}
                            </span>
                          ))}
                        <Cursor />
                      </div>
                    </motion.div>
                  )}

                  {/* ════ REVEAL (2 items per page) ═══ */}
                  {phase === "reveal" && (
                    <motion.div key="reveal" {...screenTransition}>
                      <AnimatePresence mode="wait">
                        {revealItems && (
                          <motion.div
                            key={revealItems[0][0]}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -14 }}
                            transition={{
                              duration: 0.6,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="space-y-10"
                          >
                            {revealItems.map(([label, value]) => (
                              <div key={label}>
                                <div className="font-ibm text-[10px] uppercase tracking-[0.25em] text-white/20 mb-2">
                                  {label}
                                </div>
                                <div className="font-vt323 text-white text-[1.6rem] sm:text-[2.2rem] md:text-[2.6rem] leading-tight tracking-wide break-all">
                                  {value}
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {/* ════ ANSWER + DONE ═══════════════ */}
                  {(phase === "answer" || phase === "done") && (
                    <motion.div key="answer" {...screenTransition}>
                      <div className="font-vt323 text-white text-[1.8rem] sm:text-[2.4rem] md:text-[2.8rem] leading-[1.3] tracking-wide">
                        {bigText
                          .slice(0, bigTypedLen)
                          .split("\n")
                          .map((line, i, arr) => (
                            <span key={i}>
                              {line}
                              {i < arr.length - 1 && <br />}
                            </span>
                          ))}
                        <Cursor />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FakeAIAssistant;
