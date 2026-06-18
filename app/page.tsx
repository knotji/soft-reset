"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "@/components/Hero";
import MoodSelector from "@/components/MoodSelector";
import FeelingInput from "@/components/FeelingInput";
import LoadingState from "@/components/LoadingState";
import ResetCard from "@/components/ResetCard";
import type { ResetCard as ResetCardType } from "@/types/reset";

type Step = "hero" | "select" | "loading" | "result";

const BLOBS = [
  { color: "#F5DDD0", size: 340, top: "2%", left: "-12%", duration: 14, delay: 0 },
  { color: "#D4E8EC", size: 260, bottom: "5%", right: "-8%", duration: 18, delay: 2 },
  { color: "#EDE0D4", size: 200, top: "45%", left: "55%", duration: 20, delay: 5 },
  { color: "#E8DFF0", size: 180, top: "20%", right: "15%", duration: 16, delay: 3 },
];

export default function Home() {
  const [step, setStep] = useState<Step>("hero");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [feeling, setFeeling] = useState("");
  const [result, setResult] = useState<ResetCardType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!selectedMood) return;
    setError(null);
    setStep("loading");

    try {
      const res = await fetch("/api/generate-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood: selectedMood,
          feeling: feeling.trim() || undefined,
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data: ResetCardType = await res.json();
      setResult(data);
      setStep("result");
    } catch {
      setError("เกิดข้อผิดพลาด ลองใหม่อีกครั้งนะ");
      setStep("select");
    }
  };

  const handleRegenerate = () => {
    setResult(null);
    setError(null);
    setStep("select");
  };

  return (
    <main className="relative min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center py-10 px-4 overflow-hidden">

      {/* Floating bokeh blobs */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        {BLOBS.map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: b.size,
              height: b.size,
              backgroundColor: b.color,
              filter: "blur(72px)",
              opacity: 0.35,
              top: b.top,
              left: b.left,
              bottom: (b as { bottom?: string }).bottom,
              right: (b as { right?: string }).right,
            }}
            animate={{
              x: [0, i % 2 === 0 ? 28 : -22, 0],
              y: [0, i % 2 === 0 ? 18 : 28, 0],
            }}
            transition={{
              duration: b.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: b.delay,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === "hero" && (
          <Hero key="hero" onStart={() => setStep("select")} />
        )}

        {step === "select" && (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-sm mx-auto flex flex-col gap-6 px-1 py-8"
          >
            <motion.div
              className="flex flex-col gap-1 text-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-lg font-light text-stone-600 tracking-wide">
                วันนี้ใจเป็นยังไงบ้าง?
              </h2>
              <p className="text-xs text-stone-400">เลือกได้หนึ่งอย่าง</p>
            </motion.div>

            <MoodSelector selected={selectedMood} onSelect={setSelectedMood} />
            <FeelingInput value={feeling} onChange={setFeeling} />

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-rose-400 text-center"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              onClick={handleGenerate}
              disabled={!selectedMood}
              whileTap={selectedMood ? { scale: 0.97 } : {}}
              className="
                w-full py-3.5 rounded-full bg-stone-700 text-stone-50 text-sm
                font-medium tracking-wider hover:bg-stone-800 transition-colors
                disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer
                shadow-sm
              "
            >
              รับข้อความกอดใจ
            </motion.button>

            <button
              onClick={() => setStep("hero")}
              className="text-xs text-stone-400 hover:text-stone-500 text-center underline underline-offset-4 cursor-pointer transition-colors"
            >
              กลับหน้าแรก
            </button>
          </motion.div>
        )}

        {step === "loading" && <LoadingState key="loading" />}

        {step === "result" && result && (
          <ResetCard
            key="result"
            card={result}
            cardRef={cardRef}
            onRegenerate={handleRegenerate}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
