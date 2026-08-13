import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import { ArrowUpRight, TrendingUp } from "lucide-react";

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative w-full bg-background py-32">
      <div className="mx-auto max-w-[1400px] px-[8vw]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="ledger-label">05 · Portfolio</span>
            <h2 className="mt-4 max-w-2xl font-heading text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight text-foreground text-balance">
              Outcomes, not just deliverables.
            </h2>
          </div>
          <p className="max-w-sm font-body text-sm text-muted-foreground">
            Every engagement ends with a measurable result metric. These are a few recent cases.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {portfolio.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-sm border hairline bg-card p-7 transition-all hover:border-secondary/40 hover:shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)]"
            >
              <div className="flex items-start justify-between">
                <span className="rounded-full border hairline px-3 py-1 font-mono-data text-[0.6rem] tracking-[0.15em] text-muted-foreground">
                  {p.category}
                </span>
                <ArrowUpRight size={18} className="text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-secondary" />
              </div>

              <h3 className="mt-5 font-heading text-xl font-semibold leading-snug text-foreground">{p.title}</h3>
              <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-muted-foreground">{p.desc}</p>

              {/* Result metric */}
              <div className="mt-6 flex items-center gap-3 rounded-sm bg-muted/60 p-4">
                <TrendingUp size={20} className="text-accent" />
                <div>
                  <div className="ledger-label">Result</div>
                  <div className="font-mono-data text-lg font-bold tracking-tight text-foreground">{p.result}</div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.tools.map((t) => (
                  <span key={t} className="rounded-sm bg-secondary/5 px-2.5 py-1 font-mono-data text-[0.6rem] text-secondary">
                    {t}
                  </span>
                ))}
              </div>

              <p className="mt-4 border-t border-border pt-4 font-body text-xs text-muted-foreground">
                <span className="font-medium text-foreground/70">Client outcome: </span>
                {p.outcome}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}