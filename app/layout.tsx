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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-slate-200 antialiased">{children}</body>
    </html>
  );
}
