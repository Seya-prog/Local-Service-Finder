// ============================================================
// MOCK DATABASE — lib/data.ts
// This file simulates a database using in-memory JavaScript arrays.
// In production, replace these with real DB queries.
// ============================================================

export type ServiceCategory =
  | "Household"
  | "Cleaning / Cooker / Housekeeper"
  | "Nanny / Babysitter"
  | "Handy men"
  | "Guday Adesani"
  | "Food"
  | "Housing"
  | "Education"
  | "Health"
  | "Beauty"
  | "Tech"

export type BookingStatus = "Upcoming" | "Confirmed" | "Completed" | "Cancelled"

export interface ServiceProvider {
  id: string
  name: string
  email: string
  avatar: string
  rating: number
  reviewCount: number
  location: string
  city: string
  category: ServiceCategory
  services: string[]
  priceRange: string
  experience: string
  hoursWorked: string
  description: string
  phone: string[]
  availability: {
    day: string
    hours: string
  }[]
  verified: boolean
  covidFree: boolean
  createdBy: string // userId of the provider
}

export interface Booking {
  id: string
  serviceId: string
  serviceName: string
  providerName: string
  customerName: string
  customerId: string
  providerId: string
  date: string
  time: string
  location: string
  status: BookingStatus
  phone: string
  price: string
}

export interface ReviewItem {
  id: string
  serviceId: string
  serviceTitle: string
  serviceCategory: string
  providerName: string
  providerAvatar: string
  providerId: string
  customerName: string
  customerLocation: string
  customerAvatar: string
  rating: number
  date: string
  comment: string
  verified: boolean
  helpfulCount: number
}

