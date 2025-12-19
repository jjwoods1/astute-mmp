import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { promisify } from "util";

// Convert callback-based functions to Promises
const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);

// ✅ Handle POST request for file upload
export async function POST(req: NextRequest) {
  try {
    // Ensure the request is a form-data upload
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const filePath = formData.get("filePath") as string;

    if (!file || !filePath) {
      return NextResponse.json({ success: false, message: "Missing file or filePath" }, { status: 400 });
    }

    // ✅ Define the full local file path directly in `/public/images/`
    const publicDir = path.join(process.cwd(), "public", "images");
    const fullPath = path.join(publicDir, filePath);

    // ✅ Ensure the directory exists
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      await mkdirAsync(dir, { recursive: true });
    }

    // ✅ Convert file data to Buffer and save
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFileAsync(fullPath, buffer);

    return NextResponse.json({ success: true, filePath: `/images/${filePath}` }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, message: "File upload failed" }, { status: 500 });
  }
}
