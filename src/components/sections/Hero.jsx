import { Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, ChevronDown } from "lucide-react";
import { profile } from "@/data/portfolio";
import Hero3D from "../three/Hero3D";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* 3D layer */}
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <Hero3D />
        </Suspense>
      </div>

      {/* Ledger grid overlay */}
      <div className="pointer-events-none absolute inset-0 ledger-grid-bg opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center px-[8vw] pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono-data text-xs tracking-[0.3em] text-muted-foreground">
            HELLO&nbsp;&nbsp;·&nbsp;&nbsp;I'M
          </p>
          <h1 className="mt-4 font-heading text-[clamp(2.8rem,8vw,7rem)] font-bold leading-[0.95] tracking-tightest text-foreground">
            {profile.name.split(" ")[0]}
            <span className="block text-foreground/30"> {profile.name.split(" ")[1]}</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2"
        >
          {profile.roles.map((r, i) => (
            <span key={r} className="flex items-center gap-3">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-accent" />}
              <span className="font-heading text-sm font-medium tracking-wide text-foreground/80 sm:text-base">
                {r}
              </span>
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 max-w-xl font-body text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {profile.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-body text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Book a Consultation
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/60 px-6 py-3 font-body text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-white"
          >
            <Download size={16} /> Download CV
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-2 py-3 font-body text-sm font-medium text-foreground/70 underline-offset-4 hover:text-foreground hover:underline"
          >
            View Services →
          </a>
        </motion.div>

        {/* Tagline pinned bottom */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 max-w-md font-mono-data text-[0.7rem] leading-relaxed tracking-wide text-muted-foreground/80"
        >
          “{profile.tagline}”
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-mono-data text-[0.6rem] tracking-[0.3em] text-muted-foreground">SCROLL</span>
        <div className="relative h-10 w-px overflow-hidden bg-border">
          <span className="absolute left-0 top-0 h-3 w-px bg-accent animate-scroll-indicator" />
        </div>
        <ChevronDown size={14} className="text-muted-foreground/60" />
      </div>
    </section>
  );
}