import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          aria-live="polite"
        >
          <div className="flex items-baseline gap-1">
            <span className="font-mono-data text-sm tracking-[0.3em] text-muted-foreground">JUDE</span>
            <span className="font-mono-data text-sm tracking-[0.3em] text-accent">·</span>
            <span className="font-mono-data text-sm tracking-[0.3em] text-muted-foreground">ANYANWU</span>
          </div>
          <div className="mt-6 h-px w-48 overflow-hidden bg-border">
            <motion.div
              className="h-full bg-gradient-to-r from-secondary to-accent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </div>
          <div className="mt-4 font-mono-data text-[0.65rem] tracking-[0.25em] text-muted-foreground/70">
            RECONCILING LEDGER · BUILDING TRUST
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}