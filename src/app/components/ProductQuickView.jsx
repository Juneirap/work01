'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingCart, Sparkles } from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { toast } from 'sonner';

export default function ProductQuickView({
  product,
  isOpen,
  onClose,
  addToCart,
  toggleWishlist,
  isInWishlist,
}) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(() => isInWishlist?.(product.id) ?? false);

  const discountedPrice = product.discount
    ? Math.floor(product.price * (1 - product.discount / 100))
    : product.price;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden"
          >
            <div className="flex h-full">
              {/* Image Section */}
              <div className="w-1/2 bg-gray-100 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all"
                >
                  <X className="h-5 w-5 text-[#134686]" />
                </button>
                {product.discount && (
                  <Badge className="absolute top-4 left-4 bg-[#ED3F27] text-base px-3 py-1">
                    -{product.discount}%
                  </Badge>
                )}
              </div>

              {/* Content Section */}
              <div className="w-1/2 p-8 flex flex-col">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-[#134686] mb-4">
                    {product.name}
                  </h2>

                  {/* Price */}
                  <div className="mb-6">
                    {product.discount ? (
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold text-[#ED3F27]">
                          ฿{discountedPrice.toLocaleString()}
                        </span>
                        <span className="text-lg text-[#998767] line-through">
                          ฿{product.price.toLocaleString()}
                        </span>
                      </div>
                    ) : (
                      <span className="text-3xl font-bold text-[#ED3F27]">
                        ฿{product.price.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-2 mb-6">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${
                              i < Math.floor(product.rating || 0)
                                ? 'text-[#FEB21A]'
                                : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-[#998767]">
                        {product.rating} ({product.reviews} รีวิว)
                      </span>
                    </div>
                  )}

                  {/* Badges */}
                  <div className="flex gap-2 mb-6">
                    {product.isNew && (
                      <Badge className="bg-[#FEB21A] text-[#134686]">ใหม่</Badge>
                    )}
                    {product.isRental && (
                      <Badge className="bg-[#134686]">
                        <Sparkles className="h-3 w-3 mr-1" />
                        เช่าได้
                      </Badge>
                    )}
                  </div>

                  {/* Description */}
                  {product.description && (
                    <p className="text-sm text-[#998767] mb-6 leading-relaxed">
                      {product.description}
                    </p>
                  )}

                  {/* Product Info */}
                  <div className="space-y-2 mb-6 text-sm text-[#998767]">
                    <div className="flex items-center gap-2">
                      <span>📦</span>
                      <span>หมวดหมู่: เสื้อผ้า</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span>เพศ: ชายหญิง</span>
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-[#134686] mb-2">
                      ขนาด
                    </label>
                    <div className="flex gap-2">
                      {['S', 'M', 'L', 'XL'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-10 h-10 rounded-lg font-semibold transition ${
                            selectedSize === size
                              ? 'bg-[#134686] text-white'
                              : 'border-2 border-[#134686] text-[#134686] hover:bg-[#134686]/10'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-[#134686] mb-2">
                      จำนวน
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 border-2 border-[#134686] rounded-lg flex items-center justify-center text-[#134686] hover:bg-[#134686] hover:text-white transition"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-lg font-semibold text-[#134686]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 border-2 border-[#134686] rounded-lg flex items-center justify-center text-[#134686] hover:bg-[#134686] hover:text-white transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Rental Info */}
                  {product.isRental && product.deposit && (
                    <p className="text-sm text-[#998767] mb-6">
                      มัดจำ ฿{product.deposit.toLocaleString()}
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <div className="space-y-3 pt-6 border-t border-[#998767]/20">
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        addToCart(product);
                        toast.success('เพิ่มลงตะกร้าแล้ว!');
                        onClose();
                      }}
                      className="flex-1 bg-[#134686] hover:bg-[#0f3a6e] text-white"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      เพิ่มลงตะกร้า
                    </Button>
                    <button
                      onClick={() => {
                        toggleWishlist(product);
                        setIsFavorite(!isFavorite);
                      }}
                      className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition ${
                        isFavorite
                          ? 'bg-[#FEB21A] border-[#FEB21A] text-white'
                          : 'border-[#134686] text-[#134686] hover:bg-[#134686]/10'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-white' : ''}`} />
                    </button>
                  </div>
                  {product.isRental && (
                    <Button
                      onClick={() => {
                        addToCart(product, true, 3);
                        toast.success('เพิ่มการเช่าลงตะกร้าแล้ว!');
                        onClose();
                      }}
                      className="w-full bg-[#FEB21A] hover:bg-[#e5a015] text-[#134686]"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      เช่าชุด
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
