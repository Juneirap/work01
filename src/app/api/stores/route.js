// app/api/stores/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { z } from "zod";

/* ------------ Query schema (list) ------------ */
const listQuerySchema = z.object({
  q: z.string().trim().optional(),
  category: z.string().trim().optional(), // เช่น "t_shirt"
  typebuy: z.string().trim().optional(), // "buy" | "rent"
  size: z.string().trim().optional(), // "S" | "M" | ... | "3XL"
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  sort: z
    .string()
    .trim()
    .refine(
      (v) =>
        !v ||
        [
          "createdAt:desc",
          "createdAt:asc",
          "price:asc",
          "price:desc",
          "name:asc",
          "name:desc",
        ].includes(v),
      "Invalid sort"
    )
    .optional(),
});

/* ------------ Body schema (create) ------------ */
/* เพิ่ม preprocess เพื่อตัดช่องว่าง และ coerce number ให้แน่น */
const createSchema = z
  .object({
    image: z.preprocess(
      (v) => (typeof v === "string" ? v.trim() : v),
      z.string().url("image ต้องเป็น URL")
    ),
    name: z.preprocess(
      (v) => (typeof v === "string" ? v.trim() : v),
      z.string().min(1, "กรุณาใส่ชื่อสินค้า")
    ),
    size: z.preprocess(
      (v) => (typeof v === "string" ? v.trim() : v),
      z.string().min(1, "กรุณาใส่ไซซ์ เช่น S,M,L,XL,XXL,3XL")
    ),
    price: z.coerce.number().min(0, "ราคา ≥ 0"),
    category: z.preprocess(
      (v) => (typeof v === "string" ? v.trim() : v),
      z.string().min(1, "กรุณาใส่หมวดหมู่")
    ),
    typebuy: z.preprocess(
      (v) => (typeof v === "string" ? v.trim() : v),
      z.string().min(1, "กรุณาใส่ประเภทการซื้อ-ขาย")
    ),
    description: z.preprocess(
      (v) => (typeof v === "string" ? v.trim() : v),
      z.string().optional().nullable()
    ),
  })
  .strict();

/* ------------ Helpers ------------ */
function parseSort(sort) {
  if (!sort) return { createdAt: "desc" };
  const [field, dir = "desc"] = sort.split(":");
  const mapping = { createdAt: "createdAt", price: "price", name: "name" };
  const fieldDb = mapping[field] || "createdAt";
  return { [fieldDb]: dir };
}

/* ------------ GET /api/stores (list) ------------ */
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const parsed = listQuerySchema.safeParse({
      q: url.searchParams.get("q") ?? undefined,
      category: url.searchParams.get("category") ?? undefined,
      typebuy: url.searchParams.get("typebuy") ?? undefined,
      size: url.searchParams.get("size") ?? undefined,
      page: url.searchParams.get("page") ?? undefined,
      pageSize: url.searchParams.get("pageSize") ?? undefined,
      sort: url.searchParams.get("sort") ?? undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid query", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const { q, category, typebuy, size, page, pageSize, sort } = parsed.data;

    const where = {};
    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }
    if (category) where.category = category;
    if (typebuy) where.typebuy = typebuy;
    if (size) where.size = size;

    const orderBy = parseSort(sort);

    const [items, total] = await Promise.all([
      prisma.store.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.store.count({ where }),
    ]);

    return NextResponse.json({
      ok: true,
      items,
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (err) {
    console.error("GET /api/stores error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* ------------ POST /api/stores (create) ------------ */
export async function POST(req) {
  try {
    const json = await req.json();

    const parsed = createSchema.safeParse(json);
    if (!parsed.success) {
      // ✅ ส่งรายละเอียด field ที่ผิดกลับไป
      const issues = parsed.error.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
      }));
      return NextResponse.json(
        { error: "Invalid input", issues },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const created = await prisma.store.create({
      data: {
        image: data.image,
        name: data.name,
        size: data.size, // ถ้าใน schema ใช้ enum เปลี่ยน type ฟิลด์เป็น enum
        price: data.price,
        category: data.category,
        typebuy: data.typebuy,
        description: data.description ?? null,
      },
    });

    return NextResponse.json({ ok: true, item: created }, { status: 201 });
  } catch (err) {
    console.error("POST /api/stores error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
