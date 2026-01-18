// app/(views)/admin/layout.tsx
"use client";
import "../../globals.css";
import "../../styles/globals.css";
import { AuthProvider } from "@/app/context/AuthContext";
import AdminContent from "./AdminContent";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminContent>{children}</AdminContent>
    </AuthProvider>
  );
}