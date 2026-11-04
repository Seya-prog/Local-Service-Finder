"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, MapPin } from "lucide-react"
import { getProviderAvatar, isMaleName } from "@/lib/avatar-resolver"

export interface ServiceCardData {
  id: string
  name: string
  avatar?: string | null
  title?: string | null
  category: string
  description?: string | null
  priceRange?: string | null
  location: string
  verified?: boolean | null
  rating?: string | number | null
  reviewCount?: number | null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ServiceCard({ service }: { service: any }) {
  const [imgError, setImgError] = useState(false)
  const name = String(service?.name || "Service Provider")
  const rawAvatar = typeof service?.avatar === "string" && service.avatar ? service.avatar : ""
  const fallbackAvatar = isMaleName(name) ? "/avatars/daniel.jpg" : "/avatars/sarah.jpg"
  const avatar = getProviderAvatar(name, service?.category || "", rawAvatar)
  const rating = service?.rating ? String(service.rating) : "5.0"
  const reviewCount = service?.reviewCount ? Number(service.reviewCount) : 0
  const title = service?.title ? String(service.title) : `${service?.category || "Local"} Service`
  const location = String(service?.location || service?.city || "Bole, Addis Ababa")
  const rawPrice = service?.priceRange ? String(service.priceRange) : "250 ETB / hr"
  const priceRange = rawPrice.includes("$") ? rawPrice.replace("$", "ETB ") : rawPrice
  const description = String(service?.description || "")

  return (
    <Link
      href={`/explore/${service.id}`}
      className="group block rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-orange-200"
    >
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-full bg-orange-50 ring-4 ring-orange-50 mx-auto sm:mx-0 flex items-center justify-center">
          <Image
            src={imgError ? fallbackAvatar : avatar}
            alt={name}
            fill
            sizes="96px"
            className="object-cover"
            onError={() => {
              if (!imgError) setImgError(true)
            }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#FF6B00] transition-colors">
              {name}
            </h3>
            {service?.verified && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#FF6B00] text-[10px] font-bold text-white shadow-xs">
                ✓
              </span>
            )}
          </div>

          <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-[#FFF9EB] px-2.5 py-0.5 text-xs font-semibold text-amber-700">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            <span>{rating}</span>
            <span className="text-gray-400 font-normal">{reviewCount} reviews</span>
          </div>

          <div className="mt-2 font-semibold text-gray-800">{title}</div>

          <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
            <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <span className="truncate">{location}</span>
          </div>

          <div className="mt-1.5 text-xs font-medium text-orange-600">
            {priceRange}
          </div>

          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}
