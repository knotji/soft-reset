import { NextRequest, NextResponse } from "next/server";
import { generateResetCard } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mood, feeling } = body;

    if (!mood || typeof mood !== "string" || mood.trim().length === 0) {
      return NextResponse.json({ error: "mood is required" }, { status: 400 });
    }

    if (mood.length > 50) {
      return NextResponse.json({ error: "mood is too long" }, { status: 400 });
    }

    if (feeling !== undefined && feeling !== null) {
      if (typeof feeling !== "string") {
        return NextResponse.json(
          { error: "feeling must be a string" },
          { status: 400 }
        );
      }
      if (feeling.length > 300) {
        return NextResponse.json(
          { error: "feeling is too long (max 300 characters)" },
          { status: 400 }
        );
      }
    }

    const card = await generateResetCard(
      mood.trim(),
      feeling && typeof feeling === "string" ? feeling.trim() || undefined : undefined
    );

    return NextResponse.json(card);
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
