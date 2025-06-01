import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "1QR – Permanent QR",
  description: "1QR – Permanent QR Code is a dynamic QR code management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <NavBar />
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
