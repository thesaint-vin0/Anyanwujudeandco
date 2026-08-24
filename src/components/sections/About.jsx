import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { profile, stats } from "@/data/portfolio";
import { Building2 } from "lucide-react";
import { useSiteAsset } from "@/hooks/useSiteAsset";

function Stat({ stat }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const value = useCountUp(stat.value, { duration: 2000, start: inView });
  return (
    <div ref={ref} className="border-l border-border pl-5">
      <div className="font-mono-data text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {value}
        <span className="text-accent">{stat.suffix}</span>
      </div>
      <div className="mt-2 font-body text-xs text-muted-foreground">{stat.label}</div>
    </div>
  );
}

export default function About() {
  const { url: profileUrl } = useSiteAsset("profile_image");
  return (
    <section id="about" className="relative w-full bg-background py-32">
      <div className="mx-auto max-w-[1400px] px-[8vw]">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden rounded-sm border hairline">
                <img
                  src={profileUrl || "https://media.base44.com/images/public/6a56c9c3ddbdf97fb3f76297/080c4d9ca_generated_8e45d432.png"}
                  alt="Portrait of Jude Anyanwu, professional accountant"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 hidden glass-card rounded-sm p-5 sm:block">
                <div className="flex items-center gap-3">
                  <Building2 size={18} className="text-accent" />
                  <div>
                    <div className="font-mono-data text-[0.65rem] tracking-[0.2em] text-muted-foreground">STATUS</div>
                    <div className="font-body text-sm font-medium text-foreground">Open for Q3 Consulting</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="ledger-label">01 · About</span>
              <h2 className="mt-4 font-heading text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight text-foreground text-balance">
                A partner who treats your numbers as structural architecture.
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-muted-foreground">
                {profile.about}
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-8 border-l-2 border-accent pl-5"
            >
              <div className="ledger-label">Mission</div>
              <p className="mt-2 font-heading text-lg font-medium leading-snug text-foreground">
                {profile.mission}
              </p>
            </motion.div>

            {/* Values */}
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {profile.values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="border-t border-border pt-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono-data text-[0.65rem] text-accent">0{i + 1}</span>
                    <h3 className="font-heading text-base font-semibold text-foreground">{v.title}</h3>
                  </div>
                  <p className="mt-2 font-body text-sm text-muted-foreground">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 gap-8 border-t border-border pt-12 lg:grid-cols-4">
          {stats.map((s) => (
            <Stat key={s.label} stat={s} />
          ))}
        </div>
      </div>
    </section>
  );
}