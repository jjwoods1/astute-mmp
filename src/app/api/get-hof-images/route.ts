import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(req: NextRequest) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const year = searchParams.get("year");

    if (!year) {
      return NextResponse.json({ error: "Year is required" }, { status: 400 });
    }

    const basePath = path.join(process.cwd(), "public/images/hall-of-fame", year);
    const existingImages: Record<string, string> = {};

    if (fs.existsSync(basePath)) {
      const placements = fs.readdirSync(basePath);

      placements.forEach((placement) => {
        const placementPath = path.join(basePath, placement);
        if (fs.existsSync(placementPath)) {
          const files = fs.readdirSync(placementPath);
          files.forEach((file) => {
            if (file.endsWith(".png")) {
              const month = file.replace(".png", "").toLowerCase();
              // Correct file path (Next.js serves public/ files via "/")
              existingImages[`${month}-${placement}`] = `/images/hall-of-fame/${year}/${placement}/${file}?t=${Date.now()}`;
            }
          });
        }
      });
    }

    return NextResponse.json(existingImages);
  } catch (error) {
    console.error("Error retrieving images:", error);
    return NextResponse.json({ error: "Failed to retrieve images" }, { status: 500 });
  }
}
