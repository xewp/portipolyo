import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowRight, LoaderCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { sectionCopy, site } from "../../data/site";
import { fadeReveal, reveal, viewport } from "../../lib/motion";

type FormStatus = "idle" | "sending" | "success" | "error";
const COOLDOWN_MS = 60_000;
const COOLDOWN_KEY = "contact_last_sent";

function getSavedCooldownUntil() {
  try {
    const lastSent = Number(localStorage.getItem(COOLDOWN_KEY) || "0");
    return Number.isFinite(lastSent) ? lastSent + COOLDOWN_MS : 0;
  } catch {
    return 0;
  }
}

function getRemainingSeconds(until: number) {
  return Math.max(0, Math.ceil((until - Date.now()) / 1000));
}

export default function Contact() {
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? fadeReveal : reveal;
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const [cooldownUntil, setCooldownUntil] = useState(getSavedCooldownUntil);
  const [cooldown, setCooldown] = useState(() => getRemainingSeconds(cooldownUntil));
  const sending = useRef(false);
  const copy = sectionCopy.contact;

  useEffect(() => {
    if (getRemainingSeconds(cooldownUntil) <= 0) return;
    const interval = window.setInterval(() => {
      const remaining = getRemainingSeconds(cooldownUntil);
      setCooldown(remaining);
      if (remaining === 0) window.clearInterval(interval);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [cooldownUntil]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current || getRemainingSeconds(cooldownUntil) > 0) return;
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (name.length < 2 || message.length < 10) {
      setStatus("error");
      setFeedback(copy.validationMessage);
      const invalidField = form.elements.namedItem(name.length < 2 ? "name" : "message");
      if (invalidField instanceof HTMLElement) invalidField.focus();
      return;
    }

    sending.current = true;
    setStatus("sending");
    setFeedback("");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_6k86bbn",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_molq4nn",
        {
          title: copy.emailSubject,
          to_email: site.email,
          name,
          email,
          message,
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "FXr4y7uVb_PHOMwCY" },
      );

      const sentAt = Date.now();
      try {
        localStorage.setItem(COOLDOWN_KEY, String(sentAt));
      } catch {
        // The in-memory cooldown also works when browser storage is blocked.
      }
      setCooldownUntil(sentAt + COOLDOWN_MS);
      setCooldown(60);
      setStatus("success");
      setFeedback(copy.successMessage);
      form.reset();
    } catch {
      setStatus("error");
      setFeedback(copy.errorMessage);
    } finally {
      sending.current = false;
    }
  }

  const fieldClass = "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-base text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-0 disabled:opacity-60";

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-shell border-t border-line">
      <div className="mb-12 flex items-center justify-between gap-4 md:mb-16">
        <p className="eyebrow">{copy.label}</p>
        <span className="eyebrow text-muted" aria-hidden="true">{copy.number}</span>
      </div>

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-7">
          <motion.h2
            id="contact-heading"
            className="section-heading whitespace-pre-line"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={variants}
          >
            {copy.title}
          </motion.h2>
          <p className="mt-7 max-w-md text-base leading-relaxed text-muted">{copy.intro}</p>
          <motion.a
            href={`mailto:${site.email}`}
            className="group mt-8 inline-flex max-w-full items-center gap-2 border-b border-ink pb-2 font-display text-[clamp(1.6rem,4vw,3.6rem)] leading-tight tracking-tight text-ink sm:gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={variants}
          >
            <span className="break-all">{site.email}</span>
            <ArrowUpRight className="h-6 w-6 flex-shrink-0 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 sm:h-8 sm:w-8 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0" aria-hidden="true" />
          </motion.a>

          <div className="mt-12">
            <h3 className="eyebrow mb-4 text-muted">{copy.socialLabel}</h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 border-b border-transparent py-1 text-sm text-ink hover:border-ink">
                    {social.label}
                    <ArrowUpRight size={14} aria-hidden="true" />
                    <span className="sr-only"> {copy.opensInNewTab}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <motion.div
          className="lg:col-span-5"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={variants}
        >
          <h3 className="mb-8 text-lg font-medium tracking-tight">{copy.formTitle}</h3>
          <form onSubmit={handleSubmit} className="space-y-6" aria-busy={status === "sending"} aria-describedby="contact-feedback">
            <div>
              <label htmlFor="contact-name" className="mb-1 block text-xs uppercase tracking-[0.1em] text-muted">{copy.nameLabel}</label>
              <input id="contact-name" name="name" type="text" autoComplete="name" required minLength={2} maxLength={100} placeholder={copy.namePlaceholder} disabled={status === "sending"} className={fieldClass} />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-1 block text-xs uppercase tracking-[0.1em] text-muted">{copy.emailLabel}</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder={copy.emailPlaceholder} disabled={status === "sending"} className={fieldClass} />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-1 block text-xs uppercase tracking-[0.1em] text-muted">{copy.messageLabel}</label>
              <textarea id="contact-message" name="message" required minLength={10} maxLength={5000} rows={4} placeholder={copy.messagePlaceholder} disabled={status === "sending"} className={`${fieldClass} resize-y`} />
            </div>
            <button type="submit" className="button-primary min-h-12 w-full justify-between disabled:cursor-not-allowed disabled:opacity-60" disabled={status === "sending" || cooldown > 0}>
              <span>{status === "sending" ? copy.sendingLabel : cooldown > 0 ? `${copy.cooldownLabel} ${cooldown}s` : copy.submitLabel}</span>
              {status === "sending" ? <LoaderCircle size={18} className="animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <ArrowRight size={18} aria-hidden="true" />}
            </button>
            <div className="min-h-12 text-sm leading-relaxed">
              <p id="contact-feedback" role={status === "error" ? "alert" : "status"} aria-atomic="true" className="text-ink">{feedback}</p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
