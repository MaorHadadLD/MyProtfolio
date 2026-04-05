import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maor Hadad — Software Engineer",
  description:
    "Fullstack Software Engineer. I build systems that make sense.",
  openGraph: {
    title: "Maor Hadad — Software Engineer",
    description: "Fullstack Software Engineer. I build systems that make sense.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
