"use client";

interface FeelingInputProps {
  value: string;
  onChange: (val: string) => void;
}

const MAX = 200;

export default function FeelingInput({ value, onChange }: FeelingInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-stone-400 tracking-wide">
        อยากบอกอะไรเพิ่มไหม? <span className="text-stone-300">(ไม่บังคับ)</span>
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, MAX))}
        placeholder="เช่น วันนี้เหนื่อยมาก ไม่รู้จะเริ่มต้นจากตรงไหน…"
        rows={3}
        className="
          w-full resize-none rounded-2xl border border-[#EBE5DD] bg-[#FDFCFA]
          px-4 py-3 text-sm text-stone-600 placeholder-stone-300
          focus:outline-none focus:ring-1 focus:ring-stone-300 focus:border-stone-300
          leading-relaxed transition-colors
        "
      />
      <p className="text-right text-[11px] text-stone-300">
        {value.length}/{MAX}
      </p>
    </div>
  );
}
