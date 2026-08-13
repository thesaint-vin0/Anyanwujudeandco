import { profile, services } from "@/data/portfolio";
import { ArrowUp, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full bg-primary text-primary-foreground">
      {/* Newsletter band */}
      <div className="border-b border-primary-foreground/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-[8vw] py-12 md:flex-row md:items-center">
          <div>
            <h3 className="font-heading text-xl font-semibold">Subscribe to the briefing.</h3>
            <p className="mt-2 font-body text-sm text-primary-foreground/60">
              Quarterly insights on tax, cash flow, and compliance. No noise.
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-md items-center gap-2">
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="w-full rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-5 py-3 font-body text-sm text-primary-foreground placeholder:text-primary-foreground/40 outline-none focus:border-accent"
            />
            <button className="shrink-0 rounded-full bg-accent px-5 py-3 font-body text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.03]">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto max-w-[1400px] px-[8vw] py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-accent font-heading text-sm font-bold text-accent-foreground">JA</span>
              <span className="font-heading text-base font-semibold">Jude Anyanwu</span>
            </div>
            <p className="mt-4 font-body text-sm leading-relaxed text-primary-foreground/60">
              {profile.tagline}
            </p>
          </div>

          <div>
            <div className="font-mono-data text-[0.65rem] tracking-[0.2em] text-primary-foreground/40">QUICK LINKS</div>
            <ul className="mt-4 space-y-2 font-body text-sm text-primary-foreground/70">
              <li><a href="#about" className="hover:text-accent">About</a></li>
              <li><a href="#services" className="hover:text-accent">Services</a></li>
              <li><a href="#portfolio" className="hover:text-accent">Portfolio</a></li>
              <li><a href="#contact" className="hover:text-accent">Contact</a></li>
            </ul>
          </div>

          <div>
            <div className="font-mono-data text-[0.65rem] tracking-[0.2em] text-primary-foreground/40">SERVICES</div>
            <ul className="mt-4 space-y-2 font-body text-sm text-primary-foreground/70">
              {services.slice(0, 5).map((s) => (
                <li key={s.code}><a href="#services" className="hover:text-accent">{s.title}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono-data text-[0.65rem] tracking-[0.2em] text-primary-foreground/40">CONTACT</div>
            <ul className="mt-4 space-y-2 font-body text-sm text-primary-foreground/70">
              <li><a href={`mailto:${profile.email}`} className="hover:text-accent">{profile.email}</a></li>
              <li><a href={`tel:${profile.phone}`} className="hover:text-accent">{profile.phone}</a></li>
              <li>{profile.location}</li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a href={profile.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-sm border border-primary-foreground/20 hover:border-accent hover:text-accent">
                <Linkedin size={16} />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email" className="flex h-9 w-9 items-center justify-center rounded-sm border border-primary-foreground/20 hover:border-accent hover:text-accent">
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-8 md:flex-row">
          <p className="font-mono-data text-[0.65rem] tracking-wide text-primary-foreground/50">
            © {new Date().getFullYear()} JUDE ANYANWU · ALL RIGHTS RESERVED
          </p>
          <a
            href="#home"
            className="flex items-center gap-2 font-mono-data text-[0.65rem] tracking-wide text-primary-foreground/70 hover:text-accent"
          >
            BACK TO TOP <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}