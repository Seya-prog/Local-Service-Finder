"use client"

import Link from "next/link"

import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { useSession, signOut } from "@/lib/auth-client"
import { ChevronDown } from "lucide-react"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session } = useSession()
  
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Services" },
    { href: "/about", label: "About" },
  ]

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href))

  const handleSignOut = async () => {
    await signOut()
    setUserMenuOpen(false)
    router.push("/")
    router.refresh()
  }

  const displayName = session?.user?.name || "User"

  return (
    <nav className="sticky top-0 z-50 bg-[#FDFBF7] transition-colors border-b border-gray-100/60">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 leading-tight">
              LocalCare
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-4 lg:gap-7 xl:gap-9 md:flex shrink-0">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className={`py-2 text-sm font-semibold transition-colors ${isActive(link.href) ? "text-[#FF6B00]" : "text-gray-600 hover:text-gray-900"}`}>
              {link.label}
            </Link>
          ))}

          {session ? (
            <div className="relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-black/5">
                <div className="relative h-9 w-9 bg-orange-100 flex items-center justify-center rounded-full ring-2 ring-orange-200">
                  <span className="text-orange-600 font-bold">{displayName.charAt(0)}</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">{displayName}</span>
                <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
              </button>

              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 z-50 mt-2 w-52 rounded-2xl border border-gray-100 bg-white py-1.5 shadow-xl">
                    <Link href="/dashboard/customer" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600">
                      My Bookings
                    </Link>
                    <Link href="/dashboard/provider" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600">
                      Provider Dashboard
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button onClick={handleSignOut} className="block w-full px-4 py-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2.5 sm:gap-3">
              <Link href="/sign-in" className="text-sm font-semibold text-gray-700 hover:text-[#FF6B00]">Sign In</Link>
              <Link href="/sign-up" className="rounded-xl bg-[#FF6B00] px-4 py-2 text-sm font-semibold text-white hover:bg-[#ea580c]">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
