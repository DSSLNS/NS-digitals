import type { Block } from "@/content/posts";

/** Renders structured article blocks. Swap for a Portable Text / rich-text renderer if a CMS is connected. */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-ns">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return <h2 key={i}>{b.text}</h2>;
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ol>
            );
          case "quote":
            return <blockquote key={i}>{b.text}</blockquote>;
          default:
            return <p key={i}>{b.text}</p>;
        }
      })}
    </div>
  );
}
