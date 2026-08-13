import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/portfolio";

// Architectural parallax band — a "blue hour" facade with the tagline overlaid.
export default function ParallaxBanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative h-[60vh] w-full overflow-hidden bg-primary">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <img
          src="https://media.base44.com/images/public/6a56c9c3ddbdf97fb3f76297/6b30b9dfc_generated_f57e6554.png"
          alt="Modern skyscraper glass facade"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </motion.div>
      <div className="absolute inset-0 bg-primary/55" />
      <motion.div
        style={{ opacity }}
        className="relative flex h-full flex-col items-center justify-center px-[8vw] text-center"
      >
        <span className="font-mono-data text-[0.65rem] tracking-[0.3em] text-primary-foreground/60">
          THE PHILOSOPHY
        </span>
        <p className="mt-5 max-w-3xl font-heading text-[clamp(1.4rem,3.5vw,2.6rem)] font-medium leading-tight text-primary-foreground text-balance">
          “{profile.tagline}”
        </p>
      </motion.div>
    </section>
  );
}