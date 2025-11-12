// app/api/stores/[id]/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { z } from "zod";

/* ---- validators ---- */
const idSchema = z.string().min(1, "Invalid id"); // ถ้าอยากเข้มขึ้นใช้ regex 24 ตัวอักษรก็ได้
// const idSchema = z.string().regex(/^[a-f\d]{24}$/i, "Invalid ObjectId");

const updateSchema = z
  .object({
    image: z.string().url().optional(),
    name: z.string().min(1).optional(),
    size: z.string().min(1).optional(),
    price: z.coerce.number().min(0).optional(),
    category: z.string().min(1).optional(),
    typebuy: z.string().min(1).optional(),
    description: z.string().nullable().optional(),
  })
  .refine((obj) => Object.keys(obj).length > 0, {
    message: "No fields to update",
  });

/* ------------ GET /api/stores/:id ------------ */
export async function GET(req, ctx) {
  try {
    const { id } = await ctx.params; // ⬅️ ต้อง await
    const idParsed = idSchema.safeParse(id);
    if (!idParsed.success) {
      return NextResponse.json(
        { error: idParsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const item = await prisma.store.findUnique({
      where: { id: idParsed.data },
    });
    if (!item)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ ok: true, item });
  } catch (err) {
    console.error("GET /api/stores/:id error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* ------------ PATCH /api/stores/:id ------------ */
export async function PATCH(req, ctx) {
  try {
    const { id } = await ctx.params; // ⬅️ ต้อง await
    const idParsed = idSchema.safeParse(id);
    if (!idParsed.success) {
      return NextResponse.json(
        { error: idParsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const json = await req.json();
    const parsed = updateSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const updated = await prisma.store.update({
      where: { id: idParsed.data },
      data: parsed.data,
    });

    return NextResponse.json({ ok: true, item: updated });
  } catch (err) {
    if (err?.code === "P2025") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    console.error("PATCH /api/stores/:id error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* ------------ DELETE /api/stores/:id ------------ */
export async function DELETE(req, ctx) {
  try {
    const { id } = await ctx.params; // ⬅️ ต้อง await
    const idParsed = idSchema.safeParse(id);
    if (!idParsed.success) {
      return NextResponse.json(
        { error: idParsed.error.issues[0].message },
        { status: 400 }
      );
    }

    await prisma.store.delete({ where: { id: idParsed.data } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err?.code === "P2025") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    console.error("DELETE /api/stores/:id error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
