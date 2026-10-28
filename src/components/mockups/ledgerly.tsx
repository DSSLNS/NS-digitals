import { ArrowRight, BarChart3, Check, ChevronDown, FileText, LayoutDashboard, Menu, Receipt, RefreshCw, Search, Settings, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Desktop, Phone, StatusBar } from "./shared";

const brand = "#0b6e5f";

function Logo({ small }: { small?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2.5 font-bold tracking-tight text-[#0f1f1c]", small ? "text-[18px]" : "text-[21px]")}>
      <span className={cn("grid place-items-center rounded-lg text-white", small ? "size-7" : "size-8")} style={{ background: brand }}>
        <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M5 4v12h10M9 12l3-3 3 3" />
        </svg>
      </span>
      Ledgerly
    </span>
  );
}

function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-[#e6ecea] px-14 text-[15px] text-[#33413e]">
      <div className="flex items-center gap-12">
        <Logo />
        <nav className="flex gap-8">
          {["Product", "Solutions", "Pricing", "Resources"].map((n) => (
            <span key={n} className="flex items-center gap-1">
              {n}
              {n !== "Pricing" && <ChevronDown className="size-4 text-[#8a9794]" />}
            </span>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <span>Sign in</span>
        <span className="rounded-lg px-5 py-2.5 font-semibold text-white" style={{ background: brand }}>
          Start free trial
        </span>
      </div>
    </header>
  );
}

function Dashboard({ compact }: { compact?: boolean }) {
  const bars = [42, 55, 48, 63, 58, 71, 66, 78, 74, 86, 80, 92];
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-[#dfe7e4] bg-white text-left shadow-[0_30px_60px_-30px_rgb(15_40_35/0.35)]", compact ? "text-[11px]" : "text-[13px]")}>
      <div className="flex">
        {!compact && (
          <aside className="w-52 shrink-0 border-r border-[#eef2f0] bg-[#f8faf9] p-4">
            <Logo small />
            <ul className="mt-6 space-y-1 text-[#4b5a56]">
              {[
                [LayoutDashboard, "Overview", true],
                [RefreshCw, "Reconcile", false],
                [Receipt, "Transactions", false],
                [FileText, "Invoices", false],
                [BarChart3, "Reports", false],
                [Settings, "Settings", false],
              ].map(([Icon, l, on]) => {
                const I = Icon as typeof Receipt;
                return (
                  <li key={l as string} className={cn("flex items-center gap-2.5 rounded-lg px-3 py-2", on && "bg-white font-semibold text-[#0f1f1c] shadow-sm ring-1 ring-[#e6ecea]")}>
                    <I className="size-4" /> {l as string}
                  </li>
                );
              })}
            </ul>
          </aside>
        )}
        <div className={cn("flex-1", compact ? "p-4" : "p-6")}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#8a9794]">October close</p>
              <p className={cn("font-bold text-[#0f1f1c]", compact ? "text-[15px]" : "text-[20px]")}>Overview</p>
            </div>
            {!compact && (
              <span className="flex items-center gap-2 rounded-lg border border-[#e6ecea] px-3 py-2 text-[#8a9794]">
                <Search className="size-4" /> Search transactions
              </span>
            )}
          </div>
          <div className={cn("mt-4 grid gap-3", compact ? "grid-cols-2" : "grid-cols-3")}>
            {[
              ["Cash balance", "£284,120", "+4.2% vs Sept"],
              ["To reconcile", "12", "of 1,284 items"],
              ...(compact ? [] : [["Overdue invoices", "£8,430", "3 customers"]]),
            ].map(([k, v, s]) => (
              <div key={k} className="rounded-xl border border-[#eef2f0] p-3.5">
                <p className="text-[#8a9794]">{k}</p>
                <p className={cn("mt-1 font-bold text-[#0f1f1c]", compact ? "text-[16px]" : "text-[22px]")}>{v}</p>
                <p className="mt-0.5 text-[#0b6e5f]">{s}</p>
              </div>
            ))}
          </div>
          <div className={cn("mt-3 grid gap-3", !compact && "grid-cols-[1.4fr_1fr]")}>
            <div className="rounded-xl border border-[#eef2f0] p-4">
              <p className="font-semibold text-[#0f1f1c]">Cash flow</p>
              <div className={cn("mt-3 flex items-end gap-2", compact ? "h-20" : "h-32")}>
                {bars.map((h, i) => (
                  <span key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i === bars.length - 1 ? brand : "#cfe5df" }} />
                ))}
              </div>
            </div>
            {!compact && (
              <div className="rounded-xl border border-[#eef2f0] p-4">
                <p className="font-semibold text-[#0f1f1c]">Needs review</p>
                <ul className="mt-2 divide-y divide-[#eef2f0]">
                  {[
                    ["Cloud hosting", "−£1,240.00"],
                    ["Client payment · INV-2041", "+£6,500.00"],
                    ["Office supplies", "−£86.40"],
                    ["Software subscription", "−£59.00"],
                  ].map(([d, a]) => (
                    <li key={d} className="flex justify-between py-2">
                      <span className="text-[#4b5a56]">{d}</span>
                      <span className={cn("font-medium", a!.startsWith("+") ? "text-[#0b6e5f]" : "text-[#0f1f1c]")}>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function LedgerlyHome() {
  return (
    <Desktop className="bg-white">
      <Header />
      <section className="relative bg-[linear-gradient(180deg,#f2f8f6_0%,#ffffff_100%)] px-14 pt-14 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#cfe5df] bg-white px-4 py-1.5 text-[13px] font-medium text-[#0b6e5f]">
          <Sparkles className="size-3.5" /> New: automatic bank reconciliation
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-[60px] font-bold leading-[1.04] tracking-[-0.03em] text-[#0f1f1c]">Close your books in days, not weeks.</h1>
        <p className="mx-auto mt-5 max-w-xl text-[18px] leading-relaxed text-[#4b5a56]">Ledgerly reconciles transactions, chases invoices and prepares month-end reports, so small finance teams can focus on decisions.</p>
        <div className="mt-8 flex justify-center gap-3 text-[15px] font-semibold">
          <span className="flex items-center gap-2 rounded-lg px-6 py-3.5 text-white" style={{ background: brand }}>
            Start free trial <ArrowRight className="size-4" />
          </span>
          <span className="rounded-lg border border-[#d5dedb] bg-white px-6 py-3.5 text-[#0f1f1c]">Book a demo</span>
        </div>
        <p className="mt-4 text-[13px] text-[#8a9794]">14-day free trial · No card required</p>
        <div className="mx-auto mt-10 max-w-[1100px]">
          <Dashboard />
        </div>
      </section>
    </Desktop>
  );
}

const plans = [
  { name: "Starter", price: "£29", blurb: "For freelancers and sole traders", features: ["1 user", "2 bank connections", "Invoices and expenses", "Email support"] },
  { name: "Growth", price: "£79", blurb: "For small finance teams", features: ["Up to 5 users", "Unlimited bank connections", "Automatic reconciliation", "Month-end reports", "Priority support"], popular: true },
  { name: "Scale", price: "£199", blurb: "For multi-entity businesses", features: ["Unlimited users", "Multi-currency and entities", "Approval workflows", "SSO and audit log", "Dedicated onboarding"] },
];

export function LedgerlyPricing() {
  return (
    <Desktop className="bg-[#f7faf9]">
      <Header />
      <section className="px-14 pt-12 text-center">
        <h1 className="text-[48px] font-bold tracking-[-0.03em] text-[#0f1f1c]">Simple pricing that grows with your team</h1>
        <p className="mt-3 text-[17px] text-[#4b5a56]">Every plan includes a 14-day free trial. Change or cancel at any time.</p>
        <div className="mt-7 inline-flex rounded-full border border-[#dfe7e4] bg-white p-1 text-[14px] font-semibold">
          <span className="rounded-full px-5 py-2 text-[#4b5a56]">Monthly</span>
          <span className="flex items-center gap-2 rounded-full px-5 py-2 text-white" style={{ background: brand }}>
            Annual <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px]">Save 20%</span>
          </span>
        </div>
        <div className="mx-auto mt-10 grid max-w-[1120px] grid-cols-3 gap-6 text-left">
          {plans.map((p) => (
            <div key={p.name} className={cn("relative rounded-2xl border bg-white p-8", p.popular ? "border-[#0b6e5f] shadow-[0_24px_50px_-30px_rgb(11_110_95/0.6)]" : "border-[#e2eae7]")}>
              {p.popular && <span className="absolute -top-3 left-8 rounded-full px-3 py-1 text-[12px] font-semibold text-white" style={{ background: brand }}>Most popular</span>}
              <p className="text-[18px] font-bold text-[#0f1f1c]">{p.name}</p>
              <p className="mt-1 text-[14px] text-[#6b7a76]">{p.blurb}</p>
              <p className="mt-6 text-[#0f1f1c]">
                <span className="text-[44px] font-bold tracking-tight">{p.price}</span>
                <span className="text-[14px] text-[#6b7a76]"> / month, billed annually</span>
              </p>
              <span className={cn("mt-6 flex h-12 items-center justify-center rounded-lg text-[15px] font-semibold", p.popular ? "text-white" : "border border-[#d5dedb] text-[#0f1f1c]")} style={p.popular ? { background: brand } : undefined}>
                Start free trial
              </span>
              <ul className="mt-7 space-y-3 text-[14px] text-[#33413e]">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check className="size-4 text-[#0b6e5f]" strokeWidth={2.5} /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 flex justify-center gap-8 text-[14px] text-[#4b5a56]">
          {["Encrypted bank connections", "UK and EU data hosting", "Cancel any time"].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <Check className="size-4 text-[#0b6e5f]" strokeWidth={2.5} /> {t}
            </span>
          ))}
        </p>
      </section>
    </Desktop>
  );
}

export function LedgerlyMobileHome() {
  return (
    <Phone className="bg-[linear-gradient(180deg,#f2f8f6_0%,#ffffff_60%)]">
      <StatusBar />
      <header className="flex h-14 items-center justify-between px-5">
        <Logo small />
        <Menu className="size-6 text-[#0f1f1c]" />
      </header>
      <div className="px-5 pt-6">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#cfe5df] bg-white px-3 py-1 text-[12px] font-medium text-[#0b6e5f]">
          <Sparkles className="size-3" /> New: automatic reconciliation
        </span>
        <h1 className="mt-4 text-[38px] font-bold leading-[1.05] tracking-[-0.03em] text-[#0f1f1c]">Close your books in days, not weeks.</h1>
        <p className="mt-4 text-[16px] leading-relaxed text-[#4b5a56]">Reconcile, chase invoices and prepare month-end reports in one place.</p>
        <span className="mt-6 flex h-13 items-center justify-center gap-2 rounded-lg text-[15px] font-semibold text-white" style={{ background: brand }}>
          Start free trial <ArrowRight className="size-4" />
        </span>
        <span className="mt-3 flex h-13 items-center justify-center rounded-lg border border-[#d5dedb] bg-white text-[15px] font-semibold text-[#0f1f1c]">Book a demo</span>
        <div className="mt-8">
          <Dashboard compact />
        </div>
      </div>
    </Phone>
  );
}
