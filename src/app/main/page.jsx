/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useContext } from 'react';
import { Shield, Package, RefreshCw, Headphones, CreditCard, Award, Star, Sparkles, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Heart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';
import ProductQuickView from '../components/ProductQuickView';
import { WishlistContext } from '@/lib/WishlistContext';
import { CartContext } from '@/lib/CartContext';

export default function MainPage() {
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [filterType, setFilterType] = useState('ทั้งหมด');

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const categories = [
    { name: 'เสื้อยืด', icon: '👕', color: '#134686' },
    { name: 'เสื้อเชิ้ต', icon: '👔', color: '#E49D71' },
    { name: 'เสื้อแจ็คเก็ต', icon: '🧥', color: '#998767' },
    { name: 'ชุดราตรี', icon: '👗', color: '#ED3F27' },
    { name: 'ชุดสูท', icon: '🤵', color: '#134686' },
    { name: 'ชุดเช่าทั้งหมด', icon: '✨', color: '#FEB21A' },
  ];

  const products = [
    {
      id: 1,
      name: 'LUXURY เสื้อยืดพรีเมียม',
      price: 890,
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500',
      rating: 4.8,
      reviews: 124,
      isNew: true,
      description: 'เสื้อยืดพรีเมียมทำจากผ้าคอตตอน 100% คุณภาพสูง ผ้านุ่มสวมใส่สบาย เหมาะสำหรับการใส่ในชีวิตประจำวัน ถนอมผิว ระบายอากาศดี',
    },
    {
      id: 2,
      name: 'NEW DROP เสื้อยืดทรงฟิต',
      price: 1032,
      originalPrice: 1290,
      image: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=500',
      rating: 4.6,
      reviews: 89,
      isNew: true,
      description: 'เสื้อยืดทรงฟิตแบบใหม่ล่าสุด ตัดเย็บอย่างพอดี ใส่สวย ปลายแขนยืดหยุ่น ไม่หรี่ ใส่ไปทำงาน เที่ยว ได้ทั้งวัน',
    },
    {
      id: 3,
      name: 'HUMBLE เสื้อยืดลายสกรีน',
      price: 990,
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500',
      rating: 4.5,
      reviews: 57,
      description: 'เสื้อยืดลายสกรีนลาย Humble Design ลายทำจากสีย้อมอย่างดี ไม่ลอก ไม่ลาดกระสี หนึ่งชิ้นที่ต้องมี',
    },
    {
      id: 4,
      name: 'เสื้อยืดไซเวอร์ไซส์',
      price: 671,
      originalPrice: 790,
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500',
      rating: 4.7,
      reviews: 156,
      discount: 15,
      description: 'เสื้อยืดโอเวอร์ไซส์สไตล์เกาหลี สวมใส่สบายๆ ตัวไม่อึดอัด ผ้านำเข้า ทำให้หน้าหำขาว เป็นเสื้อดีทั่วไป',
    },
    {
      id: 5,
      name: 'LUXURY เสื้อยืดพรีเมียม',
      price: 890,
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500',
      rating: 4.8,
      reviews: 124,
      description: 'เสื้อยืดพรีเมียมทำจากผ้าคอตตอน 100% คุณภาพสูง ผ้านุ่มสวมใส่สบาย เหมาะสำหรับการใส่ในชีวิตประจำวัน',
    },
    {
      id: 6,
      name: 'NEW DROP เสื้อยืดทรงฟิต',
      price: 1032,
      originalPrice: 1290,
      image: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=500',
      rating: 4.6,
      reviews: 89,
      description: 'เสื้อยืดทรงฟิตแบบใหม่ล่าสุด ตัดเย็บอย่างพอดี ใส่สวย ปลายแขนยืดหยุ่น ไม่หรี่ ใส่ไปได้ทั้งวัน',
    },
    {
      id: 7,
      name: 'HUMBLE เสื้อยืดลายสกรีน',
      price: 990,
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500',
      rating: 4.5,
      reviews: 57,
      isNew: true,
      description: 'เสื้อยืดลายสกรีนลาย Humble Design ลายทำจากสีย้อมอย่างดี ไม่ลอก ไม่ลาดกระสี หนึ่งชิ้นที่ต้องมี',
    },
    {
      id: 8,
      name: 'เสื้อยืดไซเวอร์ไซส์',
      price: 671,
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500',
      rating: 4.7,
      reviews: 156,
      description: 'เสื้อยืดโอเวอร์ไซส์ไซส์สไตล์เกาหลี สวมใส่สบาย ตัวไม่อึดอัด ผ้านำเข้า ทำให้หน้ากุ๊บที่ต้องมี',
    },
  ];

  const testimonials = [
    {
      name: 'คุณเมทตรัง วงศ์สุข',
      role: 'ลูกค้าประจำ',
      text: 'เช่าชุดราตรีไปงานแต่งงาน สวยมาก คนต่างก็เดินมาถาม และชาชีมคุณให้เป็น บริการดีมากค่ะ ซึ่งเงินค่ามัดจำคืนมาค่อย',
      rating: 5,
    },
    {
      name: 'คุณธนากร โจติ',
      role: 'ลูกค้าใหม่',
      text: 'ซื้อเสื้อเชิ้ตหลายตัว คุณภาพดีมีเกรด ส่งเร็วมากครับ พนักงานให้คำแนะนำจาก จะกลับมาซื้อใหม่แน่นอน',
      rating: 5,
    },
    {
      name: 'คุณปริยาซม สายสาม',
      role: 'ลูกค้าประจำ',
      text: 'ชอบมากค่ะ มีสินค้าให้เลือกเยอะ ทั้งราบาและนช้า ราคาโน้มใจ คุณภาพดี แนะนำเลยค่ะ',
      rating: 5,
    },
    {
      name: 'คุนวีระ มัยนตร์',
      role: 'ลูกค้าใหม่',
      text: 'เช่าชุดสูทไปสัมภาษณ์งาน ได้งานแด้วเว้วน ชุดดีมาก สะอาด กลิ่นหอม ประทับใจมากครับ',
      rating: 5,
    },
  ];

  const trustBadges = [
    {
      icon: Shield,
      title: 'ช่วยเจ้ามัลออร์',
      description: 'ระบบชำระเงินปลอดภัย SSL',
    },
    {
      icon: Package,
      title: 'จัดส่งฟรี',
      description: 'สั่งซื้อครบ 1,000 บาท',
    },
    {
      icon: RefreshCw,
      title: 'คืนสินค้าง่าย',
      description: 'ภายใน 7 วัน',
    },
    {
      icon: Headphones,
      title: 'บริการลูกค้า 24/7',
      description: 'พึงพอใจหรือคืนเงิน',
    },
    {
      icon: CreditCard,
      title: 'หลายช่องทางชำระเงิน',
      description: 'โอน บัตร พร้อมเพย์',
    },
    {
      icon: Award,
      title: 'รับประกันคุณภาพ',
      description: 'สินค้าคุณภาพพรีเมี่ยม',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative h-[600px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80"
          alt="Fashion Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#134686]/70 via-[#134686]/50 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="bg-[#FEB21A] text-[#134686] px-6 py-3 rounded-full text-lg font-semibold">
                🎉 ลูกค้าใหม่รับส่วนลดพิเศษ
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold mb-4"
              style={{ color: '#FDF4E3' }}
            >
              แฟชั่นสุดหรู
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-6xl md:text-8xl font-bold mb-3"
              style={{ color: '#FEB21A' }}
            >
              ลด 30%
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xl md:text-2xl mb-8"
              style={{ color: '#E49D71' }}
            >
              สำหรับทุกคอลเลกชั่นใหม่
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <button className="bg-[#FEB21A] hover:bg-[#e5a015] text-[#134686] font-bold px-10 py-4 rounded-lg text-xl shadow-2xl hover:shadow-[#FEB21A]/50 transition-all hover:scale-105">
                ช้อปเลย!
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Trust Badges Section */}
      <div className="py-16 px-4" style={{ backgroundColor: '#FDF4E3' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#134686] flex items-center justify-center mb-4 hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-[#FEB21A]" />
                  </div>
                  <h3 className="font-semibold text-[#134686] mb-2 text-sm">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-[#998767]">{badge.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-[#134686] text-center mb-12"
          >
            หมวดหมู่สินค้า
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer"
                style={{ backgroundColor: `${category.color}10` }}
              >
                <div className="text-5xl mb-3">{category.icon}</div>
                <p className="text-[#134686] font-medium">{category.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div
        className="py-8 px-4"
        style={{ background: 'linear-gradient(90deg, #ffe7c7 0%, #fdd9a7 100%)' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-8 flex-wrap text-[#134686]">
          <div className="flex items-center gap-2">
            <span>📈</span>
            <span>ส่งฟรีเมื่อช้อปครบ 1,000 บาท</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✨</span>
            <span>บริการเช่าชุด คืนเงินมัดจำ 100%</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⭐</span>
            <span>สินค้าใหม่ทุกสัปดาห์</span>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="py-8 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            {['ทั้งหมด', 'สินค้าใหม่', 'สอนราคา'].map((type) => {
              let buttonClass = '';
              if (filterType === type) {
                if (type === 'ทั้งหมด') {
                  buttonClass = 'bg-[#134686] text-white';
                } else if (type === 'สินค้าใหม่') {
                  buttonClass = 'bg-[#FEB21A] text-[#134686]';
                } else if (type === 'สอนราคา') {
                  buttonClass = 'bg-[#ED3F27] text-white';
                }
              } else {
                if (type === 'ทั้งหมด') {
                  buttonClass = 'border-2 border-[#134686] text-[#134686] hover:bg-[#134686]/10';
                } else if (type === 'สินค้าใหม่') {
                  buttonClass = 'border-2 border-[#FEB21A] text-[#FEB21A] hover:bg-[#FEB21A]/10';
                } else if (type === 'สอนราคา') {
                  buttonClass = 'border-2 border-[#ED3F27] text-[#ED3F27] hover:bg-[#ED3F27]/10';
                }
              }
              return (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-8 py-3 rounded-lg font-semibold transition ${buttonClass}`}
                >
                  {type === 'สอนราคา' ? 'ลดราคา' : type}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-[#134686] text-center mb-12"
          >
            สินค้าแนะนำ
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter((product) => {
                if (filterType === 'ทั้งหมด') return true;
                if (filterType === 'สินค้าใหม่') return product.isNew;
                if (filterType === 'สอนราคา') return product.discount;
                return true;
              })
              .map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-2 group"
              >
                <div className="relative aspect-[3/4] bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.isNew && (
                    <span className="absolute top-3 left-3 bg-[#FEB21A] text-[#134686] px-3 py-1 rounded-full text-sm font-semibold">
                      ใหม่!
                    </span>
                  )}
                  {product.discount && (
                    <span className="absolute top-3 left-3 bg-[#ED3F27] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      -{product.discount}%
                    </span>
                  )}
                  
                  {/* Hover Actions */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition mb-2 ${
                        isInWishlist(product.id)
                          ? 'bg-[#FEB21A] text-white'
                          : 'bg-white text-[#ED3F27] hover:bg-[#FEB21A] hover:text-white'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-white' : ''}`} />
                    </button>
                  </div>
                  
                  <div className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity p-4">
                    <button
                      onClick={() => handleQuickView(product)}
                      className="w-full bg-white text-[#134686] py-2 rounded-lg font-semibold hover:bg-[#134686] hover:text-white transition flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      ดูด่วน
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-[#134686] font-semibold mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    {product.originalPrice ? (
                      <>
                        <span className="text-xl font-bold text-[#ED3F27]">
                          ฿{product.price}
                        </span>
                        <span className="text-sm text-[#998767] line-through">
                          ฿{product.originalPrice}
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-bold text-[#ED3F27]">
                        ฿{product.price}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mb-4">
                    <Star className="w-4 h-4 fill-[#FEB21A] text-[#FEB21A]" />
                    <span className="text-sm text-[#998767]">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      addToCart(product);
                      // แสดง notification แทน redirect
                      const notification = document.createElement('div');
                      notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2';
                      notification.innerHTML = '✓ เพิ่มสินค้าลงตะกร้าแล้ว';
                      document.body.appendChild(notification);
                      setTimeout(() => {
                        notification.style.opacity = '0';
                        notification.style.transition = 'opacity 0.3s';
                        setTimeout(() => notification.remove(), 300);
                      }, 2000);
                    }}
                    className="w-full bg-[#134686] text-white py-2 rounded-lg font-semibold hover:bg-[#0f3a6e] transition">
                    เพิ่มลงตะกร้า
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* View All Button */}
      <div className="py-8 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <button className="bg-[#E49D71] hover:bg-[#d88a5e] text-white px-12 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
            ดูสินค้าทั้งหมด
          </button>
        </div>
      </div>

      {/* Rental Service Section */}
      <div
        className="py-16 px-4"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, #ffffff 0%, #fdf4e3 40%), radial-gradient(circle at 80% 80%, #ffffff 0%, #fdf4e3 50%), #fdf4e3",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Sparkles className="w-16 h-16 text-[#FEB21A] mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-[#134686] mb-4">บริการเช่าชุด</h2>
            <p className="text-lg text-[#998767] max-w-3xl mx-auto">
              เช่าชุดราตรี ชุดสูท ชุดไทย สำหรับงานพิเศษของคุณ ด้วยราคาเพียงเศษเสี้ยวของราคาซื้อ พร้อมการันตีคืนเงินมัดจำเต็มจำนวน
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '💰', title: 'ประหยัดคุ้มค่า', desc: 'เช่าในราคาเพียง 10-30% ของราคาซื้อ' },
              { icon: '🔄', title: 'คืนมัดจำ 100%', desc: 'การันตีคืนเงินมัดจำเต็มจำนวน' },
              { icon: '✨', title: 'สภาพใหม่ทุกชิ้น', desc: 'ชุดสะอาด รีดเรียบร้อย พร้อมใช้' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className="text-5xl mb-4 text-center">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#134686] mb-3 text-center">
                  {item.title}
                </h3>
                <p className="text-[#998767] text-center">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-[#FEB21A] hover:bg-[#e5a015] text-[#134686] px-12 py-4 rounded-lg text-xl font-bold shadow-2xl hover:shadow-[#FEB21A]/50 transition-all hover:scale-105">
              ดูชุดเช่าทั้งหมด
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 px-4" style={{ backgroundColor: '#FDF4E3' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#134686] mb-4">
              ความคิดเห็นจากลูกค้า
            </h2>
            <p className="text-lg text-[#998767]">
              ความลูกค้าของเราพูดถึงเราอย่างไร เรามีโอกาสได้มอบความสุขและความพึงพอใจให้กับทุกท่าน
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-4">💬</div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FEB21A] text-[#FEB21A]" />
                  ))}
                </div>
                <p className="text-[#134686] mb-4 text-sm leading-relaxed">
                  {testimonial.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#134686] flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#134686] text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-[#998767]">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-12 px-4 bg-[#134686]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          <div className="flex items-start gap-4">
            <Mail className="w-8 h-8 text-[#FEB21A] flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                รับข่าวสารและโปรโมชั่นพิเศษ
              </h2>
              <p className="text-[#E49D71] text-sm">
                สมัครรับจดหมายข่าวเพื่อรับส่วนลด 10% สำหรับการสั่งซื้อครั้งแรก
              </p>
            </div>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <input
              type="email"
              placeholder="กรอกอีเมลของคุณ"
              className="w-80 px-4 py-3 rounded-lg text-[#134686] bg-[#2c5282] border border-[#4A6FA5] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FEB21A]"
            />
            <button className="bg-[#FEB21A] hover:bg-[#e5a015] text-[#134686] px-8 py-3 rounded-lg font-bold transition whitespace-nowrap">
              สมัคร
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#134686] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">✨</span>
              <span className="text-xl font-bold">FASHION SHOP</span>
            </div>
            <p className="text-[#E49D71] text-sm mb-6 leading-relaxed">
              ร้านเสื้อผ้าแฟชั่นออนไลน์ที่ให้บริการจำหน่ายและเช่าชุดถีเอพา พร้อมส่งถือนขอเดส์ที่เมืองทั้งทุกใจ
            </p>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
                <Twitter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="font-bold mb-4 text-[#FEB21A]">เมนูด่วน</h3>
            <ul className="space-y-2 text-sm text-[#E49D71]">
              <li><a href="#" className="hover:text-[#FEB21A] transition">หน้าหลัก</a></li>
              <li><a href="#" className="hover:text-[#FEB21A] transition">สินค้าทั้งหมด</a></li>
              <li><a href="#" className="hover:text-[#FEB21A] transition">บริการเช่าชุด</a></li>
              <li><a href="#" className="hover:text-[#FEB21A] transition">โปรโมชั่น</a></li>
              <li><a href="#" className="hover:text-[#FEB21A] transition">เกี่ยวกับเรา</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4 text-[#FEB21A]">บริการลูกค้า</h3>
            <ul className="space-y-2 text-sm text-[#E49D71]">
              <li><a href="#" className="hover:text-[#FEB21A] transition">วิธีการสั่งซื้อ</a></li>
              <li><a href="#" className="hover:text-[#FEB21A] transition">การชำระเงิน</a></li>
              <li><a href="#" className="hover:text-[#FEB21A] transition">การจัดส่ง</a></li>
              <li><a href="#" className="hover:text-[#FEB21A] transition">นโยบายการคืนสินค้า</a></li>
              <li><a href="#" className="hover:text-[#FEB21A] transition">คำถามที่พบบ่อย</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 text-[#FEB21A]">ติดต่อเรา</h3>
            <ul className="space-y-3 text-sm text-[#E49D71]">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#FEB21A]" />
                <span>123 ถนนแฟชั่น แขวงสไตล์ เขตเทรนด์ กรุงเทพฯ 10110</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#FEB21A]" />
                <span>02-123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#FEB21A]" />
                <span>info@fashionshop.com</span>
              </li>
            </ul>
            <div className="mt-6 text-sm">
              <p className="font-semibold text-[#FEB21A] mb-2">เปิดให้บริการ</p>
              <p className="text-[#E49D71]">จันทร์ - ศุกร์: 9:00 - 18:00</p>
              <p className="text-[#E49D71]">เสาร์ - อาทิตย์: 10:00 - 17:00</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-[#E49D71]">© 2025 FASHION SHOP. สงวนลิขสิทธิ์ทั้งหมด.</p>
          <p className="text-[#E49D71]">Made with ❤️ in Thailand</p>
          <div className="flex gap-6 text-[#E49D71]">
            <a href="#" className="hover:text-[#FEB21A] transition">นโยบายความเป็นส่วนตัว</a>
            <a href="#" className="hover:text-[#FEB21A] transition">เงื่อนไขการใช้งาน</a>
          </div>
        </div>
      </footer>

      {/* Product Quick View Modal */}
      <ProductQuickView
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
        addToCart={(product, quantity) => {
          addToCart(product, quantity);
          setIsQuickViewOpen(false);
        }}
        toggleWishlist={toggleWishlist}
        isInWishlist={isInWishlist}
      />
    </div>
  );
}