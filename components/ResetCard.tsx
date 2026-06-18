"use client";
import { RefObject } from "react";
import { motion } from "framer-motion";
import type { ResetCard as ResetCardType } from "@/types/reset";
import CopyButton from "./CopyButton";
import SaveCardButton from "./SaveCardButton";

interface ResetCardProps {
  card: ResetCardType;
  cardRef: RefObject<HTMLDivElement | null>;
  onRegenerate: () => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
      staggerChildren: 0.11,
      delayChildren: 0.2,
    },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.35 } },
};

const section = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function ResetCard({ card, cardRef, onRegenerate }: ResetCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-sm mx-auto px-4 py-8 flex flex-col gap-5"
    >
      {/* Card */}
      <div
        ref={cardRef}
        className="relative bg-white rounded-3xl p-6 flex flex-col gap-5 shadow-[0_4px_32px_rgba(0,0,0,0.07)] border border-[#EFE9E2] overflow-hidden"
      >
        {/* Warm gradient wash at top of card */}
        <div
          className="absolute inset-x-0 top-0 h-24 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(245,221,208,0.18) 0%, transparent 100%)",
          }}
        />

        {/* Decorative top ornament */}
        <motion.div variants={section} className="flex justify-center pt-1">
          <span className="text-stone-200 text-xs tracking-[0.3em]">✦ ✦ ✦</span>
        </motion.div>

        {/* Mood badge + title */}
        <motion.div variants={section} className="flex flex-col gap-2.5">
          <span className="self-start px-3 py-1 rounded-full bg-[#F7F4F0] text-xs text-stone-400 font-light border border-[#EBE5DD]">
            {card.moodName}
          </span>
          <h2 className="text-xl font-light text-stone-700 leading-snug tracking-wide">
            {card.title}
          </h2>
        </motion.div>

        <motion.div variants={section}><Divider /></motion.div>

        {/* Healing message */}
        <motion.p
          variants={section}
          className="text-sm text-stone-600 leading-[1.95] font-light"
        >
          {card.healingMessage}
        </motion.p>

        <motion.div variants={section}><Divider /></motion.div>

        {/* Actions */}
        <motion.div variants={section} className="flex flex-col gap-3.5">
          <ActionRow icon="✦" label="ลองทำ" text={card.tinyAction} />
          <ActionRow icon="◌" label="คืนนี้" text={card.tonightReminder} />
        </motion.div>

        <motion.div variants={section}><Divider /></motion.div>

        {/* Story */}
        <motion.p
          variants={section}
          className="text-xs text-stone-400 leading-[2] italic font-light"
        >
          {card.storyText}
        </motion.p>

        {/* Hashtags */}
        <motion.div variants={section} className="flex flex-wrap gap-1.5">
          {card.hashtags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] text-stone-400 bg-[#F7F4F0] px-2.5 py-1 rounded-full border border-[#EBE5DD]"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Branding */}
        <motion.p
          variants={section}
          className="text-[10px] text-stone-300 text-right"
        >
          — Soft Reset 🌿
        </motion.p>
      </div>

      {/* Action buttons */}
      <motion.div
        variants={section}
        className="flex flex-wrap justify-center gap-2.5"
      >
        <CopyButton card={card} />
        <SaveCardButton cardRef={cardRef} />
      </motion.div>

      {/* Regenerate */}
      <motion.div variants={section} className="flex justify-center">
        <motion.button
          onClick={onRegenerate}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="text-sm text-stone-400 hover:text-stone-600 transition-colors underline underline-offset-4 font-light cursor-pointer"
        >
          ลองอีกครั้ง / เลือกใหม่
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-px bg-[#F0EAE2]" />
      <span className="text-[#E8DDD4] text-[9px] tracking-widest">✦</span>
      <div className="flex-1 h-px bg-[#F0EAE2]" />
    </div>
  );
}

function ActionRow({
  icon,
  label,
  text,
}: {
  icon: string;
  label: string;
  text: string;
}) {
  return (
    <div className="flex gap-3 items-start">
      <span className="text-stone-300 text-xs mt-0.5 shrink-0 w-3 text-center">
        {icon}
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] text-stone-300 uppercase tracking-[0.15em]">
          {label}
        </span>
        <span className="text-sm text-stone-600 font-light leading-relaxed">
          {text}
        </span>
      </div>
    </div>
  );
}
