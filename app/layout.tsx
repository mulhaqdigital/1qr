import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import NavBar from "@/components/NavBar";
import Head from "next/head";

export const metadata: Metadata = {
  title: "1QR – Reusable QR Code Management Platform",
  description: "Create reusable, editable QR codes that never expire. Update redirect URLs anytime without reprinting. Perfect for business, marketing, and events.",
  keywords: "QR code, reusable QR, dynamic QR, QR management, QR generator, editable QR",
  openGraph: {
    title: "1QR – Reusable QR Code Management Platform",
    description: "Create reusable, editable QR codes that never expire. Update redirect URLs anytime without reprinting.",
    type: "website",
    locale: "en_US",
    siteName: "1QR",
  },
  twitter: {
    card: "summary_large_image",
    title: "1QR – Reusable QR Code Management Platform",
    description: "Create reusable, editable QR codes that never expire. Update redirect URLs anytime without reprinting.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "your-google-site-verification", // Add your Google Search Console verification code
  },
};

export const viewport = "width=device-width, initial-scale=1";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
        <meta property="og:title" content="Reusable, Editable QR Codes | 1QR" />
        <meta property="og:description" content="Create QR codes that never expire with redirect URLs you can update anytime." />
        <meta property="og:url" content="https://www.que-r.org/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.que-r.org/your-og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Reusable, Editable QR Codes | 1QR" />
        <meta name="twitter:description" content="Create QR codes that never expire with redirect URLs you can update anytime." />
        <meta name="twitter:image" content="https://www.que-r.org/your-og-image.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "1QR",
              "url": "https://www.que-r.org/",
              "description": "Create reusable, editable QR codes that never expire. Update redirect URLs anytime.",
              "publisher": {
                "@type": "Organization",
                "name": "1QR"
              }
            }),
          }}
        />
      </Head>
      <body>
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
