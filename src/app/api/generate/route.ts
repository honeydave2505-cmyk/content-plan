import { NextRequest, NextResponse } from "next/server";
import { generateContent } from "@/lib/content-generator";
import type { GenerateRequest } from "@/types";

/**
 * POST /api/generate
 *
 * Accepts a JSON body matching `GenerateRequest` and returns AI-generated content.
 *
 * In production this would forward the request to an AI provider (OpenAI, Gemini, etc.).
 * The current implementation uses the local template engine for demonstration.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as GenerateRequest;

    if (!body.niche || !body.platform) {
      return NextResponse.json(
        { error: "Missing required fields: niche and platform" },
        { status: 400 }
      );
    }

    const content = generateContent(body);
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
