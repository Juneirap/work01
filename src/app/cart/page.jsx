"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2, Plus, Minus, CheckCircle, ShoppingBag } from "lucide-react";
import { Button } from "../components/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/card";
import { Badge } from "../components/badge";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { toast } from "sonner";


// ⭐ เพิ่ม Navbar
import Navbar from "../components/navbar";

export default function CartPage({
  cart = [],
  rentals = [],
  removeFromCart,
  updateCartQuantity,
  rentItem,
  returnRental,
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("cart");

  const totalPrice = cart.reduce((sum, item) => {
    const price = item.isRented
      ? (item.price * (item.rentalDays || 3)) / 10
      : item.price;
    return sum + price * item.quantity;
  }, 0);

  const totalDeposit = cart
    .filter((item) => item.isRented)
    .reduce((sum, item) => sum + (item.deposit || item.price * 0.5) * item.quantity, 0);

  return (
    <>
      {/* ⭐ Navbar อยู่ด้านบนสุด */}
      <Navbar />

      <div className="min-h-screen bg-[#FDF4E3]">
        <div className="max-w-4xl mx-auto p-4 pb-24">

          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/main")}
              className="text-[#134686] hover:bg-[#FEB21A]/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-[#134686]" />
              <h1 className="text-2xl text-[#134686]">ตะกร้าสินค้า</h1>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b-2 border-[#998767]/20">
            <button
              onClick={() => setActiveTab("cart")}
              className={`px-4 py-2 ${activeTab === "cart" ? "border-b-2 border-[#134686] text-[#134686]" : "text-[#998767]"}`}
            >
              ตะกร้าสินค้า ({cart.length})
            </button>

            <button
              onClick={() => setActiveTab("rentals")}
              className={`px-4 py-2 ${activeTab === "rentals" ? "border-b-2 border-[#134686] text-[#134686]" : "text-[#998767]"}`}
            >
              รายการเช่า ({rentals.length})
            </button>
          </div>

          {/* CART TAB */}
          {activeTab === "cart" ? (
            <>
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingBag className="h-24 w-24 text-[#998767]/30 mx-auto mb-6" />
                  <p className="text-[#998767] mb-4">ตะกร้าสินค้าของคุณว่างเปล่า</p>
                  <Button 
                    onClick={() => router.push("/main")}
                    className="bg-[#134686] hover:bg-[#0f3a6e]"
                  >
                    เริ่มช้อปปิ้ง
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => {
                      const itemPrice = item.isRented
                        ? (item.price * (item.rentalDays || 3)) / 10
                        : item.price;

                      const itemDeposit = item.isRented
                        ? item.deposit || item.price * 0.5
                        : 0;

                      return (
                        <Card key={item.id + "-" + item.isRented} className="border-[#998767]/20">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden">
                                <ImageWithFallback
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="flex-1">
                                <div className="flex justify-between mb-2">
                                  <div>
                                    <h3 className="text-[#134686]">{item.name}</h3>
                                    {item.isRented && (
                                      <Badge className="bg-[#134686]/10 text-[#134686]">
                                        เช่า {item.rentalDays} วัน
                                      </Badge>
                                    )}
                                  </div>

                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeFromCart(item.id, item.isRented)}
                                    className="hover:bg-[#ED3F27]/10"
                                  >
                                    <Trash2 className="h-4 w-4 text-[#ED3F27]" />
                                  </Button>
                                </div>

                                <div className="flex justify-between">
                                  <div>
                                    <p className="text-[#ED3F27]">฿{(itemPrice * item.quantity).toLocaleString()}</p>

                                    {item.isRented && (
                                      <p className="text-xs text-[#998767]">
                                        + มัดจำ ฿{(itemDeposit * item.quantity).toLocaleString()}
                                      </p>
                                    )}
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      onClick={() => updateCartQuantity(item.id, item.quantity - 1, item.isRented)}
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>

                                    <span className="w-8 text-center text-[#134686]">{item.quantity}</span>

                                    <Button
                                      variant="outline"
                                      size="icon"
                                      onClick={() => updateCartQuantity(item.id, item.quantity + 1, item.isRented)}
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {/* Summary */}
                  <Card className="bg-[#FDF4E3] border-[#998767]/30">
                    <CardContent className="p-6">
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span>ราคาสินค้า</span>
                          <span>฿{totalPrice.toLocaleString()}</span>
                        </div>

                        {totalDeposit > 0 && (
                          <div className="flex justify-between">
                            <span>มัดจำ</span>
                            <span>฿{totalDeposit.toLocaleString()}</span>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <span>ค่าจัดส่ง</span>
                          <span>{totalPrice >= 1000 ? "ฟรี" : "฿50"}</span>
                        </div>

                        <div className="border-t pt-3 flex justify-between">
                          <span>ยอดรวมทั้งหมด</span>
                          <span className="text-[#ED3F27] text-xl">
                            ฿{(totalPrice + totalDeposit + (totalPrice >= 1000 ? 0 : 50)).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <Button
                        onClick={() => {
                          cart.forEach((item) => {
                            if (item.isRented) rentItem(item);
                          });

                          toast.success("ชำระเงินสำเร็จ!", {
                            description: "ขอบคุณสำหรับการสั่งซื้อ",
                          });
                        }}
                        className="w-full bg-[#FEB21A] hover:bg-[#e5a015] text-[#134686] py-6"
                      >
                        ชำระเงิน
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )}
            </>
          ) : (
            // RENTAL TAB
            <div className="space-y-4">
              {rentals.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[#998767] mb-4">ยังไม่มีรายการเช่า</p>
                  <Button 
                    onClick={() => router.push("/main")}
                    className="bg-[#134686] hover:bg-[#0f3a6e]"
                  >
                    เริ่มช้อปปิ้ง
                  </Button>
                </div>
              ) : (
                rentals.map((rental) => (
                  <Card key={rental.id} className="border-[#998767]/20">
                    <CardHeader>
                      <CardTitle className="flex justify-between text-[#134686]">
                        {rental.product.name}

                        {rental.depositReturned && (
                          <Badge className="bg-[#E49D71]">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            คืนมัดจำแล้ว
                          </Badge>
                        )}
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <div className="flex gap-4">
                        <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden">
                          <ImageWithFallback
                            src={rental.product.image}
                            alt={rental.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 text-sm">
                          <div className="flex justify-between">
                            <span>วันที่เช่า:</span>
                            <span>{new Date(rental.rentalDate).toLocaleDateString("th-TH")}</span>
                          </div>

                          {rental.returnDate && (
                            <div className="flex justify-between">
                              <span>วันที่คืน:</span>
                              <span>{new Date(rental.returnDate).toLocaleDateString("th-TH")}</span>
                            </div>
                          )}

                          <div className="flex justify-between">
                            <span>มัดจำที่จ่าย:</span>
                            <span>฿{rental.depositPaid.toLocaleString()}</span>
                          </div>

                          {!rental.depositReturned && !rental.returnDate && (
                            <Button
                              onClick={() => returnRental(rental.id)}
                              className="w-full mt-4 bg-[#E49D71] text-white"
                            >
                              คืนสินค้าและรับมัดจำคืน
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
