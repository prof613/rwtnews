import { PageSpinner } from "@/components/shared/spinners"

export default function LoadingArticle() {
  // You can add a skeleton screen here for a better UX
  // For now, we'll use a simple spinner.
  return <PageSpinner message="Loading article..." />
}
