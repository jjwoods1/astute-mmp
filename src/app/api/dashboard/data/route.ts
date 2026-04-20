import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("excluded_companies")
      .select("company");
    if (error) throw error;

    return NextResponse.json({
      authenticated: true,
      excludedCompanies: (data ?? []).map((c) => c.company),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