// ============================================================
// MOCK VERIFIED CUSTOMER REVIEWS (3 per service)
// ============================================================
export const allReviews: ReviewItem[] = [
  // svc-001: Almaz Tadesse (Nanny)
  {
    id: "rev-101",
    serviceId: "svc-001",
    serviceTitle: "Nanny & Active Childcare",
    serviceCategory: "Nanny",
    providerName: "Almaz Tadesse",
    providerAvatar: "/avatars/emily.jpg",
    providerId: "svc-001",
    customerName: "Yared Wolde",
    customerLocation: "Gerji, Addis Ababa",
    customerAvatar: "/avatars/mike.jpg",
    rating: 5,
    date: "Apr 5, 2026",
    comment:
      "Almaz is a blessing for our family. She is punctual, caring, and engages our 4-year-old daughter with creative activities and reading. Complete peace of mind knowing she is in safe hands.",
    verified: true,
    helpfulCount: 22,
  },
  {
    id: "rev-102",
    serviceId: "svc-001",
    serviceTitle: "Nanny & Active Childcare",
    serviceCategory: "Nanny",
    providerName: "Almaz Tadesse",
    providerAvatar: "/avatars/emily.jpg",
    providerId: "svc-001",
    customerName: "Sara Mengistu",
    customerLocation: "Bole Atlas, Addis Ababa",
    customerAvatar: "/avatars/hana.jpg",
    rating: 5,
    date: "Mar 28, 2026",
    comment:
      "Very gentle, patient, and structured with our twins. She also helped organize the kids' playroom neatly every afternoon.",
    verified: true,
    helpfulCount: 14,
  },
  {
    id: "rev-103",
    serviceId: "svc-001",
    serviceTitle: "Nanny & Active Childcare",
    serviceCategory: "Nanny",
    providerName: "Almaz Tadesse",
    providerAvatar: "/avatars/emily.jpg",
    providerId: "svc-001",
    customerName: "Martha Tsegaye",
    customerLocation: "Kazanchis, Addis Ababa",
    customerAvatar: "/avatars/tigist.jpg",
    rating: 4.8,
    date: "Mar 15, 2026",
    comment:
      "Reliable and punctual every morning. Communicates clearly and prepares healthy snacks for our school-aged children.",
    verified: true,
    helpfulCount: 9,
  },

  // svc-002: Genet Assefa (Nanny)
  {
    id: "rev-201",
    serviceId: "svc-002",
    serviceTitle: "Professional Babysitting & Care",
    serviceCategory: "Nanny",
    providerName: "Genet Assefa",
    providerAvatar: "/avatars/sarah.jpg",
    providerId: "svc-002",
    customerName: "Rahel Kassa",
    customerLocation: "Gerji Roba, Addis Ababa",
    customerAvatar: "/avatars/meron.jpg",
    rating: 5,
    date: "Apr 18, 2026",
    comment:
      "Dependable and trustworthy babysitter. Followed our infant feeding schedule accurately and sent regular updates.",
    verified: true,
    helpfulCount: 17,
  },
  {
    id: "rev-202",
    serviceId: "svc-002",
    serviceTitle: "Professional Babysitting & Care",
    serviceCategory: "Nanny",
    providerName: "Genet Assefa",
    providerAvatar: "/avatars/sarah.jpg",
    providerId: "svc-002",
    customerName: "Henok Tefera",
    customerLocation: "Bole, Addis Ababa",
    customerAvatar: "/avatars/yonas.jpg",
    rating: 4.8,
    date: "Apr 2, 2026",
    comment:
      "Our 3-year-old loved spending time with Genet. Warm, respectful, and very clean in everything she does.",
    verified: true,
    helpfulCount: 11,
  },
  {
    id: "rev-203",
    serviceId: "svc-002",
    serviceTitle: "Professional Babysitting & Care",
    serviceCategory: "Nanny",
    providerName: "Genet Assefa",
    providerAvatar: "/avatars/sarah.jpg",
    providerId: "svc-002",
    customerName: "Liya Berhanu",
    customerLocation: "Sarbet, Addis Ababa",
    customerAvatar: "/avatars/hana.jpg",
    rating: 4.7,
    date: "Mar 22, 2026",
    comment:
      "CPR certified and very cautious about safety around the house. We will definitely rehire her next month.",
    verified: true,
    helpfulCount: 8,
  },

  // svc-003: Abel Tesfaye (Handy men / Plumbing)
  {
    id: "rev-301",
    serviceId: "svc-003",
    serviceTitle: "Plumbing & Pipe Maintenance",
    serviceCategory: "Plumbing",
    providerName: "Abel Tesfaye",
    providerAvatar: "/avatars/abel.jpg",
    providerId: "svc-003",
    customerName: "Hiwot Girma",
    customerLocation: "Bole, Addis Ababa",
    customerAvatar: "/avatars/hana.jpg",
    rating: 5,
    date: "May 2, 2026",
    comment:
      "The plumbing repair at our apartment in Bole was completed cleanly and quickly. Abel arrived exactly on time with all necessary fittings and solved the bathroom leak that had been bothering us for weeks. Very polite and professional!",
    verified: true,
    helpfulCount: 24,
  },
  {
    id: "rev-302",
    serviceId: "svc-003",
    serviceTitle: "Plumbing & Pipe Maintenance",
    serviceCategory: "Plumbing",
    providerName: "Abel Tesfaye",
    providerAvatar: "/avatars/abel.jpg",
    providerId: "svc-003",
    customerName: "Daniel Worku",
    customerLocation: "Bole Medhanialem, Addis Ababa",
    customerAvatar: "/avatars/daniel.jpg",
    rating: 4.9,
    date: "Apr 22, 2026",
    comment:
      "Replaced our kitchen sink valves and cleared clogged drainage lines. Fixed price in ETB with zero unexpected add-ons. Outstanding craftsmanship.",
    verified: true,
    helpfulCount: 18,
  },
  {
    id: "rev-303",
    serviceId: "svc-003",
    serviceTitle: "Plumbing & Pipe Maintenance",
    serviceCategory: "Plumbing",
    providerName: "Abel Tesfaye",
    providerAvatar: "/avatars/abel.jpg",
    providerId: "svc-003",
    customerName: "Melaku Kebede",
    customerLocation: "Kazanchis, Addis Ababa",
    customerAvatar: "/avatars/solomon.jpg",
    rating: 4.8,
    date: "Apr 11, 2026",
    comment:
      "Fast response for an emergency water leak on a Sunday morning. Very polite, clean work area, and left no mess behind.",
    verified: true,
    helpfulCount: 12,
  },

  // svc-004: Meron Hailu (Cleaning / Housekeeping)
  {
    id: "rev-401",
    serviceId: "svc-004",
    serviceTitle: "Deep Home Cleaning & Housekeeping",
    serviceCategory: "Cleaning",
    providerName: "Meron Hailu",
    providerAvatar: "/avatars/meron.jpg",
    providerId: "svc-004",
    customerName: "Bethlehem Tadesse",
    customerLocation: "Sarbet, Addis Ababa",
    customerAvatar: "/avatars/daisy.jpg",
    rating: 5,
    date: "Apr 25, 2026",
    comment:
      "Exceptional home cleaning service! Meron arrived right on time and left everything fresh, spotless, and organized. She paid attention to kitchen cabinets, windows, and floors. Best cleaning service in Addis Ababa by far.",
    verified: true,
    helpfulCount: 31,
  },
  {
    id: "rev-402",
    serviceId: "svc-004",
    serviceTitle: "Deep Home Cleaning & Housekeeping",
    serviceCategory: "Cleaning",
    providerName: "Meron Hailu",
    providerAvatar: "/avatars/meron.jpg",
    providerId: "svc-004",
    customerName: "Senait Alemu",
    customerLocation: "Kazanchis, Addis Ababa",
    customerAvatar: "/avatars/emily.jpg",
    rating: 5,
    date: "Apr 14, 2026",
    comment:
      "Booked move-in cleaning for our new flat. Floors, bathrooms, and refrigerator look sparkling clean. Very trustworthy and kind person.",
    verified: true,
    helpfulCount: 20,
  },
  {
    id: "rev-403",
    serviceId: "svc-004",
    serviceTitle: "Deep Home Cleaning & Housekeeping",
    serviceCategory: "Cleaning",
    providerName: "Meron Hailu",
    providerAvatar: "/avatars/meron.jpg",
    providerId: "svc-004",
    customerName: "Tariku Fikre",
    customerLocation: "Bole, Addis Ababa",
    customerAvatar: "/avatars/yonas.jpg",
    rating: 4.8,
    date: "Mar 30, 2026",
    comment:
      "Thorough and meticulous. Uses eco-friendly cleaning supplies that didn't leave harsh smells. Will book weekly.",
    verified: true,
    helpfulCount: 15,
  },

  // svc-005: Solomon Kebede (Education / Math & Science)
  {
    id: "rev-501",
    serviceId: "svc-005",
    serviceTitle: "Private Math & Science Tutoring",
    serviceCategory: "Education",
    providerName: "Solomon Kebede",
    providerAvatar: "/avatars/solomon.jpg",
    providerId: "svc-005",
    customerName: "Dawit Haile",
    customerLocation: "Kazanchis, Addis Ababa",
    customerAvatar: "/avatars/yonas.jpg",
    rating: 5,
    date: "Apr 28, 2026",
    comment:
      "Found a wonderful math tutor for my son preparing for his national exams. Solomon is patient, knowledgeable, and structures each lesson with clear exercises. His grades have improved tremendously in just one month.",
    verified: true,
    helpfulCount: 19,
  },
  {
    id: "rev-502",
    serviceId: "svc-005",
    serviceTitle: "Private Math & Science Tutoring",
    serviceCategory: "Education",
    providerName: "Solomon Kebede",
    providerAvatar: "/avatars/solomon.jpg",
    providerId: "svc-005",
    customerName: "Aster Bekele",
    customerLocation: "Piassa, Addis Ababa",
    customerAvatar: "/avatars/sarah.jpg",
    rating: 4.9,
    date: "Apr 17, 2026",
    comment:
      "Calculus and physics lessons were broken down into simple, intuitive concepts. Very encouraging and punctual teacher.",
    verified: true,
    helpfulCount: 13,
  },
  {
    id: "rev-503",
    serviceId: "svc-005",
    serviceTitle: "Private Math & Science Tutoring",
    serviceCategory: "Education",
    providerName: "Solomon Kebede",
    providerAvatar: "/avatars/solomon.jpg",
    providerId: "svc-005",
    customerName: "Robel Yohannes",
    customerLocation: "Bole, Addis Ababa",
    customerAvatar: "/avatars/john_doe.jpg",
    rating: 4.8,
    date: "Apr 6, 2026",
    comment:
      "My daughter went from struggling in 10th grade physics to scoring top marks in her midterms. Worth every Birr.",
    verified: true,
    helpfulCount: 16,
  },

  // svc-006: Hana Girma (Beauty)
  {
    id: "rev-601",
    serviceId: "svc-006",
    serviceTitle: "Hair Styling & Mobile Care",
    serviceCategory: "Beauty",
    providerName: "Hana Girma",
    providerAvatar: "/avatars/hana.jpg",
    providerId: "svc-006",
    customerName: "Selamawit Desta",
    customerLocation: "Piassa, Addis Ababa",
    customerAvatar: "/avatars/sarah.jpg",
    rating: 5,
    date: "Apr 10, 2026",
    comment:
      "Hana came to my home in Piassa for my sister's bridal styling. She is incredibly talented, creative, and gentle. We felt like VIPs right in our living room. Truly five-star service!",
    verified: true,
    helpfulCount: 28,
  },
  {
    id: "rev-602",
    serviceId: "svc-006",
    serviceTitle: "Hair Styling & Mobile Care",
    serviceCategory: "Beauty",
    providerName: "Hana Girma",
    providerAvatar: "/avatars/hana.jpg",
    providerId: "svc-006",
    customerName: "Eden Lemma",
    customerLocation: "Sarbet, Addis Ababa",
    customerAvatar: "/avatars/emily.jpg",
    rating: 4.8,
    date: "Mar 29, 2026",
    comment:
      "Beautiful cornrows and natural hair treatment. Punctual arrival with professional sanitizing tools.",
    verified: true,
    helpfulCount: 14,
  },
  {
    id: "rev-603",
    serviceId: "svc-006",
    serviceTitle: "Hair Styling & Mobile Care",
    serviceCategory: "Beauty",
    providerName: "Hana Girma",
    providerAvatar: "/avatars/hana.jpg",
    providerId: "svc-006",
    customerName: "Mahlet Getachew",
    customerLocation: "CMC, Addis Ababa",
    customerAvatar: "/avatars/tigist.jpg",
    rating: 4.7,
    date: "Mar 19, 2026",
    comment:
      "Convenient home styling session before our holiday celebration. Courteous, fast, and excellent styling.",
    verified: true,
    helpfulCount: 10,
  },

  // svc-007: Yonas Alemayehu (Tech / Electrical)
  {
    id: "rev-701",
    serviceId: "svc-007",
    serviceTitle: "Electrical Repairs & Tech Setup",
    serviceCategory: "Tech",
    providerName: "Yonas Alemayehu",
    providerAvatar: "/avatars/yonas.jpg",
    providerId: "svc-007",
    customerName: "Ermias Bekele",
    customerLocation: "Mexico, Addis Ababa",
    customerAvatar: "/avatars/john_doe.jpg",
    rating: 4.8,
    date: "Apr 15, 2026",
    comment:
      "Fixed a complex breaker tripping issue in our office near Mexico square. Yonas was methodical, thoroughly tested all circuits, and charged exactly what was quoted in ETB. Outstanding technical expertise.",
    verified: true,
    helpfulCount: 15,
  },
  {
    id: "rev-702",
    serviceId: "svc-007",
    serviceTitle: "Electrical Repairs & Tech Setup",
    serviceCategory: "Tech",
    providerName: "Yonas Alemayehu",
    providerAvatar: "/avatars/yonas.jpg",
    providerId: "svc-007",
    customerName: "Bereket Tadesse",
    customerLocation: "Kazanchis, Addis Ababa",
    customerAvatar: "/avatars/mike.jpg",
    rating: 4.7,
    date: "Apr 3, 2026",
    comment:
      "Installed WiFi router network setup and grounded power outlets throughout our compound. Very neat and safe work.",
    verified: true,
    helpfulCount: 12,
  },
  {
    id: "rev-703",
    serviceId: "svc-007",
    serviceTitle: "Electrical Repairs & Tech Setup",
    serviceCategory: "Tech",
    providerName: "Yonas Alemayehu",
    providerAvatar: "/avatars/yonas.jpg",
    providerId: "svc-007",
    customerName: "Genet Teshome",
    customerLocation: "Bole, Addis Ababa",
    customerAvatar: "/avatars/hana.jpg",
    rating: 4.6,
    date: "Mar 20, 2026",
    comment:
      "Diagnosed my computer charging port and replaced backup battery. Fair price and trustworthy expert.",
    verified: true,
    helpfulCount: 9,
  },

  // svc-008: Tigist Worku (Food / Cooking)
  {
    id: "rev-801",
    serviceId: "svc-008",
    serviceTitle: "Traditional Ethiopian Cooking & Catering",
    serviceCategory: "Food",
    providerName: "Tigist Worku",
    providerAvatar: "/avatars/tigist.jpg",
    providerId: "svc-008",
    customerName: "Kalkidan Assefa",
    customerLocation: "CMC, Addis Ababa",
    customerAvatar: "/avatars/emily.jpg",
    rating: 5,
    date: "Apr 20, 2026",
    comment:
      "We hired Tigist for our family holiday feast in CMC. The doro wat, kitfo, and fasting dishes were absolutely exquisite. All our guests complimented the food. Reliable, hygienic, and authentic flavors!",
    verified: true,
    helpfulCount: 42,
  },
  {
    id: "rev-802",
    serviceId: "svc-008",
    serviceTitle: "Traditional Ethiopian Cooking & Catering",
    serviceCategory: "Food",
    providerName: "Tigist Worku",
    providerAvatar: "/avatars/tigist.jpg",
    providerId: "svc-008",
    customerName: "Solomon Demissie",
    customerLocation: "Bole, Addis Ababa",
    customerAvatar: "/avatars/solomon.jpg",
    rating: 5,
    date: "Apr 8, 2026",
    comment:
      "Catering for our engagement gathering was flawless. Fresh injera, spicy dishes cooked to perfection, and spotless kitchen cleanup after.",
    verified: true,
    helpfulCount: 26,
  },
  {
    id: "rev-803",
    serviceId: "svc-008",
    serviceTitle: "Traditional Ethiopian Cooking & Catering",
    serviceCategory: "Food",
    providerName: "Tigist Worku",
    providerAvatar: "/avatars/tigist.jpg",
    providerId: "svc-008",
    customerName: "Tsion Hailu",
    customerLocation: "Gerji, Addis Ababa",
    customerAvatar: "/avatars/sarah.jpg",
    rating: 4.9,
    date: "Mar 25, 2026",
    comment:
      "Weekly home meal prep has made our lives so much easier. Delicious healthy dishes ready in the fridge.",
    verified: true,
    helpfulCount: 18,
  },
]

