import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://your-supabase-instance.supabase.co";
const supabaseKey = "your-supabase-key";

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    const { data } = await supabase.from("your-table-name").select("*");

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching data from Supabase:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
