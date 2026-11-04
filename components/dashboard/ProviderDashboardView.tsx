"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  LayoutDashboard,
  Layers,
  CalendarCheck,
  CircleDollarSign,
  User,
  Settings,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Check,
  Plus,
  Trash2,
  MapPin,
  Edit3,
} from "lucide-react"
import { updateBookingStatus, deleteService } from "@/lib/actions"
import CreateEditService from "./CreateEditService"
import { getProviderAvatar } from "@/lib/avatar-resolver"

export interface ProviderBookingItem {
  id: string
  serviceTitle: string
  customerName: string
  customerImage?: string | null
  date: string
  status: string
  price?: string | number | null
}

export interface ProviderServiceItem {
  id: string
  title: string
  category: string
  price: string | number
  city: string
  location: string
  description?: string | null
  image?: string | null
}

interface ProviderDashboardViewProps {
  userName: string
  userEmail: string
  services: ProviderServiceItem[]
  bookings: ProviderBookingItem[]
  initialTab?: string
}

export default function ProviderDashboardView({
  userName,
  userEmail,
  services: initialServices,
  bookings: initialBookings,
  initialTab = "dashboard",
}: ProviderDashboardViewProps) {
  const validTabs: Array<
    "dashboard" | "services" | "bookings" | "earnings" | "profile" | "settings" | "help"
  > = ["dashboard", "services", "bookings", "earnings", "profile", "settings", "help"]
  const [activeNav, setActiveNav] = useState<
    "dashboard" | "services" | "bookings" | "earnings" | "profile" | "settings" | "help"
  >(validTabs.includes(initialTab as any) ? (initialTab as any) : "dashboard")
  const [servicesViewMode, setServicesViewMode] = useState<"form" | "list">("list")
  const [editingService, setEditingService] = useState<ProviderServiceItem | null>(null)

  const [bookingsList, setBookingsList] = useState<ProviderBookingItem[]>(() => {
    if (initialBookings.length > 0) return initialBookings
    return [
      {
        id: "bk-req-1",
        serviceTitle: "Home Cleaning",
        customerName: "Dawit Haile",
        customerImage: "/avatars/yonas.jpg",
        date: "Apr 12, 2025",
        status: "Pending",
        price: 200,
      },
      {
        id: "bk-req-2",
        serviceTitle: "Plumbing",
        customerName: "Hiwot Girma",
        customerImage: "/avatars/hana.jpg",
        date: "Apr 11, 2025",
        status: "Pending",
        price: 250,
      },
      {
        id: "bk-req-3",
        serviceTitle: "Electrical Services",
        customerName: "Kidus Solomon",
        customerImage: "/avatars/solomon.jpg",
        date: "Apr 10, 2025",
        status: "Accepted",
        price: 220,
      },
    ]
  })

  const [servicesList, setServicesList] = useState<ProviderServiceItem[]>(() => {
    if (initialServices.length > 0) return initialServices
    return [
      {
        id: "srv-demo-1",
        title: "Home Cleaning",
        category: "Home Cleaning",
        price: "200",
        city: "Addis Ababa",
        location: "Bole",
        description: "Professional eco-friendly home and apartment cleaning in Addis Ababa.",
        image: "/avatars/meron.jpg",
      },
      {
        id: "srv-demo-2",
        title: "Plumbing",
        category: "Plumbing",
        price: "250",
        city: "Addis Ababa",
        location: "Kazanchis",
        description: "Emergency leak repairs, pipe fixtures, and residential maintenance.",
        image: "/avatars/abel.jpg",
      },
      {
        id: "srv-demo-3",
        title: "Electrical Services",
        category: "Electrical Services",
        price: "220",
        city: "Addis Ababa",
        location: "Mexico",
        description: "Lighting fixtures, circuit breakers, and wiring troubleshooting.",
        image: "/avatars/yonas.jpg",
      },
      {
        id: "srv-demo-4",
        title: "Appliance Repair",
        category: "Appliance Repair",
        price: "300",
        city: "Addis Ababa",
        location: "Sarbet",
        description: "Kitchen appliances, water heaters, and washing machine fixes.",
        image: "/avatars/solomon.jpg",
      },
    ]
  })

  const [bookingFilter, setBookingFilter] = useState<string>("all")
  const [isPending, startTransition] = useTransition()

  // Dynamic stat counts
  const totalServicesCount = servicesList.length
  const pendingRequestsCount = bookingsList.filter(
    (b) => b.status.toLowerCase() === "pending" || b.status.toLowerCase() === "upcoming"
  ).length
  const completedCount = bookingsList.filter(
    (b) => b.status.toLowerCase() === "completed" || b.status.toLowerCase() === "accepted"
  ).length
  const earningsAmount = "32,500 ETB"

  const handleStatusChange = (bookingId: string, newStatus: "Accepted" | "Declined") => {
    setBookingsList((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    )

    if (!bookingId.startsWith("bk-req-")) {
      startTransition(async () => {
        try {
          await updateBookingStatus(bookingId, newStatus)
        } catch (err) {
          console.error("Failed to update status on server:", err)
        }
      })
    }
  }

  const handleDeleteService = async (serviceId: string) => {
    setServicesList((prev) => prev.filter((s) => s.id !== serviceId))
    if (!serviceId.startsWith("srv-demo-")) {
      startTransition(async () => {
        try {
          await deleteService(serviceId)
        } catch (err) {
          console.error("Failed to delete service:", err)
        }
      })
    }
  }

  const handleEditService = (service: ProviderServiceItem) => {
    setEditingService(service)
    setServicesViewMode("form")
  }

  const handleNewService = () => {
    setEditingService(null)
    setServicesViewMode("form")
  }

  const handleSavedService = (saved: ProviderServiceItem) => {
    setServicesList((prev) => {
      const idx = prev.findIndex((s) => s.id === saved.id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = saved
        return next
      }
      return [saved, ...prev]
    })
    setServicesViewMode("list")
    setEditingService(null)
  }

  const filteredBookings =
    bookingFilter === "all"
      ? bookingsList
      : bookingsList.filter((b) => b.status.toLowerCase() === bookingFilter.toLowerCase())

  const handleNavClick = (tab: "dashboard" | "services" | "bookings" | "earnings" | "profile" | "settings" | "help") => {
    setActiveNav(tab)
    if (tab === "services") {
      setServicesViewMode("list")
      setEditingService(null)
    }
    const targetUrl = tab === "dashboard" ? "/dashboard/provider" : `/dashboard/provider/${tab}`
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
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                    activeNav === "dashboard"
                      ? "bg-orange-50 text-[#FF6B00] font-bold shadow-xs"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick("services")}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                    activeNav === "services"
                      ? "bg-orange-50 text-[#FF6B00] font-bold shadow-xs"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Layers className="h-4 w-4" />
                  <span>My Services</span>
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
                  <span>Bookings</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick("earnings")}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                    activeNav === "earnings"
                      ? "bg-orange-50 text-[#FF6B00] font-bold shadow-xs"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <CircleDollarSign className="h-4 w-4" />
                  <span>Earnings</span>
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
              {/* Dashboard Tab */}
              {activeNav === "dashboard" && (
                <>
                  {/* Header Title & Subtitle */}
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                      Provider Dashboard
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Manage your services, bookings and earnings.
                    </p>
                  </div>

                  {/* 4 Stat Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {/* Total Services */}
                    <div className="p-4 sm:p-5 rounded-2xl border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="text-gray-500 font-medium">Total Services</span>
                      </div>
                      <p className="text-2xl sm:text-3xl font-black text-gray-950 mt-2">
                        {totalServicesCount}
                      </p>
                    </div>

                    {/* Pending Requests */}
                    <div className="p-4 sm:p-5 rounded-2xl border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-500">
                        <span className="h-2 w-2 rounded-full bg-amber-400" />
                        <span className="text-gray-500 font-medium">Pending Requests</span>
                      </div>
                      <p className="text-2xl sm:text-3xl font-black text-gray-950 mt-2">
                        {pendingRequestsCount}
                      </p>
                    </div>

                    {/* Completed */}
                    <div className="p-4 sm:p-5 rounded-2xl border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-600">
                        <span className="h-2 w-2 rounded-full bg-cyan-500" />
                        <span className="text-gray-500 font-medium">Completed</span>
                      </div>
                      <p className="text-2xl sm:text-3xl font-black text-gray-950 mt-2">
                        {completedCount}
                      </p>
                    </div>

                    {/* Earnings */}
                    <div className="p-4 sm:p-5 rounded-2xl border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                        <span className="text-gray-500 font-medium">Earnings</span>
                      </div>
                      <p className="text-2xl sm:text-3xl font-black text-gray-950 mt-2">
                        {earningsAmount}
                      </p>
                    </div>
                  </div>

                  {/* Recent Booking Requests Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base sm:text-lg font-extrabold text-gray-900">
                        Recent Booking Requests
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
                      {bookingsList.slice(0, 5).map((req) => {
                        const isPendingReq =
                          req.status.toLowerCase() === "pending" ||
                          req.status.toLowerCase() === "upcoming"
                        const isAcceptedReq =
                          req.status.toLowerCase() === "accepted" ||
                          req.status.toLowerCase() === "completed"

                        return (
                          <div
                            key={req.id}
                            className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border border-gray-100 bg-white hover:border-orange-100 transition shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
                          >
                            {/* Left: Thumbnail & Customer / Service Details */}
                            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                              <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-2xl overflow-hidden bg-orange-50 shrink-0">
                                {req.customerImage ? (
                                  <Image
                                    src={req.customerImage}
                                    alt={req.customerName}
                                    fill
                                    sizes="56px"
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center font-bold text-orange-600 bg-orange-100/60">
                                    {req.customerName.charAt(0)}
                                  </div>
                                )}
                              </div>

                              <div className="truncate">
                                <h4 className="text-sm sm:text-base font-extrabold text-gray-900 truncate">
                                  {req.serviceTitle}
                                </h4>
                                <p className="text-xs text-gray-500 font-medium">
                                  {req.customerName}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1.5">
                                  <span>{req.date}</span>
                                  <span>•</span>
                                  <span
                                    className={
                                      isPendingReq
                                        ? "text-[#FF6B00] font-semibold"
                                        : isAcceptedReq
                                        ? "text-emerald-600 font-semibold"
                                        : "text-gray-500 font-semibold"
                                    }
                                  >
                                    {req.status}
                                  </span>
                                </p>
                              </div>
                            </div>

                            {/* Right: Actions */}
                            <div className="flex items-center gap-2 shrink-0">
                              {isPendingReq ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => handleStatusChange(req.id, "Accepted")}
                                    className="rounded-xl bg-[#FF6B00] px-4 sm:px-5 py-2 text-xs font-bold text-white hover:bg-orange-600 transition shadow-xs"
                                  >
                                    Accept
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleStatusChange(req.id, "Declined")}
                                    className="rounded-xl border border-gray-200 bg-white px-3.5 sm:px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition shadow-xs"
                                  >
                                    Decline
                                  </button>
                                </>
                              ) : isAcceptedReq ? (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 text-xs font-bold text-emerald-700">
                                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                                  <span>Accepted</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-100 px-3 py-1.5 text-xs font-bold text-rose-700">
                                  <span>Declined</span>
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* My Services Tab */}
              {activeNav === "services" && (
                <div className="space-y-6">
                  {servicesViewMode === "list" ? (
                    <>
                      {/* Listings Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                        <div>
                          <h2 className="text-xl sm:text-2xl font-black text-gray-950">My Services</h2>
                          <p className="text-xs text-gray-500 mt-1">
                            {servicesList.length} active service {servicesList.length === 1 ? "listing" : "listings"} in Addis Ababa
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleNewService}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-4 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-orange-600 transition shadow-xs"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add New Service</span>
                        </button>
                      </div>

                      {/* Empty State */}
                      {servicesList.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-12 text-center">
                          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-[#FF6B00] mb-4">
                            <Layers className="h-7 w-7" />
                          </div>
                          <h3 className="text-lg font-bold text-gray-900">No Services Listed Yet</h3>
                          <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1.5 mb-6">
                            Add your first service listing to start appearing in search results and receiving bookings across Addis Ababa.
                          </p>
                          <button
                            type="button"
                            onClick={handleNewService}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] px-5 py-2.5 text-xs font-bold text-white hover:bg-orange-600 transition shadow-xs"
                          >
                            <Plus className="h-4 w-4" />
                            <span>Add Your First Service</span>
                          </button>
                        </div>
                      ) : (
                        /* Services Grid */
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {servicesList.map((service) => (
                            <div
                              key={service.id}
                              className="rounded-2xl border border-gray-100 bg-white hover:border-orange-200 transition shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col justify-between"
                            >
                              <div className="relative h-40 sm:h-44 w-full bg-orange-50">
                                <Image
                                  src={getProviderAvatar(userName, service.category, service.image)}
                                  alt={service.title}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                  className="object-cover"
                                />
                                <div className="absolute top-3 left-3">
                                  <span className="text-xs font-bold text-orange-600 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs">
                                    {service.category}
                                  </span>
                                </div>
                                <div className="absolute top-3 right-3">
                                  <span className="text-xs font-black text-gray-900 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs">
                                    {service.price} ETB<span className="text-[10px] font-normal text-gray-500">/hr</span>
                                  </span>
                                </div>
                              </div>

                              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                                <div>
                                  <h3 className="text-base sm:text-lg font-extrabold text-gray-900 line-clamp-1">
                                    {service.title}
                                  </h3>
                                  <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-1.5">
                                    <MapPin className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                                    <span className="truncate">{service.city} — {service.location}</span>
                                  </p>
                                  {service.description && (
                                    <p className="text-xs text-gray-600 mt-2.5 line-clamp-2 leading-relaxed">
                                      {service.description}
                                    </p>
                                  )}
                                </div>

                                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-end gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleEditService(service)}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-[#FF6B00] hover:bg-orange-50 px-3 py-1.5 rounded-xl transition"
                                  >
                                    <Edit3 className="h-3.5 w-3.5" />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteService(service.id)}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-xl transition"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    /* Form Mode */
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingService(null)
                            setServicesViewMode("list")
                          }}
                          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-700 hover:text-[#FF6B00] transition"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          <span>Back to Listings</span>
                        </button>
                        <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                          {editingService ? `Editing: ${editingService.title}` : "Add New Service"}
                        </span>
                      </div>

                      <CreateEditService
                        initialService={editingService}
                        onCancel={() => {
                          setEditingService(null)
                          setServicesViewMode("list")
                        }}
                        onSaved={handleSavedService}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Bookings Tab */}
              {activeNav === "bookings" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-extrabold text-gray-900">All Booking Requests</h2>
                      <p className="text-xs text-gray-500 mt-1">
                        Respond to client appointments and track your service history
                      </p>
                    </div>

                    <div className="flex gap-1.5 p-1 rounded-xl bg-gray-100 text-xs font-semibold overflow-x-auto">
                      {["all", "pending", "accepted", "completed", "declined"].map((filter) => (
                        <button
                          key={filter}
                          type="button"
                          onClick={() => setBookingFilter(filter)}
                          className={`px-3 py-1.5 rounded-lg capitalize transition shrink-0 ${
                            bookingFilter === filter
                              ? "bg-white text-gray-900 shadow-xs font-bold"
                              : "text-gray-500 hover:text-gray-900"
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {filteredBookings.length === 0 ? (
                      <div className="text-center py-16 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                        <CalendarCheck className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm font-bold text-gray-700">No bookings in this category</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Booking requests from customers will appear here.
                        </p>
                      </div>
                    ) : (
                      filteredBookings.map((req) => {
                        const isPendingReq =
                          req.status.toLowerCase() === "pending" ||
                          req.status.toLowerCase() === "upcoming"
                        const isAcceptedReq =
                          req.status.toLowerCase() === "accepted" ||
                          req.status.toLowerCase() === "completed"

                        return (
                          <div
                            key={req.id}
                            className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-white hover:border-orange-100 transition shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
                          >
                            <div className="flex items-center gap-4 min-w-0">
                              <div className="relative h-12 w-12 rounded-2xl overflow-hidden bg-orange-50 shrink-0">
                                {req.customerImage ? (
                                  <Image
                                    src={req.customerImage}
                                    alt={req.customerName}
                                    fill
                                    sizes="56px"
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center font-bold text-orange-600 bg-orange-100/60">
                                    {req.customerName.charAt(0)}
                                  </div>
                                )}
                              </div>
                              <div>
                                <h4 className="text-base font-extrabold text-gray-900">
                                  {req.serviceTitle}
                                </h4>
                                <p className="text-xs text-gray-500 font-medium">
                                  {req.customerName}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                  {req.date} •{" "}
                                  <span
                                    className={
                                      isPendingReq
                                        ? "text-[#FF6B00] font-semibold"
                                        : isAcceptedReq
                                        ? "text-emerald-600 font-semibold"
                                        : "text-gray-500 font-semibold"
                                    }
                                  >
                                    {req.status}
                                  </span>
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {isPendingReq ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => handleStatusChange(req.id, "Accepted")}
                                    className="rounded-xl bg-[#FF6B00] px-4 py-2 text-xs font-bold text-white hover:bg-orange-600 transition"
                                  >
                                    Accept
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleStatusChange(req.id, "Declined")}
                                    className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
                                  >
                                    Decline
                                  </button>
                                </>
                              ) : isAcceptedReq ? (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 text-xs font-bold text-emerald-700">
                                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                                  <span>Accepted</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-100 px-3 py-1.5 text-xs font-bold text-rose-700">
                                  <span>Declined</span>
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>
                </div>
              )}

              {/* Earnings Tab */}
              {activeNav === "earnings" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">Earnings & Payouts</h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Monitor your service revenues and upcoming direct deposits
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-xs">
                      <span className="text-xs text-gray-400 font-semibold">Total Revenue</span>
                      <p className="text-3xl font-black text-gray-950 mt-1">32,500.00 ETB</p>
                      <span className="text-xs text-emerald-600 font-bold mt-1 inline-block">
                        +18% from last month
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-xs">
                      <span className="text-xs text-gray-400 font-semibold">Available Payout</span>
                      <p className="text-3xl font-black text-[#FF6B00] mt-1">14,800.00 ETB</p>
                      <span className="text-xs text-gray-400 mt-1 inline-block">
                        Next payout on Friday
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-xs">
                      <span className="text-xs text-gray-400 font-semibold">Average Per Job</span>
                      <p className="text-3xl font-black text-gray-950 mt-1">1,250.00 ETB</p>
                      <span className="text-xs text-gray-400 mt-1 inline-block">Across 12 completed jobs</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Profile Tab */}
              {activeNav === "profile" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">Provider Profile</h2>
                    <p className="text-xs text-gray-500 mt-1">Manage your public service presence</p>
                  </div>

                  <div className="p-6 rounded-2xl border border-gray-100 bg-white space-y-4 max-w-lg">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Provider Name</label>
                      <input
                        type="text"
                        disabled
                        value={userName || "Abel Tesfaye"}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        disabled
                        value={userEmail || "abel@localcare.et"}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeNav === "settings" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">Settings</h2>
                    <p className="text-xs text-gray-500 mt-1">Manage notification and booking preferences</p>
                  </div>
                  <div className="p-6 rounded-2xl border border-gray-100 bg-white max-w-lg text-sm text-gray-600">
                    <p>Instant booking notifications and SMS alerts are active.</p>
                  </div>
                </div>
              )}

              {/* Help Tab */}
              {activeNav === "help" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">Help & Support</h2>
                    <p className="text-xs text-gray-500 mt-1">Provider Partner Support</p>
                  </div>
                  <div className="p-6 rounded-2xl border border-gray-100 bg-white max-w-lg space-y-3 text-sm text-gray-600">
                    <p className="font-semibold text-gray-900">Need help with a booking dispute or payouts?</p>
                    <p>Contact the Provider Partner Desk at provider-support@localcare.et.</p>
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
