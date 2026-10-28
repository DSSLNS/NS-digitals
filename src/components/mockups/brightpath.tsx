import { BookOpen, CheckCircle2, ChevronLeft, Circle, Clock, PlayCircle, Search, Signal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Desktop, Phone, Photo, StatusBar } from "./shared";

const navy = "#1b2a4e";
const yellow = "#ffcf4d";

function Logo({ small }: { small?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2 font-extrabold tracking-tight", small ? "text-[18px]" : "text-[22px]")} style={{ color: navy }}>
      <span className="grid size-8 place-items-center rounded-lg" style={{ background: yellow }}>
        <BookOpen className="size-4.5" strokeWidth={2.5} />
      </span>
      Brightpath
    </span>
  );
}

const courses = [
  { photo: "edu-laptop", title: "UX Foundations", meta: "12 lessons · Beginner", price: "£49", tag: "Design" },
  { photo: "edu-notes", title: "Writing for the Web", meta: "9 lessons · Beginner", price: "£39", tag: "Content" },
  { photo: "pro-office", title: "Data Analysis with Sheets", meta: "15 lessons · Intermediate", price: "£59", tag: "Data" },
  { photo: "pro-meeting", title: "Leading Remote Teams", meta: "8 lessons · All levels", price: "£45", tag: "Leadership" },
];

