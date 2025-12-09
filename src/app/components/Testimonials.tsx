'use client';

import { motion } from 'motion/react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'สมหญิง',
      role: 'ลูกค้า',
      text: 'ชุดสวยมาก คุณภาพดี บริการดี ขอบคุณค่ะ',
      rating: 5,
    },
    {
      name: 'สมชาย',
      role: 'ลูกค้า',
      text: 'เช่าชุดราคาสมควร คืนเงินมัดจำได้เต็มจำนวน',
      rating: 5,
    },
    {
      name: 'นรา',
      role: 'ลูกค้า',
      text: 'ชอบการเลือกชุดหลากหลาย ส่งฟรีอีกด้วย',
      rating: 5,
    },
  ];

  return (
    <div className="px-4 py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl mb-4 text-[#134686]">รีวิวจากลูกค้า</h2>
          <p className="text-lg text-[#998767]">
            ความพึงพอใจของลูกค้าคือหลักการของเรา
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-[#F7EAD6] to-[#FDF4E3] p-8 rounded-lg border border-[#998767]/20 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-[#FEB21A] text-lg">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-[#134686] mb-6 text-lg">{testimonial.text}</p>
              <div>
                <p className="font-semibold text-[#134686]">{testimonial.name}</p>
                <p className="text-sm text-[#998767]">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
