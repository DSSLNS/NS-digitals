import { agencyCaseStudyUrl, agencyUrl } from "./links";

/**
 * Thin, always-visible notice at the top of every demo site: the brand is fictional, nothing is
 * sold or sent, and the site was built by NS Digital Solutions. Styled inline so it looks the same
 * on every demo regardless of that site's design system.
 */
export function DemoBanner({ caseStudySlug, brand }: { caseStudySlug: string; brand: string }) {
  const link: React.CSSProperties = { color: "#ffd76a", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3 };
  return (
    <div
      role="note"
      aria-label="Demo notice"
      style={{
        background: "#351b3d",
        color: "#fff9f1",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
        fontSize: 13,
        lineHeight: 1.4,
        padding: "8px 16px",
        textAlign: "center",
        position: "relative",
        zIndex: 60,
      }}
    >
      <span>
        <strong style={{ fontWeight: 600 }}>{brand}</strong> is a fictional brand. This is a live concept demo built by{" "}
        <a href={agencyUrl} style={link}>
          NS Digital Solutions
        </a>
        ; no orders, payments or messages are processed.{" "}
        <a href={agencyCaseStudyUrl(caseStudySlug)} style={link}>
          Read the case study
        </a>
      </span>
    </div>
  );
}
