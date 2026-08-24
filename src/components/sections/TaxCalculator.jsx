import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ChevronDown, ArrowRight } from "lucide-react";

/* ============================================================
   US TAX CONFIG (2024 Federal — simplified)
   ============================================================ */
const US_BRACKETS = {
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
const US_DEDUCTION = { single: 14600, married: 29200 };
const US_SE_RATE = 0.1413;

/* ============================================================
   NIGERIA TAX CONFIG (PIT / PAYE — 2024)
   Progressive annual brackets per the Personal Income Tax Act
   ============================================================ */
const NG_BRACKETS = [
  { min: 0, max: 300000, rate: 0.07 },
  { min: 300000, max: 600000, rate: 0.11 },
  { min: 600000, max: 1100000, rate: 0.15 },
  { min: 1100000, max: 1600000, rate: 0.19 },
  { min: 1600000, max: 3200000, rate: 0.21 },
  { min: 3200000, max: Infinity, rate: 0.24 },
];
const NG_PENSION_RATE = 0.08; // employee pension contribution
const NG_CRA_MIN = 200000;   // ₦200,000 base
const NG_CRA_PCT = 0.20;      // + 20% of gross income

/* ============================================================
   Shared helpers
   ============================================================ */
function fmt(n, currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}

function calcProgressive(taxableIncome, brackets) {
  let tax = 0;
  for (const b of brackets) {
    if (taxableIncome <= b.min) break;
    const taxable = Math.min(taxableIncome, b.max) - b.min;
    tax += taxable * b.rate;
  }
  return tax;
}

function getMarginalRate(taxableIncome, brackets) {
  for (let i = brackets.length - 1; i >= 0; i--) {
    if (taxableIncome > brackets[i].min) return brackets[i].rate;
  }
  return 0;
}

/* ============================================================
   Country-specific calculators
   ============================================================ */
function calcUS({ grossIncome, businessExpenses, filing, selfEmployed }) {
  const deduction = US_DEDUCTION[filing];
  let netIncome = grossIncome - businessExpenses;
  let seTax = 0;

  if (selfEmployed) {
    seTax = netIncome * 0.9235 * US_SE_RATE;
    netIncome -= seTax / 2;
  }

  const taxableIncome = Math.max(0, netIncome - deduction);
  const federalTax = calcProgressive(taxableIncome, US_BRACKETS[filing]);
  const marginalRate = getMarginalRate(taxableIncome, US_BRACKETS[filing]);
  const totalTax = federalTax + seTax;
  const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;
  const takeHome = grossIncome - businessExpenses - totalTax;

  return {
    rows: [
      { label: "Federal Income Tax", amount: federalTax, color: "bg-accent" },
      ...(seTax > 0 ? [{ label: "Self-Employment Tax", amount: seTax, color: "bg-primary/60" }] : []),
      ...(businessExpenses > 0 ? [{ label: "Expenses", amount: businessExpenses, color: "bg-border" }] : []),
      { label: "Take-home", amount: takeHome, color: "bg-secondary" },
    ],
    cards: [
      { label: "EST. TOTAL TAX", value: fmt(totalTax, "USD"), sub: `${effectiveRate.toFixed(1)}% effective rate`, highlight: true },
      { label: "TAKE-HOME (NET)", value: fmt(takeHome, "USD"), sub: "after taxes & expenses" },
      { label: "FEDERAL INCOME TAX", value: fmt(federalTax, "USD"), sub: `${(marginalRate * 100).toFixed(0)}% marginal bracket` },
      seTax > 0
        ? { label: "SELF-EMPLOYMENT TAX", value: fmt(seTax, "USD"), sub: "14.13% on 92.35% net" }
        : { label: "TAXABLE INCOME", value: fmt(taxableIncome, "USD"), sub: "after standard deduction" },
    ],
    ctaNote: "This estimate doesn't account for credits, deductions, or state tax. Book a consultation.",
    grossIncome,
  };
}

function calcNG({ grossIncome, businessExpenses, pension }) {
  // Consolidated Relief Allowance: higher of ₦200,000 + 20% of gross, or 1% of gross
  const cra = Math.max(NG_CRA_MIN + grossIncome * NG_CRA_PCT, grossIncome * 0.01);
  const pensionAmount = pension ? grossIncome * NG_PENSION_RATE : 0;

  const taxableIncome = Math.max(0, grossIncome - cra - pensionAmount - businessExpenses);
  const pitTax = calcProgressive(taxableIncome, NG_BRACKETS);
  const marginalRate = getMarginalRate(taxableIncome, NG_BRACKETS);
  const totalTax = pitTax;
  const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;
  const takeHome = grossIncome - pensionAmount - businessExpenses - totalTax;

  return {
    rows: [
      { label: "PAYE / PIT", amount: pitTax, color: "bg-accent" },
      ...(pensionAmount > 0 ? [{ label: "Pension (8%)", amount: pensionAmount, color: "bg-primary/60" }] : []),
      ...(businessExpenses > 0 ? [{ label: "Expenses", amount: businessExpenses, color: "bg-border" }] : []),
      { label: "Take-home", amount: takeHome, color: "bg-secondary" },
    ],
    cards: [
      { label: "EST. TOTAL TAX", value: fmt(totalTax, "NGN"), sub: `${effectiveRate.toFixed(1)}% effective rate`, highlight: true },
      { label: "TAKE-HOME (NET)", value: fmt(takeHome, "NGN"), sub: "after taxes, pension & expenses" },
      { label: "PAYE / PIT TAX", value: fmt(pitTax, "NGN"), sub: `${(marginalRate * 100).toFixed(0)}% marginal bracket` },
      { label: "TAXABLE INCOME", value: fmt(taxableIncome, "NGN"), sub: "after CRA, pension & expenses" },
    ],
    ctaNote: "This estimate uses simplified PAYE brackets and standard CRA. State tax and specific reliefs may apply. Book a consultation.",
    grossIncome,
  };
}

/* ============================================================
   Component
   ============================================================ */
const COUNTRIES = [
  { code: "US", label: "United States", currency: "USD", symbol: "$" },
  { code: "NG", label: "Nigeria", currency: "NGN", symbol: "₦" },
];

export default function TaxCalculator() {
  const [country, setCountry] = useState("US");
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [filing, setFiling] = useState("single");
  const [selfEmployed, setSelfEmployed] = useState(false);
  const [pension, setPension] = useState(true);
  const [result, setResult] = useState(null);

  const activeCountry = COUNTRIES.find((c) => c.code === country);

  const calculate = (e) => {
    e.preventDefault();
    const grossIncome = parseFloat(income.replace(/,/g, "")) || 0;
    const businessExpenses = parseFloat(expenses.replace(/,/g, "")) || 0;

    const res =
      country === "US"
        ? calcUS({ grossIncome, businessExpenses, filing, selfEmployed })
        : calcNG({ grossIncome, businessExpenses, pension });

    setResult(res);
  };

  const formatInput = (val, setter) => {
    const num = val.replace(/[^0-9]/g, "");
    setter(num ? Number(num).toLocaleString("en-US") : "");
  };

  const switchCountry = (code) => {
    setCountry(code);
    setResult(null);
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
            Simplified estimates based on current tax brackets. Actual liability may vary — book a consultation for a precise analysis.
          </p>
        </div>

        {/* Country toggle */}
        <div className="mt-8 inline-flex rounded-full border border-border bg-background/60 p-1">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => switchCountry(c.code)}
              className={`rounded-full px-5 py-2 font-mono-data text-[0.7rem] tracking-[0.15em] transition-colors ${
                country === c.code ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <div className="glass-card rounded-sm p-8">
            <form onSubmit={calculate} className="space-y-6">
              {/* Gross Income */}
              <div className="relative">
                <label htmlFor="gross" className="font-mono-data text-[0.65rem] tracking-[0.2em] text-muted-foreground">
                  ANNUAL GROSS INCOME ({activeCountry.currency}) *
                </label>
                <div className="mt-2 flex items-center rounded-sm border border-border bg-background/60 focus-within:border-secondary">
                  <span className="px-4 font-mono-data text-sm text-muted-foreground">{activeCountry.symbol}</span>
                  <input
                    id="gross"
                    required
                    value={income}
                    onChange={(e) => formatInput(e.target.value, setIncome)}
                    placeholder={country === "US" ? "120,000" : "5,000,000"}
                    className="w-full bg-transparent py-3 pr-4 font-mono-data text-sm text-foreground outline-none"
                  />
                </div>
              </div>

              {/* Business Expenses */}
              <div className="relative">
                <label htmlFor="expenses" className="font-mono-data text-[0.65rem] tracking-[0.2em] text-muted-foreground">
                  DEDUCTIBLE BUSINESS EXPENSES ({activeCountry.currency})
                </label>
                <div className="mt-2 flex items-center rounded-sm border border-border bg-background/60 focus-within:border-secondary">
                  <span className="px-4 font-mono-data text-sm text-muted-foreground">{activeCountry.symbol}</span>
                  <input
                    id="expenses"
                    value={expenses}
                    onChange={(e) => formatInput(e.target.value, setExpenses)}
                    placeholder="0"
                    className="w-full bg-transparent py-3 pr-4 font-mono-data text-sm text-foreground outline-none"
                  />
                </div>
              </div>

              {/* US-only: Filing Status */}
              {country === "US" && (
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
              )}

              {/* US-only: Self-employed toggle */}
              {country === "US" && (
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
              )}

              {/* Nigeria-only: Pension toggle */}
              {country === "NG" && (
                <div className="flex items-center justify-between rounded-sm border border-border bg-background/60 px-5 py-4">
                  <div>
                    <p className="font-body text-sm font-medium text-foreground">Pension Contribution (8%)</p>
                    <p className="mt-0.5 font-body text-xs text-muted-foreground">Standard employee pension deduction on gross income</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={pension}
                    onClick={() => setPension((v) => !v)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${pension ? "bg-secondary" : "bg-border"}`}
                  >
                    <span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${pension ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>
              )}

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
                    {result.cards.map((card) => (
                      <ResultCard key={card.label} {...card} />
                    ))}
                  </div>

                  {/* Breakdown bar */}
                  <div className="glass-card rounded-sm p-5">
                    <div className="ledger-label mb-3">INCOME BREAKDOWN</div>
                    <BreakdownBar values={result.rows} total={result.grossIncome} />
                  </div>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className="group flex items-center justify-between rounded-sm border border-secondary/30 bg-secondary/5 px-5 py-4 transition-colors hover:bg-secondary/10"
                  >
                    <div>
                      <p className="font-heading text-sm font-semibold text-secondary">Get a precise analysis →</p>
                      <p className="mt-0.5 font-body text-xs text-muted-foreground">{result.ctaNote}</p>
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