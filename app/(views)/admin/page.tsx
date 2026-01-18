// app/(views)/admin/page.tsx
"use client";

import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Admin Dashboard</h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/admin/uploadBlogPage">
          <button className="px-6 text-black py-3 bg-cyan-500 rounded-md hover:bg-cyan-600 transition">
            Upload Blog
          </button>
        </Link>
        <Link href="/admin/uploadItemPage">
          <button className="text-black px-6 py-3 bg-purple-500 rounded-md hover:bg-purple-600 transition">
            Upload Item
          </button>
        </Link>
      </div>
    </div>
  );
}
