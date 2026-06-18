import { GoogleGenAI } from "@google/genai";
import type { ResetCard } from "@/types/reset";

const FALLBACK: ResetCard = {
  title: "วันนี้ไม่ต้องเก่งก็ได้",
  moodName: "ใจที่ต้องการพัก",
  healingMessage:
    "บางทีใจก็ต้องการพื้นที่เงียบ ๆ สักนิด ไม่ต้องรีบหายเหนื่อย ค่อย ๆ หายใจไปพร้อมกันนะ วันนี้แค่นี้ก็ดีมากแล้ว",
  tinyAction: "ดื่มน้ำอุ่นสักแก้ว แล้วนั่งเงียบ ๆ สัก 2 นาที",
  tonightReminder: "คืนนี้อนุญาตให้ตัวเองพักได้เต็มที่ ไม่ต้องคิดอะไรมาก",
  storyText:
    "วันที่ใจหนักบางครั้งก็ไม่ต้องการคำตอบ แค่รู้ว่ามีใครสักคนรู้สึกเห็นเราก็พอแล้ว วันนี้เราเห็นนะ",
  hashtags: [
    "#SoftReset",
    "#ใจต้องการพัก",
    "#วันนี้ก็โอเค",
    "#ค่อยๆดีขึ้น",
    "#พื้นที่ปลอดภัย",
  ],
};

const SYSTEM_INSTRUCTION = `คุณคือผู้ช่วยดูแลใจที่อบอุ่นและเข้าใจ พูดเป็นภาษาไทยเท่านั้น
ตอบในรูปแบบ JSON ตาม schema นี้เท่านั้น ห้ามเพิ่มข้อความนอก JSON:
{
  "title": "หัวข้อสั้น ๆ กระชับ ไม่เกิน 15 คำ",
  "moodName": "ชื่อความรู้สึกที่นุ่มนวล เช่น 'ใจที่เหนื่อยล้า'",
  "healingMessage": "ข้อความปลอบใจ 2-3 ประโยค อบอุ่นและจริงใจ",
  "tinyAction": "กิจกรรมเล็ก ๆ ที่ทำได้ทันที 1 อย่าง ไม่ซับซ้อน",
  "tonightReminder": "ข้อความสั้น ๆ อบอุ่นสำหรับก่อนนอน",
  "storyText": "เรื่องเล่าสั้น ๆ อบอุ่น 2-3 ประโยค เชื่อมกับความรู้สึกของผู้ใช้",
  "hashtags": ["แฮชแท็กภาษาไทย 5 อัน"]
}

กฎสำคัญ:
- ใช้ภาษาไทยเท่านั้น
- อบอุ่น นุ่มนวล จริงใจ ไม่เสแสร้ง ไม่เป็นทางการ
- ใช้คำอ่อน ๆ เช่น "บางที", "วันนี้", "อาจจะ", "ค่อย ๆ", "นะ"
- ห้ามวินิจฉัยสุขภาพจิตหรืออ้างอิงทางการแพทย์
- ห้ามพูดถึงความซึมเศร้า การทำร้ายตัวเอง หรือการสิ้นหวัง
- ห้ามบอกว่าผู้ใช้เป็นอะไรอย่างแน่นอน
- ห้าม toxic positivity หรือบอกให้ไม่สนใจความรู้สึก
- ข้อความควรสั้น กระชับ แชร์ได้ รู้สึกอบอุ่นเหมือนเพื่อนเขียนให้`;

export async function generateResetCard(
  mood: string,
  feeling?: string
): Promise<ResetCard> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return FALLBACK;

  try {
    const ai = new GoogleGenAI({ apiKey });

    const userMessage = feeling
      ? `ความรู้สึกของฉันตอนนี้: ${mood}\nสิ่งที่อยากบอกเพิ่มเติม: ${feeling}`
      : `ความรู้สึกของฉันตอนนี้: ${mood}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) return FALLBACK;

    const data = JSON.parse(text) as ResetCard;

    if (
      !data.title ||
      !data.healingMessage ||
      !Array.isArray(data.hashtags)
    ) {
      return FALLBACK;
    }

    return data;
  } catch {
    return FALLBACK;
  }
}
