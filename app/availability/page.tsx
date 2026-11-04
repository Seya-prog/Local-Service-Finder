"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  CheckCircle2,
  Filter,
  ArrowRight,
  ShieldCheck,
  Search,
} from "lucide-react"
import Pagination from "@/components/ui/Pagination"

interface ProviderAvailability {
  id: string
  name: string
  serviceTitle: string
  category: string
  avatar: string
  city: string
  neighborhood: string
  rating: number
  reviews: number
  price: string
  availableDays: string[]
  timeSlots: string[]
  verified: boolean
}

export default function AvailabilityPage() {
  const [selectedDay, setSelectedDay] = useState<string>("Today")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedArea, setSelectedArea] = useState<string>("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [bookingModalProvider, setBookingModalProvider] = useState<ProviderAvailability | null>(null)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  const providers: ProviderAvailability[] = [
    {
      id: "svc-004",
      name: "Meron Hailu",
      serviceTitle: "Home Cleaning & Housekeeping",
      category: "Cleaning",
      avatar: "/avatars/meron.jpg",
      city: "Addis Ababa",
      neighborhood: "Kazanchis",
      rating: 4.9,
      reviews: 3,
      price: "150 ETB/hr",
      availableDays: ["Today", "Tomorrow", "This Week"],
      timeSlots: ["8:30 AM - 11:30 AM", "2:00 PM - 5:30 PM"],
      verified: true,
    },
    {
      id: "svc-003",
      name: "Abel Tesfaye",
      serviceTitle: "Plumbing & Pipe Maintenance",
      category: "Handyman",
      avatar: "/avatars/abel.jpg",
      city: "Addis Ababa",
      neighborhood: "Bole",
      rating: 4.9,
      reviews: 3,
      price: "200 ETB/hr",
      availableDays: ["Today", "This Week"],
      timeSlots: ["10:00 AM - 1:00 PM", "3:00 PM - 6:00 PM"],
      verified: true,
    },
    {
      id: "svc-005",
      name: "Solomon Kebede",
      serviceTitle: "Private Math & Science Tutoring",
      category: "Education",
      avatar: "/avatars/solomon.jpg",
      city: "Addis Ababa",
      neighborhood: "Piassa",
      rating: 4.9,
      reviews: 3,
      price: "250 ETB/hr",
      availableDays: ["Tomorrow", "Weekend", "This Week"],
      timeSlots: ["4:00 PM - 6:00 PM", "6:30 PM - 8:30 PM"],
      verified: true,
    },
    {
      id: "svc-006",
      name: "Hana Girma",
      serviceTitle: "Hair Styling & Mobile Care",
      category: "Beauty",
      avatar: "/avatars/hana.jpg",
      city: "Addis Ababa",
      neighborhood: "Sarbet",
      rating: 4.8,
      reviews: 3,
      price: "350 ETB/session",
      availableDays: ["Today", "Tomorrow", "Weekend"],
      timeSlots: ["11:00 AM - 2:00 PM", "4:00 PM - 7:00 PM"],
      verified: true,
    },
    {
      id: "svc-007",
      name: "Yonas Alemayehu",
      serviceTitle: "Electrical Repairs & Circuit Fixing",
      category: "Electrical",
      avatar: "/avatars/yonas.jpg",
      city: "Addis Ababa",
      neighborhood: "Mexico",
      rating: 4.7,
      reviews: 3,
      price: "220 ETB/hr",
      availableDays: ["Today", "Tomorrow", "This Week"],
      timeSlots: ["9:00 AM - 12:00 PM", "1:30 PM - 4:30 PM"],
      verified: true,
    },
    {
      id: "svc-008",
      name: "Tigist Worku",
      serviceTitle: "Traditional Ethiopian Cooking & Catering",
      category: "Food",
      avatar: "/avatars/tigist.jpg",
      city: "Addis Ababa",
      neighborhood: "CMC",
      rating: 5.0,
      reviews: 3,
      price: "500 ETB/meal",
      availableDays: ["Tomorrow", "Weekend", "This Week"],
      timeSlots: ["7:00 AM - 11:00 AM", "3:00 PM - 7:00 PM"],
      verified: true,
    },
  ]

  const filteredProviders = providers.filter((p) => {
    const matchesDay = selectedDay === "All" || p.availableDays.includes(selectedDay)
    const matchesCategory =
      selectedCategory === "All" || p.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesArea =
      selectedArea === "All" || p.neighborhood.toLowerCase() === selectedArea.toLowerCase()
    return matchesDay && matchesCategory && matchesArea
  })

  // Pagination calculation
  const ITEMS_PER_PAGE = 6
  const totalItems = filteredProviders.length
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE))
  const paginatedProviders = filteredProviders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleDayChange = (d: string) => {
    setSelectedDay(d)
    setCurrentPage(1)
  }

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat)
    setCurrentPage(1)
  }

  const handleAreaChange = (area: string) => {
    setSelectedArea(area)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold text-[#FF6B00]">
            <Clock className="h-3.5 w-3.5" />
            <span>Real-Time Availability</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Available Service Providers
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Browse verified professionals across Addis Ababa who are ready to accept appointments today and this week.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Day Filter */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                When do you need help?
              </label>
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {["Today", "Tomorrow", "Weekend", "This Week"].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => handleDayChange(d)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                      selectedDay === d
                        ? "bg-[#FF6B00] text-white shadow-xs"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Service Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-xs font-semibold text-gray-800 outline-hidden focus:border-[#FF6B00]"
              >
                <option value="All">All Categories</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Handyman">Plumbing & Handyman</option>
                <option value="Electrical">Electrical</option>
                <option value="Education">Education & Tutoring</option>
                <option value="Beauty">Beauty & Hair</option>
                <option value="Food">Food & Catering</option>
              </select>
            </div>

            {/* Neighborhood Filter */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Neighborhood (Addis Ababa)
              </label>
              <select
                value={selectedArea}
                onChange={(e) => handleAreaChange(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-xs font-semibold text-gray-800 outline-hidden focus:border-[#FF6B00]"
              >
                <option value="All">All Sub-Cities & Areas</option>
                <option value="Bole">Bole</option>
                <option value="Kazanchis">Kazanchis</option>
                <option value="Piassa">Piassa</option>
                <option value="Sarbet">Sarbet</option>
                <option value="CMC">CMC</option>
                <option value="Mexico">Mexico</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs text-gray-500 font-medium px-1">
          <span>Showing {filteredProviders.length} available providers for {selectedDay}</span>
          <span className="text-[#FF6B00] font-bold">Rates in Ethiopian Birr (ETB)</span>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProviders.map((provider) => (
            <div
              key={provider.id}
              className="rounded-3xl border border-gray-100 bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-orange-200 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Header Profile Row */}
                <div className="flex items-start gap-4">
                  <div className="relative h-16 w-16 rounded-2xl overflow-hidden ring-4 ring-orange-50 bg-gray-100 shrink-0">
                    <Image
                      src={provider.avatar}
                      alt={provider.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-extrabold text-gray-900 truncate">
                        {provider.name}
                      </h3>
                      {provider.verified && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-[#FF6B00] font-semibold mt-0.5">
                      {provider.serviceTitle}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3 text-gray-400 shrink-0" />
                      <span>{provider.neighborhood}, {provider.city}</span>
                    </p>
                  </div>
                </div>

                {/* Rating & Rate */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-extrabold text-gray-900">{provider.rating}</span>
                    <span className="text-gray-400">({provider.reviews})</span>
                  </div>
                  <span className="text-sm font-black text-gray-900">
                    {provider.price}
                  </span>
                </div>

                {/* Available Slots */}
                <div className="mt-3.5 space-y-1.5">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Open Slots {selectedDay}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {provider.timeSlots.map((slot) => (
                      <span
                        key={slot}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 text-[11px] font-semibold text-[#FF6B00]"
                      >
                        <Clock className="h-3 w-3" />
                        <span>{slot}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Book Action */}
              <div className="pt-2">
                <Link
                  href={`/explore/${provider.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B00] py-2.5 text-xs font-bold text-white hover:bg-orange-600 transition shadow-xs"
                >
                  <span>Book Appointment</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          itemName="available providers"
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}

