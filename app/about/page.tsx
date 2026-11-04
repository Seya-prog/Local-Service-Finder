import Link from "next/link"
import Image from "next/image"
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  HeartHandshake,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import Logo from "@/components/layout/Logo"

export const metadata = {
  title: "About Us — LocalCare Ethiopia",
  description:
    "Learn about LocalCare, Ethiopia's trusted community marketplace connecting households with verified local service providers.",
}

export default function AboutPage() {
  const stats = [
    { label: "Verified Bookings", value: "15,000+" },
    { label: "Active Local Providers", value: "1,200+" },
    { label: "Sub-Cities Served", value: "10" },
    { label: "Customer Satisfaction", value: "98.4%" },
  ]

  const values = [
    {
      icon: ShieldCheck,
      title: "Strict Identity Verification",
      description:
        "Every provider on LocalCare undergoes Kebele ID verification and profile reviews before offering services.",
    },
    {
      icon: HeartHandshake,
      title: "Fair & Transparent Pricing",
      description:
        "Clear pricing in Ethiopian Birr (ETB) with no surprise charges or hidden booking fees for customers or providers.",
    },
    {
      icon: Users,
      title: "Community-First Mission",
      description:
        "We support local economic independence by keeping service revenues directly in the hands of hard-working providers.",
    },
    {
      icon: Award,
      title: "Quality & Accountability",
      description:
        "Real customer reviews, transparent ratings, and responsive dispute resolution ensure every job is done right.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* 1. Hero Section */}
      <section className="py-16 sm:py-24 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold text-[#FF6B00]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>About LocalCare Ethiopia</span>
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Connecting Ethiopian homes with trusted local professionals
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
              LocalCare was created to solve a universal challenge in Ethiopia: finding skilled, dependable help you can trust in your neighborhood—from cleaners and handymen to tutors and caregivers.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((st) => (
              <div
                key={st.label}
                className="p-6 rounded-3xl border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.02)] text-center"
              >
                <p className="text-3xl sm:text-4xl font-black text-[#FF6B00]">
                  {st.value}
                </p>
                <p className="text-xs sm:text-sm font-bold text-gray-600 mt-1">
                  {st.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Our Story & Mission */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B00]">
                Our Story
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Building a safer, simpler service marketplace in Addis Ababa
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Before LocalCare, finding someone to fix a burst pipe in Bole, tutor children in Kazanchis, or clean an apartment in Sarbet relied entirely on word-of-mouth recommendations that were often inconsistent or unavailable.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                We set out to modernize this experience while respecting Ethiopian traditions of community trust. By offering transparent profiles, real verified reviews, and fixed hourly rates in Ethiopian Birr, we empower both homeowners and independent service providers.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-gray-800">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6B00]" />
                  Verified local profiles
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6B00]" />
                  Transparent hourly rates
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6B00]" />
                  Direct provider communication
                </span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-8 rounded-3xl bg-[#FDFBF7] border border-orange-100 space-y-6">
                <Logo withText={true} />
                <h3 className="text-xl font-bold text-gray-900">
                  Our Core Mission
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  &ldquo;To make daily life easier for Ethiopian families by providing reliable access to certified local services, while creating sustainable, dignified earning opportunities for skilled tradespeople.&rdquo;
                </p>
                <div className="pt-2 border-t border-gray-200/60 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-[#FF6B00]">
                    LC
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">LocalCare Team</p>
                    <p className="text-[11px] text-gray-500">Addis Ababa, Ethiopia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="py-16 sm:py-20 bg-[#FDFBF7] border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Why Ethiopian Households Choose LocalCare
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Our principles guide everything we build for our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div
                  key={v.title}
                  className="p-6 rounded-3xl border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-3"
                >
                  <div className="h-12 w-12 rounded-2xl bg-orange-50 text-[#FF6B00] flex items-center justify-center">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">{v.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. Call To Action Banner */}
      <section className="py-16 sm:py-20 bg-[#FDFBF7]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-[#FF6B00] to-[#FF8C33] p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                Ready to find verified services near you?
              </h2>
              <p className="text-xs sm:text-sm text-orange-100">
                Discover plumbers, cleaners, tutors, and caregivers in Addis Ababa ready to assist today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/explore"
                className="rounded-xl bg-white px-6 py-3 text-xs font-bold text-[#FF6B00] hover:bg-orange-50 transition shadow-xs text-center"
              >
                Explore Services
              </Link>
              <Link
                href="/sign-up"
                className="rounded-xl border border-white/60 bg-transparent px-6 py-3 text-xs font-bold text-white hover:bg-white/10 transition text-center"
              >
                Become a Provider
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
