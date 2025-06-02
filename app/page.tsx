"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ fontFamily: "Montserrat, Arial, sans-serif", background: "#f8fafc" }}>
      

      {/* Hero Section */}
      <section
        style={{
          minHeight: "70vh",
          background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "60px 0 40px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, rgba(37,99,235,0.07) 0%, rgba(168,85,247,0.07) 100%)",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 700,
            margin: "0 auto",
            textAlign: "center",
            background: "rgba(255,255,255,0.95)",
            borderRadius: 20,
            boxShadow: "0 8px 32px rgba(37,99,235,0.08)",
            padding: 48,
          }}
        >
          
          <h1
            style={{
              fontSize: 44,
              fontWeight: 800,
              marginBottom: 18,
              lineHeight: 1.1,
              color: "#1e293b",
            }}
          >
            Permanent, Editable, Dynamic
            <span
              style={{
                background: "linear-gradient(90deg, #2563eb 0%, #a855f7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginLeft: 8,
              }}
            >
              QR Codes
            </span>
          </h1>
          <p
            style={{
              fontSize: 20,
              color: "#475569",
              maxWidth: 520,
              margin: "0 auto 32px",
              lineHeight: 1.6,
            }}
          >
            Create QR codes that never expire with redirect URLs you can update anytime. Perfect for business, marketing, events, and more.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <a
              href="/dashboard"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#2563eb",
                color: "#fff",
                fontWeight: 700,
                borderRadius: 10,
                padding: "16px 36px",
                fontSize: 20,
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(37,99,235,0.10)",
                transition: "background 0.2s",
              }}
              onMouseOver={e => (e.currentTarget.style.background = "#1d4ed8")}
              onMouseOut={e => (e.currentTarget.style.background = "#2563eb")}
            >
              Get Started
              <span style={{ display: "inline-block", marginLeft: 10, fontSize: 22 }}></span>
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="features" style={{ background: "#f1f5f9", padding: "64px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12, color: "#1e293b" }}>How It Works</h2>
          <p style={{ color: "#666", marginBottom: 36, fontSize: 18 }}>Get started in just a few simple steps.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center" }}>
            {[
              { step: 1, title: "Generate", desc: "Create a QR code with a unique serial number and short URL." },
              { step: 2, title: "Edit", desc: "Change the redirect URL anytime—your QR code image stays the same." },
              { step: 3, title: "Download", desc: "Get your QR as PNG or SVG, with the serial number printed for tracking." },
              { step: 4, title: "Manage", desc: "View, test, and organize all your QR codes in your dashboard." },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{
                minWidth: 200,
                flex: "1 1 220px",
                background: "#fff",
                borderRadius: 16,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                padding: 32,
                margin: "12px 0"
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "#dbeafe",
                  color: "#2563eb",
                  fontWeight: 700,
                  fontSize: 22,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px"
                }}>{step}</div>
                <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 18 }}>{title}</div>
                <div style={{ color: "#555", fontSize: 15 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: "#1e293b",
        color: "#cbd5e1",
        fontSize: 15,
        padding: "40px 0 24px",
        marginTop: 32
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          &copy; {new Date().getFullYear()} 1QR. All rights reserved.
          <span style={{ margin: "0 8px" }}>·</span>
          <a href="/about" style={footerLinkStyle}>About</a>
          <span style={{ margin: "0 8px" }}>·</span>
          <a href="/privacy" style={footerLinkStyle}>Privacy</a>
          <span style={{ margin: "0 8px" }}>·</span>
          <a href="/terms" style={footerLinkStyle}>Terms</a>
          <span style={{ margin: "0 8px" }}>·</span>
          <a href="/contact" style={footerLinkStyle}>Contact</a>
        </div>
      </footer>
    </div>
  );
}

// Inline style objects for reuse
const navLinkStyle = {
  color: "#475569",
  textDecoration: "none",
  fontWeight: 500,
  fontSize: 16,
  transition: "color 0.2s",
  padding: "0 4px"
};

const footerLinkStyle = {
  color: "#60a5fa",
  textDecoration: "underline",
  fontWeight: 500
};
