"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CreateWrittenTestimonial() {
  const router = useRouter();

  const [companies, setCompanies] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [newCompanyName, setNewCompanyName] = useState("");
  const [testimonialDate, setTestimonialDate] = useState("");
  const [testimonialImage, setTestimonialImage] = useState<File | null>(null);
  const [testimonialPreview, setTestimonialPreview] = useState<string | null>(null);
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [companyLogoPreview, setCompanyLogoPreview] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*');

      if (error) {
        console.error("Error fetching companies:", error);
        return;
      }

      setCompanies(data || []);
    };

    fetchCompanies();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: "testimonial" | "logo") => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (type === "testimonial") {
        setTestimonialImage(file);
        setTestimonialPreview(URL.createObjectURL(file));
      } else if (type === "logo") {
        setCompanyLogo(file);
        setCompanyLogoPreview(URL.createObjectURL(file));
      }
    }
  };

  const resetForm = () => {
    setSelectedCompany("");
    setNewCompanyName("");
    setTestimonialDate("");
    setTestimonialImage(null);
    setTestimonialPreview(null);
    setCompanyLogo(null);
    setCompanyLogoPreview(null);
    setSuccessMessage("Image testimonial added successfully!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      let companyToUse = selectedCompany;
      let companyLogoFilename = "";
      let companyId = null;

      if (selectedCompany === "other") {
        if (!newCompanyName.trim() || !companyLogo) {
          setError("Please enter a company name and upload a company logo.");
          setIsSubmitting(false);
          return;
        }

        // Upload company logo
        const logoFormData = new FormData();
        logoFormData.append("file", companyLogo);
        logoFormData.append("filePath", `Company-Logos/${companyLogo.name}`);

        await fetch("/api/upload-local", { method: "POST", body: logoFormData });

        companyLogoFilename = `/images/Company-Logos/${companyLogo.name}`;

        // Add new company to Supabase
        const { data: newCompany, error: companyError } = await supabase
          .from('companies')
          .insert({
            name: newCompanyName,
            logo_url: companyLogoFilename,
            company_tag: newCompanyName,
            has_written_testimonial: true,
          })
          .select()
          .single();

        if (companyError) throw companyError;

        companyToUse = newCompanyName;
        companyId = newCompany.id;
        setCompanies((prev) => [...prev, newCompany]);
      } else {
        // Get the ID of the selected company
        const selectedCompanyDoc = companies.find((c) => c.name === selectedCompany);
        if (selectedCompanyDoc) {
          companyId = selectedCompanyDoc.id;
        }
      }

      if (!companyToUse || !testimonialDate || !testimonialImage) {
        setError("All fields including the testimonial image are required.");
        setIsSubmitting(false);
        return;
      }

      // Upload testimonial image
      const testimonialFormData = new FormData();
      testimonialFormData.append("file", testimonialImage);
      testimonialFormData.append("filePath", `written-testimonial/${testimonialImage.name}`);

      await fetch("/api/upload-local", { method: "POST", body: testimonialFormData });

      const testimonialImageUrl = `/images/written-testimonial/${testimonialImage.name}`;

      // Store testimonial in Supabase
      const { error: testimonialError } = await supabase
        .from('written_testimonials')
        .insert({
          company_name: companyToUse,
          company_tag: companyToUse,
          testimonial_date: testimonialDate,
          testimonial_image_url: testimonialImageUrl,
        });

      if (testimonialError) throw testimonialError;

      // Update existing company to set has_written_testimonial: true
      if (companyId && selectedCompany !== "other") {
        await supabase
          .from('companies')
          .update({ has_written_testimonial: true })
          .eq('id', companyId);
      }

      resetForm();
    } catch (error: any) {
      console.error("Error:", error);
      setError("Failed to upload testimonial.");
    }

    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Create Written Testimonial</h1>

        <button
          onClick={() => router.push("/admin/dashboard")}
          className="mb-6 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          ← Back to Admin Dashboard
        </button>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block font-semibold">Select Company</label>
          <select className="border p-3 rounded-lg w-full" value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)} required>
            <option value="" disabled>Select a company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.name}>{company.name}</option>
            ))}
            <option value="other">Other</option>
          </select>

          {selectedCompany === "other" && (
            <>
              <input type="text" placeholder="Company Name" value={newCompanyName} onChange={(e) => setNewCompanyName(e.target.value)} required className="border p-3 rounded-lg w-full" />
              <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "logo")} required className="border p-2 rounded w-full" />
            </>
          )}

          <label className="block font-semibold">Date of Testimonial</label>
          <input type="date" value={testimonialDate} onChange={(e) => setTestimonialDate(e.target.value)} required className="border p-3 rounded-lg w-full" />

          <label className="block font-semibold">Upload Testimonial Image</label>
          <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "testimonial")} required className="border p-2 rounded w-full" />

          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Add Image Testimonial"}
          </button>
        </form>
      </div>
    </main>
  );
}
