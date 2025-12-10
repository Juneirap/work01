"use client";

import React from "react";
import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react";
import Navbar from "../components/navbar";

const favorites = [
  {
    id: 1,
    name: "NEW DROP เสื้อยืดกราฟฟิค",
    price: 1032,
    originalPrice: 1290,
    rating: 4.6,
    reviews: 89,
    discount: 20,
    image: "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=800",
  },
];

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-[#FDF4E3]">
      <Navbar />
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button className="p-2 rounded-full hover:bg-white/70 transition" aria-label="back">
            <ArrowLeft className="w-5 h-5 text-[#134686]" />
          </button>
          <Heart className="w-6 h-6 text-[#ED3F27]" />
          <h1 className="text-xl font-semibold text-[#134686]">รายการโปรด</h1>
          <span className="ml-2 px-2 py-0.5 bg-[#134686] text-white text-sm rounded-full">{favorites.length}</span>
        </div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
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
                <span className="absolute top-3 left-3 bg-[#ED3F27] text-white text-sm font-bold px-3 py-1 rounded-full">
                  -{item.discount}%
                </span>
                <button
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-[#FFF4EC] transition"
                  aria-label="toggle favorite"
                >
                  <Heart className="w-5 h-5 text-[#ED3F27] fill-[#ED3F27]" />
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
      </div>
    </div>
  );
}
