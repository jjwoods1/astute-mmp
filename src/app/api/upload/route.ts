import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

// Define storage paths
const videoStorage = path.join(process.cwd(), "public/Client-Testimonial-Videos/");
const thumbnailStorage = path.join(process.cwd(), "public/images/Video-Testimonial-Images/");

// ✅ Ensure the directory exists before saving files
async function ensureDirectory(directory: string) {
  try {
    await fs.mkdir(directory, { recursive: true });
  } catch (error) {
    console.error(`Error creating directory (${directory}):`, error);
    throw new Error("Directory creation failed");
  }
}

// ✅ Function to sanitize company tag for filenames
function sanitizeFilename(name: string) {
  return name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_]/g, "");
}

// ✅ Function to save files securely
async function saveFile(file: File, folder: string, companyTag: string) {
  try {
    await ensureDirectory(folder);

    const buffer = Buffer.from(await file.arrayBuffer());
    const sanitizedCompanyTag = sanitizeFilename(companyTag);
    const uniqueFilename = `${sanitizedCompanyTag}-${Date.now()}${path.extname(file.name)}`;
    const filePath = path.join(folder, uniqueFilename);

    await fs.writeFile(filePath, buffer);

    // ✅ Return relative path with a leading `/`
    return `/${path.relative(path.join(process.cwd(), "public"), filePath).replace(/\\/g, "/")}`;
  } catch (error) {
    console.error("Error saving file:", error);
    throw new Error("File upload failed");
  }
}

// 📌 **POST Route (Handles File Uploads)**
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    if (!formData) {
      return NextResponse.json({ message: "No form data received" }, { status: 400 });
    }

    const companyTag = formData.get("companyTag") as string;
    const video = formData.get("video") as File;
    const thumbnail = formData.get("thumbnail") as File;

    if (!video || !thumbnail || !companyTag) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // ✅ Save files to correct directories
    const videoPath = await saveFile(video, videoStorage, companyTag);
    const thumbnailPath = await saveFile(thumbnail, thumbnailStorage, companyTag);

    return NextResponse.json(
      {
        videoUrl: videoPath, // ✅ Correct format with leading `/`
        thumbnailUrl: thumbnailPath, // ✅ Correct format with leading `/`
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ message: "Upload failed", error: error.message }, { status: 500 });
  }
}

// 📌 **GET Route for API Testing**
export async function GET() {
  return NextResponse.json({ message: "API is working!" }, { status: 200 });
}
