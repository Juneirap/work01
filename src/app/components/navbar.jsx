"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, Search, Heart, ShoppingCart, BarChart3 } from "lucide-react";
import Sidebar from "./sidebar";

export default function Navbar({ brand = { name: "FASHION SHOP", href: "/" } }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navIcons = [
    { icon: Search, label: "Search", onClick: () => {} },
    { icon: Heart, label: "Wishlist", onClick: () => {} },
    { icon: ShoppingCart, label: "Cart", onClick: () => router.push("/cart") },
    { icon: BarChart3, label: "Analytics", onClick: () => router.push("/analytics") },
  ];

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            {/* Menu */}
            <div className="flex-1 flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center text-[#134686] hover:bg-gray-100 rounded transition flex-shrink-0"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            {/* Center: Logo */}
            <div className="flex-1 flex items-center justify-center">
              <Link
                href="/main"
                className="flex items-center gap-2 text-[#134686] hover:text-[#998767] transition"
                aria-label="Home"
              >
                <span className="text-2xl">⭐</span>
                <span className="text-xl font-bold text-[#134686]">{brand.name}</span>
              </Link>
            </div>

            {/* inset-inline-end: Navigation Icons & Login */}
            <div className="flex-1 flex items-center justify-end gap-3">
              {/* Navigation Icons */}
              {navIcons.map(({ icon: Icon, label, onClick }) => (
                <button
                  key={label}
                  onClick={onClick}
                  className="text-[#134686] hover:text-[#998767] transition p-2"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}

              {/* Login Button */}
              <button
                onClick={() => router.push("/Login")}
                className="ml-2 px-4 py-2 bg-[#FEB21A] hover:bg-[#e5a015] text-[#134686] font-semibold rounded-lg transition duration-300"
              >
                LOGIN
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Border */}
        <div className="h-1 bg-gradient-to-r from-[#134686] to-[#E49D71]" />
      </nav>
    </>
  );
}
