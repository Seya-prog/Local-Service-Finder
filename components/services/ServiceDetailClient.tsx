"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  MessageSquare,
  Check,
  Heart,
  X,
  Clock,
  ShieldCheck,
  ExternalLink,
  Loader2,
} from "lucide-react"
import { getReviewsByServiceId, ReviewItem } from "@/lib/data"
import { getProviderAvatar } from "@/lib/avatar-resolver"

export interface ServiceDetailData {
  id: string
  providerId: string
  title: string
  category: string
  description: string
  price: string
  priceUnit: string
  location: string
  city: string
  providerName: string
  providerAvatar: string
  rating: number | string
  reviewCount: number
  experience: string
  servicesIncluded: string[]
  serviceAreas: string[]
  galleryImages: string[]
  isDummy: boolean
}

interface ServiceDetailClientProps {
  service: ServiceDetailData
  isLoggedIn: boolean
  createBookingAction: (formData: FormData) => Promise<void>
}

export default function ServiceDetailClient({
  service,
  isLoggedIn,
  createBookingAction,
}: ServiceDetailClientProps) {
  const [activeTab, setActiveTab] = useState<"about" | "services" | "reviews">("about")
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Real matching reviews for this service
  const reviewsList: ReviewItem[] = getReviewsByServiceId(service.id)
  const displayReviewCount = reviewsList.length

  const resolvedProviderAvatar = getProviderAvatar(
    service.providerName,
    service.category,
    service.providerAvatar
  )
  const heroImage = service.galleryImages?.[0]
    ? getProviderAvatar(service.providerName, service.category, service.galleryImages[0])
    : resolvedProviderAvatar

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true)
    // form action will handle submission
  }

  const mapQueryLocation = `${service.city || service.location || "Bole"}, Addis Ababa, Ethiopia`
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    mapQueryLocation
  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`
  const externalMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    mapQueryLocation
  )}`

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-6 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Back Link */}
        <div>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to services</span>
          </Link>
        </div>

        {/* Top Hero Card */}
        <div className="rounded-3xl border border-gray-100 bg-white p-5 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left: Single Service Feature Photo */}
            <div className="lg:col-span-7">
              <div className="relative h-72 sm:h-96 md:h-[420px] w-full overflow-hidden rounded-3xl bg-gray-100 shadow-sm border border-gray-100">
                <Image
                  src={heroImage}
                  alt={service.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 650px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right: Service Header & CTA */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full pt-1">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 leading-tight">
                  {service.title}
                </h1>
                <p className="mt-1 text-sm font-medium text-gray-500">
                  by <span className="text-gray-800 font-semibold">{service.providerName}</span>
                </p>

                {/* Rating Badge with matching review count */}
                <div className="mt-3 flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 border border-amber-200/60">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span>{service.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    ({displayReviewCount} {displayReviewCount === 1 ? "review" : "reviews"})
                  </span>
                </div>

                {/* Location & Experience */}
                <div className="mt-3.5 flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                  <span>{service.city || service.location}</span>
                  <span className="text-gray-300">•</span>
                  <span>{service.experience}</span>
                </div>

                {/* Price Display */}
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-gray-950">
                    {service.price} ETB
                  </span>
                  <span className="text-sm font-medium text-gray-400">/{service.priceUnit || "hr"}</span>
                </div>
              </div>

              {/* Action Buttons: Full-width Book CTA */}
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B00] hover:bg-orange-600 px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg active:scale-98 cursor-pointer"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book Appointment</span>
                </button>
              </div>

              {/* Verified Trust Badge */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Verified Kebele identity & background checked professional</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Row */}
        <div className="border-b border-gray-200">
          <nav className="flex gap-8 text-sm font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("about")}
              className={`pb-3 transition-colors relative cursor-pointer ${
                activeTab === "about"
                  ? "text-orange-600 font-bold"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              About
              {activeTab === "about" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B00] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("services")}
              className={`pb-3 transition-colors relative cursor-pointer ${
                activeTab === "services"
                  ? "text-orange-600 font-bold"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Services
              {activeTab === "services" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B00] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 transition-colors relative cursor-pointer ${
                activeTab === "reviews"
                  ? "text-orange-600 font-bold"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Reviews ({displayReviewCount})
              {activeTab === "reviews" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B00] rounded-full" />
              )}
            </button>
          </nav>
        </div>

        {/* Bottom Content (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Tab Content) */}
          <div className="lg:col-span-7 space-y-6">
            {activeTab === "about" && (
              <div className="space-y-6">
                <div>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-600">
                    {service.description ||
                      "I provide reliable, trustworthy, and detail-oriented services to homes across Addis Ababa. Fully vetted with verified Kebele ID."}
                  </p>
                </div>

                {/* Provider Card */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="relative h-14 w-14 rounded-full overflow-hidden bg-gray-200 shrink-0">
                    <Image
                      src={resolvedProviderAvatar}
                      alt={service.providerName}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                      {service.providerName}
                    </h3>
                    <p className="text-xs text-gray-500">
                      LocalCare Verified Provider • {service.city || "Addis Ababa"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "services" && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-gray-900 mb-2">Services Offered</h3>
                {service.servicesIncluded.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-gray-100 shadow-xs"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shrink-0">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-gray-900">
                    Customer Feedback ({displayReviewCount})
                  </h3>
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Verified Bookings</span>
                  </span>
                </div>
                <div className="space-y-3">
                  {reviewsList.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl border border-gray-100 bg-white shadow-xs">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="relative h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                            <Image src={rev.customerAvatar} alt={rev.customerName} fill sizes="32px" className="object-cover" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-gray-900">{rev.customerName}</h4>
                            <p className="text-[10px] text-gray-400">{rev.date} • {rev.customerLocation}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span>{rev.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">&ldquo;{rev.comment}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Service Area & Real Interactive Map) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900">Service Coverage Area</h3>
                <span className="text-[11px] font-bold text-[#FF6B00] bg-orange-50 px-2 py-0.5 rounded-full">
                  Addis Ababa
                </span>
              </div>

              {/* Area List with Pins */}
              <div className="space-y-2 text-xs font-medium">
                {service.serviceAreas.map((area, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        idx === 0 ? "bg-[#FF6B00] ring-4 ring-orange-100" : "bg-gray-300"
                      }`}
                    />
                    <span className={idx === 0 ? "text-gray-900 font-bold" : "text-gray-500"}>
                      {area}
                    </span>
                  </div>
                ))}
              </div>

              {/* Real Interactive Map Embed */}
              <div className="space-y-2.5 pt-2">
                <div className="relative h-60 sm:h-64 w-full rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 shadow-inner">
                  <iframe
                    title={`${service.providerName} Service Location`}
                    src={mapEmbedUrl}
                    className="h-full w-full border-0"
                    loading="lazy"
                    allowFullScreen
                  />
                  {/* Floating Location Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-2 pointer-events-none">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-gray-800">
                      {service.city || service.location || "Bole"}, Addis Ababa
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-500 px-1 pt-0.5">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="h-3.5 w-3.5 text-[#FF6B00]" />
                    <span>Real location coverage</span>
                  </span>
                  <a
                    href={externalMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#FF6B00] hover:text-orange-700 transition inline-flex items-center gap-1"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-gray-100">
            <button
              type="button"
              onClick={() => setIsBookingOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-extrabold text-gray-900">Book an Appointment</h3>
            <p className="text-xs text-gray-500 mt-1">
              Select your preferred date and time with {service.providerName}
            </p>

            <div className="mt-4 p-3.5 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-between text-xs font-semibold text-orange-950">
              <span>{service.title}</span>
              <span className="font-extrabold text-orange-600">{service.price} ETB/{service.priceUnit || "hr"}</span>
            </div>

            {service.isDummy ? (
              <div className="mt-6 text-center py-5 bg-amber-50 text-amber-900 rounded-xl font-medium border border-amber-200 text-xs leading-relaxed">
                This is a demo profile from sample mock data. Bookings are enabled for newly registered providers!
              </div>
            ) : isLoggedIn ? (
              <form action={createBookingAction} onSubmit={handleBookingSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Select Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    defaultValue={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Select Time Window
                  </label>
                  <div className="relative">
                    <select
                      name="time"
                      required
                      className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all appearance-none bg-white"
                    >
                      <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                      <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                      <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                    </select>
                    <Clock className="absolute right-3.5 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#FF6B00] py-3.5 text-sm font-bold text-white shadow-md shadow-orange-500/20 hover:bg-orange-600 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting && <Loader2 className="h-4 w-4 animate-spin text-white" />}
                    <span>{isSubmitting ? "Confirming..." : "Confirm Booking"}</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-6 text-center py-6 space-y-3">
                <p className="text-xs text-gray-600">Please sign in to confirm this booking.</p>
                <Link
                  href="/sign-in"
                  className="inline-block rounded-xl bg-[#FF6B00] px-6 py-2.5 text-xs font-bold text-white hover:bg-orange-600 transition-colors shadow-sm"
                >
                  Sign In to Book
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
