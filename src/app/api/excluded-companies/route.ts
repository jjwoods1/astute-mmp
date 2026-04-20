import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { errorMessage } from "@/lib/errors";

const COLUMNS = "id, company, createdAt:created_at";

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("excluded_companies")
      .select(COLUMNS);
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching excluded companies:", error);
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { company } = await req.json();
    const { data, error } = await supabaseServer
      .from("excluded_companies")
      .insert({ company })
      .select(COLUMNS)
      .single();
    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Company already exists in exclusion list" },
          { status: 409 }
        );
      }
      throw error;
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error adding excluded company:", error);
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}
