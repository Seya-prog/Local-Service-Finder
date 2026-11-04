"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { signIn, authClient } from "@/lib/auth-client"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Logo from "@/components/layout/Logo"

function GoogleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  )
}

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setError("")
    setSocialLoading(true)
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to connect with Google."
      setError(message)
      setSocialLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await signIn.email({
        email,
        password,
      })

      if (res?.error) {
        setError(res.error.message || "Invalid credentials. Please try again.")
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred. Please try again."
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="w-full max-w-5xl rounded-3xl border border-gray-100 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        
        {/* Left Column: Solid Orange Brand Showcase */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#FF6B00] via-[#FF6000] to-[#F25500] p-8 sm:p-10 flex flex-col justify-between text-white relative overflow-hidden">
          {/* Subtle floral watermark graphic */}
          <div className="pointer-events-none absolute -right-16 -bottom-16 opacity-15">
            <svg viewBox="0 0 200 200" className="h-96 w-96" fill="none">
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

          {/* Top Logo */}
          <div className="relative z-10">
            <Link href="/">
              <Logo variant="white" />
            </Link>
          </div>

          {/* Middle Text */}
          <div className="relative z-10 my-6 sm:my-8 space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
              Welcome Back
            </h2>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-sm">
              Sign in to your account to continue.
            </p>
          </div>

          {/* Bottom Authentic Habesha Professional Photo seamlessly integrated */}
          <div className="relative z-10 mt-auto pt-4 flex justify-center -mb-8 sm:-mb-10">
            <div className="relative h-64 sm:h-76 w-60 sm:w-72 overflow-hidden rounded-t-3xl shadow-xl">
              <Image
                src="/images/hero-handyman.jpg"
                alt="Habesha Handyman"
                fill
                priority
                sizes="(max-width: 640px) 240px, 288px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Sign In Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Sign In
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Access your account
              </p>
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                {error}
              </div>
            )}

            {/* Social Sign In (Google OAuth) */}
            <div>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={socialLoading}
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3 px-4 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition shadow-xs disabled:opacity-60 cursor-pointer"
              >
                {socialLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-[#FF6B00]" />
                ) : (
                  <GoogleIcon className="h-4 w-4" />
                )}
                <span>{socialLoading ? "Connecting to Google..." : "Continue with Google"}</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-2">
              <div className="w-full border-t border-gray-200" />
              <span className="bg-white px-3 text-xs font-medium text-gray-400 absolute">
                or
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-hidden transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 pr-10 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-hidden transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-gray-600 font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded-md border-gray-300 text-[#FF6B00] focus:ring-[#FF6B00]"
                  />
                  <span>Remember me</span>
                </label>

                <Link
                  href="/contact"
                  className="font-semibold text-[#FF6B00] hover:text-orange-600 transition"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#FF6B00] py-3 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-orange-600 transition disabled:opacity-60 cursor-pointer"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin text-white" />}
                <span>{loading ? "Signing In..." : "Sign In"}</span>
              </button>
            </form>

            {/* Bottom Register Link */}
            <p className="text-center text-xs text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="font-bold text-[#FF6B00] hover:text-orange-600 transition"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
