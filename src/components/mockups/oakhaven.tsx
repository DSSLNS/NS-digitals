import { ArrowRight, ChevronDown, Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Desktop, Phone, Photo, StatusBar, serif } from "./shared";

const nav = ["Shop by room", "Sofas", "Chairs", "Lighting", "Collections", "Inspiration"];

function Header({ overlay }: { overlay?: boolean }) {
  return (
    <header className={cn("flex h-24 items-center justify-between px-14 text-[15px]", overlay ? "absolute inset-x-0 top-0 z-10 text-[#f7f2ea]" : "border-b border-[#e5ddd0] bg-[#f4efe6] text-[#2a2723]")}>
      <span className={cn("text-[32px] font-medium tracking-tight", serif)}>Oakhaven</span>
      <nav className="flex gap-9">
        {nav.map((n) => (
          <span key={n} className="flex items-center gap-1">
            {n}
            {n === "Shop by room" && <ChevronDown className="size-4" />}
          </span>
        ))}
      </nav>
      <div className="flex items-center gap-6">
        <Search className="size-5" strokeWidth={1.5} />
        <User className="size-5" strokeWidth={1.5} />
        <ShoppingBag className="size-5" strokeWidth={1.5} />
      </div>
    </header>
  );
}

export function OakhavenHome() {
  return (
    <Desktop className="bg-[#f4efe6] text-[#2a2723]">
      <section className="relative h-[640px]">
        <Photo name="furniture-living-warm" position="50% 60%" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(30_26_22/0.62)_0%,rgb(30_26_22/0.25)_45%,transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgb(30_26_22/0.55),transparent)]" />
        <Header overlay />
        <div className="absolute bottom-20 left-14 max-w-xl text-[#f7f2ea]">
          <p className="text-[13px] uppercase tracking-[0.22em]">The Living Room Collection</p>
          <h1 className={cn("mt-5 text-[64px] font-normal leading-[1.02]", serif)}>Furniture for slow evenings and long Sundays.</h1>
          <div className="mt-9 flex items-center gap-4 text-[15px]">
            <span className="rounded-full bg-[#f7f2ea] px-7 py-4 text-[#2a2723]">Shop the living room</span>
            <span className="rounded-full border border-[#f7f2ea]/70 px-7 py-4">Visit a showroom</span>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-[300px_1fr] gap-12 px-14 pt-12">
        <div>
          <h2 className={cn("text-[34px] leading-tight", serif)}>Shop by room</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#6b6358]">Solid oak, natural linen and wool, made to order in small workshops.</p>
        </div>
        <div className="grid grid-cols-4 gap-5">
          {[
            ["furniture-sofa-green", "Sofas"],
            ["furniture-lounge-yellow", "Armchairs"],
            ["furniture-chair-grey", "Dining chairs"],
            ["furniture-chair-white", "Accent chairs"],
          ].map(([p, l]) => (
            <div key={l}>
              <div className="relative h-[170px] overflow-hidden rounded-sm bg-[#e8e0d3]">
                <Photo name={p!} />
              </div>
              <p className="mt-3 flex items-center justify-between text-[15px]">
                {l} <ArrowRight className="size-4" strokeWidth={1.5} />
              </p>
            </div>
          ))}
        </div>
      </section>
    </Desktop>
  );
}

const pieces = [
  { photo: "furniture-sofa-leather", name: "Hollis three-seat sofa", detail: "Tan leather · 214 × 92 cm", price: "£2,450" },
  { photo: "furniture-armchair-cream", name: "Wren armchair", detail: "Ivory bouclé · 78 × 80 cm", price: "£890" },
  { photo: "furniture-sofa-green", name: "Marlow sofa", detail: "Forest velvet · 198 × 88 cm", price: "£1,980" },
];

