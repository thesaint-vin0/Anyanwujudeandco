import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";

export default function Skills() {
  return (
    <section id="skills" className="relative w-full bg-background py-32">
      <div className="mx-auto max-w-[1400px] px-[8vw]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="ledger-label">03 · Skills</span>
            <h2 className="mt-4 max-w-2xl font-heading text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight text-foreground text-balance">
              A toolkit calibrated for clarity and control.
            </h2>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {skills.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 5) * 0.05 }}
              whileHover={{ y: -6 }}
              className="glass-card group flex flex-col items-center justify-center rounded-sm p-6 text-center"
            >
              <div className="relative h-12 w-12">
                <svg viewBox="0 0 36 36" className="h-12 w-12 -rotate-90">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
                  <motion.circle
                    cx="18" cy="18" r="15.5" fill="none"
                    stroke="hsl(var(--secondary))" strokeWidth="3" strokeLinecap="round"
                    strokeDasharray={`${(s.level / 100) * 97.4} 97.4`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-mono-data text-[0.6rem] font-semibold text-foreground">
                  {s.level}
                </span>
              </div>
              <h3 className="mt-4 font-body text-sm font-medium text-foreground">{s.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}