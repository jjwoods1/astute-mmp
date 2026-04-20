import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { errorMessage } from "@/lib/errors";

const COLUMNS =
  "id, name, logoUrl:logo_url, companyTag:company_tag, hasWrittenTestimonial:has_written_testimonial, createdAt:created_at";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ companyTag: string }> }
) {
  try {
    const { companyTag } = await params;
    const { data, error } = await supabaseServer
      .from("companies")
      .select(COLUMNS)
      .eq("company_tag", companyTag)
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching company:", error);
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ companyTag: string }> }
) {
  try {
    const { companyTag } = await params;
    const body = await req.json();

    const update: Record<string, unknown> = {};
    if ("name" in body) update.name = body.name;
    if ("logoUrl" in body) update.logo_url = body.logoUrl;
    if ("companyTag" in body) update.company_tag = body.companyTag;
    if ("hasWrittenTestimonial" in body)
      update.has_written_testimonial = body.hasWrittenTestimonial;

    const { data, error } = await supabaseServer
      .from("companies")
      .update(update)
      .eq("company_tag", companyTag)
      .select(COLUMNS)
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating company:", error);
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}
