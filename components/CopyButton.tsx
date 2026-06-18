"use client";
import { useState } from "react";
import type { ResetCard } from "@/types/reset";

interface CopyButtonProps {
  card: ResetCard;
}

function buildCopyText(card: ResetCard): string {
  return [
    card.title,
    "",
    card.healingMessage,
    "",
    `✦ ${card.tinyAction}`,
    `✦ ${card.tonightReminder}`,
    "",
    card.storyText,
    "",
    card.hashtags.join(" "),
    "",
    "— Soft Reset 🌿",
  ].join("\n");
}

export default function CopyButton({ card }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildCopyText(card));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#EBE5DD] bg-[#FDFCFA] text-stone-500 text-sm font-light hover:bg-[#F7F4F0] transition-colors cursor-pointer"
    >
      {copied ? (
        <>
          <span className="text-stone-400">✓</span>
          คัดลอกแล้ว
        </>
      ) : (
        <>
          <span>⎘</span>
          คัดลอกข้อความ
        </>
      )}
    </button>
  );
}