// ============================================================
// MOCK SERVICE PROVIDERS (8 Verified Providers with 3 reviews each)
// ============================================================
export const services: ServiceProvider[] = [
  {
    id: "svc-001",
    name: "Almaz Tadesse",
    email: "almaz.t@gmail.com",
    avatar: "/avatars/emily.jpg",
    rating: 4.9,
    reviewCount: 3,
    location: "Bole Atlas, Addis Ababa",
    city: "Addis Ababa",
    category: "Nanny / Babysitter",
    services: ["Babysitter", "Housekeeper"],
    priceRange: "150 Birr/hr • 40 hrs worked • 5 yrs experience",
    experience: "5 yrs",
    hoursWorked: "40 hrs",
    description: "Experienced in active childcare, homework supervision, and deep-clean housekeeping. Punctual, organized, and CPR trained. Ready to help your household run smoothly!",
    phone: ["+251 911 456 789", "+251 922 789 012"],
    availability: [
      { day: "Mon", hours: "9:00 am - 12:30 pm, 4:00 pm - 8:00 pm" },
      { day: "Tue", hours: "9:00 am - 12:30 pm, 4:00 pm - 8:00 pm" },
      { day: "Wed", hours: "9:00 am - 12:30 pm, 4:00 pm - 8:00 pm" },
      { day: "Thu", hours: "9:00 am - 12:30 pm" },
      { day: "Fri", hours: "9:00 am - 12:30 pm, 4:00 pm - 8:00 pm" },
    ],
    verified: true,
    covidFree: true,
    createdBy: "user-provider-001",
  },
  {
    id: "svc-002",
    name: "Genet Assefa",
    email: "genet.a@gmail.com",
    avatar: "/avatars/sarah.jpg",
    rating: 4.8,
    reviewCount: 3,
    location: "Gerji Roba, Addis Ababa",
    city: "Addis Ababa",
    category: "Nanny / Babysitter",
    services: ["Babysitter"],
    priceRange: "180 Birr/hr • 35 hrs worked • 3 yrs experience",
    experience: "3 yrs",
    hoursWorked: "35 hrs",
    description:
      "Experienced nanny with a passion for child development and early education. CPR certified and background checked.",
    phone: ["+251 923 445 112"],
    availability: [
      { day: "Mon", hours: "8:00 am - 5:00 pm" },
      { day: "Tue", hours: "8:00 am - 5:00 pm" },
      { day: "Wed", hours: "8:00 am - 12:00 pm" },
      { day: "Thu", hours: "8:00 am - 5:00 pm" },
      { day: "Fri", hours: "8:00 am - 3:00 pm" },
    ],
    verified: true,
    covidFree: true,
    createdBy: "user-provider-002",
  },
  {
    id: "svc-003",
    name: "Abel Tesfaye",
    email: "abel.t@gmail.com",
    avatar: "/avatars/abel.jpg",
    rating: 4.9,
    reviewCount: 3,
    location: "Bole Sub-City, Addis Ababa",
    city: "Addis Ababa",
    category: "Handy men",
    services: ["Plumbing", "Electrical", "Painting"],
    priceRange: "200 Birr/hr",
    experience: "8 yrs",
    hoursWorked: "120 hrs",
    description:
      "Professional handyman specializing in residential plumbing repairs, water heater installation, and interior maintenance. Kebele vetted and insured.",
    phone: ["+251 911 234 567"],
    availability: [
      { day: "Mon", hours: "7:00 am - 6:00 pm" },
      { day: "Tue", hours: "7:00 am - 6:00 pm" },
      { day: "Wed", hours: "7:00 am - 6:00 pm" },
      { day: "Thu", hours: "7:00 am - 6:00 pm" },
      { day: "Fri", hours: "7:00 am - 4:00 pm" },
      { day: "Sat", hours: "8:00 am - 12:00 pm" },
    ],
    verified: true,
    covidFree: true,
    createdBy: "user-provider-003",
  },
  {
    id: "svc-004",
    name: "Meron Hailu",
    email: "meron.h@gmail.com",
    avatar: "/avatars/meron.jpg",
    rating: 4.9,
    reviewCount: 3,
    location: "Kazanchis, Addis Ababa",
    city: "Addis Ababa",
    category: "Cleaning / Cooker / Housekeeper",
    services: ["Deep Cleaning", "Cooking", "Housekeeping"],
    priceRange: "150 Birr/hr",
    experience: "6 yrs",
    hoursWorked: "95 hrs",
    description:
      "Expert housekeeper and deep cleaner with specialty in residential sanitation and eco-friendly products. Thorough, reliable, and detail-oriented.",
    phone: ["+251 922 345 678"],
    availability: [
      { day: "Mon", hours: "6:00 am - 4:00 pm" },
      { day: "Tue", hours: "6:00 am - 4:00 pm" },
      { day: "Wed", hours: "6:00 am - 4:00 pm" },
      { day: "Thu", hours: "6:00 am - 4:00 pm" },
      { day: "Fri", hours: "6:00 am - 2:00 pm" },
    ],
    verified: true,
    covidFree: true,
    createdBy: "user-provider-004",
  },
  {
    id: "svc-005",
    name: "Solomon Kebede",
    email: "solomon.k@gmail.com",
    avatar: "/avatars/solomon.jpg",
    rating: 4.9,
    reviewCount: 3,
    location: "Piassa, Addis Ababa",
    city: "Addis Ababa",
    category: "Education",
    services: ["Math Tutoring", "Science Tutoring", "SAT Prep"],
    priceRange: "300 Birr/hr",
    experience: "10 yrs",
    hoursWorked: "200 hrs",
    description:
      "Experienced tutor with a Master's degree in Mathematics from Addis Ababa University. Specializing in high school and college prep national exams.",
    phone: ["+251 933 456 789"],
    availability: [
      { day: "Mon", hours: "3:00 pm - 8:00 pm" },
      { day: "Tue", hours: "3:00 pm - 8:00 pm" },
      { day: "Wed", hours: "3:00 pm - 8:00 pm" },
      { day: "Sat", hours: "9:00 am - 5:00 pm" },
      { day: "Sun", hours: "9:00 am - 3:00 pm" },
    ],
    verified: true,
    covidFree: true,
    createdBy: "user-provider-005",
  },
  {
    id: "svc-006",
    name: "Hana Girma",
    email: "hana.g@gmail.com",
    avatar: "/avatars/hana.jpg",
    rating: 4.8,
    reviewCount: 3,
    location: "Sarbet, Addis Ababa",
    city: "Addis Ababa",
    category: "Beauty",
    services: ["Hair Styling", "Makeup", "Nail Art"],
    priceRange: "500 Birr/session",
    experience: "4 yrs",
    hoursWorked: "60 hrs",
    description:
      "Creative beauty professional offering mobile salon services. Specializing in bridal makeup, traditional Habesha hair styling, and event glam.",
    phone: ["+251 944 567 890"],
    availability: [
      { day: "Tue", hours: "9:00 am - 7:00 pm" },
      { day: "Wed", hours: "9:00 am - 7:00 pm" },
      { day: "Thu", hours: "9:00 am - 7:00 pm" },
      { day: "Fri", hours: "9:00 am - 7:00 pm" },
      { day: "Sat", hours: "8:00 am - 8:00 pm" },
    ],
    verified: true,
    covidFree: true,
    createdBy: "user-provider-006",
  },
  {
    id: "svc-007",
    name: "Yonas Alemayehu",
    email: "yonas.a@gmail.com",
    avatar: "/avatars/yonas.jpg",
    rating: 4.7,
    reviewCount: 3,
    location: "Mexico, Addis Ababa",
    city: "Addis Ababa",
    category: "Tech",
    services: ["Computer Repair", "Network Setup", "Software Installation"],
    priceRange: "400 Birr/visit",
    experience: "7 yrs",
    hoursWorked: "85 hrs",
    description:
      "Certified IT technician providing on-site hardware repairs, electrical circuit testing, compound Wi-Fi installation, and security troubleshooting.",
    phone: ["+251 955 678 901"],
    availability: [
      { day: "Mon", hours: "10:00 am - 7:00 pm" },
      { day: "Tue", hours: "10:00 am - 7:00 pm" },
      { day: "Wed", hours: "10:00 am - 7:00 pm" },
      { day: "Thu", hours: "10:00 am - 7:00 pm" },
      { day: "Fri", hours: "10:00 am - 5:00 pm" },
    ],
    verified: true,
    covidFree: true,
    createdBy: "user-provider-007",
  },
  {
    id: "svc-008",
    name: "Tigist Worku",
    email: "tigist.w@gmail.com",
    avatar: "/avatars/tigist.jpg",
    rating: 5.0,
    reviewCount: 3,
    location: "CMC, Addis Ababa",
    city: "Addis Ababa",
    category: "Food",
    services: ["Catering", "Meal Prep", "Event Cooking"],
    priceRange: "1000 Birr/event",
    experience: "12 yrs",
    hoursWorked: "300 hrs",
    description:
      "Professional caterer specializing in authentic traditional Ethiopian feast dishes, holiday spreads, and weekly healthy home meal preparations.",
    phone: ["+251 966 789 012", "+251 911 111 222"],
    availability: [
      { day: "Mon", hours: "6:00 am - 8:00 pm" },
      { day: "Tue", hours: "6:00 am - 8:00 pm" },
      { day: "Wed", hours: "6:00 am - 8:00 pm" },
      { day: "Thu", hours: "6:00 am - 8:00 pm" },
      { day: "Fri", hours: "6:00 am - 8:00 pm" },
      { day: "Sat", hours: "6:00 am - 10:00 pm" },
      { day: "Sun", hours: "6:00 am - 6:00 pm" },
    ],
    verified: true,
    covidFree: true,
    createdBy: "user-provider-008",
  },
]

