"use client"

import { useState, useTransition, useRef } from "react"
import Image from "next/image"
import { Plus, X, UploadCloud, Check, ChevronDown, Loader2 } from "lucide-react"
import { createService, updateService } from "@/lib/actions"
import { ProviderServiceItem } from "./ProviderDashboardView"

interface CreateEditServiceProps {
  initialService?: ProviderServiceItem | null
  onCancel?: () => void
  onSaved?: (service: ProviderServiceItem) => void
}

export default function CreateEditService({
  initialService,
  onCancel,
  onSaved,
}: CreateEditServiceProps) {
  const [isPending, startTransition] = useTransition()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [images, setImages] = useState<string[]>(() => {
    if (initialService?.image) return [initialService.image]
    return []
  })

  const [serviceName, setServiceName] = useState(initialService?.title || "")
  const [category, setCategory] = useState(initialService?.category || "")
  const [description, setDescription] = useState(initialService?.description || "")
  const [price, setPrice] = useState(initialService?.price ? `${initialService.price} ETB` : "")
  const [serviceArea, setServiceArea] = useState(
    initialService ? `${initialService.location}, ${initialService.city}` : "Bole, Addis Ababa"
  )
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleAddImagePlaceholder = () => {
    // If fewer than 4 images, allow toggling the third hero image or opening file picker
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImages((prev) => [...prev, url])
    }
  }

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.set("serviceName", serviceName)
    formData.set("category", category || "Home Cleaning")
    formData.set("description", description)
    formData.set("price", price)
    formData.set("serviceArea", serviceArea)
    if (images.length > 0) {
      formData.set("image", images[0])
    }

    startTransition(async () => {
      try {
        if (initialService && !initialService.id.startsWith("srv-demo-")) {
          await updateService(initialService.id, formData)
        } else {
          await createService(formData)
        }
        setSaveSuccess(true)
        if (onSaved) {
          const parts = serviceArea.split(",")
          const city = parts[0]?.trim() || "Addis Ababa"
          const loc = parts[1]?.trim() || "Bole"
          const cleanPrice = price.replace(/[^0-9.]/g, "") || "25"
          onSaved({
            id: initialService?.id || `srv-created-${Date.now()}`,
            title: serviceName || "Home Cleaning",
            category: category || "Home Cleaning",
            price: cleanPrice,
            city,
            location: loc,
            description,
          })
        }
      } catch (err) {
        console.error("Failed to save service:", err)
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
          {initialService ? "Edit Service" : "Add New Service"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {initialService
            ? `Update your pricing, location, or details for "${initialService.title}".`
            : "Fill in the details below to publish a new service listing in Addis Ababa."}
        </p>
      </div>

      {saveSuccess && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold">
          <Check className="h-4 w-4 text-emerald-600" />
          <span>Service successfully saved!</span>
        </div>
      )}

      {/* Main Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Service Images */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-sm font-bold text-gray-900">Service Images</h2>
          
          <div className="flex flex-wrap items-center gap-3">
            {images.map((src, idx) => (
              <div
                key={idx}
                className="relative group h-24 w-24 sm:h-28 sm:w-28 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 shrink-0 shadow-xs"
              >
                <Image
                  src={src}
                  alt={`Service preview ${idx + 1}`}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                  aria-label="Remove image"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}

            {/* Add Image Placeholder Card */}
            <button
              type="button"
              onClick={handleAddImagePlaceholder}
              className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl border border-dashed border-gray-200 hover:border-[#FF6B00] bg-white hover:bg-orange-50/20 transition-all flex flex-col items-center justify-center gap-1.5 shrink-0 group cursor-pointer"
            >
              <div className="h-7 w-7 rounded-full flex items-center justify-center text-gray-400 group-hover:text-[#FF6B00]">
                <Plus className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-semibold text-gray-500 group-hover:text-[#FF6B00]">
                Add Image
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Service Details */}
        <div className="lg:col-span-7 space-y-3">
          <h2 className="text-sm font-bold text-gray-900">Service Details</h2>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4"
          >
            {/* Service Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Service Name
              </label>
              <input
                type="text"
                name="serviceName"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                placeholder="e.g. Home Cleaning"
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-hidden transition"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-hidden transition pr-10"
                >
                  <option value="" disabled>Select category</option>
                  <option value="Home Cleaning">Home Cleaning</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical Services">Electrical Services</option>
                  <option value="Appliance Repair">Appliance Repair</option>
                  <option value="Tutoring">Tutoring</option>
                  <option value="Painting">Painting</option>
                  <option value="Moving & Storage">Moving & Storage</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your service..."
                className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-hidden transition resize-none"
              />
            </div>

            {/* Price and Service Area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 250 ETB"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-hidden transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Service Area
                </label>
                <input
                  type="text"
                  name="serviceArea"
                  value={serviceArea}
                  onChange={(e) => setServiceArea(e.target.value)}
                  placeholder="e.g. Bole, Addis Ababa"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-hidden transition"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition shadow-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] px-6 py-2.5 text-xs font-bold text-white hover:bg-orange-600 transition shadow-xs disabled:opacity-50 cursor-pointer"
              >
                {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin text-white" />}
                <span>{isPending ? "Saving..." : "Save Service"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

