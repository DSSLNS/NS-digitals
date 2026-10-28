import { ArrowRight, Briefcase, Landmark, LineChart, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Desktop, Phone, Photo, StatusBar, serif } from "./shared";

const navy = "#14284b";
const brass = "#b8955a";

function Logo({ light }: { light?: boolean }) {
  return (
    <span className={cn("flex items-center gap-3", light ? "text-white" : "text-[#14284b]")}>
      <span className="grid size-9 place-items-center border-2 text-[16px] font-bold" style={{ borderColor: brass, color: brass }}>
        N
      </span>
      <span className="leading-tight">
        <span className={cn("block text-[20px]", serif)}>Northfield</span>
        <span className="block text-[10px] uppercase tracking-[0.3em] opacity-70">Advisory</span>
      </span>
    </span>
  );
}

const services = [
  { Icon: Landmark, title: "Tax planning", body: "Year-round planning for owner-managed businesses and their directors." },
  { Icon: LineChart, title: "Business advisory", body: "Cash-flow forecasting, funding readiness and board reporting." },
  { Icon: Briefcase, title: "Wealth management", body: "Long-term planning for founders, partners and families." },
];

export function NorthfieldHome() {
  return (
    <Desktop className="bg-[#f7f5f0] text-[#14284b]">
      <section className="grid h-[600px] grid-cols-[1.05fr_1fr]" style={{ background: navy }}>
        <div className="flex flex-col px-14">
          <header className="flex h-24 items-center justify-between text-[15px] text-white/85">
            <Logo light />
            <nav className="flex gap-8">
              {["Services", "Sectors", "Insights", "About", "Contact"].map((n) => (
                <span key={n}>{n}</span>
              ))}
            </nav>
          </header>
          <div className="flex flex-1 flex-col justify-center pb-10 text-white">
            <p className="text-[13px] uppercase tracking-[0.25em]" style={{ color: brass }}>
              Independent financial advisers
            </p>
            <h1 className={cn("mt-6 text-[58px] leading-[1.05]", serif)}>Clear financial advice for growing businesses.</h1>
            <p className="mt-6 max-w-md text-[18px] leading-relaxed text-white/75">Practical planning for owner-managed companies, from first accounts to succession.</p>
            <div className="mt-9 flex gap-3 text-[15px] font-semibold">
              <span className="px-7 py-4 text-[#14284b]" style={{ background: brass }}>
                Book a consultation
              </span>
              <span className="border border-white/40 px-7 py-4 text-white">Our services</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <Photo name="pro-meeting" position="45% 50%" />
        </div>
      </section>
      <section className="grid grid-cols-[320px_1fr] gap-14 px-14 pt-14">
        <div>
          <p className="text-[13px] uppercase tracking-[0.25em]" style={{ color: brass }}>
            What we do
          </p>
          <h2 className={cn("mt-3 text-[34px] leading-tight", serif)}>Advice that grows with you</h2>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {services.map(({ Icon, title, body }) => (
            <div key={title} className="border-t-2 pt-5" style={{ borderColor: brass }}>
              <Icon className="size-6" strokeWidth={1.5} />
              <p className="mt-4 text-[19px] font-semibold">{title}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-[#4a5670]">{body}</p>
              <p className="mt-4 flex items-center gap-1.5 text-[14px] font-semibold">
                Learn more <ArrowRight className="size-4" />
              </p>
            </div>
          ))}
        </div>
      </section>
    </Desktop>
  );
}

export function NorthfieldMobileHome() {
  return (
    <Phone className="bg-[#f7f5f0] text-[#14284b]">
      <div style={{ background: navy }}>
        <StatusBar dark />
        <div className="flex h-14 items-center justify-between px-5">
          <Logo light />
          <Menu className="size-6 text-white" />
        </div>
        <div className="px-5 pb-8 pt-8 text-white">
          <p className="text-[11px] uppercase tracking-[0.25em]" style={{ color: brass }}>
            Independent financial advisers
          </p>
          <h1 className={cn("mt-4 text-[34px] leading-[1.08]", serif)}>Clear financial advice for growing businesses.</h1>
          <span className="mt-6 flex h-13 items-center justify-center text-[15px] font-semibold text-[#14284b]" style={{ background: brass }}>
            Book a consultation
          </span>
        </div>
      </div>
      <div className="relative h-[170px]">
        <Photo name="pro-meeting" />
      </div>
      <div className="space-y-4 px-5 pt-6">
        {services.slice(0, 2).map(({ Icon, title, body }) => (
          <div key={title} className="flex gap-4 border-b border-[#e3ddd1] pb-4">
            <Icon className="mt-0.5 size-6 shrink-0" strokeWidth={1.5} />
            <div>
              <p className="text-[17px] font-semibold">{title}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-[#4a5670]">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </Phone>
  );
}
