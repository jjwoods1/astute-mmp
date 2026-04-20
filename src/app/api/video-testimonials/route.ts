import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { errorMessage } from "@/lib/errors";

const COLUMNS =
  "id, companyTag:company_tag, videoUrl:video_url, thumbnailUrl:thumbnail_url, fileSize:file_size, fileType:file_type, createdAt:created_at";

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("video_testimonials")
      .select(COLUMNS);
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching video testimonials:", error);
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { companyTag, videoUrl, thumbnailUrl, fileSize, fileType } =
      await req.json();

    const { data, error } = await supabaseServer
      .from("video_testimonials")
      .insert({
        company_tag: companyTag,
        video_url: videoUrl,
        thumbnail_url: thumbnailUrl,
        file_size: fileSize ?? null,
        file_type: fileType,
      })
      .select(COLUMNS)
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating video testimonial:", error);
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}