export function OakhavenCollection() {
  return (
    <Desktop className="bg-[#f4efe6] text-[#2a2723]">
      <Header />
      <div className="px-14 pt-10">
        <p className="text-[13px] text-[#8a8174]">Collections / Living room</p>
        <div className="mt-4 flex items-end justify-between">
          <h1 className={cn("max-w-2xl text-[52px] leading-[1.05]", serif)}>The Living Room Collection</h1>
          <p className="max-w-md pb-2 text-[15px] leading-relaxed text-[#6b6358]">Generous proportions, honest materials and quiet colours. Every piece is made to order, with lead times shown on each product.</p>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-[1.25fr_1fr_1fr] gap-6 px-14">
        <div className="relative row-span-2 h-[560px] overflow-hidden rounded-sm">
          <Photo name="furniture-living-neutral" />
          <span className="absolute bottom-5 left-5 rounded-full bg-[#f7f2ea] px-4 py-2 text-[13px]">Styled with the Hollis sofa</span>
        </div>
        {pieces.slice(0, 2).map((p) => (
          <div key={p.name}>
            <div className="relative h-[220px] overflow-hidden rounded-sm bg-[#e8e0d3]">
              <Photo name={p.photo} />
              <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-[#f7f2ea]">
                <Heart className="size-4" strokeWidth={1.5} />
              </span>
            </div>
            <div className="mt-3 flex justify-between text-[15px]">
              <span>{p.name}</span>
              <span>{p.price}</span>
            </div>
            <p className="mt-1 text-[13px] text-[#8a8174]">{p.detail}</p>
            <div className="mt-2 flex gap-1.5">
              {["#b08455", "#e9e1d3", "#2f4a3a"].map((c) => (
                <span key={c} className="size-4 rounded-full border border-black/10" style={{ background: c }} />
              ))}
            </div>
          </div>
        ))}
        <div className="col-span-2 flex items-center gap-8 rounded-sm bg-[#2f4a3a] p-8 text-[#f4efe6]">
          <p className={cn("flex-1 text-[24px] leading-snug", serif)}>“Made to order in solid oak and natural fabrics, with an eight-to-ten-week lead time.”</p>
          <span className="shrink-0 rounded-full border border-[#f4efe6]/60 px-6 py-3 text-[14px]">Our materials</span>
        </div>
      </div>
    </Desktop>
  );
}

export function OakhavenMobileHome() {
  return (
    <Phone className="bg-[#f4efe6] text-[#2a2723]">
      <div className="relative h-[560px]">
        <Photo name="furniture-living-grey" position="40% 50%" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(30_26_22/0.6)_0%,transparent_28%,transparent_45%,rgb(30_26_22/0.7)_100%)]" />
        <div className="relative">
          <StatusBar dark />
          <div className="flex h-12 items-center justify-between px-5 text-[#f7f2ea]">
            <Menu className="size-5" />
            <span className={cn("text-[24px]", serif)}>Oakhaven</span>
            <ShoppingBag className="size-5" strokeWidth={1.5} />
          </div>
        </div>
        <div className="absolute inset-x-5 bottom-8 text-[#f7f2ea]">
          <p className="text-[11px] uppercase tracking-[0.2em]">The Living Room Collection</p>
          <h1 className={cn("mt-3 text-[34px] leading-[1.05]", serif)}>Furniture for slow evenings.</h1>
          <span className="mt-5 inline-block rounded-full bg-[#f7f2ea] px-6 py-3.5 text-[14px] text-[#2a2723]">Shop the living room</span>
        </div>
      </div>
      <div className="px-5 pt-7">
        <h2 className={cn("text-[24px]", serif)}>Shop by room</h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[
            ["furniture-sofa-green", "Sofas"],
            ["furniture-lounge-yellow", "Armchairs"],
          ].map(([p, l]) => (
            <div key={l}>
              <div className="relative h-[150px] overflow-hidden rounded-sm">
                <Photo name={p!} />
              </div>
              <p className="mt-2 text-[14px]">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
}
