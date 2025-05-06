// pages/api/auth/confirm.ts
// This API route handles the confirmation of email using Supabase.
//the user gets a email with a link to confirm their email.
// It verifies the token and redirects the user to the specified URL.
//redirectionar a /auth/confirmimport { NextApiRequest, NextApiResponse } from 'next';

import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token, type } = req.query;
  // Ensure token and type are strings
  if (typeof token !== "string") {
    return res.redirect(302, `/auth/confirm?error=Invalid token or type`);
  }
  try {
    const { error } = await supabase.auth.verifyOtp({ token, type });
    if (error) {
      console.error("Verification failed:", error.message);
      return res.redirect(302, `/auth/confirm?error=${error.message}`);
    }

    console.log("Verification successful");
    return res.redirect(302, "/auth/confirm?success=true");
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
