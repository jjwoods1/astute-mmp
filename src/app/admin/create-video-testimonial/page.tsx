"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Button, Card, SectionHeader } from "@/components/ui";
import { FadeIn } from "@/components/motion";
import { errorMessage } from "@/lib/errors";

const MAX_VIDEO_MB = 500;
const MAX_IMAGE_MB = 10;

export default function CreateVideoTestimonialPage() {
  const router = useRouter();

  const [companyTag, setCompanyTag] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);
  const [previewThumbnail, setPreviewThumbnail] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    if (file.size > MAX_VIDEO_MB * 1024 * 1024) {
      toast.error(`Video must be under ${MAX_VIDEO_MB}MB`);
      return;
    }
    setVideoFile(file);
    setPreviewVideo(URL.createObjectURL(file));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      toast.error(`Image must be under ${MAX_IMAGE_MB}MB`);
      return;
    }
    setThumbnailFile(file);
    setPreviewThumbnail(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !thumbnailFile || !companyTag.trim()) {
      toast.error("All fields are required.");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("companyTag", companyTag);
      formData.append("video", videoFile);
      formData.append("thumbnail", thumbnailFile);

      const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
      if (!uploadRes.ok) throw new Error(`Upload failed (${uploadRes.status})`);
      const data = await uploadRes.json();

      const dbRes = await fetch("/api/video-testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyTag,
          videoUrl: data.videoUrl,
          thumbnailUrl: data.thumbnailUrl,
          fileSize: videoFile.size,
          fileType: videoFile.type,
        }),
      });
      if (!dbRes.ok) {
        const err = await dbRes.json().catch(() => ({}));
        throw new Error(err.error || "Failed to save testimonial to database.");
      }

      toast.success("Video testimonial added");
      setCompanyTag("");
      setVideoFile(null);
      setThumbnailFile(null);
      setPreviewVideo(null);
      setPreviewThumbnail(null);
    } catch (error) {
      console.error("Error adding testimonial:", error);
      toast.error(`Upload failed: ${errorMessage(error)}`);
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "bg-white border border-neutral-200 rounded-md px-3 py-2 text-body text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors w-full";
  const labelCls = "text-label text-neutral-500 uppercase mb-2 block";

  return (
    <main className="min-h-screen bg-neutral-50 font-ubuntu">
      <div className="max-w-3xl mx-auto px-10 py-14">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
          <FadeIn y={0} duration={0.4}>
            <SectionHeader eyebrow="Admin · Upload" title="Create Video Testimonial" />
          </FadeIn>
          <FadeIn y={0} duration={0.4} delay={0.1}>
            <Button variant="secondary" size="sm" onClick={() => router.push("/admin/dashboard")}>
              ← Dashboard
            </Button>
          </FadeIn>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className={labelCls}>Company name</label>
              <input
                type="text"
                placeholder="e.g. Acme Corp"
                value={companyTag}
                onChange={(e) => setCompanyTag(e.target.value)}
                required
                className={inputCls}
              />
            </div>

            <div>
              <label className={labelCls}>Video file</label>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                required
                className={`${inputCls} file:mr-4 file:rounded-md file:border-0 file:bg-brand-50 file:text-brand-700 file:px-3 file:py-1 file:font-medium file:cursor-pointer`}
              />
              {previewVideo ? (
                <video controls className="mt-3 w-full max-h-60 rounded-md border border-neutral-200">
                  <source src={previewVideo} />
                </video>
              ) : null}
              <p className="mt-1 text-body-sm text-neutral-500">Max {MAX_VIDEO_MB}MB.</p>
            </div>

            <div>
              <label className={labelCls}>Thumbnail image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                required
                className={`${inputCls} file:mr-4 file:rounded-md file:border-0 file:bg-brand-50 file:text-brand-700 file:px-3 file:py-1 file:font-medium file:cursor-pointer`}
              />
              {previewThumbnail ? (
                <div className="mt-3 relative w-full max-w-sm aspect-video rounded-md border border-neutral-200 overflow-hidden">
                  <Image src={previewThumbnail} alt="Thumbnail preview" fill unoptimized className="object-cover" />
                </div>
              ) : null}
              <p className="mt-1 text-body-sm text-neutral-500">Max {MAX_IMAGE_MB}MB.</p>
            </div>

            <Button type="submit" variant="primary" size="md" disabled={submitting} className="self-start">
              {submitting ? "Uploading…" : "Add video testimonial"}
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
}
