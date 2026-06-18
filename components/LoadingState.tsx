"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const MESSAGES = [
  "กำลังค่อย ๆ เรียบเรียงใจให้เป็นคำ…",
  "กำลังหาประโยคเล็ก ๆ ที่ใจวันนี้อาจต้องการ…",
  "กำลังเตรียมพื้นที่พักใจให้คุณ…",
];

export default function LoadingState() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center gap-10 px-6 py-20"
    >
      {/* Breathing rings */}
      <div className="relative flex items-center justify-center w-24 h-24">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute rounded-full border border-stone-300/60"
            style={{ width: 28 + i * 22, height: 28 + i * 22 }}
            animate={{
              scale: [0.85, 1.15, 0.85],
              opacity: [0.6, 0.15, 0.6],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.55,
            }}
          />
        ))}

        {/* Center soft dot */}
        <motion.span
          className="w-2.5 h-2.5 rounded-full bg-stone-300"
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Cycling message */}
      <div className="h-7 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-sm text-stone-400 font-light text-center tracking-wide"
          >
            {MESSAGES[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
