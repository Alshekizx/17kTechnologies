// app/(views)/admin/AdminContent.tsx
"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminContent({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <p className="text-white text-center mt-20">Loading...</p>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black  text-white">
      <header className="flex justify-between items-center p-4 border-b border-white/20">
        <span>Logged in as {user.email}</span>
        <button
          onClick={logout}
          className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}
