import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/data/portfolio";
import { Plus } from "lucide-react";

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="relative w-full bg-background py-32">
      <div className="mx-auto max-w-[1000px] px-[8vw]">
        <span className="ledger-label">07 · FAQ</span>
        <h2 className="mt-4 max-w-2xl font-heading text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight text-foreground text-balance">
          Questions, answered with the same precision as your ledger.
        </h2>

        <div className="mt-12 border-t hairline">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b hairline">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-base font-medium text-foreground sm:text-lg">{f.q}</span>
                  <Plus
                    size={18}
                    className={`shrink-0 text-accent transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 font-body text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}