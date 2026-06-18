"use client";
import { motion } from "framer-motion";

interface HeroProps {
  onStart: () => void;
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function Hero({ onStart }: HeroProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center justify-center text-center px-6 py-16 max-w-sm mx-auto gap-7"
    >
      {/* Decorative badge */}
      <motion.div variants={item}>
        <motion.span
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-[#EBE5DD] text-[11px] text-stone-400 tracking-widest shadow-sm"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          ✦ &nbsp;Soft Reset&nbsp; ✦
        </motion.span>
      </motion.div>

      {/* Main title */}
      <motion.div variants={item} className="flex flex-col gap-1.5">
        <h1 className="text-[1.8rem] font-light leading-[1.55] text-stone-700 tracking-wide">
          วันนี้ใจเหนื่อยแค่ไหน
        </h1>
        <h1 className="text-[1.8rem] font-extralight leading-[1.55] text-stone-400 tracking-wide">
          ไม่ต้องตอบให้เก่งก็ได้
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        variants={item}
        className="text-sm text-stone-500 leading-[1.9] max-w-[265px] font-light"
      >
        เลือกความรู้สึกสั้น ๆ แล้วให้ Soft Reset
        <br />
        เขียนข้อความเล็ก ๆ ไว้กอดใจคุณวันนี้
      </motion.p>

      {/* CTA with pulse glow */}
      <motion.div variants={item} className="relative mt-1">
        {/* Pulse ring */}
        <motion.span
          className="absolute inset-0 rounded-full bg-stone-400/20"
          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={onStart}
          className="relative px-9 py-3.5 rounded-full bg-stone-700 text-stone-50 text-sm font-medium tracking-widest hover:bg-stone-800 transition-colors shadow-md cursor-pointer"
        >
          รีเซ็ตใจเบา ๆ
        </motion.button>
      </motion.div>

      {/* Disclaimer */}
      <motion.p
        variants={item}
        className="text-[11px] text-stone-400 leading-relaxed max-w-[285px]"
      >
        เว็บไซต์นี้สร้างขึ้นเพื่อความบันเทิงและการดูแลใจเบื้องต้น
        <br />
        ไม่ใช่คำแนะนำทางการแพทย์หรือการประเมินสุขภาพจิต
      </motion.p>
    </motion.div>
  );
}
