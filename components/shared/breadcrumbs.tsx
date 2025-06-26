import Link from "next/link"
import { ChevronRight } from "lucide-react" // Using Lucide icon for separator

export type BreadcrumbItem = {
  label: string
  href: string
  isCurrent?: boolean // Optional: to style the current page differently if needed
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <nav aria-label="Breadcrumb" className={`mb-4 text-sm text-gray-600 ${className}`}>
      <ol className="flex flex-wrap items-center space-x-1.5">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <ChevronRight size={16} className="mx-1 text-gray-400" />}
            {item.isCurrent || index === items.length - 1 ? (
              <span className="font-medium text-rwt-blue" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-rwt-red hover:underline transition-colors">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
