import Link from "next/link"
import Image from "next/image"
import {
  MapPin,
  Search,
  Star,
  ArrowRight,
  User,
  Calendar,
  Sparkles,
  Wrench,
  Zap,
  GraduationCap,
  Camera,
  SprayCanIcon as Spray
} from "lucide-react"

export const metadata = {
  title: "LocalCare — Find Local Service Providers",
  description:
    "From home repairs to personal care, connect with trusted local professionals in your area.",
}

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* ============================================================ */}
      {/* 1. HERO SECTION WITH EXACT ARCH / DROPLET CROPPING */}
      {/* ============================================================ */}
      <section className="bg-[#FDFBF7] pt-10 pb-20 lg:pt-16 lg:pb-28 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-6 md:gap-8 xl:gap-12 md:grid-cols-12 w-full">
            {/* Left Column — Title, Subtitle, Floating Search Capsule */}
            <div className="md:col-span-7 w-full max-w-full">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-[38px] lg:text-[44px] xl:text-[54px] leading-[1.15] break-words">
                Find the perfect provider
                <br className="hidden sm:inline" />
                {" "}for services you need
              </h1>

              <p className="mt-4 sm:mt-5 text-sm sm:text-base xl:text-lg text-gray-600 max-w-xl leading-relaxed">
                From home repairs to personal care, connect with trusted local professionals in your area.
              </p>

              {/* Floating Search Capsule matching mockup */}
              <form
                action="/explore"
                method="GET"
                className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center rounded-2xl bg-white p-2.5 shadow-[0_12px_35px_rgba(0,0,0,0.06)] border border-gray-100 w-full max-w-xl xl:max-w-2xl gap-2"
              >
                {/* Location field */}
                <div className="flex items-center flex-1 w-full sm:w-auto px-3 py-1.5">
                  <MapPin className="h-4 w-4 text-gray-400 shrink-0 mr-2.5" />
                  <div className="w-full">
                    <label className="block text-[11px] font-semibold text-gray-700">
                      Your location
                    </label>
                    <input
                      name="city"
                      type="text"
                      placeholder="e.g. New York"
                      defaultValue="New York"
                      className="w-full bg-transparent text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="hidden sm:block h-8 w-[1px] bg-gray-200" />

                {/* Service Query field */}
                <div className="flex items-center flex-[1.4] w-full sm:w-auto px-3 py-1.5">
                  <Search className="h-4 w-4 text-gray-400 shrink-0 mr-2.5" />
                  <div className="w-full">
                    <label className="block text-[11px] font-semibold text-gray-700">
                      What service are you looking for?
                    </label>
                    <input
                      name="q"
                      type="text"
                      placeholder="e.g. plumber, tutor, cleaner"
                      defaultValue="Babysitter"
                      className="w-full bg-transparent text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Orange Search Button */}
                <button
                  type="submit"
                  className="w-full sm:w-auto shrink-0 rounded-xl bg-[#FF6B00] px-6 py-3 lg:px-8 lg:py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#ea580c] active:scale-[0.98]"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Right Column — 3 Photo Droplets / Arch Capsules matching close-up reference */}
            <div className="md:col-span-5 flex justify-center md:justify-end max-w-full">
              <div className="flex items-center gap-2.5 sm:gap-3 md:gap-3 xl:gap-5 shrink-0 max-w-full">
                {/* Left Droplet: Signature Asymmetric Arch (gentle top-left, deep sweeping top-right curve) */}
                <div className="relative h-[250px] w-[135px] sm:h-[300px] sm:w-[155px] md:h-[320px] md:w-[160px] lg:h-[380px] lg:w-[200px] xl:h-[450px] xl:w-[250px] overflow-hidden rounded-tl-[32px] sm:rounded-tl-[42px] xl:rounded-tl-[50px] rounded-tr-[90px] sm:rounded-tr-[115px] xl:rounded-tr-[140px] rounded-bl-[24px] sm:rounded-bl-[30px] xl:rounded-bl-[36px] rounded-br-[26px] sm:rounded-br-[32px] xl:rounded-br-[40px] shadow-lg ring-2 sm:ring-4 ring-white/90 bg-orange-100/40 shrink-0">
                  <Image
                    src="/images/hero-nanny.jpg"
                    alt="Babysitter playing with child"
                    fill
                    priority
                    sizes="(max-width: 640px) 135px, (max-width: 1024px) 160px, 250px"
                    className="object-cover object-center"
                  />
                </div>

                {/* Right Stacked Droplets: Top Arch Dome + Bottom Inverted Bowl Droplet */}
                <div className="flex flex-col gap-2.5 sm:gap-3 md:gap-3 xl:gap-5 shrink-0">
                  {/* Top Handyman: Dome Arch on top, soft curved bottom */}
                  <div className="relative h-[120px] w-[128px] sm:h-[145px] sm:w-[145px] md:h-[155px] md:w-[150px] lg:h-[185px] lg:w-[190px] xl:h-[215px] xl:w-[230px] overflow-hidden rounded-tl-[65px] sm:rounded-tl-[85px] xl:rounded-tl-[100px] rounded-tr-[65px] sm:rounded-tr-[85px] xl:rounded-tr-[100px] rounded-br-[40px] sm:rounded-br-[50px] xl:rounded-br-[60px] rounded-bl-[14px] sm:rounded-bl-[18px] xl:rounded-bl-[20px] shadow-md ring-2 sm:ring-4 ring-white/90 bg-orange-100/40">
                    <Image
                      src="/images/hero-handyman.jpg"
                      alt="Handyman repairing appliance"
                      fill
                      priority
                      sizes="(max-width: 640px) 128px, (max-width: 1024px) 150px, 230px"
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Bottom Cleaner: Inverted Dome Bowl (flatter top, deep rounded bowl bottom) */}
                  <div className="relative h-[120px] w-[128px] sm:h-[145px] sm:w-[145px] md:h-[155px] md:w-[150px] lg:h-[185px] lg:w-[190px] xl:h-[215px] xl:w-[230px] overflow-hidden rounded-tl-[20px] sm:rounded-tl-[25px] xl:rounded-tl-[30px] rounded-tr-[14px] sm:rounded-tr-[18px] xl:rounded-tr-[20px] rounded-br-[60px] sm:rounded-br-[75px] xl:rounded-br-[90px] rounded-bl-[40px] sm:rounded-bl-[50px] xl:rounded-bl-[60px] shadow-md ring-2 sm:ring-4 ring-white/90 bg-orange-100/40">
                    <Image
                      src="/images/hero-cleaner.jpg"
                      alt="Cleaning service wiping counter"
                      fill
                      priority
                      sizes="(max-width: 640px) 128px, (max-width: 1024px) 150px, 230px"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. POPULAR SERVICE CATEGORIES */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                Popular Service Categories
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Browse by category and find the right professional for your needs.
              </p>
            </div>
            <Link
              href="/explore"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#FF6B00] hover:text-[#ea580c] transition-colors"
            >
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                label: "Home Cleaning",
                category: "Cleaning / Cooker / Housekeeper",
                bg: "bg-orange-100 text-orange-600",
                icon: Spray,
              },
              {
                label: "Plumbing",
                category: "Handy men",
                bg: "bg-blue-100 text-blue-600",
                icon: Wrench,
              },
              {
                label: "Electrical Services",
                category: "Handy men",
                bg: "bg-amber-100 text-amber-600",
                icon: Zap,
              },
              {
                label: "Babysitting",
                category: "Nanny / Babysitter",
                bg: "bg-pink-100 text-pink-600",
                icon: Sparkles,
              },
              {
                label: "Tutoring",
                category: "Education",
                bg: "bg-purple-100 text-purple-600",
                icon: GraduationCap,
              },
              {
                label: "Photography",
                category: "Tech",
                bg: "bg-emerald-100 text-emerald-600",
                icon: Camera,
              },
            ].map((cat) => {
              const IconComponent = cat.icon
              return (
                <Link
                  key={cat.label}
                  href={`/explore?category=${encodeURIComponent(cat.category)}`}
                  className="group flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-6 shadow-xs hover:shadow-md hover:border-orange-200 transition-all text-center"
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-full ${cat.bg} mb-3.5 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-[#FF6B00] transition-colors">
                    {cat.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. FEATURED SERVICE PROVIDERS */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                Featured Service Providers
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Trusted professionals, verified profiles, and great reviews.
              </p>
            </div>
            <Link
              href="/explore"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#FF6B00] hover:text-[#ea580c] transition-colors"
            >
              View all providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: "svc-001",
                name: "Sarah Mitchell",
                category: "Home Cleaning",
                avatar: "/avatars/sarah.jpg",
                rating: 4.9,
                reviews: 124,
                location: "New York, NY • 5 yrs experience",
                price: "$25/hr",
              },
              {
                id: "svc-003",
                name: "Mike Johnson",
                category: "Plumbing",
                avatar: "/avatars/mike.jpg",
                rating: 4.8,
                reviews: 98,
                location: "Brooklyn, NY • 8 yrs experience",
                price: "$40/hr",
              },
              {
                id: "svc-005",
                name: "Emma Davis",
                category: "Tutoring",
                avatar: "/avatars/emma.jpg",
                rating: 4.9,
                reviews: 156,
                location: "Queens, NY • 6 yrs experience",
                price: "$30/hr",
              },
              {
                id: "svc-007",
                name: "Daniel Carter",
                category: "Photography",
                avatar: "/avatars/daniel.jpg",
                rating: 4.8,
                reviews: 87,
                location: "Manhattan, NY • 4 yrs experience",
                price: "$50/hr",
              },
            ].map((p) => (
              <div
                key={p.name}
                className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-xs hover:shadow-md hover:border-orange-200 transition-all flex flex-col"
              >
                {/* Image Container with Top Rated Badge */}
                <div className="relative h-44 w-full overflow-hidden rounded-xl bg-gray-100 mb-3.5">
                  <Image
                    src={p.avatar}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 right-2.5 rounded-full bg-[#FF6B00] px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
                    Top Rated
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{p.name}</h3>
                    <p className="text-xs text-gray-400 font-medium">{p.category}</p>

                    <div className="mt-2 flex items-center gap-1.5 text-xs">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-gray-800">{p.rating}</span>
                      <span className="text-gray-400">({p.reviews} reviews)</span>
                    </div>

                    <p className="mt-1.5 text-xs text-gray-500 truncate flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-gray-400 shrink-0" />
                      <span>{p.location}</span>
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm font-extrabold text-gray-900">{p.price}</span>
                    <Link
                      href="/explore"
                      className="rounded-lg border border-orange-300 px-4 py-1.5 text-xs font-semibold text-[#FF6B00] hover:bg-orange-50 transition-colors"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. HOW IT WORKS */}
      {/* ============================================================ */}
      <section className="bg-[#FDFBF7] py-16 sm:py-20 border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                How It Works
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Get started in just a few simple steps.
              </p>
            </div>
            <Link
              href="/explore"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#FF6B00] hover:text-[#ea580c] transition-colors"
            >
              Learn more <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-start relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6B00] text-white shadow-sm mb-4">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1.5">1. Search</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xs">
                Tell us what service you need and your location.
              </p>

              {/* Arrow visible on desktop */}
              <div className="hidden md:block absolute right-0 top-6 text-[#FF6B00]">
                <ArrowRight className="h-5 w-5 text-orange-400" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-start relative md:pl-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6B00] text-white shadow-sm mb-4">
                <User className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1.5">2. Choose</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xs">
                Browse verified providers, compare ratings and prices.
              </p>

              {/* Arrow visible on desktop */}
              <div className="hidden md:block absolute right-0 top-6 text-[#FF6B00]">
                <ArrowRight className="h-5 w-5 text-orange-400" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-start md:pl-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6B00] text-white shadow-sm mb-4">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1.5">3. Book</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xs">
                Send a booking request and get in touch with the provider.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. WHAT OUR CUSTOMERS SAY */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                What Our Customers Say
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Real stories from people who found great local services.
              </p>
            </div>
            <Link
              href="/explore"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#FF6B00] hover:text-[#ea580c] transition-colors"
            >
              View all reviews <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Jessica L.",
                location: "New York, NY",
                avatar: "/avatars/jessica.jpg",
                quote:
                  "The plumber arrived on time and did an excellent job. Very professional and friendly!",
              },
              {
                name: "Michael T.",
                location: "Brooklyn, NY",
                avatar: "/avatars/michael.jpg",
                quote:
                  "I found a great tutor for my daughter. The whole process was easy and smooth.",
              },
              {
                name: "Emily R.",
                location: "Queens, NY",
                avatar: "/avatars/emily.jpg",
                quote:
                  "Amazing photography service! The photos turned out even better than I expected.",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative h-11 w-11 overflow-hidden rounded-full bg-gray-100 ring-2 ring-orange-100 shrink-0">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-900">{t.name}</p>
                  <p className="text-[11px] text-gray-400">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. CTA BANNER ("Grow your business with LocalCare") */}
      {/* ============================================================ */}
      <section className="pb-20 sm:pb-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FF6B00] via-[#FF7A1A] to-[#FFA033] p-6 sm:p-12 lg:p-16 text-white shadow-xl">
            {/* Background Decorative Floral Petals */}
            <div className="pointer-events-none absolute right-4 sm:right-16 top-1/2 -translate-y-1/2 opacity-25">
              <svg viewBox="0 0 200 200" className="h-80 w-80" fill="none">
                <circle cx="100" cy="100" r="18" fill="white" />
                <ellipse cx="100" cy="40" rx="14" ry="26" fill="white" />
                <ellipse cx="100" cy="160" rx="14" ry="26" fill="white" />
                <ellipse cx="40" cy="100" rx="26" ry="14" fill="white" />
                <ellipse cx="160" cy="100" rx="26" ry="14" fill="white" />
                <ellipse cx="55" cy="55" rx="14" ry="26" transform="rotate(-45 55 55)" fill="white" />
                <ellipse cx="145" cy="145" rx="14" ry="26" transform="rotate(-45 145 145)" fill="white" />
                <ellipse cx="145" cy="55" rx="14" ry="26" transform="rotate(45 145 55)" fill="white" />
                <ellipse cx="55" cy="145" rx="14" ry="26" transform="rotate(45 55 145)" fill="white" />
              </svg>
            </div>

            <div className="relative z-10 grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8 max-w-xl">
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-orange-100 mb-2">
                  Are you a service provider?
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  Grow your business with LocalCare
                </h2>
                <p className="mt-4 text-sm sm:text-base text-orange-100 leading-relaxed max-w-lg">
                  Join our platform and get more clients. Create your profile, showcase your skills and start earning today.
                </p>
                <div className="mt-8">
                  <Link
                    href="/sign-up"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#FF6B00] shadow-md transition-all hover:bg-orange-50 hover:shadow-lg active:scale-[0.98]"
                  >
                    Become a Provider <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Handyman Tradesman cutout photo */}
              <div className="lg:col-span-4 hidden lg:flex justify-end">
                <div className="relative h-64 w-64 overflow-hidden rounded-full ring-4 ring-white/30 shadow-2xl bg-orange-400">
                  <Image
                    src="/images/hero-handyman.jpg"
                    alt="Service Provider"
                    fill
                    sizes="256px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
