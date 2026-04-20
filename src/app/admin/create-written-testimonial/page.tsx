"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Button, Card, SectionHeader } from "@/components/ui";
import { FadeIn } from "@/components/motion";
import { errorMessage } from "@/lib/errors";

interface CompanyLite {
  id: number;
  name: string;
  companyTag: string;
}

const MAX_IMAGE_MB = 10;

export default function CreateWrittenTestimonialPage() {
  const router = useRouter();

  const [companies, setCompanies] = useState<CompanyLite[]>([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [newCompanyName, setNewCompanyName] = useState("");
  const [testimonialDate, setTestimonialDate] = useState("");
  const [testimonialImage, setTestimonialImage] = useState<File | null>(null);
  const [testimonialPreview, setTestimonialPreview] = useState<string | null>(null);
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("/api/companies");
        if (!res.ok) throw new Error("Failed to fetch companies");
        const data = await res.json();
        setCompanies(data || []);
      } catch (error) {
        console.error("Error fetching companies:", error);
        toast.error(`Failed to load companies: ${errorMessage(error)}`);
      }
    };
    fetchCompanies();
  }, []);

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (f: File | null) => void,
    setPreview: (s: string | null) => void,
  ) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      toast.error(`Image must be under ${MAX_IMAGE_MB}MB`);
      return;
    }
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setSelectedCompany("");
    setNewCompanyName("");
    setTestimonialDate("");
    setTestimonialImage(null);
    setTestimonialPreview(null);
    setCompanyLogo(null);
    setLogoPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let companyToUse = selectedCompany;
      let companyId: number | null = null;

      if (selectedCompany === "other") {
        if (!newCompanyName.trim() || !companyLogo) {
          toast.error("Enter a company name and upload a logo.");
          setSubmitting(false);
          return;
        }

        const logoFormData = new FormData();
        logoFormData.append("file", companyLogo);
        logoFormData.append("filePath", `Company-Logos/${companyLogo.name}`);
        await fetch("/api/upload-local", { method: "POST", body: logoFormData });

        const companyLogoFilename = `/images/Company-Logos/${companyLogo.name}`;
        const companyRes = await fetch("/api/companies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newCompanyName,
            logoUrl: companyLogoFilename,
            companyTag: newCompanyName,
            hasWrittenTestimonial: true,
          }),
        });
        if (!companyRes.ok) throw new Error("Failed to create company");
        const newCompany = await companyRes.json();

        companyToUse = newCompanyName;
        companyId = newCompany.id;
        setCompanies((prev) => [...prev, newCompany]);
      } else {
        const match = companies.find((c) => c.name === selectedCompany);
        if (match) companyId = match.id;
      }

      if (!companyToUse || !testimonialDate || !testimonialImage) {
        toast.error("All fields including the testimonial image are required.");
        setSubmitting(false);
        return;
      }

      const testimonialFormData = new FormData();
      testimonialFormData.append("file", testimonialImage);
      testimonialFormData.append("filePath", `written-testimonial/${testimonialImage.name}`);
      await fetch("/api/upload-local", { method: "POST", body: testimonialFormData });

      const testimonialImageUrl = `/images/written-testimonial/${testimonialImage.name}`;

      const testimonialRes = await fetch("/api/written-testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: companyToUse,
          companyTag: companyToUse,
          testimonialDate,
          testimonialImageUrl,
        }),
      });
      if (!testimonialRes.ok) throw new Error("Failed to create testimonial");

      if (companyId && selectedCompany !== "other") {
        const match = companies.find((c) => c.id === companyId);
        if (match) {
          await fetch(`/api/companies/${match.companyTag}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ hasWrittenTestimonial: true }),
          });
        }
      }

      toast.success("Written testimonial added");
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Upload failed: ${errorMessage(error)}`);
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "bg-white border border-neutral-200 rounded-md px-3 py-2 text-body text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors w-full";
  const labelCls = "text-label text-neutral-500 uppercase mb-2 block";
  const fileCls = `${inputCls} file:mr-4 file:rounded-md file:border-0 file:bg-brand-50 file:text-brand-700 file:px-3 file:py-1 file:font-medium file:cursor-pointer`;

  return (
    <main className="min-h-screen bg-neutral-50 font-ubuntu">
      <div className="max-w-3xl mx-auto px-10 py-14">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
          <FadeIn y={0} duration={0.4}>
            <SectionHeader eyebrow="Admin · Upload" title="Create Written Testimonial" />
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
              <label className={labelCls}>Company</label>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                required
                className={inputCls}
              >
                <option value="" disabled>Select a company</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
                <option value="other">Other (new company)</option>
              </select>
            </div>

            {selectedCompany === "other" ? (
              <div className="flex flex-col gap-5 pl-4 border-l-2 border-brand-200">
                <div>
                  <label className={labelCls}>New company name</label>
                  <input
                    type="text"
                    placeholder="Company name"
                    value={newCompanyName}
                    onChange={(e) => setNewCompanyName(e.target.value)}
                    required
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Company logo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFile(e, setCompanyLogo, setLogoPreview)}
                    required
                    className={fileCls}
                  />
                  {logoPreview ? (
                    <div className="mt-3 relative w-40 h-24 rounded-md border border-neutral-200 bg-neutral-50 overflow-hidden">
                      <Image src={logoPreview} alt="Logo preview" fill unoptimized className="object-contain p-2" />
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div>
              <label className={labelCls}>Date of testimonial</label>
              <input
                type="date"
                value={testimonialDate}
                onChange={(e) => setTestimonialDate(e.target.value)}
                required
                className={inputCls}
              />
            </div>

            <div>
              <label className={labelCls}>Testimonial image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFile(e, setTestimonialImage, setTestimonialPreview)}
                required
                className={fileCls}
              />
              {testimonialPreview ? (
                <div className="mt-3 relative w-full max-w-md aspect-[4/3] rounded-md border border-neutral-200 bg-neutral-50 overflow-hidden">
                  <Image src={testimonialPreview} alt="Testimonial preview" fill unoptimized className="object-contain" />
                </div>
              ) : null}
              <p className="mt-1 text-body-sm text-neutral-500">Max {MAX_IMAGE_MB}MB.</p>
            </div>

            <Button type="submit" variant="primary" size="md" disabled={submitting} className="self-start">
              {submitting ? "Uploading…" : "Add image testimonial"}
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
}
