import { Fragment } from "react";

function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** Minimal formatter for coach replies: paragraphs, bullet lists, headings and bold. */
export function RichText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1.5">
      {lines.map((raw, i) => {
        const line = raw.trimEnd();
        if (!line.trim()) return <div key={i} className="h-1" />;
        const heading = line.match(/^#{1,4}\s+(.*)/);
        if (heading) {
          return (
            <p key={i} className="pt-1 font-display text-sm font-semibold text-foreground">
              {inline(heading[1] ?? "")}
            </p>
          );
        }
        const bullet = line.match(/^\s*(?:[-*•]|\d+[.)])\s+(.*)/);
        if (bullet) {
          return (
            <div key={i} className="flex gap-2">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              <span>{inline(bullet[1] ?? "")}</span>
            </div>
          );
        }
        return <p key={i}>{inline(line)}</p>;
      })}
    </div>
  );
}
