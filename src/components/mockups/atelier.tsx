import { Check, ChevronDown, ChevronRight, Heart, Lock, Menu, Search, ShoppingBag, SlidersHorizontal, Truck, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Desktop, Phone, Photo, StatusBar, serif } from "./shared";

const ink = "text-[#1f1b17]";

function Header() {
  return (
    <>
      <div className="flex h-9 items-center justify-center bg-[#1f1b17] text-[12px] tracking-wide text-[#f3ede4]">Free delivery on orders over £120 · Free 30-day returns</div>
      <header className={cn("grid h-20 grid-cols-3 items-center border-b border-[#e7dfd4] bg-[#fbf8f3] px-12 text-[14px]", ink)}>
        <nav className="flex gap-8">
          {["New in", "Women", "Men", "Knitwear", "Journal"].map((n, i) => (
            <span key={n} className={i === 3 ? "underline underline-offset-8" : ""}>
              {n}
            </span>
          ))}
        </nav>
        <span className={cn("text-center text-[30px] tracking-[0.28em]", serif)}>ATELIER</span>
        <div className="flex items-center justify-end gap-6">
          <span className="flex w-52 items-center gap-2 rounded-full border border-[#e2d9cc] px-4 py-2 text-[#8a8178]">
            <Search className="size-4" /> Search
          </span>
          <User className="size-5" strokeWidth={1.5} />
          <Heart className="size-5" strokeWidth={1.5} />
          <span className="relative">
            <ShoppingBag className="size-5" strokeWidth={1.5} />
            <span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-[#b5512f] text-[10px] text-white">2</span>
          </span>
        </div>
      </header>
    </>
  );
}

const products = [
  { photo: "fashion-knit-top", name: "Linen-blend knit top", price: "£68", colors: ["#efe6d6", "#8c9a84"] },
  { photo: "fashion-jacket-rust", name: "Cropped bomber jacket", price: "£145", colors: ["#c27a5c", "#2b2a28"] },
  { photo: "fashion-tee-white", name: "Organic cotton tee", price: "£32", colors: ["#ffffff", "#1f1b17", "#a9b8c9"] },
  { photo: "fashion-bag-red", name: "Structured top-handle bag", price: "£210", colors: ["#b3322a", "#3a2c24"] },
  { photo: "fashion-jacket-leather", name: "Classic leather biker", price: "£295", colors: ["#1f1b17"] },
  { photo: "fashion-tees-green", name: "Relaxed garment-dyed tee", price: "£38", colors: ["#56705f", "#d8cbb7"] },
];

function ProductCard({ p, tall }: { p: (typeof products)[number]; tall?: boolean }) {
  return (
    <div className={ink}>
      <div className={cn("relative overflow-hidden bg-[#efe8de]", tall ? "h-[330px]" : "h-[300px]")}>
        <Photo name={p.photo} />
        <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/90">
          <Heart className="size-4" strokeWidth={1.5} />
        </span>
      </div>
      <div className="mt-3 flex items-start justify-between text-[14px]">
        <span>{p.name}</span>
        <span className="font-medium">{p.price}</span>
      </div>
      <div className="mt-2 flex gap-1.5">
        {p.colors.map((c) => (
          <span key={c} className="size-3.5 rounded-full border border-black/15" style={{ background: c }} />
        ))}
      </div>
    </div>
  );
}

export function AtelierHome() {
  return (
    <Desktop className="bg-[#fbf8f3]">
      <Header />
      <section className="grid h-[470px] grid-cols-[1fr_1.35fr]">
        <div className="flex flex-col justify-center bg-[#efe7dc] px-16">
          <p className="text-[12px] uppercase tracking-[0.25em] text-[#8a6a52]">The autumn edit</p>
          <h1 className={cn("mt-5 text-[58px] leading-[1.02]", serif, ink)}>Pieces made to be lived in.</h1>
          <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-[#5b524a]">Soft knits, easy layers and natural fabrics, designed in small runs and made to last.</p>
          <div className="mt-8 flex items-center gap-6 text-[14px]">
            <span className="bg-[#1f1b17] px-7 py-3.5 text-[#fbf8f3]">Shop the edit</span>
            <span className={cn("underline underline-offset-4", ink)}>Explore knitwear</span>
          </div>
        </div>
        <div className="grid grid-cols-[1.3fr_1fr] gap-1">
          <div className="relative">
            <Photo name="fashion-rack-neutral" position="50% 40%" />
          </div>
          <div className="grid grid-rows-2 gap-1">
            <div className="relative">
              <Photo name="fashion-look-yellow" position="50% 25%" />
            </div>
            <div className="relative">
              <Photo name="fashion-rack-store" />
            </div>
          </div>
        </div>
      </section>
      <section className="px-12 pt-10">
        <div className={cn("flex items-end justify-between", ink)}>
          <h2 className={cn("text-[30px]", serif)}>New arrivals</h2>
          <span className="flex items-center gap-1 text-[14px] underline underline-offset-4">
            View all <ChevronRight className="size-4" />
          </span>
        </div>
        <div className="mt-6 grid grid-cols-4 gap-6">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.name} p={p} />
          ))}
        </div>
      </section>
    </Desktop>
  );
}

