'use client';

import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    { icon: '🛡️', text: '100% ปลอดภัย' },
    { icon: '🚚', text: 'ส่งฟรี' },
    { icon: '🔄', text: 'คืนเงินได้' },
    { icon: '⭐', text: '5 ดาว' },
  ];

  return (
    <div className="px-4 py-8 bg-gradient-to-r from-[#134686]/5 to-[#E49D71]/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.text}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="text-4xl mb-2">{badge.icon}</div>
              <p className="text-[#134686] font-medium text-sm">{badge.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
