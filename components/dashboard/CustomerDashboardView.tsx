"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  LayoutDashboard,
  CalendarCheck,
  User,
  Settings,
  HelpCircle,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  Layers,
  MapPin,
} from "lucide-react"
import BookingItem, { BookingDisplayItem } from "./BookingItem"
import { getProviderAvatar } from "@/lib/avatar-resolver"
import Pagination from "@/components/ui/Pagination"

interface CustomerDashboardViewProps {
  userName: string
  userEmail: string
  userImage?: string | null
  bookings: BookingDisplayItem[]
  initialTab?: string
}

export default function CustomerDashboardView({
  userName,
  userEmail,
  userImage,
  bookings: initialBookings,
  initialTab = "dashboard",
}: CustomerDashboardViewProps) {
  const validTabs: Array<"dashboard" | "bookings" | "profile" | "settings" | "help"> = [
    "dashboard",
    "bookings",
    "profile",
    "settings",
    "help",
  ]
  const [activeNav, setActiveNav] = useState<"dashboard" | "bookings" | "profile" | "settings" | "help">(
    validTabs.includes(initialTab as any) ? (initialTab as any) : "dashboard"
  )
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [bookingsPage, setBookingsPage] = useState<number>(1)

  const displayBookings = initialBookings || []

  // Stats calculation
  const totalCount = displayBookings.length
  const pendingCount = displayBookings.filter(
    (b) => b.status.toLowerCase() === "pending" || b.status.toLowerCase() === "upcoming"
  ).length
  const completedCount = displayBookings.filter(
    (b) => b.status.toLowerCase() === "completed" || b.status.toLowerCase() === "accepted"
  ).length
  const cancelledCount = displayBookings.filter(
    (b) => b.status.toLowerCase() === "cancelled"
  ).length

  // Filter for "My Bookings" tab
  const filteredBookings =
    filterStatus === "all"
      ? displayBookings
      : displayBookings.filter((b) => b.status.toLowerCase() === filterStatus.toLowerCase())

  // Pagination for My Bookings
  const BOOKINGS_PER_PAGE = 5
  const totalBookings = filteredBookings.length
  const totalBookingsPages = Math.max(1, Math.ceil(totalBookings / BOOKINGS_PER_PAGE))
  const paginatedBookings = filteredBookings.slice(
    (bookingsPage - 1) * BOOKINGS_PER_PAGE,
    bookingsPage * BOOKINGS_PER_PAGE
  )

  const handleFilterStatusChange = (status: string) => {
    setFilterStatus(status)
    setBookingsPage(1)
  }

  const handleNavClick = (tab: "dashboard" | "bookings" | "profile" | "settings" | "help") => {
    setActiveNav(tab)
    const targetUrl = tab === "dashboard" ? "/dashboard/customer" : `/dashboard/customer/${tab}`
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", targetUrl)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Dashboard Card Container */}
        <div className="rounded-3xl border border-gray-100 bg-white p-5 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Sidebar */}
            <aside className="lg:col-span-3 space-y-1">
              <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
                <button
                  type="button"
                  onClick={() => handleNavClick("dashboard")}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-bold transition-all shrink-0 cursor-pointer ${
                    activeNav === "dashboard"
                      ? "bg-orange-50 text-[#FF6B00] shadow-xs"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick("bookings")}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                    activeNav === "bookings"
                      ? "bg-orange-50 text-[#FF6B00] font-bold shadow-xs"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <CalendarCheck className="h-4 w-4" />
                  <span>My Bookings</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick("profile")}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                    activeNav === "profile"
                      ? "bg-orange-50 text-[#FF6B00] font-bold shadow-xs"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick("settings")}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                    activeNav === "settings"
                      ? "bg-orange-50 text-[#FF6B00] font-bold shadow-xs"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick("help")}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                    activeNav === "help"
                      ? "bg-orange-50 text-[#FF6B00] font-bold shadow-xs"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>Help</span>
                </button>
              </nav>
            </aside>

            {/* Right Main Content Area */}
            <main className="lg:col-span-9 space-y-8">
              {activeNav === "dashboard" && (
                <>
                  {/* Greeting & Header */}
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                      Customer Dashboard
                    </h1>
                    <h2 className="text-base sm:text-lg font-bold text-gray-800 mt-1">
                      Hello, {userName || "Dawit"}!
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                      Here are your booking requests and updates
                    </p>
                  </div>

                  {/* 4 Stat Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {/* Total Card */}
                    <div className="p-4 sm:p-5 rounded-2xl border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                        <span className="h-2 w-2 rounded-full bg-amber-400" />
                        <span>Total</span>
                      </div>
                      <p className="text-2xl sm:text-3xl font-black text-gray-950 mt-2">
                        {totalCount}
                      </p>
                    </div>

                    {/* Pending Card */}
                    <div className="p-4 sm:p-5 rounded-2xl border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                        <span className="h-2 w-2 rounded-full bg-[#FF6B00]" />
                        <span>Pending</span>
                      </div>
                      <p className="text-2xl sm:text-3xl font-black text-gray-950 mt-2">
                        {pendingCount}
                      </p>
                    </div>

                    {/* Completed Card */}
                    <div className="p-4 sm:p-5 rounded-2xl border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>Completed</span>
                      </div>
                      <p className="text-2xl sm:text-3xl font-black text-gray-950 mt-2">
                        {completedCount}
                      </p>
                    </div>

                    {/* Cancelled Card */}
                    <div className="p-4 sm:p-5 rounded-2xl border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                        <span className="h-2 w-2 rounded-full bg-rose-500" />
                        <span>Cancelled</span>
                      </div>
                      <p className="text-2xl sm:text-3xl font-black text-gray-950 mt-2">
                        {cancelledCount}
                      </p>
                    </div>
                  </div>

                  {/* Recent Bookings Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base sm:text-lg font-extrabold text-gray-900">
                        Recent Bookings
                      </h3>
                      <button
                        type="button"
                        onClick={() => setActiveNav("bookings")}
                        className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#FF6B00] hover:text-orange-600 transition-colors"
                      >
                        <span>View all</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {displayBookings.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200 p-6">
                          <Calendar className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                          <p className="text-sm font-bold text-gray-700">No bookings yet</p>
                          <p className="text-xs text-gray-400 mt-1">
                            Browse verified local services and book an appointment
                          </p>
                          <Link
                            href="/explore"
                            className="mt-4 inline-block rounded-xl bg-[#FF6B00] px-5 py-2.5 text-xs font-bold text-white hover:bg-orange-600 transition-colors shadow-sm"
                          >
                            Explore Services
                          </Link>
                        </div>
                      ) : (
                        displayBookings.slice(0, 5).map((b) => (
                          <BookingItem key={b.id} booking={b} />
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* My Bookings View */}
              {activeNav === "bookings" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-extrabold text-gray-900">My Bookings</h1>
                      <p className="text-xs text-gray-500 mt-1">
                        Track and manage all your past and upcoming service appointments
                      </p>
                    </div>

                    {/* Filter buttons */}
                    <div className="flex gap-1.5 p-1 rounded-xl bg-gray-100 text-xs font-semibold">
                      {["all", "pending", "accepted", "completed", "cancelled"].map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => handleFilterStatusChange(st)}
                          className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                            filterStatus === st
                              ? "bg-white text-gray-900 shadow-xs font-bold"
                              : "text-gray-500 hover:text-gray-900"
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {filteredBookings.length === 0 ? (
                      <div className="text-center py-16 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                        <Calendar className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm font-bold text-gray-700">No bookings in this category</p>
                        <p className="text-xs text-gray-400 mt-1">Browse services to book an appointment</p>
                        <Link
                          href="/explore"
                          className="mt-4 inline-block rounded-xl bg-[#FF6B00] px-5 py-2.5 text-xs font-bold text-white hover:bg-orange-600 transition-colors shadow-sm"
                        >
                          Explore Services
                        </Link>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-3">
                          {paginatedBookings.map((b) => (
                            <BookingItem key={b.id} booking={b} />
                          ))}
                        </div>

                        <Pagination
                          currentPage={bookingsPage}
                          totalPages={totalBookingsPages}
                          totalItems={totalBookings}
                          itemsPerPage={BOOKINGS_PER_PAGE}
                          itemName="bookings"
                          onPageChange={setBookingsPage}
                        />
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Profile Tab */}
              {activeNav === "profile" && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">My Profile</h1>
                    <p className="text-xs text-gray-500 mt-1">Manage your personal information and verified local details</p>
                  </div>

                  <div className="p-6 sm:p-8 rounded-3xl border border-gray-100 bg-white space-y-6 max-w-xl shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
                    {/* Avatar & Header badge */}
                    <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                      <div className="relative h-20 w-20 rounded-full overflow-hidden bg-orange-100 ring-4 ring-orange-100 shrink-0">
                        <Image
                          src={userImage || getProviderAvatar(userName, "customer")}
                          alt={userName}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-lg font-bold text-gray-900">{userName}</h2>
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>Verified</span>
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{userEmail}</p>
                        <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-orange-500" />
                          <span>Addis Ababa, Ethiopia</span>
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          disabled
                          value={userName}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50/80 p-3 text-xs sm:text-sm text-gray-800 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          disabled
                          value={userEmail}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50/80 p-3 text-xs sm:text-sm text-gray-800 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="text"
                          disabled
                          value="Not provided"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50/80 p-3 text-xs sm:text-sm text-gray-500 font-medium italic"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Preferred Location</label>
                        <input
                          type="text"
                          disabled
                          value="Addis Ababa, Ethiopia"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50/80 p-3 text-xs sm:text-sm text-gray-800 font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeNav === "settings" && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">Settings</h1>
                    <p className="text-xs text-gray-500 mt-1">Manage your account preferences</p>
                  </div>
                  <div className="p-6 rounded-3xl border border-gray-100 bg-white max-w-lg text-xs sm:text-sm text-gray-600 shadow-[0_2px_15px_rgba(0,0,0,0.02)] space-y-3">
                    <p className="font-semibold text-gray-900">SMS & Notification Preferences</p>
                    <p className="text-gray-500">Booking notifications are automatically delivered via SMS to your verified Ethiopian mobile number and email.</p>
                  </div>
                </div>
              )}

              {/* Help Tab */}
              {activeNav === "help" && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">Help & Support</h1>
                    <p className="text-xs text-gray-500 mt-1">Have questions or need assistance with a booking?</p>
                  </div>
                  <div className="p-6 rounded-3xl border border-gray-100 bg-white max-w-lg space-y-3 text-xs sm:text-sm text-gray-600 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
                    <p className="font-semibold text-gray-900">Customer Support in Addis Ababa</p>
                    <p>Contact our support team anytime at <span className="font-bold text-[#FF6B00]">support@localcare.et</span> or phone <span className="font-bold text-gray-900">+251 924 865 876</span>.</p>
                    <div className="pt-2">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6B00] hover:text-orange-700"
                      >
                        <span>Visit Contact Center</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

