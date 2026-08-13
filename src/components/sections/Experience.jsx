import { motion } from "framer-motion";
import { experience } from "@/data/portfolio";

const typeColor = {
  Role: "bg-secondary",
  Education: "bg-accent",
  Certification: "bg-foreground",
  Award: "bg-accent",
};

export default function Experience() {
  return (
    <section id="experience" className="relative w-full bg-muted/40 py-32">
      <div className="mx-auto max-w-[1400px] px-[8vw]">
        <span className="ledger-label">04 · Experience</span>
        <h2 className="mt-4 max-w-2xl font-heading text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight text-foreground text-balance">
          The Fiscal Timeline
        </h2>

        <div className="relative mt-16">
          {/* center line */}
          <div className="absolute left-3 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12">
            {experience.map((item, i) => {
              const right = i % 2 === 1;
              return (
                <motion.div
                  key={item.title + item.period}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative pl-12 md:w-1/2 md:pl-0 ${
                    right ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right"
                  }`}
                >
                  {/* node */}
                  <span
                    className={`absolute left-[9px] top-2 h-2.5 w-2.5 rounded-full md:left-auto ${
                      right ? "md:-left-[5px]" : "md:-right-[5px]"
                    } ${typeColor[item.type] || "bg-secondary"}`}
                  />
                  <div className="glass-card rounded-sm p-6">
                    <div className={`flex items-center gap-3 ${right ? "" : "md:justify-end"}`}>
                      <span className="font-mono-data text-[0.6rem] tracking-[0.15em] text-accent">
                        {item.type.toUpperCase()}
                      </span>
                      <span className="font-mono-data text-[0.6rem] text-muted-foreground">{item.period}</span>
                    </div>
                    <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">{item.title}</h3>
                    <div className="mt-1 font-body text-sm font-medium text-secondary">{item.org}</div>
                    <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}