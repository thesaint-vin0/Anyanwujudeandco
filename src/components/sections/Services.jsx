import { motion } from "framer-motion";
import { services } from "@/data/portfolio";
import {
  Calculator, BookOpen, Landmark, FileText, BarChart3, Users,
  Briefcase, PieChart, DollarSign, ShieldCheck, Building2, TrendingUp, CircleDot,
} from "lucide-react";

const iconMap = {
  Calculator, BookOpen, Landmark, FileText, BarChart3, Users,
  Briefcase, PieChart, DollarSign, ShieldCheck, Building2, TrendingUp,
};

export default function Services() {
  return (
    <section id="services" className="relative w-full bg-muted/40 py-32">
      <div className="mx-auto max-w-[1400px] px-[8vw]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="ledger-label">02 · Services</span>
            <h2 className="mt-4 max-w-2xl font-heading text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight text-foreground text-balance">
              The Expertise Matrix
            </h2>
          </div>
          <p className="max-w-sm font-body text-sm text-muted-foreground">
            Twelve integrated capabilities, each delivered to institutional standards and scoped to your
            precise operational reality.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border hairline bg-border sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] || CircleDot;
            return (
              <motion.div
                key={s.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
                className="group relative bg-background p-6 transition-colors hover:bg-white"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm border hairline bg-muted/50 text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                    <Icon size={18} />
                  </div>
                  <span className="font-mono-data text-[0.6rem] tracking-[0.15em] text-muted-foreground/60 opacity-0 transition-opacity group-hover:opacity-100">
                    {s.code}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-base font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}