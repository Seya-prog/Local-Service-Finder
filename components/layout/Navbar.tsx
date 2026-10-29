"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { useSession, signOut } from "@/lib/auth-client"
import { ChevronDown, Menu, X } from "lucide-react"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session } = useSession()

  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href))

  const handleSignOut = async () => {
    await signOut()
    setUserMenuOpen(false)
    setMobileMenuOpen(false)
    router.push("/")
    router.refresh()
  }

  const displayName = session?.user?.name || "User"

  const linkClass = (href: string) =>
    `block rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
      isActive(href)
        ? "bg-orange-50 text-[#FF6B00]"
        : "text-gray-600 hover:bg-orange-50 hover:text-[#FF6B00]"
    }`

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100/60 bg-[#FDFBF7]">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
            LocalCare
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-4 lg:gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap py-2 text-sm font-semibold transition-colors ${
                isActive(link.href)
                  ? "text-[#FF6B00]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {session ? (
            <div className="relative">
              <button
                type="button"
                aria-expanded={userMenuOpen}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-black/5"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 ring-2 ring-orange-200">
                  <span className="font-bold text-orange-600">
                    {displayName.charAt(0)}
                  </span>
                </div>
                <span className="max-w-32 truncate text-sm font-semibold text-gray-800">
                  {displayName}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
              </button>

              {userMenuOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close user menu"
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 z-50 mt-2 w-52 rounded-2xl border border-gray-100 bg-white py-1.5 shadow-xl">
                    <Link
                      href="/dashboard/customer"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    >
                      My Bookings
                    </Link>
                    <Link
                      href="/dashboard/provider"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    >
                      Provider Dashboard
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="block w-full px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex shrink-0 items-center gap-3">
              <Link
                href="/sign-in"
                className="whitespace-nowrap text-sm font-semibold text-gray-700 hover:text-[#FF6B00]"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="whitespace-nowrap rounded-xl bg-[#FF6B00] px-4 py-2 text-sm font-semibold text-white hover:bg-[#ea580c]"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-800 hover:bg-orange-50 md:hidden"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-gray-100 bg-[#FDFBF7] px-4 pb-5 pt-3 shadow-md md:hidden sm:px-6"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={linkClass(link.href)}
              >
                {link.label}
              </Link>
            ))}

            <div className="my-2 border-t border-gray-200" />

            {session ? (
              <>
                <p className="px-3 py-2 text-sm font-medium text-gray-500">
                  Signed in as {displayName}
                </p>
                <Link
                  href="/dashboard/customer"
                  onClick={() => setMobileMenuOpen(false)}
                  className={linkClass("/dashboard/customer")}
                >
                  My Bookings
                </Link>
                <Link
                  href="/dashboard/provider"
                  onClick={() => setMobileMenuOpen(false)}
                  className={linkClass("/dashboard/provider")}
                >
                  Provider Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex gap-3 px-3 py-2">
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-center text-sm font-semibold text-gray-700"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 rounded-xl bg-[#FF6B00] px-4 py-2.5 text-center text-sm font-semibold text-white"
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