"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, Search, Heart, ShoppingCart, BarChart3, X } from "lucide-react";
import Sidebar from "./sidebar";
import { WishlistContext } from "@/lib/WishlistContext";
import { CartContext } from "@/lib/CartContext";

export default function Navbar({ brand = { name: "FASHION SHOP", href: "/" } }) {
  const router = useRouter();
  const { wishlist } = useContext(WishlistContext);
  const { cart } = useContext(CartContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const wishlistCount = wishlist.length > 99 ? "99+" : wishlist.length;
  const cartCount = cart.length > 99 ? "99+" : cart.length;

  const navIcons = [
    { icon: Search, label: "Search", onClick: () => setSearchOpen(true) },
    { icon: Heart, label: "Wishlist", onClick: () => router.push("/fav") },
    { icon: ShoppingCart, label: "Cart", onClick: () => router.push("/cart") },
    { icon: BarChart3, label: "Analytics", onClick: () => router.push("/Dashboard") },
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
                  className="text-[#134686] hover:text-[#998767] transition p-2 relative"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                  {label === "Wishlist" && wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#ED3F27] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                  {label === "Cart" && cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#ED3F27] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
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

      {/* Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-50 flex items-start justify-center pt-20"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 p-6 border-b border-gray-200">
              <Search className="w-5 h-5 text-[#998767]" />
              <input
                type="text"
                placeholder="ค้นหาสินค้า..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none text-[#134686] placeholder-[#998767] text-lg"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-[#ED3F27] hover:text-[#ED3F27]/70 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Results / Empty State */}
            <div className="p-12 text-center">
              <div className="flex justify-center mb-4">
                <Search className="w-16 h-16 text-gray-300" />
              </div>
              <p className="text-[#998767] text-lg">พิมพ์เพื่อค้นหาสินค้า...</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
