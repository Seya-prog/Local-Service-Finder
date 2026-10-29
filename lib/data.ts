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

// ============================================================
// MOCK SERVICE PROVIDERS
// ============================================================
export const services: ServiceProvider[] = [
  {
    id: "svc-001",
    name: "Daisy Simmons",
    email: "daisy.simmons@gmail.com",
    avatar: "/avatars/daisy.jpg",
    rating: 4.5,
    reviewCount: 315,
    location: "Franco, posta",
    city: "Adama",
    category: "Nanny / Babysitter",
    services: ["Babysitter", "Housekeeper"],
    priceRange: "10 Br/hr • 40 hrs worked • 5 yrs experience",
    experience: "5 yrs",
    hoursWorked: "40 hrs",
    description: "Experienced in active childcare  homework supervision, and deep-clean housekeeping. Punctual, organized, and . Ready to help your household run smoothly!",
    phone: ["+91 759 264 0215", "+91 845 102 7516"],
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
    name: "Josephine Welch",
    email: "josephine.w@gmail.com",
    avatar: "/avatars/josephine.jpg",
    rating: 4.6,
    reviewCount: 426,
    location: "830 Emily Drive, Margaretta, NY",
    city: "Addis Abeba ",
    category: "Nanny / Babysitter",
    services: ["Babysitter"],
    priceRange: "15 Br/hr • 35 hrs worked • 3 yrs experience",
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
    reviewCount: 189,
    location: "Bole Sub-City, Addis Ababa",
    city: "Addis Ababa",
    category: "Handy men",
    services: ["Plumbing", "Electrical", "Painting"],
    priceRange: "200 Birr/hr",
    experience: "8 yrs",
    hoursWorked: "120 hrs",
    description:
      "Professional handyman specializing in residential repairs, electrical work, and interior painting. Licensed and insured.",
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
    rating: 4.7,
    reviewCount: 256,
    location: "Kazanchis, Addis Ababa",
    city: "Addis Ababa",
    category: "Cleaning / Cooker / Housekeeper",
    services: ["Deep Cleaning", "Cooking", "Housekeeping"],
    priceRange: "150 Birr/hr",
    experience: "6 yrs",
    hoursWorked: "95 hrs",
    description:
      "Expert housekeeper and cook with specialty in Ethiopian and international cuisine. Thorough, reliable, and detail-oriented.",
    phone: ["+251 922 345 678"],
    availability: [
      { day: "Mon", hours: "6:00 am - 4:00 pm" },
      { day: "Tue", hours: "6:00 am - 4:00 pm" },
      { day: "Wed", hours: "6:00 am - 4:00 pm" },
      { day: "Thu", hours: "6:00 am - 4:00 pm" },
      { day: "Fri", hours: "6:00 am - 2:00 pm" },
    ],
    verified: true,
    covidFree: false,
    createdBy: "user-provider-004",
  },
  {
    id: "svc-005",
    name: "Solomon Kebede",
    email: "solomon.k@gmail.com",
    avatar: "/avatars/solomon.jpg",
    rating: 4.6,
    reviewCount: 142,
    location: "Piassa, Addis Ababa",
    city: "Addis Ababa",
    category: "Education",
    services: ["Math Tutoring", "Science Tutoring", "SAT Prep"],
    priceRange: "300 Birr/hr",
    experience: "10 yrs",
    hoursWorked: "200 hrs",
    description:
      "Experienced tutor with a Master's degree in Mathematics. Specializing in high school and college prep tutoring.",
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
    rating: 4.4,
    reviewCount: 98,
    location: "Sarbet, Addis Ababa",
    city: "Addis Ababa",
    category: "Beauty",
    services: ["Hair Styling", "Makeup", "Nail Art"],
    priceRange: "500 Birr/session",
    experience: "4 yrs",
    hoursWorked: "60 hrs",
    description:
      "Creative beauty professional offering mobile salon services. Specializing in bridal makeup, hair styling, and nail art for all occasions.",
    phone: ["+251 944 567 890"],
    availability: [
      { day: "Tue", hours: "9:00 am - 7:00 pm" },
      { day: "Wed", hours: "9:00 am - 7:00 pm" },
      { day: "Thu", hours: "9:00 am - 7:00 pm" },
      { day: "Fri", hours: "9:00 am - 7:00 pm" },
      { day: "Sat", hours: "8:00 am - 8:00 pm" },
    ],
    verified: false,
    covidFree: true,
    createdBy: "user-provider-006",
  },
  {
    id: "svc-007",
    name: "Yonas Alemayehu",
    email: "yonas.a@gmail.com",
    avatar: "/avatars/yonas.jpg",
    rating: 4.3,
    reviewCount: 67,
    location: "Mexico, Addis Ababa",
    city: "Addis Ababa",
    category: "Tech",
    services: ["Computer Repair", "Network Setup", "Software Installation"],
    priceRange: "400 Birr/visit",
    experience: "7 yrs",
    hoursWorked: "85 hrs",
    description:
      "IT professional providing on-site tech support, computer repairs, home network setup, and software troubleshooting.",
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
    rating: 4.8,
    reviewCount: 203,
    location: "CMC, Addis Ababa",
    city: "Addis Ababa",
    category: "Food",
    services: ["Catering", "Meal Prep", "Event Cooking"],
    priceRange: "1000 Birr/event",
    experience: "12 yrs",
    hoursWorked: "300 hrs",
    description:
      "Professional caterer specializing in traditional Ethiopian cuisine and fusion dishes. Perfect for events, holidays, and weekly meal prep.",
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
    providerName: "Daisy Simmons",
    customerName: "Bob Smith",
    customerId: "user-customer-001",
    providerId: "user-provider-001",
    date: "02 Dec, 2021 at 09:00 am - 12:30 pm",
    time: "09:00 am - 12:30 pm",
    location: "462 Cambridge Court Fort Smith, Arkansas - 72901",
    status: "Confirmed",
    phone: "+91 945 147 0214",
    price: "40 Birr",
  },
  {
    id: "bk-002",
    serviceId: "svc-001",
    serviceName: "Housekeeper",
    providerName: "Daisy Simmons",
    customerName: "Carol Hughes",
    customerId: "user-customer-002",
    providerId: "user-provider-001",
    date: "04 Dec, 2021 at 09:00 am - 12:30 pm",
    time: "09:00 am - 12:30 pm",
    location: "106 Birch Street El Paso, Texas - 79915",
    status: "Upcoming",
    phone: "+91 951 220 1487",
    price: "40 Birr",
  },
  {
    id: "bk-003",
    serviceId: "svc-002",
    serviceName: "Housekeeper",
    providerName: "Josephine Welch",
    customerName: "Scott Durden",
    customerId: "user-customer-003",
    providerId: "user-provider-002",
    date: "07 Dec, 2021 at 04:00 pm - 08:00 pm",
    time: "04:00 pm - 08:00 pm",
    location: "Sarise Addis Abeba",
    status: "Confirmed",
    phone: "+251 922 345 678",
    price: "60 Birr",
  },
  {
    id: "bk-004",
    serviceId: "svc-003",
    serviceName: "Plumbing",
    providerName: "Abel Tesfaye",
    customerName: "Katherine Barker",
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
