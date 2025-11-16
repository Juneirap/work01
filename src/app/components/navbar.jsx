"use client";

import Link from "next/link";

export default function Navbar({
  brand = { name: "LOGO", href: "/" },
  onMenuClick = () => {},
}) {
  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="bg-[#F7EAD6]">
        {/* full-bleed container (no max-width) */}
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center text-black justify-between">
            {/* Left: Hamburger */}
            <button
              type="button"
              aria-label="Open menu"
              onClick={onMenuClick}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-black/5 active:scale-95 transition"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Center: Sun + LOGO */}
            <Link
              href={brand.href}
              className="flex items-center text-black gap-2 select-none"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0"
              >
                <path
                  d="M12 4V2M12 22v-2M4 12H2M22 12h-2M5 5l-1.4-1.4M20.4 20.4 19 19M5 19l-1.4 1.4M20.4 3.6 19 5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
              <span className="text-sm text-black font-semibold tracking-wide">
                {brand.name}
              </span>
            </Link>

            {/* Right: Cart + Login */}
            <div className="flex items-center gap-3 text-black">
              <Link
                href="/cart"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-black/5"
                aria-label="Cart"
                title="Cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </Link>

              <Link
                href="/login"
                className="inline-flex items-center gap-1 rounded-md border border-black/15 bg-[#FFC95A] px-3 py-1.5 text-xs text-black font-bold tracking-wide shadow-sm hover:brightness-95 active:translate-y-[1px]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="4"
                    y="11"
                    width="16"
                    height="9"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M8 11V8a4 4 0 1 1 8 0v3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
                LOGIN
              </Link>
            </div>
          </div>
        </div>

        {/* เส้นคั่นล่าง */}
        <div className="h-[3px] w-full bg-black/10"></div>
      </nav>
    </header>
  );
}
