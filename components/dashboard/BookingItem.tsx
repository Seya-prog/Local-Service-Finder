import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { getProviderAvatar } from "@/lib/avatar-resolver"

export interface BookingDisplayItem {
  id: string
  serviceTitle: string
  providerName: string
  date: string
  time?: string
  status: "Pending" | "Accepted" | "Completed" | "Cancelled" | "Upcoming" | string
  image?: string
  price?: string
}

export default function BookingItem({ booking }: { booking: BookingDisplayItem }) {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
      case "upcoming":
        return {
          bg: "bg-amber-50",
          text: "text-amber-700",
          border: "border-amber-200/60",
          dot: "bg-amber-500",
          label: "Pending",
        }
      case "accepted":
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          border: "border-emerald-200/60",
          dot: "bg-emerald-500",
          label: "Accepted",
        }
      case "completed":
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          border: "border-emerald-200/60",
          dot: "bg-emerald-500",
          label: "Completed",
        }
      case "cancelled":
        return {
          bg: "bg-rose-50",
          text: "text-rose-700",
          border: "border-rose-200/60",
          dot: "bg-rose-500",
          label: "Cancelled",
        }
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-700",
          border: "border-gray-200",
          dot: "bg-gray-400",
          label: status,
        }
    }
  }

  const badge = getStatusBadge(booking.status)

  return (
    <div className="group flex items-center justify-between p-4 sm:p-4.5 rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-orange-200 hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
        {/* Service / Provider Image */}
        <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
          <Image
            src={getProviderAvatar(booking.providerName, booking.serviceTitle, booking.image)}
            alt={booking.serviceTitle}
            fill
            sizes="56px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Text Details */}
        <div className="min-w-0">
          <h4 className="text-sm sm:text-base font-bold text-gray-900 truncate">
            {booking.serviceTitle}
          </h4>
          <p className="text-xs text-gray-500 font-medium truncate mt-0.5">
            {booking.providerName}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-400 mt-1">
            <span>{booking.date}</span>
            <span>•</span>
            <span className={`font-semibold ${badge.text}`}>{badge.label}</span>
          </div>
        </div>
      </div>

      {/* Right: Status Pill & Chevron */}
      <div className="flex items-center gap-3 shrink-0 ml-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${badge.bg} ${badge.text} ${badge.border}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />
          <span>{badge.label}</span>
        </span>

        <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all" />
      </div>
    </div>
  )
}
