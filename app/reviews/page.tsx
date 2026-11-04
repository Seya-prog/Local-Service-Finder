"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Star,
  MapPin,
  CheckCircle2,
  Filter,
  Search,
  ArrowRight,
  ThumbsUp,
  MessageSquare,
  ShieldCheck,
} from "lucide-react"
import { allReviews, ReviewItem } from "@/lib/data"

export default function ReviewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedSubCity, setSelectedSubCity] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [helpfulLiked, setHelpfulLiked] = useState<Record<string, boolean>>({})

  const reviews: ReviewItem[] = allReviews

  const categories = ["All", "Cleaning", "Plumbing", "Education", "Food", "Tech", "Beauty", "Nanny"]
  const subCities = ["All", "Bole", "Kazanchis", "Piassa", "Sarbet", "CMC", "Mexico", "Gerji"]

  const filteredReviews = reviews.filter((r) => {
    const matchesCat =
      selectedCategory === "All" || r.serviceCategory.toLowerCase().includes(selectedCategory.toLowerCase())
    const matchesCity =
      selectedSubCity === "All" || r.customerLocation.toLowerCase().includes(selectedSubCity.toLowerCase())
    const matchesQuery =
      searchQuery.trim() === "" ||
      r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesCity && matchesQuery
  })

  const toggleHelpful = (id: string) => {
    setHelpfulLiked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-xs font-bold text-[#FF6B00]">
            <Star className="h-4 w-4 fill-[#FF6B00] text-[#FF6B00]" />
            <span>Verified Customer Reviews</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900">
            Real Reviews From Addis Ababa Homeowners
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Every review on LocalCare is submitted by verified customers after booked appointments. See how our trusted local professionals are making life easier across all sub-cities.
          </p>
        </div>

        {/* Rating Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-3xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Overall Rating</span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="h-4 w-4 fill-amber-400" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-4xl font-black text-gray-950">4.9</span>
              <span className="text-sm text-gray-400 font-medium"> / 5.0</span>
            </div>
            <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Based on {reviews.length} verified reviews</span>
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Satisfaction Rate</span>
            <div className="mt-3">
              <span className="text-4xl font-black text-gray-950">98.4%</span>
            </div>
            <p className="text-xs text-gray-500 font-medium mt-2">
              Customers who would recommend their provider
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Verified Providers</span>
            <div className="mt-3">
              <span className="text-4xl font-black text-gray-950">8</span>
            </div>
            <p className="text-xs text-gray-500 font-medium mt-2">
              Vetted across Addis Ababa sub-cities
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Kebele Vetted</span>
            <div className="mt-3 flex items-center gap-2">
              <ShieldCheck className="h-9 w-9 text-orange-500" />
              <span className="text-2xl font-black text-gray-900">100%</span>
            </div>
            <p className="text-xs text-gray-500 font-medium mt-2">
              Background and ID check guarantee
            </p>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="space-y-4 p-5 sm:p-6 rounded-3xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          {/* Search Row */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reviews by customer, provider name, or service keyword..."
              className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 py-3 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#FF6B00] focus:bg-white focus:ring-1 focus:ring-[#FF6B00] outline-hidden transition"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
            <span className="text-xs font-bold text-gray-500 shrink-0 mr-1 flex items-center gap-1">
              <Filter className="h-3 w-3" />
              <span>Category:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#FF6B00] text-white shadow-xs"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sub-City Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-gray-500 shrink-0 mr-1 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>Sub-City:</span>
            </span>
            {subCities.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => setSelectedSubCity(city)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition shrink-0 cursor-pointer ${
                  selectedSubCity === city
                    ? "bg-gray-900 text-white"
                    : "bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-gray-500 px-1">
            <span>
              Showing {filteredReviews.length} {filteredReviews.length === 1 ? "review" : "reviews"}
            </span>
            {(selectedCategory !== "All" || selectedSubCity !== "All" || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All")
                  setSelectedSubCity("All")
                  setSearchQuery("")
                }}
                className="text-[#FF6B00] font-bold hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 sm:p-6 rounded-3xl border border-gray-100 bg-white shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-4 hover:border-orange-200 hover:shadow-md transition-all"
              >
                <div>
                  {/* Top: Customer & Rating */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11 rounded-full overflow-hidden bg-gray-100 ring-2 ring-orange-50 shrink-0">
                        <Image
                          src={rev.customerAvatar}
                          alt={rev.customerName}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-gray-900">{rev.customerName}</h3>
                          {rev.verified && (
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
                              <CheckCircle2 className="h-2.5 w-2.5" />
                              <span>Verified</span>
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3 text-orange-500" />
                          <span>{rev.customerLocation}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 rounded-xl bg-amber-50 px-2.5 py-1 text-xs font-black text-amber-700 shrink-0">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span>{rev.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-gray-700 mt-3.5 leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                {/* Bottom: Provider & Service tag */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <Link
                    href={`/explore/${rev.providerId}`}
                    className="flex items-center gap-2 group hover:text-orange-600 transition"
                  >
                    <div className="relative h-7 w-7 rounded-full overflow-hidden bg-gray-100 shrink-0">
                      <Image
                        src={rev.providerAvatar}
                        alt={rev.providerName}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 group-hover:text-[#FF6B00] transition">
                        {rev.providerName}
                      </p>
                      <p className="text-[10px] text-gray-400">{rev.serviceTitle}</p>
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={() => toggleHelpful(rev.id)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition cursor-pointer ${
                      helpfulLiked[rev.id]
                        ? "bg-orange-100 text-[#FF6B00]"
                        : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <ThumbsUp className="h-3 w-3" />
                    <span>{rev.helpfulCount + (helpfulLiked[rev.id] ? 1 : 0)}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="rounded-3xl bg-gradient-to-r from-[#FF6B00] to-[#FF8533] p-8 sm:p-12 text-white text-center space-y-4 shadow-lg shadow-orange-500/10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to experience 5-star local service?
          </h2>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl mx-auto leading-relaxed">
            Book trusted background-checked cleaners, plumbers, tutors, electricians, and cooks in Addis Ababa.
          </p>
          <div className="pt-2">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-xs sm:text-sm font-bold text-[#FF6B00] hover:bg-orange-50 transition shadow-sm"
            >
              <span>Explore Verified Providers</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
