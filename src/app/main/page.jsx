"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar";
import { Kanit, Noto_Sans_Thai } from "next/font/google";

/* ฟอนต์เฉพาะหน้านี้ */
const bodyFont = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});
const headingFont = Kanit({
  subsets: ["thai", "latin"],
  weight: ["700", "800"],
  display: "swap",
});

/* --------- ตัวอย่างข้อมูล (mock) --------- */
const products = {
  tshirt: [
    {
      id: "tee-1",
      name: "Navy blue t-shirt",
      price: 490,
      image: "https://img2.pic.in.th/pic/KJ-Fashion-Style-on-Twitter.jpg",
    },
    {
      id: "tee-2",
      name: "Oversize Tee",
      price: 390,
      image:
        "https://img5.pic.in.th/file/secure-sv1/download-722e0c7e61c6761d7.jpg",
    },
    {
      id: "tee-3",
      name: "Brown t-shirt",
      price: 450,
      image: "https://img2.pic.in.th/pic/download-82ef2d4f40121a447.jpg",
    },
    {
      id: "tee-4",
      name: "Shark pattern t-shirt",
      price: 460,
      image:
        "https://img5.pic.in.th/file/secure-sv1/download-92cc8ebf2e4d2f7eb.jpg",
    },
  ],
  shirt: [
    {
      id: "shirt-1",
      name: "Cream Shirt",
      price: 890,
      image:
        "https://img5.pic.in.th/file/secure-sv1/download-6343d11886614f9cd.jpg",
    },
    {
      id: "shirt-2",
      name: "Light grey shirt",
      price: 950,
      image:
        "https://img2.pic.in.th/pic/Camisa-casual-de-manga-larga-holgada-con-bolsillo-para-hombre-primavera-y-otono.jpg",
    },
    {
      id: "shirt-3",
      name: "Rose pattern shirt",
      price: 990,
      image: "https://img2.pic.in.th/pic/download-10d2c70eb95934fdfb.jpg",
    },
    {
      id: "shirt-4",
      name: "Student shirt",
      price: 790,
      image:
        "https://img5.pic.in.th/file/secure-sv1/727837b7fe3cdef9ea073b7a6c838d7a.jpg",
    },
  ],
  pants: [
    {
      id: "pant-1",
      name: "American Retro Multi-Pocket Jeans Pants",
      price: 1200,
      image:
        "https://img5.pic.in.th/file/secure-sv1/American-Retro-Multi-Pocket-Jeans-Pants---American-Retro-Multi-Pocket-Jeans-Pants.jpg",
    },
    {
      id: "pant-2",
      name: "Aesthetic Y2k Cargo Pants Baggy",
      price: 1090,
      image: "https://img2.pic.in.th/pic/download-110c07a9b0a7dea5b6.jpg",
    },
    {
      id: "pant-3",
      name: "Loose three-bar casual pants",
      price: 690,
      image:
        "https://img5.pic.in.th/file/secure-sv1/INSstudios-loose-three-bar-casual-pants-NA639---L-_-Black.jpg",
    },
    {
      id: "pant-4",
      name: "Cylindrical pants Old Money",
      price: 990,
      image: "https://img5.pic.in.th/file/secure-sv1/--------Old-Money.jpg",
    },
  ],
};

/* --------- การ์ดสินค้า (รูปใหญ่แนวตั้ง 3:4) --------- */
function ProductCard({ item }) {
  return (
    <Link
      href={`/product/${item.id}`}
      className="group block rounded-none border border-black/10 bg-white shadow-sm hover:shadow-md transition"
    >
      <div className="relative w-full overflow-hidden rounded-none bg-gray-100 h-[240px] sm:h-[300px] lg:h-[360px] aspect-[3/4]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition group-hover:scale-[1.03]"
          sizes="(min-width:1024px) 360px, (min-width:640px) 300px, 240px"
        />
      </div>

      <div className="p-3">
        <div className="text-sm font-semibold text-gray-900 line-clamp-1">
          {item.name}
        </div>
        <div className="mt-1 text-sm text-gray-700">
          ฿{item.price.toLocaleString()}
        </div>
      </div>
    </Link>
  );
}

/* --------- บล็อกหมวดสินค้า --------- */
function Section({ title, href = "#", items }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="grid grid-cols-3 items-center gap-2 py-6">
        <div className="text-left text-sm font-semibold text-gray-800">
          <Link href={href} className="underline underline-offset-4">
            ดูทั้งหมด
          </Link>
        </div>
        <h2
          className={`${headingFont.className} text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900`}
        >
          {title}
        </h2>
        <div />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4">
        {items.map((p) => (
          <ProductCard key={p.id} item={p} />
        ))}
      </div>
    </section>
  );
}

export default function MainPage() {
  return (
    <div
      className={`${bodyFont.className} min-h-dvh bg-[#FDF4E3]`}
      style={{
        backgroundImage:
          "linear-gradient(rgba(253,244,227,0.92), rgba(253,244,227,0.92)), url('https://img5.pic.in.th/file/secure-sv1/0222379eb5ad184e2d09ebf660e9fb17.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />

      {/* HERO */}
      <div className="px-4 sm:px-6 py-4">
        <div className="h-[38vh] sm:h-[46vh] w-full overflow-hidden bg-[#B49984]/65 p-3 sm:p-4">
          <div className="relative h-full w-full overflow-hidden bg-[#745A73]">
            {/* ไล่สี */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(196,196,196,0) 0%, #E49D71 48%, #E1C05C 100%)",
              }}
            />
            {/* === รูปพื้นร้าน “จาง” ใน HERO === */}
            <div
              className="absolute inset-0 bg-center bg-cover opacity-25"
              style={{
                backgroundImage:
                  "url('https://img5.pic.in.th/file/secure-sv1/download-12cfdd3e63ec4e6a00.jpg')",
              }}
              aria-hidden="true"
            />
            {/* ข้อความทักทาย */}
            <div className="relative h-full w-full flex items-center justify-center">
              <h1
                className={`${headingFont.className} text-2xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-[0_2px_6px_rgba(255,255,255,0.6)]`}
              >
                Welcome To The Clothing Tental Shop
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* SECTIONS */}
      <div className="space-y-10 sm:space-y-16 pb-14">
        <Section
          title="เสื้อยืด"
          href="/category/tshirt"
          items={products.tshirt}
        />
        <Section
          title="เสื้อเชิ้ต"
          href="/category/shirt"
          items={products.shirt}
        />
        <Section title="กางเกง" href="/category/pants" items={products.pants} />
      </div>
    </div>
  );
}
