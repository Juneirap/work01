"use client";

import { X, Heart, TrendingUp, ShoppingBag, User, Settings, HelpCircle } from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60]"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-72 bg-[#FDF4E3] z-[70] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } overflow-y-auto flex flex-col`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4A6FA5] to-[#D9876B] p-4 flex justify-between items-center rounded-br-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-xl">⭐</span>
            </div>
            <span className="text-white font-bold text-lg">เมนู</span>
          </div>
          <button onClick={onClose} className="text-white hover:bg-white/20 rounded-md p-1 transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* หมวดหมวิดไฮไลท์ */}
          <div>
            <h3 className="text-[#C4A574] text-xs font-semibold mb-3 px-3">หมวดหมวิดไฮไลท์</h3>
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded text-[#4A6FA5] hover:bg-[#FFC95A]/20 transition">
                <Heart className="h-5 w-5" />
                <span className="text-sm">ที่อนุรักษ์</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded text-[#4A6FA5] hover:bg-[#FFC95A]/20 transition">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm">สินค้าใหม่</span>
              </button>
            </div>
          </div>

          {/* ประเภทเสื้อผ้า */}
          <div>
            <h3 className="text-[#C4A574] text-xs font-semibold mb-3 px-3">ประเภทเสื้อผ้า</h3>
            <div className="space-y-1">
              {(
                [
                  { label: "เสื้อสัด", icon: ShoppingBag },
                  { label: "เสื้อเชิ้ต", icon: ShoppingBag },
                  { label: "เสื้อรัดเกิด", icon: ShoppingBag },
                  { label: "เสื้อกัก", icon: ShoppingBag },
                ]
            ).map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded text-[#4A6FA5] hover:bg-[#FFC95A]/20 transition"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* เพศ */}
          <div>
            <h3 className="text-[#C4A574] text-xs font-semibold mb-3 px-3">เพศ</h3>
            <div className="space-y-1">
              {(
                [
                  { label: "ผู้ชาย", icon: User },
                  { label: "ผู้หญิง", icon: User },
                  { label: "ผู้เป็นกลาง", icon: User },
                ]
              ).map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded text-[#4A6FA5] hover:bg-[#FFC95A]/20 transition"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* บริการเรา */}
          <div>
            <h3 className="text-[#C4A574] text-xs font-semibold mb-3 px-3">บริการเรา</h3>
            <div className="space-y-1">
              {(
                [
                  { label: "ข้อราคา", icon: Settings },
                  { label: "ข้อสูง", icon: Settings },
                  { label: "ข้อร้ายท้าลมหนด", icon: ShoppingBag },
                ]
              ).map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded text-[#4A6FA5] hover:bg-[#FFC95A]/20 transition"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-[#4A6FA5] to-[#D9876B] text-white p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">📞</span>
            <span className="text-sm">02-123-4567</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">✉️</span>
            <span className="text-sm">info@fashionshop.com</span>
          </div>
          <p className="text-xs text-center border-t border-white/30 pt-3">© 2025 Fashion Shop</p>
        </div>
      </div>
    </>
  );
}