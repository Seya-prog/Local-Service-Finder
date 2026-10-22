import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4">
      <div className="text-8xl font-black text-orange-500">404</div>
      <h2 className="text-2xl font-bold text-gray-900">Page Not Found</h2>
      <p className="max-w-md text-center text-muted-foreground">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-orange-500 px-6 py-2.5 font-medium text-white transition-colors hover:bg-orange-600"
      >
        Go Home
      </Link>
    </div>
  )
}
