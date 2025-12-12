"use client";

import React, { useState } from "react";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";

const DashboardPage = () => {
  const [timeRange, setTimeRange] = useState("เดือน");

  // ข้อมูล KPI
  const kpis = [
    {
      title: "รายได้รวม",
      value: "฿328,500",
      change: "+12.5%",
      isPositive: true,
      icon: "💵",
      bgColor: "#E8F5E9",
      iconBg: "#4CAF50",
    },
    {
      title: "คำสั่งซื้อ",
      value: "358",
      change: "+8.3%",
      isPositive: true,
      icon: "🛒",
      bgColor: "#E3F2FD",
      iconBg: "#2196F3",
    },
    {
      title: "ลูกค้า",
      value: "1,247",
      change: "+156 ลูกค้าใหม่",
      isPositive: true,
      icon: "👥",
      bgColor: "#FFF3E0",
      iconBg: "#FF9800",
    },
    {
      title: "การคืน",
      value: "67",
      change: "0 คำสั่งเชิงสงสัย",
      isPositive: false,
      icon: "⚙️",
      bgColor: "#FFF8E1",
      iconBg: "#FFC107",
    },
  ];

  // ข้อมูลกราฟ Line Chart
  const lineChartData = [
    { month: "ม.ค.", sales: 45000, rentals: 15000 },
    { month: "ก.พ.", sales: 52000, rentals: 16000 },
    { month: "มี.ค.", sales: 48000, rentals: 14000 },
    { month: "เม.ย.", sales: 61000, rentals: 17000 },
    { month: "พ.ค.", sales: 55000, rentals: 16000 },
    { month: "มิ.ย.", sales: 70000, rentals: 21000 },
  ];

  // ข้อมูล Pie Chart
  const pieChartData = [
    { label: "เสื้อผ้า", value: 35, color: "#134686" },
    { label: "เสื้อเชิ้ต", value: 25, color: "#E49D71" },
    { label: "เสื้อแจ็คเก็ต", value: 15, color: "#998767" },
    { label: "ชุดราตรี", value: 15, color: "#ED3F27" },
    { label: "ผลสุด", value: 10, color: "#FEB21A" },
  ];

  // ข้อมูล Bar Chart
  const barChartData = [
    { month: "ม.ค.", value: 42 },
    { month: "ก.พ.", value: 55 },
    { month: "มี.ค.", value: 48 },
    { month: "เม.ย.", value: 65 },
    { month: "พ.ค.", value: 58 },
    { month: "มิ.ย.", value: 75 },
  ];

  // Top 5 สินค้า
  const topProducts = [
    { rank: 1, name: "LUXURY เสื้อยืดพรีเมียม", qty: 156, revenue: "฿138,840", trend: "up" },
    { rank: 2, name: "NEW DROP เสื้อยืดกราฟฟิค", qty: 142, revenue: "฿146,388", trend: "up" },
    { rank: 3, name: "เสื้อแจ็คเก็ตดำหนิง", qty: 89, revenue: "฿311,500", trend: "up" },
    { rank: 4, name: "ชุดราตรีหรูหรา", qty: 76, revenue: "฿342,000", trend: "down" },
    { rank: 5, name: "เสื้อเชิ้ตสีม่วง", qty: 67, revenue: "฿113,230", trend: "up" },
  ];

  // Order Status
  const orders = [
    { id: "ORD-001", customer: "คุณสมชาย ไอศีกรีม", amount: "฿4,500", date: "7 ธ.ค. 2025", status: "สำเร็จ" },
    { id: "ORD-002", customer: "คุณสมชัยหญิง แสงสว่าง", amount: "฿2,000", date: "7 ธ.ค. 2025", status: "รอดำเนินการ" },
    { id: "ORD-003", customer: "คุณวิรัยค คำหวาน", amount: "฿8,900", date: "6 ธ.ค. 2025", status: "กำลังดำเนินการ" },
    { id: "ORD-004", customer: "คุณโปรแกรม สวนอาม", amount: "฿6,500", date: "6 ธ.ค. 2025", status: "สำเร็จ" },
    { id: "ORD-005", customer: "คุณธนาคร รวมเวิน", amount: "฿12,000", date: "5 ธ.ค. 2025", status: "สำเร็จ" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "สำเร็จ":
        return "bg-green-100 text-green-700";
      case "รอดำเนินการ":
        return "bg-yellow-100 text-yellow-700";
      case "กำลังดำเนินการ":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF4E3]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/main">
              <button className="p-2 hover:bg-white rounded-lg transition">
                <ArrowLeft className="w-5 h-5 text-[#134686]" />
              </button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-[#134686] flex items-center gap-2">
                <span>📊</span> Dashboard
              </h1>
              <p className="text-[#998767] mt-1">ภาพรวมและสถิติรายได้</p>
            </div>
          </div>

          {/* Time Range Buttons */}
          <div className="flex gap-2">
            {["สัปดาห์", "เดือน", "ปี"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  timeRange === range
                    ? "bg-[#134686] text-white"
                    : "bg-white text-[#134686] border-2 border-[#134686] hover:bg-[#134686]/10"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition"
              style={{ borderLeft: `4px solid ${kpi.iconBg}` }}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-[#998767] font-medium">{kpi.title}</p>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                  style={{ backgroundColor: kpi.iconBg }}
                >
                  {kpi.icon}
                </div>
              </div>
              <div className="mb-2">
                <p className="text-3xl font-bold text-[#134686]">{kpi.value}</p>
              </div>
              <p
                className={`text-sm font-semibold ${
                  kpi.isPositive ? "text-green-600" : "text-gray-600"
                } flex items-center gap-1`}
              >
                {kpi.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {kpi.change}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-md"
          >
            <h2 className="text-xl font-bold text-[#134686] mb-2">รายได้โดยแบ่งตามประเภท</h2>
            <p className="text-sm text-[#998767] mb-6">
              เปรียบเทียบรายได้จากการขายและการเช่า
            </p>
            <div className="h-80 flex items-end justify-around gap-2 px-4 border-b-2 border-gray-200 pb-6">
              {lineChartData.map((data, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                  <div className="flex gap-1 items-end h-64">
                    <div
                      className="bg-[#134686] rounded-t opacity-70"
                      style={{ height: `${(data.sales / 70000) * 100}%`, width: "20px" }}
                    />
                    <div
                      className="bg-[#FEB21A] rounded-t"
                      style={{ height: `${(data.rentals / 70000) * 100}%`, width: "20px" }}
                    />
                  </div>
                  <span className="text-xs text-[#998767] text-center">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-6 mt-6 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#134686]" />
                <span className="text-sm text-[#998767]">ขายขาย</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#FEB21A]" />
                <span className="text-sm text-[#998767]">ขายเช่า</span>
              </div>
            </div>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-md"
          >
            <h2 className="text-xl font-bold text-[#134686] mb-2">สัดส่วนความนิยม</h2>
            <p className="text-sm text-[#998767] mb-6">
              การกระจายยอดสินค้าแสดงประเภท
            </p>
            <div className="flex items-center justify-center h-80">
              <svg viewBox="0 0 100 100" className="w-56 h-56">
                {pieChartData.reduce((acc, item, idx) => {
                  const prevValue = pieChartData.slice(0, idx).reduce((sum, d) => sum + d.value, 0);
                  const startAngle = (prevValue / 100) * 360;
                  const endAngle = ((prevValue + item.value) / 100) * 360;

                  const startRad = (startAngle * Math.PI) / 180;
                  const endRad = (endAngle * Math.PI) / 180;

                  const x1 = 50 + 40 * Math.cos(startRad);
                  const y1 = 50 + 40 * Math.sin(startRad);
                  const x2 = 50 + 40 * Math.cos(endRad);
                  const y2 = 50 + 40 * Math.sin(endRad);

                  const largeArc = item.value > 50 ? 1 : 0;

                  return [
                    ...acc,
                    <path
                      key={item.label}
                      d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                      fill={item.color}
                    />,
                  ];
                }, [])}
              </svg>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-6">
              {pieChartData.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-[#998767]">
                    {item.label}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-md mb-8"
        >
          <h2 className="text-xl font-bold text-[#134686] mb-2">สำนวนคำสั่งซื้อ</h2>
          <p className="text-sm text-[#998767] mb-6">
            แนวโน้มคำสั่งซื้อในแต่ละเดือน
          </p>
          <div className="h-80 flex items-end justify-around gap-4 px-4 border-b-2 border-gray-200 pb-6">
            {barChartData.map((data) => (
              <div key={data.month} className="flex flex-col items-center flex-1">
                <div
                  className="bg-[#E49D71] rounded-t-lg w-full"
                  style={{ height: `${(data.value / 80) * 100}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 px-4">
            {barChartData.map((data) => (
              <span key={data.month} className="text-xs text-[#998767]">
                {data.month}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white rounded-xl p-6 shadow-md"
          >
            <h2 className="text-xl font-bold text-[#134686] mb-2">สินค้าขายดี</h2>
            <p className="text-sm text-[#998767] mb-6">Top 5 สินค้าขายดีที่สุด</p>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.rank} className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                  <div className="w-8 h-8 rounded-full bg-[#134686] text-white flex items-center justify-center font-bold text-sm">
                    {product.rank}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#134686]">{product.name}</p>
                    <p className="text-xs text-[#998767]">{product.qty} ชิ้น • {product.revenue}</p>
                  </div>
                  {product.trend === "up" ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white rounded-xl p-6 shadow-md"
          >
            <h2 className="text-xl font-bold text-[#134686] mb-2">คำสั่งซื้อล่าสุด</h2>
            <p className="text-sm text-[#998767] mb-6">รายการสั่งซื้อที่น่าสำคัญล่าสุด</p>
            <div className="space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="bg-[#FDF4E3] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-[#134686]">{order.id}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-[#998767]">{order.customer}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-[#998767]">{order.date}</p>
                    <p className="font-bold text-[#ED3F27]">{order.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
