import Link from "next/link"

interface LogoProps {
  className?: string
  iconSize?: string
  withText?: boolean
  withTagline?: boolean
  variant?: "orange" | "white"
}

export default function Logo({
  className = "",
  iconSize = "h-8 w-8",
  withText = true,
  withTagline = true,
  variant = "orange",
}: LogoProps) {
  const fillColor = variant === "white" ? "white" : "#FF6B00"
  const textColor = variant === "white" ? "text-white" : "text-gray-900"
  const taglineColor = variant === "white" ? "text-white/80" : "text-gray-400"

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Floral sunburst icon */}
      <div className="flex shrink-0 items-center justify-center">
        <svg viewBox="0 0 44 44" className={iconSize} fill="none" aria-hidden="true">
          <circle cx="22" cy="22" r="4.5" fill={fillColor} />
          <ellipse cx="22" cy="8.5" rx="3" ry="5.5" fill={fillColor} />
          <ellipse cx="22" cy="35.5" rx="3" ry="5.5" fill={fillColor} />
          <ellipse cx="8.5" cy="22" rx="5.5" ry="3" fill={fillColor} />
          <ellipse cx="35.5" cy="22" rx="5.5" ry="3" fill={fillColor} />
          <ellipse cx="12.5" cy="12.5" rx="3.2" ry="5.5" transform="rotate(-45 12.5 12.5)" fill={fillColor} />
          <ellipse cx="31.5" cy="31.5" rx="3.2" ry="5.5" transform="rotate(-45 31.5 31.5)" fill={fillColor} />
          <ellipse cx="31.5" cy="12.5" rx="3.2" ry="5.5" transform="rotate(45 31.5 12.5)" fill={fillColor} />
          <ellipse cx="12.5" cy="31.5" rx="3.2" ry="5.5" transform="rotate(45 12.5 31.5)" fill={fillColor} />
        </svg>
      </div>

      {withText && (
        <div className="flex flex-col">
          <span className={`text-xl font-extrabold tracking-tight leading-tight sm:text-2xl ${textColor}`}>
            LocalCare
          </span>
          {withTagline && (
            <span className={`text-[9px] font-medium -mt-0.5 ${taglineColor}`}>
              Local Services. Real People.
            </span>
          )}
        </div>
      )}
    </div>
  )
}
