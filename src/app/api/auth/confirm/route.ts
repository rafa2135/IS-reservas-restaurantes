// src/app/api/auth/confirm/route.ts
//this is a dissaster have to fix this
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/app/util/supabase/server";

export async function GET(request: NextRequest) {
  console.log("GET /api/auth/confirm");
  const url = new URL(request.url);
  const token_hash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;

  if (!token_hash || !type) {
    return NextResponse.json(
      { success: false, error: "Missing token or type" },
      { status: 400 }
    );
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (error) {
      console.log("❌ supabase.verifyOtp error:", error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    console.log("✅ verified!");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("🔥 unexpected error in confirm route:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
