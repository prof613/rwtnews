import NextImage from "next/image" // Renamed to avoid conflict with StrapiImage type
import Link from "next/link"
import type { JSX } from "react/jsx-runtime" // Import JSX to declare the variable

// Simplified type definitions for Strapi's Rich Text block structure.
// You might want to use more comprehensive types from a library or generate them from your Strapi schema.

type StrapiTextLeaf = {
  type?: "text" // Default if not specified, Strapi might omit it for plain text
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
}

type StrapiLinkNode = {
  type: "link"
  url: string
  children: StrapiTextLeaf[]
}

type StrapiImageNode = {
  type: "image"
  image: {
    name: string
    alternativeText?: string | null
    url: string
    caption?: string | null
    width: number
    height: number
    ext?: string // e.g., '.jpeg', '.png'
    mime?: string // e.g., 'image/jpeg'
    size?: number // in kilobytes
  }
  children: [{ type: "text"; text: "" }] // Strapi image blocks often have this structure
}

type StrapiListItemNode = {
  type: "list-item"
  children: (StrapiTextLeaf | StrapiLinkNode)[] // List items can contain text and links
}

type StrapiBlockNode =
  | { type: "paragraph"; children: (StrapiTextLeaf | StrapiLinkNode)[] }
  | { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; children: (StrapiTextLeaf | StrapiLinkNode)[] }
  | { type: "list"; format: "ordered" | "unordered"; children: StrapiListItemNode[] }
  | StrapiImageNode
  | { type: "quote"; children: (StrapiTextLeaf | StrapiLinkNode)[] }
  | { type: "code"; children: [{ text: string }] } // Code blocks typically have a single text child for the content

export type StrapiRichTextContent = StrapiBlockNode[]

type RichTextRendererProps = {
  content: StrapiRichTextContent | null | undefined
  className?: string
}

// Helper function to render text leaves (bold, italic, etc.)
const renderTextLeaf = (leaf: StrapiTextLeaf | StrapiLinkNode, index: number): JSX.Element => {
  let el: JSX.Element = <>{leaf.type === "link" ? leaf.children[0]?.text : leaf.text}</> // Default to plain text

  if (leaf.type === "link") {
    // Check if it's an internal or external link
    const isInternal = leaf.url.startsWith("/") || leaf.url.startsWith(process.env.NEXT_PUBLIC_SITE_URL || "")
    const childrenContent = leaf.children.map((childLeaf, childIndex) => renderTextLeaf(childLeaf, childIndex))

    if (isInternal) {
      // Remove site URL prefix for internal links if present
      const internalPath = leaf.url.replace(process.env.NEXT_PUBLIC_SITE_URL || "ABSOLUTELY_NO_MATCH", "")
      return (
        <Link href={internalPath || "/"} key={index} className="text-rwt-red hover:underline">
          {childrenContent}
        </Link>
      )
    } else {
      return (
        <a
          href={leaf.url}
          key={index}
          target="_blank"
          rel="noopener noreferrer"
          className="text-rwt-red hover:underline"
        >
          {childrenContent}
        </a>
      )
    }
  }

  // Apply inline styles if they exist on the leaf
  if (leaf.bold) el = <strong key={index}>{el}</strong>
  if (leaf.italic) el = <em key={index}>{el}</em>
  if (leaf.underline) el = <u key={index}>{el}</u>
  if (leaf.strikethrough) el = <s key={index}>{el}</s>
  if (leaf.code)
    el = (
      <code key={index} className="bg-gray-100 text-sm p-0.5 rounded font-mono">
        {el}
      </code>
    )

  return el
}

export function RichTextRenderer({ content, className }: RichTextRendererProps) {
  if (!content) {
    return null
  }

  return (
    <div className={className}>
      {content.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={index} className="mb-4 leading-relaxed">
                {block.children.map((leaf, leafIndex) => renderTextLeaf(leaf, leafIndex))}
              </p>
            )
          case "heading":
            const Tag = `h${block.level}` as keyof JSX.IntrinsicElements
            const headingClasses = [
              "font-bold mb-3 mt-6", // Common classes
              block.level === 1 ? "text-3xl md:text-4xl" : "",
              block.level === 2 ? "text-2xl md:text-3xl" : "",
              block.level === 3 ? "text-xl md:text-2xl" : "",
              block.level === 4 ? "text-lg md:text-xl" : "",
              block.level === 5 ? "text-md md:text-lg" : "",
              block.level === 6 ? "text-base md:text-md" : "",
            ].join(" ")
            return (
              <Tag key={index} className={headingClasses}>
                {block.children.map((leaf, leafIndex) => renderTextLeaf(leaf, leafIndex))}
              </Tag>
            )
          case "list":
            const ListTag = block.format === "ordered" ? "ol" : "ul"
            const listClasses = `ml-6 mb-4 ${block.format === "ordered" ? "list-decimal" : "list-disc"} space-y-1`
            return (
              <ListTag key={index} className={listClasses}>
                {block.children.map((listItem, itemIndex) => (
                  <li key={itemIndex}>{listItem.children.map((leaf, leafIndex) => renderTextLeaf(leaf, leafIndex))}</li>
                ))}
              </ListTag>
            )
          case "image":
            const imageUrl = block.image.url.startsWith("http")
              ? block.image.url
              : `${process.env.NEXT_PUBLIC_STRAPI_URL}${block.image.url}`
            return (
              <figure key={index} className="my-6">
                <NextImage
                  src={imageUrl}
                  alt={block.image.alternativeText || block.image.name || "Rich text image"}
                  width={block.image.width || 800} // Provide a default width if not available
                  height={block.image.height || 450} // Provide a default height
                  className="rounded-lg shadow-md mx-auto" // Center images by default
                  // Consider adding 'sizes' prop if images can be very large
                />
                {block.image.caption && (
                  <figcaption className="text-center text-sm text-gray-600 mt-2 italic">
                    {block.image.caption}
                  </figcaption>
                )}
              </figure>
            )
          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-4 border-rwt-red pl-4 py-2 my-6 italic text-gray-700 bg-gray-50 rounded"
              >
                {block.children.map((leaf, leafIndex) => renderTextLeaf(leaf, leafIndex))}
              </blockquote>
            )
          case "code":
            // Basic code block rendering. For syntax highlighting, you'd use a library here.
            return (
              <pre key={index} className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-6 text-sm font-mono">
                <code>{block.children[0]?.text}</code>
              </pre>
            )
          default:
            // @ts-expect-error - handle unknown block types gracefully or log them
            console.warn("Unsupported block type:", block.type, block)
            return (
              <p key={index} className="text-red-500">
                Unsupported block type: {block.type}
              </p>
            )
        }
      })}
    </div>
  )
}