// ============================================================
// MOCK BOOKINGS
// ============================================================
export const bookings: Booking[] = [
  {
    id: "bk-001",
    serviceId: "svc-001",
    serviceName: "Babysitter",
    providerName: "Almaz Tadesse",
    customerName: "Dawit Kebede",
    customerId: "user-customer-001",
    providerId: "user-provider-001",
    date: "02 Dec, 2021 at 09:00 am - 12:30 pm",
    time: "09:00 am - 12:30 pm",
    location: "Bole Medhanialem, Addis Ababa",
    status: "Confirmed",
    phone: "+251 911 223 344",
    price: "40 Birr",
  },
  {
    id: "bk-002",
    serviceId: "svc-001",
    serviceName: "Housekeeper",
    providerName: "Almaz Tadesse",
    customerName: "Selamawit Bekele",
    customerId: "user-customer-002",
    providerId: "user-provider-001",
    date: "04 Dec, 2021 at 09:00 am - 12:30 pm",
    time: "09:00 am - 12:30 pm",
    location: "Kazanchis, Addis Ababa",
    status: "Upcoming",
    phone: "+251 922 334 455",
    price: "40 Birr",
  },
  {
    id: "bk-003",
    serviceId: "svc-002",
    serviceName: "Housekeeper",
    providerName: "Genet Assefa",
    customerName: "Ermias Haile",
    customerId: "user-customer-003",
    providerId: "user-provider-002",
    date: "07 Dec, 2021 at 04:00 pm - 08:00 pm",
    time: "04:00 pm - 08:00 pm",
    location: "Sarbet, Addis Ababa",
    status: "Confirmed",
    phone: "+251 922 345 678",
    price: "60 Birr",
  },
  {
    id: "bk-004",
    serviceId: "svc-003",
    serviceName: "Plumbing",
    providerName: "Abel Tesfaye",
    customerName: "Kalkidan Girma",
    customerId: "user-customer-004",
    providerId: "user-provider-003",
    date: "10 Dec, 2031 at 10:00 am",
    time: "10:00 am - 12:00 pm",
    location: "Bole Sub-City, Addis Ababa",
    status: "Confirmed",
    phone: "+251 911 234 567",
    price: "400 Birr",
  },
]

