import Link from "next/link"

export default function ServiceNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Service Not Found</h2>
      <p className="text-muted-foreground">
        The service you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Link
        href="/explore"
        className="rounded-lg bg-orange-500 px-6 py-2 text-white transition-colors hover:bg-orange-600"
      >
        Browse Services
      </Link>
    </div>
  )
}
