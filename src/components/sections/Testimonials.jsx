import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/portfolio";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  const active = testimonials[index];

  return (
    <section id="testimonials" className="relative w-full overflow-hidden bg-primary py-32 text-primary-foreground">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] ledger-grid-bg" style={{ backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)" }} />
      <div className="relative mx-auto max-w-[1100px] px-[8vw] text-center">
        <span className="font-mono-data text-[0.65rem] tracking-[0.3em] text-primary-foreground/50">06 · TESTIMONIALS</span>

        <Quote className="mx-auto mt-8 text-accent" size={32} />

        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            <p className="mx-auto max-w-3xl font-heading text-[clamp(1.25rem,3vw,2rem)] font-medium leading-snug text-balance">
              “{active.quote}”
            </p>
            <footer className="mt-8">
              <div className="font-heading text-base font-semibold">{active.name}</div>
              <div className="mt-1 font-mono-data text-[0.7rem] tracking-wide text-primary-foreground/60">
                {active.title}
              </div>
            </footer>
          </motion.blockquote>
        </AnimatePresence>

        <div className="mt-10 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-accent" : "w-1.5 bg-primary-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}