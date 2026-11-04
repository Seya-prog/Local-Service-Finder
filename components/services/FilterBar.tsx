"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useCallback } from "react"
import { Search, Navigation, ChevronUp, ChevronDown, RotateCcw } from "lucide-react"

interface FilterBarProps {
  currentCategory?: string
  currentCity?: string
  currentQuery?: string
}

export function SearchPillBar({
  currentCity,
  currentQuery,
}: {
  currentCity?: string
  currentQuery?: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [city, setCity] = useState(currentCity || "Addis Ababa")
  const [query, setQuery] = useState(currentQuery || "")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (city.trim()) params.set("city", city.trim())
    else params.delete("city")
    if (query.trim()) params.set("q", query.trim())
    else params.delete("q")
    router.push(`/explore?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col sm:flex-row items-center rounded-2xl bg-white p-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.04)] border border-gray-100 gap-2 max-w-4xl mx-auto"
    >
      <div className="relative flex items-center flex-1 w-full sm:w-auto px-3 py-1">
        <Navigation className="h-4 w-4 text-orange-500 rotate-45 shrink-0 mr-2.5" />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Addis Ababa (Bole, Kazanchis...)"
          className="w-full bg-transparent text-sm font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none"
        />
      </div>

      <div className="hidden sm:block h-7 w-[1px] bg-gray-200" />

      <div className="relative flex items-center flex-[1.4] w-full sm:w-auto px-3 py-1">
        <Search className="h-4 w-4 text-gray-400 shrink-0 mr-2.5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search cleaner, plumber, tutor, beauty..."
          className="w-full bg-transparent text-sm font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto shrink-0 rounded-xl bg-[#FF6B00] px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#ea580c] active:scale-[0.98]"
      >
        Search
      </button>
    </form>
  )
}

export function FilterSidebar({ currentCategory }: { currentCategory?: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [householdOpen, setHouseholdOpen] = useState(true)
  const [beautyOpen, setBeautyOpen] = useState(true)
  const [techOpen, setTechOpen] = useState(true)
  const [foodOpen, setFoodOpen] = useState(false)
  const [educationOpen, setEducationOpen] = useState(false)
  const [availabilityOpen, setAvailabilityOpen] = useState(false)

  const isCatChecked = useCallback(
    (cat: string) => {
      if (!currentCategory) return false
      const cur = currentCategory.toLowerCase().trim()
      const target = cat.toLowerCase().trim()
      if (cur === target) return true
      if (cur.includes(target) || target.includes(cur)) return true
      if (target === "cleaning" && cur.includes("clean")) return true
      if (target === "nanny" && cur.includes("nanny")) return true
      if (target === "handy men" && (cur.includes("handy") || cur.includes("plumb"))) return true
      return false
    },
    [currentCategory]
  )

  const updateCategory = useCallback(
    (cat: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (isCatChecked(cat)) {
        params.delete("category")
      } else {
        params.set("category", cat)
      }
      router.push(`/explore?${params.toString()}`)
    },
    [router, searchParams, isCatChecked]
  )

  const clearAllFilters = () => {
    router.push("/explore")
  }

  const householdItems = [
    { id: "cleaner", label: "Home & Office Cleaning", cat: "Cleaning / Cooker / Housekeeper" },
    { id: "nanny", label: "Nanny & Babysitting", cat: "Nanny / Babysitter" },
    { id: "handyman", label: "Plumbing & Handyman", cat: "Handy men" },
  ]

  const hasActiveFilters = Boolean(currentCategory || searchParams.get("q") || searchParams.get("city"))

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Filter</h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF6B00] hover:text-orange-700 transition"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="pt-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Service Categories</h3>

        {/* Household Accordion */}
        <div className="border-b border-gray-100 pb-3">
          <button
            type="button"
            onClick={() => setHouseholdOpen(!householdOpen)}
            className="flex w-full items-center justify-between py-2 text-sm font-semibold text-gray-800 hover:text-[#FF6B00]"
          >
            <span>Household & Care</span>
            {householdOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>

          {householdOpen && (
            <div className="mt-2 space-y-2.5 pl-1">
              {householdItems.map((item) => {
                const isChecked = isCatChecked(item.cat)
                return (
                  <label
                    key={item.id}
                    className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer hover:text-gray-900"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => updateCategory(item.cat)}
                      className="h-4 w-4 rounded border-gray-300 text-[#FF6B00] accent-[#FF6B00]"
                    />
                    <span>{item.label}</span>
                  </label>
                )
              })}
            </div>
          )}
        </div>

        {/* Beauty */}
        <div className="border-b border-gray-100 py-3">
          <button
            type="button"
            onClick={() => setBeautyOpen(!beautyOpen)}
            className="flex w-full items-center justify-between text-sm font-semibold text-gray-800 hover:text-[#FF6B00]"
          >
            <span>Beauty & Hair</span>
            {beautyOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>
          {beautyOpen && (
            <div className="mt-2 space-y-2.5 pl-1">
              <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer hover:text-gray-900">
                <input
                  type="checkbox"
                  checked={isCatChecked("Beauty")}
                  onChange={() => updateCategory("Beauty")}
                  className="h-4 w-4 rounded border-gray-300 text-[#FF6B00] accent-[#FF6B00]"
                />
                <span>Hair Styling & Beauty Care</span>
              </label>
            </div>
          )}
        </div>

        {/* Tech & Electrical */}
        <div className="border-b border-gray-100 py-3">
          <button
            type="button"
            onClick={() => setTechOpen(!techOpen)}
            className="flex w-full items-center justify-between text-sm font-semibold text-gray-800 hover:text-[#FF6B00]"
          >
            <span>Tech & Electrical</span>
            {techOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>
          {techOpen && (
            <div className="mt-2 space-y-2.5 pl-1">
              <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer hover:text-gray-900">
                <input
                  type="checkbox"
                  checked={isCatChecked("Tech")}
                  onChange={() => updateCategory("Tech")}
                  className="h-4 w-4 rounded border-gray-300 text-[#FF6B00] accent-[#FF6B00]"
                />
                <span>Electrical & IT Repair</span>
              </label>
            </div>
          )}
        </div>

        {/* Food */}
        <div className="border-b border-gray-100 py-3">
          <button
            type="button"
            onClick={() => setFoodOpen(!foodOpen)}
            className="flex w-full items-center justify-between text-sm font-semibold text-gray-800 hover:text-[#FF6B00]"
          >
            <span>Food & Catering</span>
            {foodOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>
          {foodOpen && (
            <div className="mt-2 space-y-2.5 pl-1">
              <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer hover:text-gray-900">
                <input
                  type="checkbox"
                  checked={isCatChecked("Food")}
                  onChange={() => updateCategory("Food")}
                  className="h-4 w-4 rounded border-gray-300 text-[#FF6B00] accent-[#FF6B00]"
                />
                <span>Traditional Cooking & Catering</span>
              </label>
            </div>
          )}
        </div>

        {/* Education */}
        <div className="border-b border-gray-100 py-3">
          <button
            type="button"
            onClick={() => setEducationOpen(!educationOpen)}
            className="flex w-full items-center justify-between text-sm font-semibold text-gray-800 hover:text-[#FF6B00]"
          >
            <span>Education</span>
            {educationOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>
          {educationOpen && (
            <div className="mt-2 space-y-2.5 pl-1">
              <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer hover:text-gray-900">
                <input
                  type="checkbox"
                  checked={isCatChecked("Education")}
                  onChange={() => updateCategory("Education")}
                  className="h-4 w-4 rounded border-gray-300 text-[#FF6B00] accent-[#FF6B00]"
                />
                <span>Private Tutoring & Lessons</span>
              </label>
            </div>
          )}
        </div>

        {/* Availability */}
        <div className="pt-3">
          <button
            type="button"
            onClick={() => setAvailabilityOpen(!availabilityOpen)}
            className="flex w-full items-center justify-between text-sm font-semibold text-gray-800 hover:text-[#FF6B00]"
          >
            <span>Availability</span>
            {availabilityOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>
          {availabilityOpen && (
            <div className="mt-2 space-y-2.5 pl-1">
              <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer hover:text-gray-900">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#FF6B00] accent-[#FF6B00]" />
                <span>Available Today in Addis Ababa</span>
              </label>
              <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer hover:text-gray-900">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#FF6B00] accent-[#FF6B00]" />
                <span>Weekends Available</span>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function FilterBar({
  currentCity,
  currentQuery,
}: FilterBarProps) {
  return (
    <div className="space-y-6">
      <SearchPillBar currentCity={currentCity} currentQuery={currentQuery} />
    </div>
  )
}
