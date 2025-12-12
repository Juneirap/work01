"use client";

import React, { useContext } from "react";
import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/navbar";
import { WishlistContext } from "@/lib/WishlistContext";

export default function FavoritesPage() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  return (
    <div className="min-h-screen bg-[#FDF4E3]">
      <Navbar />
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/main">
            <button className="p-2 rounded-full hover:bg-white/70 transition" aria-label="back">
              <ArrowLeft className="w-5 h-5 text-[#134686]" />
            </button>
          </Link>
          <Heart className="w-6 h-6 text-[#ED3F27]" />
          <h1 className="text-xl font-semibold text-[#134686]">รายการโปรด</h1>
          <span className="ml-2 px-2 py-0.5 bg-[#134686] text-white text-sm rounded-full">
            {wishlist.length}
          </span>
        </div>

        {/* Favorites Grid */}
        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 mx-auto text-[#ED3F27] opacity-50 mb-4" />
            <p className="text-[#998767] text-lg">ยังไม่มีสินค้าในรายการโปรด</p>
            <Link href="/main">
              <button className="mt-4 px-6 py-2 bg-[#134686] text-white rounded-lg hover:bg-[#0f3a6e] transition">
                เลือกสินค้า
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-[#e8dcc5]"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-80 object-cover"
                  />
                  {item.discount && (
                    <span className="absolute top-3 left-3 bg-[#ED3F27] text-white text-sm font-bold px-3 py-1 rounded-full">
                      -{item.discount}%
                    </span>
                  )}
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-[#FEB21A] shadow flex items-center justify-center hover:bg-[#FFAA00] transition"
                    aria-label="toggle favorite"
                  >
                    <Heart className="w-5 h-5 text-white fill-white" />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="text-[#134686] font-semibold text-lg mb-2 line-clamp-2">
                    {item.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-[#FEB21A] fill-[#FEB21A]" />
                    <span className="text-sm text-[#998767]">
                      {item.rating} ({item.reviews})
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xl font-bold text-[#ED3F27]">
                      ฿{item.price.toLocaleString()}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-[#998767] line-through">
                        ฿{item.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <button className="w-full bg-[#134686] hover:bg-[#0f3a6e] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition">
                    <ShoppingCart className="w-4 h-4" />
                    เพิ่มลงตะกร้า
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
