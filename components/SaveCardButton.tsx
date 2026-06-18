"use client";
import { RefObject, useState } from "react";
import { toPng } from "html-to-image";

interface SaveCardButtonProps {
  cardRef: RefObject<HTMLDivElement | null>;
}

export default function SaveCardButton({ cardRef }: SaveCardButtonProps) {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!cardRef.current || saving) return;
    setSaving(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#FDFCFA",
      });
      const link = document.createElement("a");
      link.download = "soft-reset.png";
      link.href = dataUrl;
      link.click();
    } catch {
      // save failed silently
    } finally {
      setSaving(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={saving}
      className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#EBE5DD] bg-[#FDFCFA] text-stone-500 text-sm font-light hover:bg-[#F7F4F0] transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
    >
      {saving ? "กำลังบันทึก…" : (
        <>
          <span>↓</span>
          บันทึกเป็นรูป
        </>
      )}
    </button>
  );
}
