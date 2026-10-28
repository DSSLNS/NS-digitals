import { Activity, ArrowRight, Bone, Clock, HeartPulse, Menu, Phone as PhoneIcon, Footprints } from "lucide-react";
import { Desktop, Phone, Photo, StatusBar } from "./shared";

const teal = "#1f5f5b";

/** A representative dated practice website, used as the "before" in the redesign comparison. */
export function HarbourBefore() {
  const nav = ["Home", "About Us", "Our Team", "Services", "Conditions", "Fees", "News", "Testimonials", "Links", "Contact Us"];
  return (
    <Desktop className="bg-[#c9d3d8] [font-family:Verdana,Geneva,sans-serif]">
      <div className="relative mx-auto h-full w-[980px] bg-white shadow-[0_0_8px_rgb(0_0_0/0.25)]">
        <div className="flex h-[110px] items-center justify-between bg-[linear-gradient(180deg,#e8f1f6,#c5d9e6)] px-6">
          <div>
            <p className="[font-family:'Times_New_Roman',serif] text-[38px] font-bold italic text-[#1d4f7a] [text-shadow:1px_1px_0_#fff]">Harbour Clinic</p>
            <p className="text-[11px] text-[#5d7b91]">Physiotherapy · Sports Injury · Rehabilitation · Massage · Acupuncture · Pilates</p>
          </div>
          <div className="text-right text-[11px] text-[#333]">
            <p>Tel: 0000 000 000</p>
            <p className="text-[#1d4f7a] underline">Email us</p>
          </div>
        </div>
        <nav className="flex bg-[linear-gradient(180deg,#3d7cb0,#1d4f7a)] text-[11px] text-white">
          {nav.map((n) => (
            <span key={n} className="border-r border-[#6b9cc4] px-[11px] py-2">
              {n}
            </span>
          ))}
        </nav>
        <div className="bg-[#fff6c8] px-3 py-1 text-[11px] font-bold text-[#a33]">*** Welcome to Harbour Clinic!!! NEW patients welcome - please see our Fees page for details - Christmas opening hours now available ***</div>
        <div className="grid grid-cols-[180px_1fr_200px] gap-0">
          <aside className="space-y-1 border-r border-[#ddd] bg-[#f3f6f8] p-3 text-[11px]">
            <p className="mb-2 font-bold text-[#1d4f7a]">Quick Links</p>
            {["» Back Pain", "» Neck Pain", "» Sports Injuries", "» Whiplash", "» Arthritis", "» Post-Op Rehab", "» Pilates Classes", "» Massage", "» Acupuncture", "» Insurance", "» Download Forms", "» Parking"].map((l) => (
              <p key={l} className="text-[#1d4f7a] underline">
                {l}
              </p>
            ))}
            <div className="mt-4 border border-[#ccc] bg-white p-2 text-center text-[10px] text-[#666]">
              Visitors: <span className="bg-black px-1 font-mono text-[#0f0]">0012847</span>
            </div>
          </aside>
          <main className="p-4 text-[12px] leading-[1.45] text-[#666]">
            <h1 className="[font-family:'Times_New_Roman',serif] text-[22px] font-bold text-[#1d4f7a]">Welcome to our website</h1>
            <div className="relative float-right mb-2 ml-3 mt-1 h-[120px] w-[170px] border-4 border-white shadow-[0_0_3px_#999]">
              <Photo name="health-reception" />
            </div>
            <p className="mt-2">
              Harbour Clinic has been providing physiotherapy services to the local area for many years. Our team of experienced and qualified practitioners offer a wide range of treatments for a
              variety of conditions including back pain, neck pain, sports injuries and much more. We are registered with all major insurance providers and offer flexible appointment times.
            </p>
            <p className="mt-2">
              Please browse our website to find out more about our services. If you would like to make an appointment please telephone the clinic during opening hours or use the contact form on our
              Contact Us page. Please note that we require 24 hours notice for cancellations. Please see our Fees page for our current prices and our Terms and Conditions.
            </p>
            <p className="mt-2">
              We also offer Pilates classes, sports massage and acupuncture. Gift vouchers are available. Please ask at reception for details. Free parking is available at the rear of the building.
            </p>
            <p className="mt-3 text-[11px]">
              To book an appointment <span className="text-[#1d4f7a] underline">click here</span>.
            </p>
          </main>
          <aside className="space-y-3 border-l border-[#ddd] p-3 text-[11px] text-[#555]">
            <div className="border border-[#c5d9e6]">
              <p className="bg-[#1d4f7a] px-2 py-1 font-bold text-white">Latest News</p>
              {["New Pilates timetable", "Christmas opening times", "Welcome to our new physio", "Website updated!"].map((n) => (
                <p key={n} className="border-b border-dotted border-[#ccc] px-2 py-1.5 text-[#1d4f7a] underline">
                  {n}
                </p>
              ))}
            </div>
            <div className="border border-[#c5d9e6] p-2">
              <p className="font-bold text-[#1d4f7a]">Opening Hours</p>
              <p className="mt-1">Mon-Fri 8am-8pm</p>
              <p>Sat 9am-1pm</p>
              <p>Sun Closed</p>
            </div>
            <div className="border border-[#c5d9e6] p-2 text-center">
              <p className="font-bold text-[#1d4f7a]">Find Us</p>
              <div className="mt-1 h-16 bg-[repeating-linear-gradient(45deg,#e4ebd9,#e4ebd9_6px,#d5dfc6_6px,#d5dfc6_12px)]" />
            </div>
          </aside>
        </div>
        <div className="mx-4 border-t-2 border-[#1d4f7a] pt-3 text-[12px] text-[#666]">
          <p className="[font-family:'Times_New_Roman',serif] text-[18px] font-bold text-[#1d4f7a]">Our Treatments</p>
          <table className="mt-2 w-full border-collapse text-[11px]">
            <tbody>
              {[
                ["Physiotherapy", "Initial assessment and follow up appointments for all conditions. Please call for availability."],
                ["Sports Massage", "Deep tissue massage for athletes and active people. 30 and 60 minute sessions."],
                ["Acupuncture", "Western medical acupuncture provided by our trained physiotherapists."],
                ["Pilates", "Mat based classes, Monday and Thursday evenings. Booking essential. See News for timetable."],
              ].map(([t, d]) => (
                <tr key={t} className="border border-[#ccc]">
                  <td className="w-40 bg-[#eef3f6] p-1.5 font-bold text-[#1d4f7a]">{t}</td>
                  <td className="p-1.5">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-[11px]">
            <span className="text-[#1d4f7a] underline">Click here</span> to download our new patient registration form (PDF, 2.4MB).
          </p>
        </div>
        <div className="absolute bottom-0 w-[980px] bg-[#1d4f7a] px-4 py-2 text-center text-[10px] text-[#c5d9e6]">
          © Harbour Clinic | Site Map | Privacy Policy | Terms | Best viewed at 1024 x 768 in Internet Explorer
        </div>
      </div>
    </Desktop>
  );
}

function Logo() {
  return (
    <span className="flex items-center gap-2.5 text-[20px] font-bold tracking-tight text-[#163c3a]">
      <span className="grid size-9 place-items-center rounded-full" style={{ background: teal }}>
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="#e7f3ef" strokeWidth="2" strokeLinecap="round">
          <path d="M3 15c3-3 6-3 9 0s6 3 9 0M3 10c3-3 6-3 9 0s6 3 9 0" />
        </svg>
      </span>
      Harbour Clinic
    </span>
  );
}

const helps = [
  { Icon: Bone, title: "Back and neck pain", body: "Assessment, hands-on treatment and a plan to stop it coming back." },
  { Icon: Footprints, title: "Sports injuries", body: "Get back to running, training or playing safely and with confidence." },
  { Icon: Activity, title: "After surgery", body: "Structured rehabilitation after joint replacement or ligament repair." },
  { Icon: HeartPulse, title: "Pilates and wellbeing", body: "Small, physio-led classes for strength, balance and mobility." },
];

export function HarbourHome() {
  return (
    <Desktop className="bg-[#f6faf8] text-[#163c3a]">
      <header className="flex h-20 items-center justify-between border-b border-[#dbe8e3] bg-white px-14 text-[16px]">
        <Logo />
        <nav className="flex gap-9 text-[#2c4f4c]">
          {["Treatments", "Conditions", "Our team", "Fees", "Contact"].map((n) => (
            <span key={n}>{n}</span>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-2 font-semibold">
            <PhoneIcon className="size-4" /> Call us
          </span>
          <span className="rounded-full px-6 py-3 font-semibold text-white" style={{ background: teal }}>
            Book an appointment
          </span>
        </div>
      </header>
      <section className="grid grid-cols-[1fr_1fr] items-center gap-14 px-14 pt-12">
        <div>
          <p className="text-[15px] font-semibold text-[#2f7d74]">Physiotherapy and rehabilitation</p>
          <h1 className="mt-4 text-[56px] font-bold leading-[1.05] tracking-[-0.02em]">Physiotherapy that helps you move with confidence.</h1>
          <p className="mt-5 max-w-lg text-[19px] leading-relaxed text-[#3d5c59]">Same-week appointments with experienced physiotherapists. No referral needed.</p>
          <div className="mt-8 flex gap-3 text-[17px] font-semibold">
            <span className="flex items-center gap-2 rounded-full px-7 py-4 text-white" style={{ background: teal }}>
              Book an appointment <ArrowRight className="size-5" />
            </span>
            <span className="rounded-full border-2 border-[#1f5f5b] px-7 py-4">View treatments</span>
          </div>
          <div className="mt-9 flex items-center gap-3 text-[16px] text-[#3d5c59]">
            <Clock className="size-5 text-[#2f7d74]" /> Open today 8:00 am – 8:00 pm
          </div>
        </div>
        <div className="relative h-[460px] overflow-hidden rounded-[28px]">
          <Photo name="health-exercise" position="60% 50%" />
        </div>
      </section>
      <section className="px-14 pt-12">
        <h2 className="text-[28px] font-bold">How can we help?</h2>
        <div className="mt-5 grid grid-cols-4 gap-5">
          {helps.map(({ Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-[#dbe8e3] bg-white p-6">
              <Icon className="size-7 text-[#2f7d74]" strokeWidth={1.75} />
              <p className="mt-4 text-[18px] font-bold">{title}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-[#3d5c59]">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </Desktop>
  );
}

export function HarbourMobileHome() {
  return (
    <Phone className="bg-[#f6faf8] text-[#163c3a]">
      <StatusBar />
      <header className="flex h-14 items-center justify-between border-b border-[#dbe8e3] bg-white px-5">
        <Logo />
        <Menu className="size-6" />
      </header>
      <div className="px-5 pt-6">
        <p className="text-[14px] font-semibold text-[#2f7d74]">Physiotherapy and rehabilitation</p>
        <h1 className="mt-2 text-[32px] font-bold leading-[1.1] tracking-[-0.02em]">Physiotherapy that helps you move with confidence.</h1>
        <p className="mt-3 text-[17px] leading-relaxed text-[#3d5c59]">Same-week appointments. No referral needed.</p>
        <span className="mt-5 flex h-14 items-center justify-center rounded-full text-[17px] font-semibold text-white" style={{ background: teal }}>
          Book an appointment
        </span>
        <span className="mt-3 flex h-14 items-center justify-center gap-2 rounded-full border-2 border-[#1f5f5b] text-[17px] font-semibold">
          <PhoneIcon className="size-5" /> Call the clinic
        </span>
        <p className="mt-5 flex items-center gap-2 text-[15px] text-[#3d5c59]">
          <Clock className="size-4 text-[#2f7d74]" /> Open today 8:00 am – 8:00 pm
        </p>
        <div className="relative mt-5 h-[220px] overflow-hidden rounded-3xl">
          <Photo name="health-exercise" position="60% 50%" />
        </div>
      </div>
    </Phone>
  );
}
