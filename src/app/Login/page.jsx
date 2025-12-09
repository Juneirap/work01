"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Validate email format
  const isValidEmail = (email) => email.includes("@");

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email || !password) {
        setError("กรุณากรอกอีเมลและรหัสผ่าน");
        return;
      }

      if (!isValidEmail(email)) {
        setError("อีเมลไม่ถูกต้อง");
        return;
      }

      // TODO: API call here
      console.log("Login:", { email, password });
      router.push("/main");
    } catch {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full pl-10 pr-4 py-2 border border-[#998767]/30 rounded-lg focus:outline-none focus:border-[#4A6FA5] focus:ring-2 focus:ring-[#4A6FA5]/20 transition text-gray-900";

  const passwordInputClass =
    "w-full pl-10 pr-12 py-2 border border-[#998767]/30 rounded-lg focus:outline-none focus:border-[#4A6FA5] focus:ring-2 focus:ring-[#4A6FA5]/20 transition text-gray-900 [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden [&::-webkit-strong-password-auto-fill-button]:hidden";

  const labelClass = "block text-sm font-semibold text-[#4A6FA5] mb-2";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7EAD6] to-[#FDF4E3] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-[#4A6FA5] to-[#D9876B] rounded-lg p-3 mb-4">
            <span className="text-3xl">⭐</span>
          </div>
          <h1 className="text-3xl font-bold text-[#4A6FA5]">เข้าสู่ระบบ</h1>
          <p className="text-[#998767] mt-2">ยินดีต้อนรับกลับมา</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className={labelClass}>อีเมล</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-[#998767] pointer-events-none" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className={inputClass}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className={labelClass}>
              รหัสผ่าน
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-[#998767] pointer-events-none" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={passwordInputClass}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#998767] hover:text-[#4A6FA5] transition focus:outline-none"
                aria-label="Toggle password visibility"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-[#998767] cursor-pointer hover:text-[#4A6FA5] transition">
              <input type="checkbox" className="w-4 h-4 rounded" />
              จำฉันไว้
            </label>
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              ลืมรหัสผ่าน?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4A6FA5] hover:bg-[#3d5a85] text-white font-semibold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#998767]/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-[#998767]">หรือ</span>
            </div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            className="w-full border border-[#998767]/30 text-[#4A6FA5] font-semibold py-3 rounded-lg hover:bg-[#FDF4E3] transition"
          >
            เข้าสู่ระบบด้วย Google
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-[#998767] mt-6">
          ยังไม่มีบัญชี?{" "}
          <button
            onClick={() => router.push("/register")}
            className="text-[#4A6FA5] font-semibold hover:text-[#D9876B] transition"
          >
            สมัครสมาชิก
          </button>
        </p>
      </div>
    </div>
  );
}