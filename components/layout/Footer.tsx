"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Phone, Mail, CheckCircle2 } from "lucide-react"
import Logo from "./Logo"

export default function Footer() {
  const [subscribedEmail, setSubscribedEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (subscribedEmail.trim()) {
      setIsSubscribed(true)
    }
  }

  return (
    <footer className="border-t border-gray-100 bg-[#FDFBF7] pt-14 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-gray-200/70">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Logo />
            </Link>

            <p className="text-xs leading-relaxed text-gray-500 max-w-xs">
              Connecting Ethiopian households with trusted, background-checked local professionals. Making quality care and reliable services accessible across Addis Ababa and beyond.
            </p>

            <div className="pt-1 text-xs text-gray-500 font-medium">
              <span>Community-driven local services in Ethiopia.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-900">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li>
                <Link href="/" className="hover:text-[#FF6B00] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-[#FF6B00] transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FF6B00] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/availability" className="hover:text-[#FF6B00] transition-colors">
                  Live Availability
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-[#FF6B00] transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FF6B00] transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Categories */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-900">
              Popular Services
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li>
                <Link
                  href="/explore?category=Cleaning"
                  className="hover:text-[#FF6B00] transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Home & Office Cleaning</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/explore?category=Handy%20men&q=Plumbing"
                  className="hover:text-[#FF6B00] transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Plumbing & Pipe Repair</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/explore?category=Nanny"
                  className="hover:text-[#FF6B00] transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Babysitting & Childcare</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/explore?category=Tech"
                  className="hover:text-[#FF6B00] transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Electrical & Tech Repairs</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/explore?category=Beauty"
                  className="hover:text-[#FF6B00] transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Hair Styling & Beauty Care</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/explore?category=Food"
                  className="hover:text-[#FF6B00] transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Traditional Food & Catering</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/explore?category=Education"
                  className="hover:text-[#FF6B00] transition-colors flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Private Tutoring & Lessons</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              Get in Touch
            </h3>
            <div className="space-y-2.5 text-xs text-gray-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#FF6B00] shrink-0 mt-0.5" />
                <span>Bole Sub-City, Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#FF6B00] shrink-0" />
                <a href="tel:+251924865876" className="hover:text-[#FF6B00] transition">
                  +251 924 865 876
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#FF6B00] shrink-0" />
                <a href="mailto:support@localcare.et" className="hover:text-[#FF6B00] transition">
                  support@localcare.et
                </a>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs font-semibold text-gray-900 mb-2">
                Stay updated on new providers
              </p>
              {isSubscribed ? (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Subscribed! Thank you.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-1.5">
                  <input
                    type="email"
                    required
                    value={subscribedEmail}
                    onChange={(e) => setSubscribedEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-hidden focus:border-[#FF6B00]"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-[#FF6B00] px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#ea580c] transition shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 LocalCare Ethiopia. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-gray-500">
            <Link href="/about" className="hover:text-[#FF6B00] transition">
              About LocalCare
            </Link>
            <Link href="/contact" className="hover:text-[#FF6B00] transition">
              Help Center
            </Link>
            <Link href="/availability" className="hover:text-[#FF6B00] transition">
              Provider Availability
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
