import { Fragment } from "react"
import sanitizeHtml from "sanitize-html"

import { cn } from "@/lib/utils"

/** Renders CMS text where `*fragment*` becomes <em> and new lines become <br>. */
export function Emphasis({ text }: { text?: string }) {
  if (!text) return null
  return text.split("\n").map((line, lineIndex) => (
    <Fragment key={lineIndex}>
      {lineIndex > 0 && <br />}
      {line.split(/(\*[^*]+\*)/g).map((part, i) =>
        part.startsWith("*") && part.endsWith("*") && part.length > 2 ? <em key={i}>{part.slice(1, -1)}</em> : part
      )}
    </Fragment>
  ))
}

/** Plain-text version (for <title>, aria labels). */
export function stripEmphasis(text?: string) {
  return text?.replace(/\*([^*]+)\*/g, "$1").replace(/\s*\n\s*/g, " ") ?? ""
}

const allowed: sanitizeHtml.IOptions = {
  allowedTags: ["p", "br", "strong", "b", "em", "i", "u", "a", "ul", "ol", "li", "h2", "h3", "h4", "blockquote"],
  allowedAttributes: { a: ["href", "target", "rel"] },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  transformTags: {
    a: (tagName, attribs) =>
      attribs.target === "_blank"
        ? { tagName, attribs: { ...attribs, rel: "noopener noreferrer" } }
        : { tagName, attribs },
  },
}

/** Sanitised HTML from Flotiq richtext fields, styled by `.rich-text` in globals.css. */
export function RichText({ html, className }: { html?: string; className?: string }) {
  if (!html) return null
  return <div className={cn("rich-text", className)} dangerouslySetInnerHTML={{ __html: sanitizeHtml(html, allowed) }} />
}
