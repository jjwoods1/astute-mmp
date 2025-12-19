import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { supabase } from "@/lib/supabase";

const thumbnailStoragePath = path.join(process.cwd(), "public/images/Written-Testimonial-Images/");

async function ensureDirectoryExists() {
  await fs.mkdir(thumbnailStoragePath, { recursive: true });
}

// Handle GET requests (for testing)
export async function GET() {
  return NextResponse.json({ message: "API is working! Use POST to upload testimonials." }, { status: 200 });
}

// Handle POST requests (for uploads)
export async function POST(req: NextRequest) {
  try {
    await ensureDirectoryExists();

    const formData = await req.formData();
    const companyName = formData.get("companyName") as string;
    const testimonial = formData.get("testimonial") as string;
    const authorName = formData.get("authorName") as string;
    const authorPosition = formData.get("authorPosition") as string;
    const thumbnail = formData.get("thumbnail") as File;

    if (!companyName || !testimonial || !authorName || !thumbnail) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Save Thumbnail to Local Project
    const fileName = `${companyName.replace(/\s+/g, "-")}-${Date.now()}${path.extname(thumbnail.name)}`;
    const filePath = path.join(thumbnailStoragePath, fileName);
    const buffer = Buffer.from(await thumbnail.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    const thumbnailUrl = `/images/Written-Testimonial-Images/${fileName}`;

    // Store Data in Supabase
    const { error } = await supabase
      .from('written_testimonials')
      .insert({
        company_name: companyName,
        company_tag: companyName,
        testimonial_text: testimonial,
        author_name: authorName,
        author_position: authorPosition,
        testimonial_image_url: thumbnailUrl,
      });

    if (error) throw error;

    return NextResponse.json({ message: "Success", thumbnailUrl }, { status: 200 });

  } catch (error: any) {
    console.error("Supabase Error:", error);
    return NextResponse.json({ message: "Upload failed", error: error.message }, { status: 500 });
  }
}
