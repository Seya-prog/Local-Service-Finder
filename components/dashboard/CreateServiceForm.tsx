"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { createService } from "@/lib/actions";

export default function CreateServiceForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await createService(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <h3 className="text-lg font-extrabold text-gray-900">Add a New Service</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Title</label>
          <input
            name="title"
            required
            className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-sm focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-hidden"
            placeholder="e.g. Expert Plumbing"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
          <select
            name="category"
            className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-sm focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-hidden"
          >
            <option value="Home Cleaning">Home Cleaning</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical Services">Electrical Services</option>
            <option value="Appliance Repair">Appliance Repair</option>
            <option value="Tutoring">Tutoring</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Price (Hourly ETB)</label>
          <input
            name="price"
            type="number"
            required
            className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-sm focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-hidden"
            placeholder="250"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">City</label>
          <input
            name="city"
            required
            className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-sm focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-hidden"
            placeholder="Addis Ababa"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1">Neighborhood / Area</label>
        <input
          name="location"
          required
          className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-sm focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-hidden"
          placeholder="Bole / Kazanchis"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          required
          rows={3}
          className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-sm focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-hidden"
          placeholder="Describe your service offering and experience..."
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#FF6B00] py-3 text-sm font-bold text-white hover:bg-orange-600 transition shadow-xs disabled:opacity-50 cursor-pointer"
      >
        {isPending && <Loader2 className="h-4 w-4 animate-spin text-white" />}
        <span>{isPending ? "Creating Service..." : "Create Service"}</span>
      </button>
    </form>
  );
}