// ============================================================
// CATEGORIES LIST (for FilterBar)
// ============================================================
export const categories: ServiceCategory[] = [
  "Household",
  "Cleaning / Cooker / Housekeeper",
  "Nanny / Babysitter",
  "Handy men",
  "Guday Adesani",
  "Food",
  "Housing",
  "Education",
  "Health",
  "Beauty",
  "Tech",
]

// ============================================================
// HELPER FUNCTIONS
// ============================================================
export function getServiceById(id: string): ServiceProvider | undefined {
  return services.find((s) => s.id === id)
}

export function getServicesByCategory(category: ServiceCategory): ServiceProvider[] {
  return services.filter((s) => s.category === category)
}

export function searchServices(query: string, city?: string): ServiceProvider[] {
  const lowQuery = query.toLowerCase()
  return services.filter((s) => {
    const matchesQuery =
      s.name.toLowerCase().includes(lowQuery) ||
      s.category.toLowerCase().includes(lowQuery) ||
      s.services.some((svc) => svc.toLowerCase().includes(lowQuery)) ||
      s.description.toLowerCase().includes(lowQuery)
    const matchesCity = city ? s.city.toLowerCase().includes(city.toLowerCase()) : true
    return matchesQuery && matchesCity
  })
}

export function getBookingsByCustomer(customerId: string): Booking[] {
  return bookings.filter((b) => b.customerId === customerId)
}

export function getBookingsByProvider(providerId: string): Booking[] {
  return bookings.filter((b) => b.providerId === providerId)
}

export function getReviewsByServiceId(serviceId: string): ReviewItem[] {
  const matched = allReviews.filter((r) => r.serviceId === serviceId)
  if (matched.length > 0) return matched
  // Fallback if custom/database id: return 3 general reviews
  return allReviews.slice(0, 3)
}
