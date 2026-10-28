import type { Metadata } from "next";
import { showTestimonials, usingSamples, visibleTestimonials } from "@/content/testimonials";
import { getIndustries, getPosts, getProjects, getServices } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { DevQaStory } from "@/components/home/dev-qa-story";
import { FeaturedWork } from "@/components/home/featured-work";
import { Hero } from "@/components/home/hero";
import { Industries } from "@/components/home/industries";
import { Insights } from "@/components/home/insights";
import { Process } from "@/components/home/process";
import { ServicesShowcase } from "@/components/home/services-showcase";
import { Testimonials } from "@/components/home/testimonials";
import { Trust } from "@/components/home/trust";
import { Why } from "@/components/home/why";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = buildMetadata({
  title: "NS Digital Solutions | Web Development, QA & Performance Agency",
  description:
    "Independent web development and QA agency for growing businesses worldwide. Website development, redesign, bug fixing, testing, e-commerce, performance and maintenance.",
  path: "/",
});

export default async function HomePage() {
  const [services, industries, projects, posts] = await Promise.all([getServices(), getIndustries(), getProjects(), getPosts(3)]);
  return (
    <>
      <Hero />
      <Trust />
      <ServicesShowcase services={services} />
      <DevQaStory />
      <Process />
      <Industries industries={industries} />
      <FeaturedWork projects={projects} />
      <Why />
      {showTestimonials() && <Testimonials items={visibleTestimonials()} samples={usingSamples()} />}
      <Insights posts={posts} />
      <CtaBand />
    </>
  );
}
