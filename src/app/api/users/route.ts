import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { errorMessage } from "@/lib/errors";

const COLUMNS = "id, email, role, createdAt:created_at";

export async function GET() {
  try {
    const { data, error } = await supabaseServer.from("users").select(COLUMNS);
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, role } = await req.json();
    const { data, error } = await supabaseServer
      .from("users")
      .insert({ email, role })
      .select(COLUMNS)
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}
