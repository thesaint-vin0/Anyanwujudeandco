import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ChevronDown, ArrowRight } from "lucide-react";

// 2024 US Federal tax brackets (simplified)
const TAX_BRACKETS = {
  single: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
  married: [
    { min: 0, max: 23200, rate: 0.10 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383900, rate: 0.24 },
    { min: 383900, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 },
  ],
};

const STANDARD_DEDUCTION = { single: 14600, married: 29200 };
const SE_TAX_RATE = 0.1413; // 14.13% self-employment tax on 92.35% of net

function fmt(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function calcTax(taxableIncome, filing) {
  const brackets = TAX_BRACKETS[filing];
  let tax = 0;
  for (const b of brackets) {
    if (taxableIncome <= b.min) break;
    const taxable = Math.min(taxableIncome, b.max) - b.min;
    tax += taxable * b.rate;
  }
  return tax;
}

function getRate(taxableIncome, filing) {
  const brackets = TAX_BRACKETS[filing];
  for (let i = brackets.length - 1; i >= 0; i--) {
    if (taxableIncome > brackets[i].min) return brackets[i].rate;
  }
  return 0;
}

export default function TaxCalculator() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [filing, setFiling] = useState("single");
  const [selfEmployed, setSelfEmployed] = useState(false);
  const [result, setResult] = useState(null);

  const calculate = (e) => {
    e.preventDefault();
    const grossIncome = parseFloat(income.replace(/,/g, "")) || 0;
    const businessExpenses = parseFloat(expenses.replace(/,/g, "")) || 0;
    const deduction = STANDARD_DEDUCTION[filing];

    let netIncome = grossIncome - businessExpenses;
    let seTax = 0;

    if (selfEmployed) {
      seTax = netIncome * 0.9235 * SE_TAX_RATE;
      netIncome -= seTax / 2; // deduct half SE tax
    }

    const taxableIncome = Math.max(0, netIncome - deduction);
    const federalTax = calcTax(taxableIncome, filing);
    const marginalRate = getRate(taxableIncome, filing);
    const totalTax = federalTax + seTax;
    const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;
    const takeHome = grossIncome - businessExpenses - totalTax;

    setResult({ federalTax, seTax, totalTax, effectiveRate, marginalRate, takeHome, taxableIncome, grossIncome, businessExpenses });
  };

  const formatInput = (val, setter) => {
    const num = val.replace(/[^0-9]/g, "");
    setter(num ? Number(num).toLocaleString("en-US") : "");
  };

  return (
    <section id="calculator" className="relative w-full bg-muted/40 py-32">
      <div className="mx-auto max-w-[1400px] px-[8vw]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="ledger-label">10 · Tax Estimator</span>
            <h2 className="mt-4 max-w-2xl font-heading text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight text-foreground text-balance">
              Get a rough tax estimate before we talk.
            </h2>
          </div>
          <p className="max-w-sm font-body text-sm text-muted-foreground">
            Based on 2024 US federal brackets. This is a simplified estimate only — actual liability may vary. Book a consultation for a precise analysis.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <div className="glass-card rounded-sm p-8">
            <form onSubmit={calculate} className="space-y-6">
              {/* Gross Income */}
              <div className="relative">
                <label htmlFor="gross" className="font-mono-data text-[0.65rem] tracking-[0.2em] text-muted-foreground">
                  ANNUAL GROSS INCOME (USD) *
                </label>
                <div className="mt-2 flex items-center rounded-sm border border-border bg-background/60 focus-within:border-secondary">
                  <span className="px-4 font-mono-data text-sm text-muted-foreground">$</span>
                  <input
                    id="gross"
                    required
                    value={income}
                    onChange={(e) => formatInput(e.target.value, setIncome)}
                    placeholder="120,000"
                    className="w-full bg-transparent py-3 pr-4 font-mono-data text-sm text-foreground outline-none"
                  />
                </div>
              </div>

              {/* Business Expenses */}
              <div className="relative">
                <label htmlFor="expenses" className="font-mono-data text-[0.65rem] tracking-[0.2em] text-muted-foreground">
                  DEDUCTIBLE BUSINESS EXPENSES (USD)
                </label>
                <div className="mt-2 flex items-center rounded-sm border border-border bg-background/60 focus-within:border-secondary">
                  <span className="px-4 font-mono-data text-sm text-muted-foreground">$</span>
                  <input
                    id="expenses"
                    value={expenses}
                    onChange={(e) => formatInput(e.target.value, setExpenses)}
                    placeholder="0"
                    className="w-full bg-transparent py-3 pr-4 font-mono-data text-sm text-foreground outline-none"
                  />
                </div>
              </div>

              {/* Filing Status */}
              <div>
                <label htmlFor="filing" className="font-mono-data text-[0.65rem] tracking-[0.2em] text-muted-foreground">
                  FILING STATUS
                </label>
                <div className="relative mt-2">
                  <select
                    id="filing"
                    value={filing}
                    onChange={(e) => setFiling(e.target.value)}
                    className="w-full appearance-none rounded-sm border border-border bg-background/60 px-4 py-3 font-body text-sm text-foreground outline-none focus:border-secondary"
                  >
                    <option value="single">Single / Head of Household</option>
                    <option value="married">Married Filing Jointly</option>
                  </select>
                  <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              {/* Self-employed toggle */}
              <div className="flex items-center justify-between rounded-sm border border-border bg-background/60 px-5 py-4">
                <div>
                  <p className="font-body text-sm font-medium text-foreground">Self-Employed / Freelancer</p>
                  <p className="mt-0.5 font-body text-xs text-muted-foreground">Adds 14.13% self-employment tax on net earnings</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={selfEmployed}
                  onClick={() => setSelfEmployed((v) => !v)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${selfEmployed ? "bg-secondary" : "bg-border"}`}
                >
                  <span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${selfEmployed ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-body text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01]"
              >
                <Calculator size={16} />
                Estimate My Tax
              </button>
            </form>
          </div>

          {/* Result */}
          <div className="flex flex-col">
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-1 flex-col items-center justify-center rounded-sm border border-dashed border-border p-12 text-center"
                >
                  <Calculator size={36} className="text-muted-foreground/30" />
                  <p className="mt-4 font-body text-sm text-muted-foreground">
                    Fill in your details and click "Estimate My Tax" to see your breakdown.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-4"
                >
                  {/* Main metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <ResultCard
                      label="EST. TOTAL TAX"
                      value={fmt(result.totalTax)}
                      sub={`${result.effectiveRate.toFixed(1)}% effective rate`}
                      highlight
                    />
                    <ResultCard
                      label="TAKE-HOME (NET)"
                      value={fmt(result.takeHome)}
                      sub="after taxes & expenses"
                    />
                    <ResultCard
                      label="FEDERAL INCOME TAX"
                      value={fmt(result.federalTax)}
                      sub={`${(result.marginalRate * 100).toFixed(0)}% marginal bracket`}
                    />
                    {result.seTax > 0 ? (
                      <ResultCard label="SELF-EMPLOYMENT TAX" value={fmt(result.seTax)} sub="14.13% on 92.35% net" />
                    ) : (
                      <ResultCard label="TAXABLE INCOME" value={fmt(result.taxableIncome)} sub="after standard deduction" />
                    )}
                  </div>

                  {/* Breakdown bar */}
                  <div className="glass-card rounded-sm p-5">
                    <div className="ledger-label mb-3">INCOME BREAKDOWN</div>
                    <BreakdownBar
                      values={[
                        { label: "Take-home", amount: result.takeHome, color: "bg-secondary" },
                        { label: "Fed. Tax", amount: result.federalTax, color: "bg-accent" },
                        ...(result.seTax > 0 ? [{ label: "SE Tax", amount: result.seTax, color: "bg-primary/60" }] : []),
                        ...(result.businessExpenses > 0 ? [{ label: "Expenses", amount: result.businessExpenses, color: "bg-border" }] : []),
                      ]}
                      total={result.grossIncome}
                    />
                  </div>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className="group flex items-center justify-between rounded-sm border border-secondary/30 bg-secondary/5 px-5 py-4 transition-colors hover:bg-secondary/10"
                  >
                    <div>
                      <p className="font-heading text-sm font-semibold text-secondary">Get a precise analysis →</p>
                      <p className="mt-0.5 font-body text-xs text-muted-foreground">
                        This estimate doesn't account for credits, deductions, or state tax. Book a consultation.
                      </p>
                    </div>
                    <ArrowRight size={18} className="text-secondary transition-transform group-hover:translate-x-1" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultCard({ label, value, sub, highlight }) {
  return (
    <div className={`rounded-sm border p-5 ${highlight ? "border-accent/30 bg-accent/5" : "border-border bg-background"}`}>
      <div className="ledger-label">{label}</div>
      <div className={`mt-2 font-mono-data text-2xl font-bold tracking-tight ${highlight ? "text-accent" : "text-foreground"}`}>
        {value}
      </div>
      <div className="mt-1 font-body text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}

function BreakdownBar({ values, total }) {
  return (
    <div>
      <div className="flex h-3 w-full overflow-hidden rounded-full">
        {values.map((v) => (
          <div
            key={v.label}
            className={`${v.color} transition-all`}
            style={{ width: `${Math.max(0, (v.amount / total) * 100)}%` }}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {values.map((v) => (
          <div key={v.label} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${v.color}`} />
            <span className="font-mono-data text-[0.6rem] text-muted-foreground">
              {v.label} ({((v.amount / total) * 100).toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}