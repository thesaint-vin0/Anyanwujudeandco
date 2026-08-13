import { motion } from "framer-motion";
import { posts } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

export default function Blog() {
  return (
    <section className="relative w-full bg-muted/40 py-32">
      <div className="mx-auto max-w-[1400px] px-[8vw]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="ledger-label">08 · Insights</span>
            <h2 className="mt-4 max-w-2xl font-heading text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight text-foreground text-balance">
              Field notes on financial clarity.
            </h2>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 font-body text-sm font-medium text-secondary hover:underline">
            All insights <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group cursor-pointer rounded-sm border hairline bg-background p-7 transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_-30px_rgba(15,23,42,0.2)]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono-data text-[0.6rem] tracking-[0.15em] text-accent">{p.tag.toUpperCase()}</span>
                <span className="font-mono-data text-[0.6rem] text-muted-foreground">{p.date}</span>
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold leading-snug text-foreground group-hover:text-secondary">
                {p.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
              <div className="mt-6 inline-flex items-center gap-2 font-body text-xs font-medium text-foreground/70 transition-colors group-hover:text-secondary">
                Read more <ArrowUpRight size={14} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}