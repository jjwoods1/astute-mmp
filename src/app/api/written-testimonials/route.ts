import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { errorMessage } from "@/lib/errors";

const COLUMNS =
  "id, companyTag:company_tag, companyName:company_name, testimonialText:testimonial_text, authorName:author_name, authorPosition:author_position, testimonialImageUrl:testimonial_image_url, testimonialDate:testimonial_date, createdAt:created_at";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const companyTag = searchParams.get("companyTag");

    let query = supabaseServer.from("written_testimonials").select(COLUMNS);
    if (companyTag) query = query.eq("company_tag", companyTag);

    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching written testimonials:", error);
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      companyName,
      companyTag,
      testimonialDate,
      testimonialImageUrl,
      testimonialText,
      authorName,
      authorPosition,
    } = await req.json();

    const { data, error } = await supabaseServer
      .from("written_testimonials")
      .insert({
        company_name: companyName,
        company_tag: companyTag,
        testimonial_date: testimonialDate,
        testimonial_image_url: testimonialImageUrl,
        testimonial_text: testimonialText,
        author_name: authorName,
        author_position: authorPosition,
      })
      .select(COLUMNS)
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating written testimonial:", error);
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}
