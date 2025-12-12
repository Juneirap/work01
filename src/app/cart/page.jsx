"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/navbar";
import { CartContext } from "@/lib/CartContext";

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateCartQuantity } = useContext(CartContext);
  const [activeTab, setActiveTab] = useState("cart");

  // นับจำนวนสินค้าเช่า (ถ้ามี property isRental)
  const rentalsCount = cart.filter((item) => item.isRental).length;

  const totalPrice = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FDF4E3]">
        <div className="max-w-4xl mx-auto p-4 pb-24">

          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link href="/main">
              <button className="p-2 hover:bg-white/50 rounded-lg transition text-[#134686]">
                <ArrowLeft className="h-5 w-5" />
              </button>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-2xl">🛒</span>
              <h1 className="text-2xl font-bold text-[#134686]">ตะกร้าสินค้า</h1>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b-2 border-[#998767]/20">
            <button
              onClick={() => setActiveTab("cart")}
              className={`px-4 py-2 font-semibold ${
                activeTab === "cart"
                  ? "border-b-2 border-[#134686] text-[#134686]"
                  : "text-[#998767] border-b-2 border-transparent"
              }`}
            >
              ตะกร้าสินค้า ({cart.length})
            </button>

            <button
              onClick={() => setActiveTab("rentals")}
              className={`px-4 py-2 font-semibold ${
                activeTab === "rentals"
                  ? "border-b-2 border-[#134686] text-[#134686]"
                  : "text-[#998767] border-b-2 border-transparent"
              }`}
            >
              รายการเช่า ({rentalsCount})
            </button>
          </div>

          {/* CART TAB */}
          {activeTab === "cart" ? (
            <>
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <span className="text-6xl mb-6 block">🛍️</span>
                  <p className="text-[#998767] mb-4 text-lg">ตะกร้าสินค้าของคุณว่างเปล่า</p>
                  <button
                    onClick={() => router.push("/main")}
                    className="bg-[#134686] hover:bg-[#0f3a6e] text-white px-6 py-3 rounded-lg font-semibold transition"
                  >
                    เริ่มช้อปปิ้ง
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="bg-white rounded-xl p-4 shadow-md">
                        <div className="flex gap-4">
                          <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex justify-between mb-3">
                              <div>
                                <h3 className="font-semibold text-[#134686]">{item.name}</h3>
                                <p className="text-red-500 text-lg font-bold">฿{item.price.toLocaleString()}</p>
                              </div>

                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700 text-xl"
                              >
                                🗑️
                              </button>
                            </div>

                            <div className="flex items-center justify-between">
                              <span></span>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => updateCartQuantity(item.id, Math.max(0, item.quantity - 1))}
                                  className="w-8 h-8 border-2 border-[#134686] text-[#134686] rounded flex items-center justify-center hover:bg-[#134686] hover:text-white transition"
                                >
                                  −
                                </button>

                                <span className="w-8 text-center font-semibold text-[#134686]">
                                  {item.quantity}
                                </span>

                                <button
                                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                  className="w-8 h-8 border-2 border-[#134686] text-[#134686] rounded flex items-center justify-center hover:bg-[#134686] hover:text-white transition"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="bg-[#FDF4E3] border border-[#998767]/30 rounded-xl p-6">
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-[#998767]">ราคาสินค้า</span>
                        <span className="font-semibold text-[#134686]">฿{totalPrice.toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-[#998767]">ค่าจัดส่ง</span>
                        <span className="font-semibold text-[#998767]">ฟรี</span>
                      </div>

                      <div className="border-t border-[#998767]/20 pt-3 flex justify-between">
                        <span className="text-[#134686] font-semibold">ยอดรวมทั้งหมด</span>
                        <span className="text-[#ED3F27] text-2xl font-bold">
                          ฿{totalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => router.push("/checkout")}
                      className="w-full bg-[#FEB21A] hover:bg-[#e5a015] text-[#134686] font-bold py-4 rounded-xl transition"
                    >
                      ชำระเงิน ฿{totalPrice.toLocaleString()}
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            // RENTAL TAB
            <div className="text-center py-12">
              <span className="text-6xl block mb-4">🔄</span>
              <p className="text-[#998767]">ยังไม่มีรายการเช่า</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
