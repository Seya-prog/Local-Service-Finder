"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useSession, signOut } from "@/lib/auth-client"
import { ChevronDown, Menu, X } from "lucide-react"
import Logo from "./Logo"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session } = useSession()

  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Services" },
    { href: "/availability", label: "Availability" },
    { href: "/reviews", label: "Reviews" },
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
  const userRole = ((session?.user as any)?.role || "customer") as "customer" | "provider"

  const linkClass = (href: string) =>
    `block rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
      isActive(href)
        ? "bg-orange-50 text-[#FF6B00]"
        : "text-gray-600 hover:bg-orange-50 hover:text-[#FF6B00]"
    }`

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "border-b border-gray-200/60 bg-[#FDFBF7]/85 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
          : "border-b border-gray-100/60 bg-[#FDFBF7]"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out ${
          scrolled ? "h-14 sm:h-16" : "h-20"
        }`}
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Logo />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-5 lg:gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap py-2 text-sm font-semibold transition-colors ${
                isActive(link.href)
                  ? "text-[#FF6B00] border-b-2 border-[#FF6B00] font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {session ? (
            <div className="flex items-center gap-3">
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
                    <div className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-gray-100 bg-white py-2 shadow-xl">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-semibold text-gray-400">Signed in as</p>
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              userRole === "provider"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-orange-100 text-[#FF6B00]"
                            }`}
                          >
                            {userRole}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-gray-900 truncate mt-0.5">{session.user.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
                      >
                        My Profile
                      </Link>
                      {userRole === "provider" ? (
                        <Link
                          href="/dashboard/provider"
                          onClick={() => setUserMenuOpen(false)}
                          className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
                        >
                          Provider Dashboard
                        </Link>
                      ) : (
                        <Link
                          href="/dashboard/customer"
                          onClick={() => setUserMenuOpen(false)}
                          className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
                        >
                          Customer Dashboard
                        </Link>
                      )}
                      <Link
                        href="/settings"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
                      >
                        Settings
                      </Link>
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/sign-in"
                className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#FF6B00] transition"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="rounded-xl bg-[#FF6B00] px-4 py-2 text-sm font-bold text-white shadow-xs hover:bg-[#ea580c] transition active:scale-95"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-[#FDFBF7] px-4 pt-3 pb-6 md:hidden">
          <div className="space-y-1">
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
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            {session ? (
              <div className="space-y-2">
                <div className="px-3 py-1 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-400">Signed in as</p>
                    <p className="text-sm font-bold text-gray-900">{displayName}</p>
                  </div>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      userRole === "provider"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-orange-100 text-[#FF6B00]"
                    }`}
                  >
                    {userRole}
                  </span>
                </div>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-orange-50"
                >
                  My Profile
                </Link>
                {userRole === "provider" ? (
                  <Link
                    href="/dashboard/provider"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-orange-50"
                  >
                    Provider Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/dashboard/customer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-orange-50"
                  >
                    Customer Dashboard
                  </Link>
                )}
                <Link
                  href="/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-orange-50"
                >
                  Settings
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full text-left rounded-xl px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-800"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center rounded-xl bg-[#FF6B00] py-2.5 text-sm font-bold text-white shadow-xs"
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
