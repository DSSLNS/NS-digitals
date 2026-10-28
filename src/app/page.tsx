import type { Metadata } from "next";
import { showTestimonials, usingSamples, visibleTestimonials } from "@/content/testimonials";
import { getIndustries, getPosts, getProjectCards, getServices } from "@/lib/content";
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
  const [services, industries, projects, posts] = await Promise.all([getServices(), getIndustries(), getProjectCards(), getPosts(3)]);
  const leadService = services[0];
  const leadProject = leadService && projects.find((p) => p.primaryService === leadService.slug);
  const furniture = projects.find((p) => p.slug === "oakhaven-furniture-concept");
  const store = projects.find((p) => p.slug === "atelier-commerce-concept");
  const heroScreens = furniture &&
    store && { desktop: { slug: furniture.slug, view: furniture.cover.view, domain: furniture.domain }, phone: { slug: store.slug, view: "mobile-product" } };
  return (
    <>
      <Hero screens={heroScreens} />
      <Trust />
      <ServicesShowcase services={services} preview={leadProject && { slug: leadProject.slug, view: leadProject.cover.view, domain: leadProject.domain }} />
      <DevQaStory />
      <Process />
      <Industries industries={industries} />
      <FeaturedWork projects={projects.slice(0, 3)} total={projects.length} />
      <Why />
      {showTestimonials() && <Testimonials items={visibleTestimonials()} samples={usingSamples()} />}
      <Insights posts={posts} />
      <CtaBand />
    </>
  );
}
