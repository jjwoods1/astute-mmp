import Link from "next/link";
import { Card, SectionHeader } from "@/components/ui";

const sections = [
  { href: "/admin/dashboard",                  label: "Dashboard",           description: "Manage admin users." },
  { href: "/admin/create-video-testimonial",   label: "Video Testimonial",   description: "Upload a new video testimonial." },
  { href: "/admin/create-written-testimonial", label: "Written Testimonial", description: "Add a written testimonial for a client." },
  { href: "/admin/hall-of-fame",               label: "Hall of Fame",        description: "Manage monthly placement images by year." },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-neutral-50 font-ubuntu">
      <div className="max-w-5xl mx-auto px-10 py-14">
        <SectionHeader
          eyebrow="Admin"
          title="Admin Panel"
          lede="Choose a section to manage."
        />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((s) => (
            <Link key={s.href} href={s.href} className="group">
              <Card interactive className="h-full flex items-center justify-between gap-6">
                <div>
                  <div className="text-h3 text-neutral-900 mb-1">{s.label}</div>
                  <div className="text-body-sm text-neutral-500">{s.description}</div>
                </div>
                <span className="text-brand-500 transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
