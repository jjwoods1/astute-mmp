import type { Metadata } from "next";
import "./globals.css";
import MobileBlocker from "@/components/MobileBlocker";
import PageTransition from "@/components/PageTransition";

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
      </body>
    </html>
  );
}
