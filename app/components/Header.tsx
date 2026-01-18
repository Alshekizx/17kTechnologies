"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Blog & Tutorials", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => router.push("/")} className="flex gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="font-bold text-white">17K</span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-1">
          {navItems.map(item => (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`px-4 py-2 rounded-lg ${
                pathname === item.href
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
