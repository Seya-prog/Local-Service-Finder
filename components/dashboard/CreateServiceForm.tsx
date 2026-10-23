"use client";

import { createService } from "@/lib/actions";

export default function CreateServiceForm() {
  return (
    <form action={createService} className="space-y-4 bg-white p-6 rounded-xl border max-w-xl">
      <h3 className="text-xl font-semibold mb-4">Add a New Service</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input name="title" required className="mt-1 block w-full border rounded-md p-2" placeholder="e.g. Expert Plumbing" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select name="category" className="mt-1 block w-full border rounded-md p-2">
            <option value="Home Repairs">Home Repairs</option>
            <option value="Tutoring">Tutoring</option>
            <option value="Cleaning">Cleaning</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Price (Hourly)</label>
          <input name="price" type="number" required className="mt-1 block w-full border rounded-md p-2" placeholder="50" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input name="city" required className="mt-1 block w-full border rounded-md p-2" placeholder="Addis Ababa" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Neighborhood/Location</label>
        <input name="location" required className="mt-1 block w-full border rounded-md p-2" placeholder="Bole" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" required className="mt-1 block w-full border rounded-md p-2" rows={3}></textarea>
      </div>

      <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition">
        Create Service
      </button>
    </form>
  );
}
