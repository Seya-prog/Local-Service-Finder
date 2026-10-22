"use client"

import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-[#FDFBF7] pt-14 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-gray-200/70">
          {/* Brand & Socials */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center">
                <svg viewBox="0 0 44 44" className="h-8 w-8" fill="none">
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
                <span className="text-xl font-extrabold tracking-tight text-gray-900 leading-tight">
                  LocalCare
                </span>
                <span className="text-[9px] font-medium text-gray-400">
                  Local Services. Real People.
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-gray-500 max-w-xs">
              Connecting people with trusted local service providers. Making your life easier, one service at a time.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1 text-gray-500">
              <a href="#" className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-orange-50 hover:text-orange-600 transition-colors">
                <span className="text-xs font-bold">f</span>
              </a>
              <a href="#" className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-orange-50 hover:text-orange-600 transition-colors">
                <span className="text-xs font-bold">in</span>
              </a>
              <a href="#" className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-orange-50 hover:text-orange-600 transition-colors">
                <span className="text-xs font-bold">ig</span>
              </a>
              <a href="#" className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-orange-50 hover:text-orange-600 transition-colors">
                <span className="text-xs font-bold">▶</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-900">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li>
                <Link href="/" className="hover:text-[#FF6B00] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-[#FF6B00] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-[#FF6B00] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#FF6B00] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/#help" className="hover:text-[#FF6B00] transition-colors">
                  Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Categories */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-900">
              Service Categories
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li>
                <Link href="/explore?category=Cleaning" className="hover:text-[#FF6B00] transition-colors">
                  Home Cleaning
                </Link>
              </li>
              <li>
                <Link href="/explore?category=Handy%20men" className="hover:text-[#FF6B00] transition-colors">
                  Plumbing
                </Link>
              </li>
              <li>
                <Link href="/explore?category=Handy%20men" className="hover:text-[#FF6B00] transition-colors">
                  Electrical Services
                </Link>
              </li>
              <li>
                <Link href="/explore?category=Nanny" className="hover:text-[#FF6B00] transition-colors">
                  Babysitting
                </Link>
              </li>
              <li>
                <Link href="/explore?category=Education" className="hover:text-[#FF6B00] transition-colors">
                  Tutoring
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-[#FF6B00] transition-colors">
                  Photography
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              Contact Us
            </h3>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                <span>123 Main St, New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                <span>support@localcare.com</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-900 mb-2">
                Subscribe to our newsletter
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-1.5">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-orange-400"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-[#FF6B00] px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#ea580c] transition-colors shrink-0"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2026 LocalCare. All rights reserved.</p>
          <div className="flex gap-5 text-xs text-gray-400">
            <a href="#" className="hover:text-gray-600">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600">Terms of Service</a>
            <a href="#" className="hover:text-gray-600">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
