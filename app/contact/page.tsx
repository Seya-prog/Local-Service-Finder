"use client"

import { useState } from "react"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Send,
  HelpCircle,
  MessageSquare,
} from "lucide-react"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phoneOrEmail: "",
    subject: "General Inquiry",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.phoneOrEmail && formData.message) {
      setSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold text-[#FF6B00]">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Support & Inquiries</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Contact LocalCare Ethiopia
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Have questions about a service booking, need help finding a professional, or want to join as a provider? Our team in Addis Ababa is ready to help.
          </p>
        </div>

        {/* Two-Column Grid: Info & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Office & Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
              <h2 className="text-xl font-extrabold text-gray-900">
                Contact Information
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-gray-600">
                <div className="flex items-start gap-3.5">
                  <div className="h-9 w-9 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Addis Ababa Office</p>
                    <p className="text-gray-500 mt-0.5">Bole Sub-City, Cameroon St. (Near Medhanialem), Addis Ababa, Ethiopia</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="h-9 w-9 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Phone & Telegram</p>
                    <p className="text-gray-500 mt-0.5">+251 924 865 876 / +251 911 234 567</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="h-9 w-9 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Email Address</p>
                    <p className="text-gray-500 mt-0.5">support@localcare.et</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="h-9 w-9 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Working Hours</p>
                    <p className="text-gray-500 mt-0.5">Monday – Saturday: 8:00 AM – 7:00 PM (EAT)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="h-14 w-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900">
                    Message Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
                    Thank you, {formData.name}. Our local support team in Addis Ababa will review your message and contact you via phone or email shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        name: "",
                        phoneOrEmail: "",
                        subject: "General Inquiry",
                        message: "",
                      })
                    }}
                    className="mt-4 rounded-xl bg-[#FF6B00] px-5 py-2.5 text-xs font-bold text-white hover:bg-orange-600 transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-xl font-extrabold text-gray-900 mb-2">
                    Send Us a Message
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Almaz Tadesse"
                        className="w-full rounded-xl border border-gray-200 bg-white p-3 text-xs sm:text-sm text-gray-900 outline-hidden focus:border-[#FF6B00]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Phone Number or Email
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.phoneOrEmail}
                        onChange={(e) => setFormData({ ...formData, phoneOrEmail: e.target.value })}
                        placeholder="e.g. +251 9... or user@gmail.com"
                        className="w-full rounded-xl border border-gray-200 bg-white p-3 text-xs sm:text-sm text-gray-900 outline-hidden focus:border-[#FF6B00]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white p-3 text-xs sm:text-sm text-gray-900 outline-hidden focus:border-[#FF6B00]"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Booking Assistance">Booking Assistance</option>
                      <option value="Provider Registration">Provider Registration</option>
                      <option value="Payment or Pricing (ETB)">Payment or Pricing (ETB)</option>
                      <option value="Feedback / Dispute">Feedback / Dispute</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how we can help you..."
                      className="w-full rounded-xl border border-gray-200 bg-white p-3 text-xs sm:text-sm text-gray-900 outline-hidden focus:border-[#FF6B00] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B00] py-3 text-xs sm:text-sm font-bold text-white hover:bg-orange-600 transition shadow-xs"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Common FAQs Section */}
        <div className="pt-6 border-t border-gray-200/60">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-gray-500 mt-1">Quick answers to common questions about LocalCare</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-xs space-y-2">
              <h3 className="text-sm font-bold text-gray-900">How are service rates calculated?</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Rates are set transparently by providers in Ethiopian Birr (ETB). Standard hourly or fixed job rates are clearly visible before booking.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-xs space-y-2">
              <h3 className="text-sm font-bold text-gray-900">How do you verify providers?</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Every provider submits valid Kebele identification or trade credentials, verified in person by our Addis Ababa operations team.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-xs space-y-2">
              <h3 className="text-sm font-bold text-gray-900">How can I become a provider?</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Sign up as a provider, create your service listing with rates and coverage areas, and our team will approve your profile within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

