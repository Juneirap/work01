"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar";

/* ---------- ตัวอย่างข้อมูลสินค้า (mock) ---------- */
const INITIAL_ITEMS = [
  {
    id: "tee-sienna-lg",
    name: "Manfinity Homme เสื้อเชิ้ต แขนยาว คอปก สีพื้น",
    color: "black",
    size: "XL",
    price: 32,
    qty: 1,
    status: { type: "in-stock", text: "In stock" },
    image:
      "https://img5.pic.in.th/file/secure-sv1/Screenshot-2025-11-12-222356.png",
  },
];

const TAX_RATE = 0.084; // 8.4%
const SHIPPING_FLAT = 5;

const money = (n) =>
  n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function CartPage() {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items]
  );
  const shipping = items.length > 0 ? SHIPPING_FLAT : 0;
  const tax = +(subtotal * TAX_RATE).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);

  const updateQty = (id, qty) =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, qty: Number(qty) } : it))
    );

  const removeItem = (id) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  return (
    <div>
      <Navbar />
      {/* BG สี FDF4E3 + รูปจาง ๆ ทั้งหน้า */}
      <div
        className="relative min-h-screen"
        style={{ backgroundColor: "#FDF4E3" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-center bg-cover opacity-10"
          style={{
            backgroundImage:
              "url('https://img5.pic.in.th/file/secure-sv1/0222379eb5ad184e2d09ebf660e9fb17.jpg')",
          }}
        />
        <div className="relative">
          <main className="mx-auto max-w-6xl px-4 py-8">
            <h1 className="mb-6 text-3xl text-yellow-900 font-bold tracking-tight">
              Shopping Cart
            </h1>

            {/* กล่องครอบทั้งส่วนสินค้า + สรุปราคา (สี #71BC20 แบบจาง 10%) */}
            <div className="rounded-2xl  border border-[#998767]/20 border-t-4 border-b-3 bg-yellow-950/80 p-4 sm:p-6">
              <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
                {/* LEFT: รายการสินค้า — การ์ดพอดีความสูง */}
                <section className="space-y-6">
                  {items.map((it, idx) => (
                    <article
                      key={it.id}
                      className="relative rounded-2xl border border-black/10 bg-white p-4 sm:p-5 shadow-sm"
                    >
                      {/* ปุ่มลบ */}
                      <button
                        onClick={() => removeItem(it.id)}
                        className="absolute right-4 top-4 text-gray-400 transition hover:text-gray-700"
                        aria-label={`Remove ${it.name}`}
                        title="Remove"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M6 6l12 12M18 6L6 18"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>

                      {/* Grid 2 แถว: บน (รูป/ข้อมูล/จำนวน), ล่าง (สถานะ) */}
                      <div className="grid grid-cols-[144px_1fr_auto] sm:grid-cols-[160px_1fr_auto] grid-rows-[auto_auto] items-start gap-x-4 gap-y-2">
                        {/* รูป — กิน 2 แถว */}
                        <div className="relative row-span-2 aspect-square w-36 overflow-hidden rounded-lg bg-gray-100 sm:w-40">
                          <Image
                            src={it.image}
                            alt={it.name}
                            fill
                            className="object-cover"
                            sizes="(min-width: 640px) 160px, 144px"
                            priority={idx < 2}
                          />
                        </div>

                        {/* ข้อมูลสินค้า */}
                        <div className="mr-4 space-y-1">
                          <h3 className="text-sm text-black font-semibold leading-6">
                            {it.name}
                          </h3>
                          <div className="flex flex-wrap gap-x-2 text-sm text-gray-500">
                            {it.color && <span>{it.color}</span>}
                            {it.color && it.size && (
                              <span className="opacity-50 ">|</span>
                            )}
                            {it.size && <span>{it.size}</span>}
                          </div>
                          <div className="mt-1 text-sm text-black font-semibold">
                            ${money(it.price)}
                          </div>
                        </div>

                        {/* จำนวน */}
                        <label className="relative inline-flex text-black items-center justify-self-end">
                          <select
                            value={it.qty}
                            onChange={(e) => updateQty(it.id, e.target.value)}
                            className="h-9 min-w-[64px] appearance-none rounded-md border border-gray-300 bg-white px-3 pr-8 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:outline-none"
                          >
                            {Array.from({ length: 10 }, (_, i) => i + 1).map(
                              (n) => (
                                <option key={n} value={n}>
                                  {n}
                                </option>
                              )
                            )}
                          </select>
                          <svg
                            className="pointer-events-none absolute right-2"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M6 9l6 6 6-6"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </label>

                        {/* สถานะ — แถวล่าง */}
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          {it.status.type === "in-stock" ? (
                            <>
                              <span className="inline-grid h-4 w-4 place-items-center rounded-full bg-green-500/10">
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M20 6L9 17l-5-5"
                                    stroke="rgb(34 197 94)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                              <span>In stock</span>
                            </>
                          ) : (
                            <>
                              <span className="inline-grid h-4 w-4 place-items-center rounded-full bg-gray-400/15">
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <circle
                                    cx="12"
                                    cy="12"
                                    r="9"
                                    stroke="rgb(156 163 175)"
                                    strokeWidth="2"
                                  />
                                  <path
                                    d="M12 7v5l3 2"
                                    stroke="rgb(156 163 175)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                              <span>{it.status.text}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}

                  {items.length === 0 && (
                    <div className="rounded-lg border border-dashed border-black/20 bg-white/50 p-10 text-center text-gray-600">
                      ตะกร้าของคุณว่างเปล่า —{" "}
                      <Link
                        href="/"
                        className="text-indigo-600 underline underline-offset-2"
                      >
                        ไปช้อปต่อ
                      </Link>
                    </div>
                  )}
                </section>

                {/* RIGHT: สรุปคำสั่งซื้อ */}
                <aside className="self-start rounded-xl border border-black/10 bg-white p-6 shadow-sm">
                  <h2 className="text-base text=black font-semibold text-gray-800">
                    Order summary
                  </h2>

                  <dl className="mt-4 space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <dt className="text-gray-700">Subtotal</dt>
                      <dd className="text-black font-medium">${money(subtotal)}</dd>
                    </div>

                    <div className="flex items-center justify-between">
                      <dt className="flex items-center text=black gap-1 text-gray-700">
                        Shipping estimate
                        <span
                          title="Flat rate"
                          className="cursor-help text-gray-400"
                        >
                          ?
                        </span>
                      </dt>
                      <dd className="font-medium text-black ">${money(shipping)}</dd>
                    </div>

                    <div className="flex items-center justify-between">
                      <dt className="flex items-center gap-1 text-gray-700">
                        Tax estimate
                        <span
                          title={`${(TAX_RATE * 100).toFixed(1)}%`}
                          className="cursor-help text=black text-gray-400"
                        >
                          ?
                        </span>
                      </dt>
                      <dd className="text-black font-medium">${money(tax)}</dd>
                    </div>

                    <div className="mt-3 border-t border-black/10 pt-4">
                      <div className="flex items-center justify-between">
                        <dt className="text-base font-semibold text-gray-900">
                          Order total
                        </dt>
                        <dd className="text-base text-black font-semibold">
                          ${money(total)}
                        </dd>
                      </div>
                    </div>
                  </dl>

                  <button
                    className="mt-6 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => alert("Proceed to checkout")}
                  >
                    Checkout
                  </button>
                </aside>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
