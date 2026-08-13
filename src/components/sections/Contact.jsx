import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/data/portfolio";
import { Mail, Phone, MapPin, Linkedin, Check, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

const CONTACT_RECIPIENT = "jude.anyanwu@fiscal-architecture.com";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", subject: "", message: "" });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await base44.integrations.Core.SendEmail({
        to: CONTACT_RECIPIENT,
        subject: form.subject || `Consultation request from ${form.name}`,
        body: `New consultation request via the portfolio site.\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCompany: ${form.company}\n\nMessage:\n${form.message}`,
      });
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative w-full bg-background py-32">
      <div className="mx-auto max-w-[1400px] px-[8vw]">
        <span className="ledger-label">09 · Contact</span>
        <h2 className="mt-4 max-w-2xl font-heading text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight text-foreground text-balance">
          The Consultation Terminal
        </h2>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {/* Left — direct info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              Share your situation in confidence. Every engagement begins with a no-obligation consultation
              to determine whether we're the right strategic fit.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 items-center justify-center">
                <span className="absolute h-2.5 w-2.5 animate-pulse-soft rounded-full bg-green-500/40" />
                <span className="h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="font-mono-data text-xs tracking-wide text-foreground/70">
                Availability: Open for Q3 Consulting
              </span>
            </div>

            <div className="mt-8 space-y-4">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-4 text-sm text-foreground/80 hover:text-secondary">
                <Mail size={18} className="text-accent" /> {profile.email}
              </a>
              <a href={`tel:${profile.phone}`} className="flex items-center gap-4 text-sm text-foreground/80 hover:text-secondary">
                <Phone size={18} className="text-accent" /> {profile.phone}
              </a>
              <div className="flex items-center gap-4 text-sm text-foreground/80">
                <MapPin size={18} className="text-accent" /> {profile.location}
              </div>
              <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-sm text-foreground/80 hover:text-secondary">
                <Linkedin size={18} className="text-accent" /> LinkedIn
              </a>
            </div>

            {/* Map placeholder */}
            <div className="mt-8 aspect-[16/7] overflow-hidden rounded-sm border hairline bg-muted/60">
              <iframe
                title="Office location map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-74.012%2C40.700%2C-73.990%2C40.715&layer=mapnik"
                className="h-full w-full grayscale"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card rounded-sm p-8"
          >
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" value={form.name} onChange={update("name")} required />
                <Field label="Email" name="email" type="email" value={form.email} onChange={update("email")} required />
                <Field label="Phone" name="phone" value={form.phone} onChange={update("phone")} />
                <Field label="Company" name="company" value={form.company} onChange={update("company")} />
              </div>
              <Field label="Subject" name="subject" value={form.subject} onChange={update("subject")} />
              <div className="group relative">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                  placeholder=" "
                  className="peer w-full resize-none rounded-sm border border-border bg-background/60 px-4 pb-2 pt-6 font-body text-sm text-foreground outline-none transition-colors focus:border-secondary"
                />
                <label htmlFor="message" className="pointer-events-none absolute left-4 top-2 font-mono-data text-[0.6rem] tracking-wide text-muted-foreground transition-colors peer-focus:text-secondary">
                  Message *
                </label>
              </div>

              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-body text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "sending" && <><Loader2 size={16} className="animate-spin" /> Sending…</>}
                {status === "sent" && <><Check size={16} /> Message sent</>}
                {status === "idle" && "Send Message"}
                {status === "error" && "Retry send"}
              </button>

              {status === "sent" && (
                <p className="text-center font-body text-xs text-green-600">
                  Thank you — your message has been received. Jude will respond within one business day.
                </p>
              )}
              {status === "error" && (
                <p className="text-center font-body text-xs text-destructive">
                  Something went wrong. Please email directly at {profile.email}.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", value, onChange, required }) {
  return (
    <div className="group relative">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        className="peer w-full rounded-sm border border-border bg-background/60 px-4 pb-2 pt-6 font-body text-sm text-foreground outline-none transition-colors focus:border-secondary"
      />
      <label htmlFor={name} className="pointer-events-none absolute left-4 top-2 font-mono-data text-[0.6rem] tracking-wide text-muted-foreground transition-colors peer-focus:text-secondary">
        {label}{required ? " *" : ""}
      </label>
    </div>
  );
}