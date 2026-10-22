"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { useSession, signOut } from "@/lib/auth-client"
import { Menu, X, ChevronDown, Globe, Bell } from "lucide-react"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Services" },
    { href: "/#about", label: "About" },
    { href: "/dashboard/customer", label: "Availability" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    if (href.startsWith("/#")) return false
    return pathname.startsWith(href)
  }

  const handleSignOut = async () => {
    await signOut()
    setUserMenuOpen(false)
    router.push("/")
    router.refresh()
  }

  const displayName = session?.user?.name || "John Doe"
  const displayAvatar = session?.user?.image || "/avatars/john_doe.jpg"

  return (
    <nav className="sticky top-0 z-50 bg-[#FDFBF7] transition-colors border-b border-gray-100/60">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center shrink-0">
            <svg viewBox="0 0 44 44" className="h-9 w-9 sm:h-10 sm:w-10" fill="none">
              <circle cx="22" cy="22" r="4.5" fill="#F97316" />
              <ellipse cx="22" cy="8.5" rx="3" ry="5.5" fill="#F97316" />
              <ellipse cx="22" cy="35.5" rx="3" ry="5.5" fill="#F97316" />
              <ellipse cx="8.5" cy="22" rx="5.5" ry="3" fill="#F97316" />
              <ellipse cx="35.5" cy="22" rx="5.5" ry="3" fill="#F97316" />
              <ellipse cx="12.5" cy="12.5" rx="3.2" ry="5.5" transform="rotate(-45 12.5 12.5)" fill="#F97316" />
              <ellipse cx="31.5" cy="31.5" rx="3.2" ry="5.5" transform="rotate(-45 31.5 31.5)" fill="#F97316" />
              <ellipse cx="31.5" cy="12.5" rx="3.2" ry="5.5" transform="rotate(45 31.5 12.5)" fill="#F97316" />
              <ellipse cx="12.5" cy="31.5" rx="3.2" ry="5.5" transform="rotate(45 12.5 31.5)" fill="#F97316" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 leading-tight">
              LocalCare
            </span>
            <span className="text-[10px] font-medium tracking-wide text-gray-400">
              Local Services. Real People.
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-4 lg:gap-7 xl:gap-9 md:flex shrink-0">
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "text-[#FF6B00]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6B00] rounded-full" />
                )}
              </Link>
            )
          })}

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 transition-colors hover:text-gray-900"
            >
              <Globe className="h-4 w-4 text-gray-500" />
              EN
              <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
            </button>
            {langMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                <div className="absolute right-0 z-50 mt-2 w-32 rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
                  <button
                    onClick={() => setLangMenuOpen(false)}
                    className="w-full px-4 py-2 text-left text-sm font-medium text-orange-600 hover:bg-orange-50"
                  >
                    English (EN)
                  </button>
                  <button
                    onClick={() => setLangMenuOpen(false)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    አማርኛ (AM)
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Auth Conditional: Profile when signed in, Sign In / Sign Up when signed out */}
          {session ? (
            <>
              {/* Notification Bell */}
              <Link
                href="/dashboard/customer"
                className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-black/5"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#FDFBF7]" />
              </Link>

              {/* User Profile */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-black/5"
                >
                  <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-orange-200">
                    <Image
                      src={displayAvatar}
                      alt={displayName}
                      width={36}
                      height={36}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    {displayName}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                </button>

                {/* User Dropdown */}
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 z-50 mt-2 w-52 rounded-2xl border border-gray-100 bg-white py-1.5 shadow-xl">
                      <div className="border-b border-gray-100 px-4 py-2.5">
                        <p className="text-xs text-gray-400">Signed in as</p>
                        <p className="truncate text-sm font-semibold text-gray-900">{displayName}</p>
                      </div>
                      <Link
                        href="/dashboard/customer"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
                      >
                        My Bookings
                      </Link>
                      <Link
                        href="/dashboard/provider"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
                      >
                        Provider Dashboard
                      </Link>
                      <hr className="my-1 border-gray-100" />
                      <button
                        onClick={handleSignOut}
                        className="block w-full px-4 py-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2.5 sm:gap-3">
              <Link
                href="/sign-in"
                className="text-sm font-semibold text-gray-700 hover:text-[#FF6B00] transition-colors px-2 py-1.5"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="rounded-xl bg-[#FF6B00] px-4 py-2 text-sm font-semibold text-white shadow-xs transition-all hover:bg-[#ea580c] active:scale-[0.98]"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-black/5 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-[#FDFBF7] px-4 py-4 shadow-lg md:hidden">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                  isActive(link.href)
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-700 hover:bg-black/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200/60">
            {session ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3 py-2 bg-orange-50/50 rounded-xl">
                  <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-orange-200 shrink-0">
                    <Image
                      src={displayAvatar}
                      alt={displayName}
                      width={36}
                      height={36}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-gray-900 truncate">{displayName}</p>
                    <p className="text-xs text-gray-400 truncate">{session.user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full rounded-lg px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center rounded-xl bg-[#FF6B00] px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[#ea580c]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
