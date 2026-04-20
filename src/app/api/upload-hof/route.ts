import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const month = formData.get("month") as string;
    const placement = formData.get("placement") as string;
    const year = formData.get("year") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define the file path
    const uploadDir = path.join(process.cwd(), "public/images/hall-of-fame", year, placement);
    const filePath = path.join(uploadDir, `${month.toLowerCase()}.png`);

    // Ensure the directory exists
    await import("fs").then((fs) => {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
    });

    // Save file to the folder
    await writeFile(filePath, buffer);

    return NextResponse.json({ 
      message: "File uploaded successfully", 
      filePath: `/images/hall-of-fame/${year}/${placement}/${month.toLowerCase()}.png` 
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
