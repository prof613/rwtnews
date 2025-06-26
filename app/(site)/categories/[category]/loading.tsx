import { PageSpinner } from "@/components/shared/spinners"

export default function LoadingCategoryPage() {
  // This loading state will be shown while data for a category page is being fetched.
  // You could enhance this with a skeleton UI specific to category pages.
  return <PageSpinner message="Loading category items..." />
}
