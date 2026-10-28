import { CalendarDays, ChevronLeft, Clock, MapPin, Minus, Plus, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Desktop, Phone, Photo, StatusBar, serif } from "./shared";

const saffron = "#e2a03f";

export function SaffronHome() {
  return (
    <Desktop className="bg-[#17110d] text-[#f3e9dc]">
      <header className="flex h-24 items-center justify-between px-14 text-[15px]">
        <span className={cn("text-[30px] italic", serif)}>Saffron Table</span>
        <nav className="flex gap-10 text-[#d9cbb8]">
          {["Menus", "Private dining", "Events", "Gift cards", "Visit us"].map((n) => (
            <span key={n}>{n}</span>
          ))}
        </nav>
        <span className="rounded-full px-6 py-3 font-semibold text-[#17110d]" style={{ background: saffron }}>
          Reserve a table
        </span>
      </header>
      <section className="grid grid-cols-[1fr_1.15fr] gap-12 px-14 pt-6">
        <div className="pt-16">
          <p className="text-[13px] uppercase tracking-[0.25em]" style={{ color: saffron }}>
            Neighbourhood kitchen · Est. 2019
          </p>
          <h1 className={cn("mt-6 text-[72px] leading-[0.98]", serif)}>Seasonal plates, slow evenings.</h1>
          <p className="mt-6 max-w-md text-[18px] leading-relaxed text-[#cdbfae]">Small plates built around the week&apos;s market, natural wines and a terrace that catches the evening sun.</p>
          <div className="mt-9 flex gap-3 text-[15px] font-semibold">
            <span className="rounded-full px-7 py-4 text-[#17110d]" style={{ background: saffron }}>
              Reserve a table
            </span>
            <span className="rounded-full border border-[#f3e9dc]/40 px-7 py-4">View the menus</span>
          </div>
          <div className="mt-12 grid max-w-md grid-cols-2 gap-6 border-t border-[#f3e9dc]/15 pt-6 text-[14px] text-[#cdbfae]">
            <p className="flex gap-3">
              <Clock className="size-5 shrink-0" style={{ color: saffron }} />
              <span>
                Tue – Sun
                <br />
                12:00 – 22:30
              </span>
            </p>
            <p className="flex gap-3">
              <MapPin className="size-5 shrink-0" style={{ color: saffron }} />
              <span>
                22 Mill Lane
                <br />
                Riverside Quarter
              </span>
            </p>
          </div>
        </div>
        <div className="grid h-[740px] grid-cols-2 grid-rows-[1.4fr_1fr] gap-4">
          <div className="relative col-span-2 overflow-hidden rounded-[24px]">
            <Photo name="food-dining" />
          </div>
          <div className="relative overflow-hidden rounded-[24px]">
            <Photo name="food-spread" />
          </div>
          <div className="relative overflow-hidden rounded-[24px]">
            <Photo name="food-terrace" />
            <span className="absolute bottom-4 left-4 rounded-full bg-[#17110d]/80 px-4 py-2 text-[13px]">The terrace is open</span>
          </div>
        </div>
      </section>
    </Desktop>
  );
}

export function SaffronMobileBooking() {
  const times = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30"];
  return (
    <Phone className="bg-[#17110d] text-[#f3e9dc]">
      <StatusBar dark />
      <header className="flex h-12 items-center gap-3 px-5">
        <ChevronLeft className="size-5" />
        <span className={cn("text-[20px] italic", serif)}>Saffron Table</span>
      </header>
      <div className="relative mx-5 mt-2 h-[120px] overflow-hidden rounded-2xl">
        <Photo name="food-bowl" />
      </div>
      <div className="px-5 pt-5">
        <h1 className={cn("text-[30px] leading-tight", serif)}>Reserve a table</h1>
        <div className="mt-4 grid grid-cols-2 gap-3 text-[14px]">
          <div className="rounded-xl border border-[#f3e9dc]/20 p-3">
            <p className="flex items-center gap-1.5 text-[12px] text-[#a8998a]">
              <CalendarDays className="size-3.5" /> Date
            </p>
            <p className="mt-1 font-semibold">Fri 14 Nov</p>
          </div>
          <div className="rounded-xl border border-[#f3e9dc]/20 p-3">
            <p className="flex items-center gap-1.5 text-[12px] text-[#a8998a]">
              <Users className="size-3.5" /> Guests
            </p>
            <p className="mt-1 flex items-center justify-between font-semibold">
              <Minus className="size-4 text-[#a8998a]" /> 4 <Plus className="size-4" style={{ color: saffron }} />
            </p>
          </div>
        </div>
        <p className="mt-5 text-[13px] text-[#a8998a]">Available times</p>
        <div className="mt-2 grid grid-cols-3 gap-2 text-[14px] font-semibold">
          {times.map((t) => (
            <span key={t} className={cn("grid h-11 place-items-center rounded-xl border", t === "19:30" ? "border-transparent text-[#17110d]" : "border-[#f3e9dc]/20", t === "18:00" && "text-[#6f645a] line-through")} style={t === "19:30" ? { background: saffron } : undefined}>
              {t}
            </span>
          ))}
        </div>
        <div className="mt-5 space-y-3 text-[14px]">
          <div>
            <p className="mb-1.5 text-[12px] text-[#a8998a]">Name</p>
            <div className="flex h-12 items-center rounded-xl border border-[#f3e9dc]/20 px-4">Priya Shah</div>
          </div>
          <div>
            <p className="mb-1.5 text-[12px] text-[#a8998a]">Mobile number</p>
            <div className="flex h-12 items-center rounded-xl border border-[#7fbf8e] px-4">+44 7700 900123</div>
            <p className="mt-1.5 text-[12px] text-[#9fd3ab]">International numbers are welcome</p>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-5 bottom-8">
        <span className="flex h-14 items-center justify-center rounded-full text-[16px] font-semibold text-[#17110d]" style={{ background: saffron }}>
          Confirm table for 4 · 19:30
        </span>
      </div>
    </Phone>
  );
}
