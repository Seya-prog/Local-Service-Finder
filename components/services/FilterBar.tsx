"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useCallback } from "react"
import { Search, Navigation, ChevronUp, ChevronDown } from "lucide-react"

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
  const [city, setCity] = useState(currentCity || "New York")
  const [query, setQuery] = useState(currentQuery || "Babysitter")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (city) params.set("city", city)
    else params.delete("city")
    if (query) params.set("q", query)
    else params.delete("q")
    router.push(`/explore?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col sm:flex-row items-center rounded-2xl bg-white p-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.04)] border border-gray-100 gap-2 max-w-4xl mx-auto"
    >
      <div className="relative flex items-center flex-1 w-full sm:w-auto px-3 py-1">
        <Navigation className="h-4 w-4 text-gray-400 rotate-45 shrink-0 mr-2.5" />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="New york"
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
          placeholder="Babysitter"
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
  const [foodOpen, setFoodOpen] = useState(false)
  const [housingOpen, setHousingOpen] = useState(false)
  const [educationOpen, setEducationOpen] = useState(false)
  const [availabilityOpen, setAvailabilityOpen] = useState(false)

  const updateCategory = useCallback(
    (cat: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (currentCategory === cat) {
        params.delete("category")
      } else {
        params.set("category", cat)
      }
      router.push(`/explore?${params.toString()}`)
    },
    [router, searchParams, currentCategory]
  )

  const householdItems = [
    { id: "cleaner", label: "Cleaning / Cooker / Housekeeper", cat: "Cleaning / Cooker / Housekeeper" },
    { id: "nanny", label: "Nanny / Babysitter", cat: "Nanny / Babysitter" },
    { id: "handyman", label: "Handy men", cat: "Handy men" },
    { id: "guday", label: "Guday Asfesami", cat: "Guday Adesani" },
  ]

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 pb-4 border-b border-gray-100">
        Filter
      </h2>

      {/* Categories */}
      <div className="pt-4">
        <h3 className="text-sm font-bold text-gray-800 mb-3">Categories</h3>

        {/* Household Accordion */}
        <div className="border-b border-gray-100 pb-3">
          <button
            type="button"
            onClick={() => setHouseholdOpen(!householdOpen)}
            className="flex w-full items-center justify-between py-2 text-sm font-semibold text-gray-800 hover:text-[#FF6B00]"
          >
            <span>Household</span>
            {householdOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>

          {householdOpen && (
            <div className="mt-2 space-y-2.5 pl-1">
              {householdItems.map((item) => {
                const isChecked = currentCategory === item.cat
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

        {/* Food */}
        <div className="border-b border-gray-100 py-3">
          <button
            type="button"
            onClick={() => setFoodOpen(!foodOpen)}
            className="flex w-full items-center justify-between text-sm font-semibold text-gray-800 hover:text-[#FF6B00]"
          >
            <span>Food</span>
            {foodOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>
          {foodOpen && (
            <div className="mt-2 space-y-2.5 pl-1">
              <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentCategory === "Food"}
                  onChange={() => updateCategory("Food")}
                  className="h-4 w-4 rounded border-gray-300 text-[#FF6B00] accent-[#FF6B00]"
                />
                <span>Catering & Cooking</span>
              </label>
            </div>
          )}
        </div>

        {/* Housing */}
        <div className="border-b border-gray-100 py-3">
          <button
            type="button"
            onClick={() => setHousingOpen(!housingOpen)}
            className="flex w-full items-center justify-between text-sm font-semibold text-gray-800 hover:text-[#FF6B00]"
          >
            <span>Housing</span>
            {housingOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>
          {housingOpen && (
            <div className="mt-2 space-y-2.5 pl-1">
              <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentCategory === "Housing"}
                  onChange={() => updateCategory("Housing")}
                  className="h-4 w-4 rounded border-gray-300 text-[#FF6B00] accent-[#FF6B00]"
                />
                <span>Housing & Repairs</span>
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
              <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentCategory === "Education"}
                  onChange={() => updateCategory("Education")}
                  className="h-4 w-4 rounded border-gray-300 text-[#FF6B00] accent-[#FF6B00]"
                />
                <span>Tutoring & Lessons</span>
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
              <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#FF6B00] accent-[#FF6B00]" />
                <span>Available Today</span>
              </label>
              <label className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#FF6B00] accent-[#FF6B00]" />
                <span>Weekends</span>
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
