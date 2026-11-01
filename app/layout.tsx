import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: undefined,
  title: "Habibur Rahman Tanvir | MERN Stack Developer",
  description:
    "Professional portfolio for Habibur Rahman Tanvir, a MERN Stack Developer building modern web applications with the MERN ecosystem.",
  openGraph: {
    title: "Habibur Rahman Tanvir | MERN Stack Developer",
    description:
      "Portfolio website for Habibur Rahman Tanvir, a MERN Stack Developer from Bangladesh.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
