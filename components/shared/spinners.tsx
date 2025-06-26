import { Loader2 } from "lucide-react" // Using Lucide's loader icon

export function PageSpinner({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-600">
      <Loader2 className="h-12 w-12 animate-spin text-rwt-blue mb-4" />
      <p className="text-lg">{message}</p>
    </div>
  )
}

export function SidebarSpinner({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center h-24 text-gray-500">
      <Loader2 className="h-6 w-6 animate-spin text-rwt-blue mr-2" />
      <p className="text-sm">{message}</p>
    </div>
  )
}

export function InlineSpinner() {
  return <Loader2 className="inline-block h-5 w-5 animate-spin text-rwt-blue" />
}
