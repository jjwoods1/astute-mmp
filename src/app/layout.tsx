import type { Metadata } from "next";
import "./globals.css";
import MobileBlocker from "@/components/MobileBlocker";
import PageTransition from "@/components/PageTransition";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Astute MMP - Multimedia Sales Presenter",
  description: "Interactive sales presentation platform by Astute",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-ubuntu">
        <MobileBlocker />
        <PageTransition>
          {children}
        </PageTransition>
        <Toaster
          position="bottom-right"
          theme="light"
          toastOptions={{
            style: {
              fontFamily: "Ubuntu, sans-serif",
              border: "1px solid #e2e8f0",
              boxShadow:
                "0 8px 24px -12px rgba(15, 23, 42, 0.12), 0 2px 6px -3px rgba(15, 23, 42, 0.06)",
            },
          }}
        />
      </body>
    </html>
  );
}
