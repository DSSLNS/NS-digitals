import { CalendarDays, Compass, Heart, MapPin, Menu, Search, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Desktop, Phone, Photo, StatusBar, serif } from "./shared";

const forest = "#1d3b33";

const tours = [
  { photo: "travel-boat", place: "Italy", name: "Dolomites Lakes & Peaks", days: "8 days", price: "£1,890" },
  { photo: "travel-temple", place: "Indonesia", name: "Bali Temples & Rice Terraces", days: "10 days", price: "£2,140" },
  { photo: "travel-balloons", place: "Türkiye", name: "Cappadocia Valleys on Foot", days: "7 days", price: "£1,450" },
  { photo: "travel-alley", place: "Portugal", name: "Lisbon to the Algarve Coast", days: "9 days", price: "£1,690" },
];

function SearchField({ Icon, label, value }: { Icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex flex-1 items-center gap-3 px-5">
      <Icon className="size-5 text-[#6d7d75]" />
      <div>
        <p className="text-[12px] text-[#6d7d75]">{label}</p>
        <p className="text-[15px] font-semibold text-[#14231f]">{value}</p>
      </div>
    </div>
  );
}

export function WayfarerHome() {
  return (
    <Desktop className="bg-[#f5efe4] text-[#14231f]">
      <section className="relative h-[560px]">
        <Photo name="travel-lake" position="50% 55%" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(10_25_20/0.6)_0%,rgb(10_25_20/0.3)_45%,rgb(10_25_20/0.55)_100%)]" />
        <header className="relative flex h-24 items-center justify-between px-14 text-[15px] text-white">
          <span className="flex items-center gap-2 text-[22px] font-bold tracking-tight">
            <Compass className="size-6" /> Wayfarer
          </span>
          <nav className="flex gap-9">
            {["Destinations", "Small-group tours", "Walking holidays", "Our guides", "Travel stories"].map((n) => (
              <span key={n}>{n}</span>
            ))}
          </nav>
          <span className="rounded-full bg-white px-5 py-2.5 font-semibold text-[#14231f]">Plan a trip</span>
        </header>
        <div className="relative px-14 pt-20 text-white">
          <h1 className={cn("max-w-3xl text-[66px] leading-[1.02]", serif)}>Small-group journeys to remarkable places.</h1>
          <p className="mt-5 max-w-xl text-[19px] text-white/90">Walking-focused tours with local guides, comfortable stays and never more than twelve travellers.</p>
        </div>
        <div className="absolute inset-x-14 -bottom-11 flex h-[88px] items-center rounded-2xl bg-white shadow-[0_20px_50px_-20px_rgb(10_25_20/0.45)]">
          <SearchField Icon={MapPin} label="Destination" value="Anywhere in Europe" />
          <span className="h-10 w-px bg-[#e4ded2]" />
          <SearchField Icon={CalendarDays} label="When" value="May – June 2027" />
          <span className="h-10 w-px bg-[#e4ded2]" />
          <SearchField Icon={Users} label="Travellers" value="2 adults" />
          <span className="mr-4 flex items-center gap-2 rounded-xl px-7 py-4 text-[15px] font-semibold text-white" style={{ background: forest }}>
            <Search className="size-4" /> Find tours
          </span>
        </div>
      </section>
      <section className="px-14 pt-20">
        <div className="flex items-end justify-between">
          <h2 className={cn("text-[32px]", serif)}>Featured tours</h2>
          <span className="text-[15px] font-semibold underline underline-offset-4">See all 48 tours</span>
        </div>
        <div className="mt-5 grid grid-cols-4 gap-6">
          {tours.map((t) => (
            <div key={t.name}>
              <div className="relative h-[200px] overflow-hidden rounded-2xl">
                <Photo name={t.photo} />
                <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/90">
                  <Heart className="size-4" />
                </span>
              </div>
              <p className="mt-3 text-[13px] font-semibold uppercase tracking-wide text-[#6d7d75]">{t.place}</p>
              <p className="mt-0.5 text-[17px] font-bold">{t.name}</p>
            </div>
          ))}
        </div>
      </section>
    </Desktop>
  );
}

export function WayfarerMobileHome() {
  return (
    <Phone className="bg-[#f5efe4] text-[#14231f]">
      <div className="relative h-[430px]">
        <Photo name="travel-boat" position="50% 60%" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(10_25_20/0.5)_0%,transparent_35%,rgb(10_25_20/0.55)_100%)]" />
        <div className="relative">
          <StatusBar dark />
          <div className="flex h-12 items-center justify-between px-5 text-white">
            <span className="flex items-center gap-2 text-[19px] font-bold">
              <Compass className="size-5" /> Wayfarer
            </span>
            <Menu className="size-6" />
          </div>
        </div>
        <h1 className={cn("absolute inset-x-5 bottom-8 text-[34px] leading-[1.05] text-white", serif)}>Small-group journeys to remarkable places.</h1>
      </div>
      <div className="-mt-4 mx-4 rounded-2xl bg-white p-4 shadow-[0_16px_40px_-20px_rgb(10_25_20/0.5)]">
        {[
          [MapPin, "Destination", "Anywhere in Europe"],
          [CalendarDays, "When", "May – June 2027"],
        ].map(([Icon, l, v]) => {
          const I = Icon as typeof MapPin;
          return (
            <div key={l as string} className="flex items-center gap-3 border-b border-[#eee8dd] py-2.5">
              <I className="size-5 text-[#6d7d75]" />
              <div>
                <p className="text-[11px] text-[#6d7d75]">{l as string}</p>
                <p className="text-[15px] font-semibold">{v as string}</p>
              </div>
            </div>
          );
        })}
        <span className="mt-3 flex h-12 items-center justify-center gap-2 rounded-xl text-[15px] font-semibold text-white" style={{ background: forest }}>
          <Search className="size-4" /> Find tours
        </span>
      </div>
      <div className="px-5 pt-6">
        <p className={cn("text-[22px]", serif)}>Featured tours</p>
        <div className="mt-3 flex gap-3">
          {tours.slice(0, 2).map((t) => (
            <div key={t.name} className="w-[230px] shrink-0">
              <div className="relative h-[110px] overflow-hidden rounded-xl">
                <Photo name={t.photo} />
              </div>
              <p className="mt-2 text-[14px] font-bold">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
}

