import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { errorMessage } from "@/lib/errors";

const COLUMNS =
  "id, name, logoUrl:logo_url, companyTag:company_tag, hasWrittenTestimonial:has_written_testimonial, createdAt:created_at";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hasWrittenTestimonial = searchParams.get("hasWrittenTestimonial");

    let query = supabaseServer.from("companies").select(COLUMNS);
    if (hasWrittenTestimonial === "true") {
      query = query.eq("has_written_testimonial", true);
    }

    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, logoUrl, companyTag, hasWrittenTestimonial } = await req.json();
    const { data, error } = await supabaseServer
      .from("companies")
      .insert({
        name,
        logo_url: logoUrl,
        company_tag: companyTag,
        has_written_testimonial: hasWrittenTestimonial ?? false,
      })
      .select(COLUMNS)
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating company:", error);
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}
