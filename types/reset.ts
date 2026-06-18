export interface ResetCard {
  title: string;
  moodName: string;
  healingMessage: string;
  tinyAction: string;
  tonightReminder: string;
  storyText: string;
  hashtags: string[];
}

export interface Mood {
  id: string;
  label: string;
  emoji: string;
}

export const MOODS: Mood[] = [
  { id: "เหนื่อย", label: "เหนื่อย", emoji: "😮‍💨" },
  { id: "คิดมาก", label: "คิดมาก", emoji: "💭" },
  { id: "อยากเริ่มใหม่", label: "อยากเริ่มใหม่", emoji: "🌱" },
  { id: "อยากปล่อยวาง", label: "อยากปล่อยวาง", emoji: "🍃" },
  { id: "ก่อนนอน", label: "ก่อนนอน", emoji: "🌙" },
  { id: "กอดตัวเอง", label: "กอดตัวเอง", emoji: "🤍" },
];
