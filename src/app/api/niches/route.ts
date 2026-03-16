import { NextResponse } from "next/server";
import { NICHES } from "@/lib/niches";

/**
 * GET /api/niches
 *
 * Returns the list of supported content niches.
 */
export async function GET() {
  return NextResponse.json({ niches: NICHES });
}