export function BrightpathHome() {
  return (
    <Desktop className="bg-white" >
      <header className="flex h-20 items-center justify-between border-b border-[#e8ebf2] px-14 text-[15px] text-[#3b4663]">
        <div className="flex items-center gap-10">
          <Logo />
          <nav className="flex gap-8">
            {["Courses", "Learning paths", "For teams", "Pricing"].map((n) => (
              <span key={n}>{n}</span>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-5">
          <span className="flex w-64 items-center gap-2 rounded-full bg-[#f2f4f8] px-4 py-2.5 text-[#8890a6]">
            <Search className="size-4" /> Search courses
          </span>
          <span>Log in</span>
          <span className="rounded-full px-5 py-2.5 font-bold text-white" style={{ background: navy }}>
            Start learning
          </span>
        </div>
      </header>
      <section className="grid grid-cols-[1.05fr_1fr] items-center gap-14 bg-[#f6f7fb] px-14 py-12">
        <div>
          <span className="rounded-full px-3 py-1 text-[13px] font-bold" style={{ background: yellow, color: navy }}>
            New courses every month
          </span>
          <h1 className="mt-5 text-[56px] font-extrabold leading-[1.04] tracking-[-0.03em]" style={{ color: navy }}>
            Learn practical skills from working professionals.
          </h1>
          <p className="mt-5 max-w-lg text-[18px] leading-relaxed text-[#56607a]">Short, project-based courses in design, data and leadership. Learn at your own pace, on any device.</p>
          <div className="mt-8 flex max-w-lg items-center rounded-full border border-[#dfe3ec] bg-white p-1.5 pl-5 text-[16px] shadow-sm">
            <Search className="size-5 text-[#8890a6]" />
            <span className="flex-1 pl-3 text-[#8890a6]">What do you want to learn?</span>
            <span className="rounded-full px-6 py-3 font-bold text-white" style={{ background: navy }}>
              Search
            </span>
          </div>
          <p className="mt-5 flex gap-2 text-[13px] text-[#56607a]">
            Popular:
            {["UX design", "Excel", "Public speaking", "SQL"].map((t) => (
              <span key={t} className="rounded-full border border-[#dfe3ec] bg-white px-3 py-0.5">
                {t}
              </span>
            ))}
          </p>
        </div>
        <div className="relative h-[420px]">
          <div className="absolute inset-0 overflow-hidden rounded-[28px]">
            <Photo name="edu-students" />
          </div>
          <div className="absolute -bottom-6 -left-8 w-72 rounded-2xl bg-white p-4 shadow-[0_20px_40px_-20px_rgb(27_42_78/0.45)]">
            <p className="text-[12px] font-bold uppercase tracking-wide text-[#8890a6]">Continue learning</p>
            <p className="mt-1 font-bold" style={{ color: navy }}>
              UX Foundations
            </p>
            <div className="mt-3 h-2 rounded-full bg-[#eef0f5]">
              <span className="block h-full w-1/3 rounded-full" style={{ background: yellow }} />
            </div>
            <p className="mt-2 text-[12px] text-[#56607a]">Lesson 4 of 12</p>
          </div>
        </div>
      </section>
      <section className="px-14 pt-12">
        <h2 className="text-[26px] font-extrabold" style={{ color: navy }}>
          Popular this month
        </h2>
        <div className="mt-5 grid grid-cols-4 gap-6">
          {courses.map((c) => (
            <div key={c.title} className="overflow-hidden rounded-2xl border border-[#e8ebf2]">
              <div className="relative h-[150px]">
                <Photo name={c.photo} />
                <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[12px] font-bold" style={{ color: navy }}>
                  {c.tag}
                </span>
              </div>
              <div className="p-4">
                <p className="font-bold" style={{ color: navy }}>
                  {c.title}
                </p>
                <p className="mt-1 text-[13px] text-[#56607a]">{c.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Desktop>
  );
}

export function BrightpathMobileCourse() {
  const lessons = [
    ["Why usability matters", "8 min", "done"],
    ["Research basics", "12 min", "done"],
    ["Personas and journeys", "10 min", "done"],
    ["Usability testing basics", "14 min", "current"],
    ["Prototyping", "11 min", "todo"],
  ] as const;
  return (
    <Phone className="bg-white">
      <StatusBar />
      <header className="flex h-12 items-center gap-3 px-5 text-[15px] font-bold" style={{ color: navy }}>
        <ChevronLeft className="size-5" /> UX Foundations
      </header>
      <div className="relative h-[220px] bg-black">
        <Photo name="edu-laptop" className="opacity-80" />
        <PlayCircle className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 text-white" strokeWidth={1.25} />
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-6 text-[12px] text-white">
          <span>3:12</span>
          <span className="h-1 flex-1 rounded-full bg-white/30">
            <span className="block h-full w-1/4 rounded-full" style={{ background: yellow }} />
          </span>
          <span>14:00</span>
        </div>
      </div>
      <div className="px-5 pt-5">
        <p className="text-[13px] font-bold text-[#8890a6]">Lesson 4 of 12</p>
        <h1 className="mt-1 text-[24px] font-extrabold leading-tight" style={{ color: navy }}>
          Usability testing basics
        </h1>
        <div className="mt-3 flex gap-4 text-[13px] text-[#56607a]">
          <span className="flex items-center gap-1.5">
            <Clock className="size-4" /> 14 min
          </span>
          <span className="flex items-center gap-1.5">
            <Signal className="size-4" /> Beginner
          </span>
        </div>
        <div className="mt-4 h-2 rounded-full bg-[#eef0f5]">
          <span className="block h-full w-1/3 rounded-full" style={{ background: yellow }} />
        </div>
        <p className="mt-2 text-[12px] text-[#56607a]">33% complete</p>
        <ul className="mt-5 divide-y divide-[#eef0f5] text-[15px]">
          {lessons.map(([t, d, s]) => (
            <li key={t} className={cn("flex items-center gap-3 py-3", s === "current" && "font-bold")} style={s === "current" ? { color: navy } : undefined}>
              {s === "done" ? <CheckCircle2 className="size-5 text-[#2f9e6a]" /> : s === "current" ? <PlayCircle className="size-5" /> : <Circle className="size-5 text-[#c5cad6]" />}
              <span className={cn("flex-1", s === "todo" && "text-[#56607a]")}>{t}</span>
              <span className="text-[13px] font-normal text-[#8890a6]">{d}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute inset-x-5 bottom-8">
        <span className="flex h-14 items-center justify-center rounded-full text-[16px] font-bold text-white" style={{ background: navy }}>
          Mark lesson as complete
        </span>
      </div>
    </Phone>
  );
}