export function AtelierCollection() {
  return (
    <Desktop className="bg-[#fbf8f3]">
      <Header />
      <div className={cn("px-12 pt-7", ink)}>
        <p className="text-[12px] text-[#8a8178]">Home / Women / Knitwear & tops</p>
        <div className="mt-3 flex items-end justify-between">
          <h1 className={cn("text-[40px] leading-none", serif)}>Knitwear & tops</h1>
          <div className="flex items-center gap-3 text-[14px]">
            <span className="text-[#8a8178]">24 products</span>
            <span className="flex items-center gap-2 border border-[#d9cfc2] px-4 py-2.5">
              Sort: Newest <ChevronDown className="size-4" />
            </span>
          </div>
        </div>
      </div>
      <div className={cn("mt-6 grid grid-cols-[250px_1fr] gap-10 px-12", ink)}>
        <aside className="space-y-7 text-[14px]">
          <div className="flex items-center gap-2 font-medium">
            <SlidersHorizontal className="size-4" /> Filters
          </div>
          <div>
            <p className="mb-3 font-medium">Category</p>
            {[
              ["Knitwear", true],
              ["T-shirts", true],
              ["Jackets", false],
              ["Bags", false],
            ].map(([c, on]) => (
              <label key={c as string} className="mb-2.5 flex items-center gap-2.5">
                <span className={cn("grid size-4 place-items-center border", on ? "border-[#1f1b17] bg-[#1f1b17] text-white" : "border-[#c9bfb2]")}>{on && <Check className="size-3" strokeWidth={3} />}</span>
                {c}
              </label>
            ))}
          </div>
          <div>
            <p className="mb-3 font-medium">Size</p>
            <div className="flex flex-wrap gap-2">
              {["XS", "S", "M", "L", "XL"].map((s) => (
                <span key={s} className={cn("grid h-9 w-11 place-items-center border text-[13px]", s === "M" ? "border-[#1f1b17] bg-[#1f1b17] text-white" : "border-[#d9cfc2]")}>
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 font-medium">Colour</p>
            <div className="flex gap-2.5">
              {["#efe6d6", "#56705f", "#c27a5c", "#1f1b17", "#a9b8c9"].map((c, i) => (
                <span key={c} className={cn("size-7 rounded-full border border-black/15", i === 1 && "ring-2 ring-[#1f1b17] ring-offset-2")} style={{ background: c }} />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 font-medium">Price</p>
            <div className="relative h-1 rounded bg-[#e2d9cc]">
              <span className="absolute inset-y-0 left-[10%] right-[35%] bg-[#1f1b17]" />
              <span className="absolute left-[10%] top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#1f1b17] bg-white" />
              <span className="absolute right-[35%] top-1/2 size-4 -translate-y-1/2 translate-x-1/2 rounded-full border-2 border-[#1f1b17] bg-white" />
            </div>
            <div className="mt-3 flex justify-between text-[13px] text-[#8a8178]">
              <span>£30</span>
              <span>£200</span>
            </div>
          </div>
        </aside>
        <div>
          <div className="mb-5 flex gap-2 text-[13px]">
            {["Knitwear", "T-shirts", "Size M", "Sage"].map((f) => (
              <span key={f} className="flex items-center gap-1.5 rounded-full bg-[#efe7dc] px-3 py-1.5">
                {f} <X className="size-3" />
              </span>
            ))}
            <span className="px-2 py-1.5 underline underline-offset-4">Clear all</span>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {[products[0]!, products[5]!, products[2]!].map((p) => (
              <ProductCard key={p.name} p={p} tall />
            ))}
          </div>
        </div>
      </div>
    </Desktop>
  );
}

export function AtelierProduct() {
  return (
    <Desktop className="bg-[#fbf8f3]">
      <Header />
      <div className={cn("grid grid-cols-[1.15fr_1fr] gap-14 px-12 pt-6", ink)}>
        <div className="grid h-[750px] grid-cols-[90px_1fr] gap-4">
          <div className="space-y-3">
            {["fashion-knit-top", "fashion-rack-neutral", "fashion-tees-green", "fashion-look-yellow"].map((p, i) => (
              <div key={p} className={cn("relative h-[112px] overflow-hidden bg-[#efe8de]", i === 0 && "ring-1 ring-[#1f1b17]")}>
                <Photo name={p} />
              </div>
            ))}
          </div>
          <div className="relative overflow-hidden bg-[#efe8de]">
            <Photo name="fashion-knit-top" />
          </div>
        </div>
        <div className="pt-4">
          <p className="text-[12px] text-[#8a8178]">Home / Women / Knitwear</p>
          <h1 className={cn("mt-4 text-[40px] leading-tight", serif)}>Linen-blend knit top</h1>
          <p className="mt-2 text-[22px]">£68</p>
          <p className="mt-6 text-[14px]">
            Colour: <span className="text-[#5b524a]">Natural</span>
          </p>
          <div className="mt-3 flex gap-2.5">
            {["#efe6d6", "#8c9a84", "#2b2a28"].map((c, i) => (
              <span key={c} className={cn("size-9 rounded-full border border-black/15", i === 0 && "ring-2 ring-[#1f1b17] ring-offset-2")} style={{ background: c }} />
            ))}
          </div>
          <div className="mt-7 flex items-center justify-between text-[14px]">
            <span>Size</span>
            <span className="underline underline-offset-4">Size guide</span>
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {["XS", "S", "M", "L", "XL"].map((s) => (
              <span
                key={s}
                className={cn("grid h-12 place-items-center border text-[14px]", s === "S" ? "border-[#1f1b17] bg-[#1f1b17] text-white" : "border-[#d9cfc2]", s === "XL" && "text-[#b3aa9f] line-through")}
              >
                {s}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[13px] text-[#8a6a52]">Fits true to size. Model is 175cm and wears S.</p>
          <div className="mt-6 flex gap-3">
            <span className="flex h-14 flex-1 items-center justify-center bg-[#1f1b17] text-[15px] text-[#fbf8f3]">Add to bag</span>
            <span className="grid size-14 place-items-center border border-[#d9cfc2]">
              <Heart className="size-5" strokeWidth={1.5} />
            </span>
          </div>
          <div className="mt-6 space-y-2.5 border-y border-[#e7dfd4] py-5 text-[14px]">
            <p className="flex items-center gap-3">
              <Truck className="size-4" strokeWidth={1.5} /> Free delivery in 2–4 working days over £120
            </p>
            <p className="flex items-center gap-3">
              <Check className="size-4" strokeWidth={1.5} /> Free returns within 30 days
            </p>
          </div>
          {["Fabric & care", "Delivery & returns", "Made by"].map((a, i) => (
            <div key={a} className="flex items-center justify-between border-b border-[#e7dfd4] py-4 text-[14px]">
              {a}
              <ChevronDown className={cn("size-4", i === 0 && "rotate-180")} />
            </div>
          ))}
        </div>
      </div>
    </Desktop>
  );
}

function Field({ label, value, error, w }: { label: string; value: string; error?: string; w?: string }) {
  return (
    <div className={w}>
      <p className="mb-1.5 text-[13px] text-[#5b524a]">{label}</p>
      <div className={cn("flex h-12 items-center border bg-white px-4 text-[14px]", error ? "border-[#b3322a]" : "border-[#d9cfc2]")}>{value}</div>
      {error && <p className="mt-1.5 text-[12px] text-[#b3322a]">{error}</p>}
    </div>
  );
}

export function AtelierCheckout() {
  return (
    <Desktop className="bg-[#fbf8f3]">
      <header className={cn("flex h-20 items-center justify-between border-b border-[#e7dfd4] px-12", ink)}>
        <span className={cn("text-[28px] tracking-[0.28em]", serif)}>ATELIER</span>
        <span className="flex items-center gap-2 text-[14px] text-[#5b524a]">
          <Lock className="size-4" /> Secure checkout
        </span>
      </header>
      <div className={cn("grid grid-cols-[1.3fr_1fr] gap-16 px-12 pt-8", ink)}>
        <div>
          <ol className="flex items-center gap-4 text-[14px]">
            {["Delivery", "Shipping", "Payment"].map((s, i) => (
              <li key={s} className="flex items-center gap-3">
                <span className={cn("grid size-7 place-items-center rounded-full text-[12px]", i === 0 ? "bg-[#1f1b17] text-white" : "border border-[#c9bfb2] text-[#8a8178]")}>{i + 1}</span>
                <span className={i === 0 ? "font-medium" : "text-[#8a8178]"}>{s}</span>
                {i < 2 && <span className="h-px w-16 bg-[#d9cfc2]" />}
              </li>
            ))}
          </ol>
          <h1 className={cn("mt-8 text-[30px]", serif)}>Delivery details</h1>
          <p className="mt-1 text-[14px] text-[#5b524a]">
            Checking out as a guest. <span className="underline">Sign in</span> for faster checkout.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Field label="Email" value="sam.taylor@email.example" w="col-span-2" />
            <Field label="First name" value="Sam" />
            <Field label="Last name" value="Taylor" />
            <Field label="Address" value="14 Larch Street" w="col-span-2" />
            <Field label="City" value="Bristol" />
            <Field label="Postcode" value="BS1 4" error="Enter a full postcode, for example BS1 4DJ" />
          </div>
          <p className="mb-3 mt-6 text-[14px] font-medium">Delivery method</p>
          <div className="space-y-2 text-[14px]">
            {[
              ["Standard · 2–4 working days", "Free", true],
              ["Express · next working day", "£8.00", false],
            ].map(([l, p, on]) => (
              <div key={l as string} className={cn("flex items-center justify-between border bg-white px-4 py-3.5", on ? "border-[#1f1b17]" : "border-[#d9cfc2]")}>
                <span className="flex items-center gap-3">
                  <span className={cn("grid size-4 place-items-center rounded-full border", on ? "border-[#1f1b17]" : "border-[#c9bfb2]")}>{on && <span className="size-2 rounded-full bg-[#1f1b17]" />}</span>
                  {l}
                </span>
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>
        <aside className="h-fit bg-[#f3ece2] p-8">
          <h2 className="text-[16px] font-medium">Order summary (2)</h2>
          {[products[0]!, products[1]!].map((p) => (
            <div key={p.name} className="mt-5 flex gap-4 text-[14px]">
              <div className="relative size-20 shrink-0 overflow-hidden bg-[#e7dfd4]">
                <Photo name={p.photo} />
              </div>
              <div className="flex-1">
                <p>{p.name}</p>
                <p className="mt-1 text-[13px] text-[#8a8178]">Size S · Qty 1</p>
              </div>
              <span>{p.price}</span>
            </div>
          ))}
          <div className="mt-6 flex gap-2">
            <span className="flex h-11 flex-1 items-center border border-[#d9cfc2] bg-white px-3 text-[14px] text-[#8a8178]">Discount code</span>
            <span className="grid h-11 place-items-center border border-[#1f1b17] px-5 text-[14px]">Apply</span>
          </div>
          <dl className="mt-6 space-y-2.5 border-t border-[#ddd3c6] pt-5 text-[14px]">
            {[
              ["Subtotal", "£213.00"],
              ["Delivery", "Free"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <dt className="text-[#5b524a]">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
            <div className="flex justify-between border-t border-[#ddd3c6] pt-3 text-[18px]">
              <dt>Total</dt>
              <dd>£213.00</dd>
            </div>
          </dl>
          <span className="mt-6 flex h-14 items-center justify-center bg-[#1f1b17] text-[15px] text-[#fbf8f3]">Continue to shipping</span>
        </aside>
      </div>
    </Desktop>
  );
}

export function AtelierMobileProduct() {
  return (
    <Phone className="bg-[#fbf8f3]">
      <StatusBar />
      <header className={cn("flex h-12 items-center justify-between px-5", ink)}>
        <Menu className="size-5" />
        <span className={cn("text-[20px] tracking-[0.25em]", serif)}>ATELIER</span>
        <span className="relative">
          <ShoppingBag className="size-5" strokeWidth={1.5} />
          <span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-[#b5512f] text-[10px] text-white">2</span>
        </span>
      </header>
      <div className="relative h-[420px] bg-[#efe8de]">
        <Photo name="fashion-knit-top" />
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={cn("h-1.5 rounded-full", i === 0 ? "w-5 bg-[#1f1b17]" : "w-1.5 bg-[#1f1b17]/30")} />
          ))}
        </div>
      </div>
      <div className={cn("px-5 pt-5", ink)}>
        <div className="flex items-start justify-between">
          <h1 className={cn("text-[24px] leading-tight", serif)}>Linen-blend knit top</h1>
          <Heart className="mt-1 size-5" strokeWidth={1.5} />
        </div>
        <p className="mt-1 text-[18px]">£68</p>
        <div className="mt-4 flex items-center justify-between text-[13px]">
          <span>Size</span>
          <span className="underline underline-offset-4">Size guide</span>
        </div>
        <div className="mt-2 grid grid-cols-5 gap-1.5">
          {["XS", "S", "M", "L", "XL"].map((s) => (
            <span key={s} className={cn("grid h-11 place-items-center border text-[13px]", s === "S" ? "border-[#1f1b17] bg-[#1f1b17] text-white" : "border-[#d9cfc2]", s === "XL" && "text-[#b3aa9f] line-through")}>
              {s}
            </span>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-2 text-[13px] text-[#5b524a]">
          <Truck className="size-4" strokeWidth={1.5} /> Free delivery in 2–4 working days
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 border-t border-[#e7dfd4] bg-[#fbf8f3] px-5 pb-8 pt-3">
        <span className="flex h-13 items-center justify-center bg-[#1f1b17] text-[15px] text-[#fbf8f3]">Add to bag · £68</span>
      </div>
    </Phone>
  );
}
