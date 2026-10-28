import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/utils";
import { PageHero } from "./page-hero";
import { Container } from "@/components/ui/section";

export function LegalPage({ title, path, children }: { title: string; path: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero crumbs={[{ label: title, href: path }]} title={title} lead={`Last updated ${formatDate(siteConfig.legalUpdated)}`} />
      <Container className="max-w-3xl pb-24">
        <div className="prose-ns">{children}</div>
      </Container>
    </>
  );
}
