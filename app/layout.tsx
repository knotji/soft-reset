import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";

const sarabun = Sarabun({
  weight: ["300", "400", "500", "600"],
  subsets: ["thai", "latin"],
  variable: "--font-sarabun",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? new URL(process.env.NEXT_PUBLIC_BASE_URL)
  : new URL("http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: "Soft Reset — รีเซ็ตใจเบา ๆ",
  description:
    "เลือกความรู้สึกสั้น ๆ แล้วให้ Soft Reset เขียนข้อความเล็ก ๆ ไว้กอดใจคุณวันนี้",
  openGraph: {
    title: "Soft Reset — รีเซ็ตใจเบา ๆ",
    description:
      "เลือกความรู้สึกสั้น ๆ แล้วให้ Soft Reset เขียนข้อความเล็ก ๆ ไว้กอดใจคุณวันนี้",
    type: "website",
    locale: "th_TH",
  },
  twitter: {
    card: "summary",
    title: "Soft Reset — รีเซ็ตใจเบา ๆ",
    description:
      "เลือกความรู้สึกสั้น ๆ แล้วให้ Soft Reset เขียนข้อความเล็ก ๆ ไว้กอดใจคุณวันนี้",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${sarabun.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
