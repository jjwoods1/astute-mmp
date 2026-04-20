"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateVideoTestimonial() {
  const router = useRouter();

  const [companyTag, setCompanyTag] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);
  const [previewThumbnail, setPreviewThumbnail] = useState<string | null>(null);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setVideoFile(file);
      setPreviewVideo(URL.createObjectURL(file));
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setThumbnailFile(file);
      setPreviewThumbnail(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      if (!videoFile || !thumbnailFile || !companyTag.trim()) {
        setError("All fields are required.");
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append("companyTag", companyTag);
      formData.append("video", videoFile);
      formData.append("thumbnail", thumbnailFile);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/upload", true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
        }
      };

      xhr.onload = async () => {
        setUploadProgress(null);

        if (xhr.status !== 200) {
          setError("Upload failed. Please try again.");
          setIsSubmitting(false);
          return;
        }

        const data = JSON.parse(xhr.responseText);

        // Save to database
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
          console.error("Error saving to database");
          setError("Failed to save testimonial to database.");
          setIsSubmitting(false);
          return;
        }

        setCompanyTag("");
        setVideoFile(null);
        setThumbnailFile(null);
        setPreviewVideo(null);
        setPreviewThumbnail(null);
        setError(null);
        alert("Video testimonial added successfully!");
        setIsSubmitting(false);
      };

      xhr.onerror = () => {
        setError("Network error during upload.");
        setUploadProgress(null);
        setIsSubmitting(false);
      };

      xhr.send(formData);
    } catch (error) {
      console.error("Error adding testimonial:", error);
      setError("Failed to add video testimonial.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Create Video Testimonial</h1>

      <button
        onClick={() => router.push("/admin/dashboard")}
        className="mb-6 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
      >
        ← Back to Admin Dashboard
      </button>

      <div className="bg-white p-6 shadow-lg rounded-lg">
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Company Name</label>
            <input
              type="text"
              placeholder="Enter company name"
              value={companyTag}
              onChange={(e) => setCompanyTag(e.target.value)}
              required
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block font-semibold">Upload Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              required
              className="border p-2 rounded w-full"
            />
            {previewVideo && (
              <video controls className="mt-2 w-full max-h-60">
                <source src={previewVideo} />
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          <div>
            <label className="block font-semibold">Upload Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              required
              className="border p-2 rounded w-full"
            />
            {previewThumbnail && (
              <img src={previewThumbnail} alt="Thumbnail preview" className="mt-2 w-full max-h-40 object-cover" />
            )}
          </div>

          {uploadProgress !== null && (
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              ></div>
              <p className="text-sm text-gray-700 text-center mt-1">{uploadProgress}% Uploaded</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Submitting..." : "Add Video Testimonial"}
          </button>
        </form>
      </div>
    </main>
  );
}
