"use client";
import { motion } from "framer-motion";
import { MOODS } from "@/types/reset";

interface MoodSelectorProps {
  selected: string | null;
  onSelect: (mood: string) => void;
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const chipItem = {
  hidden: { opacity: 0, scale: 0.92, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

export default function MoodSelector({ selected, onSelect }: MoodSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-stone-400 text-center tracking-wide">
        วันนี้รู้สึกยังไงบ้าง?
      </p>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-2.5"
      >
        {MOODS.map((mood) => {
          const isSelected = selected === mood.id;
          return (
            <motion.button
              key={mood.id}
              variants={chipItem}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelect(mood.id)}
              className={`
                relative px-4 py-3 rounded-2xl text-sm font-light tracking-wide
                border transition-all duration-300 cursor-pointer
                flex items-center justify-center gap-2
                ${
                  isSelected
                    ? "bg-stone-700 text-stone-50 border-stone-700 shadow-[0_4px_20px_rgba(68,56,49,0.25)]"
                    : "bg-white/60 backdrop-blur-sm text-stone-600 border-[#EBE5DD] hover:bg-white/80 hover:border-stone-300 hover:shadow-sm"
                }
              `}
            >
              {/* Selected glow */}
              {isSelected && (
                <motion.span
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 70%)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <span className="text-base leading-none">{mood.emoji}</span>
              <span className="relative z-10">{mood.label}</span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
