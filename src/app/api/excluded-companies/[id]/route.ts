import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { errorMessage } from "@/lib/errors";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { error } = await supabaseServer
      .from("excluded_companies")
      .delete()
      .eq("id", parseInt(id));
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting excluded company:", error);
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}
