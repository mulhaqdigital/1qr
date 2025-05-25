"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section>
        <div style={{ maxWidth: 600, margin: "48px auto 32px", textAlign: "center", background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.06)", padding: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🔗</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>
            Permanent, Editable QR Codes for Everything
          </h1>
          <p style={{ fontSize: 18, color: "#555", marginBottom: 32 }}>
            1QR lets you create QR codes that never expire, with redirect URLs you can update anytime. Perfect for business, marketing, events, and more.
          </p>
          <a href="/dashboard" style={{ display: "inline-block", background: "#2563eb", color: "#fff", fontWeight: 600, borderRadius: 8, padding: "16px 40px", fontSize: 18, textDecoration: "none", boxShadow: "0 2px 8px rgba(37,99,235,0.08)", transition: "background 0.2s" }} onMouseOver={e => e.currentTarget.style.background = "#1d4ed8"} onMouseOut={e => e.currentTarget.style.background = "#2563eb"}>
            Get Started
          </a>
        </div>
      </section>
      {/* How It Works */}
      <section>
        <div style={{ maxWidth: 900, margin: "0 auto 32px", textAlign: "center", background: "#f1f5f9", borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>How It Works</h2>
          <p style={{ color: "#666", marginBottom: 24 }}>Get started in just a few simple steps.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center" }}>
            {[
              { step: 1, title: "Generate", desc: "Create a QR code with a unique serial number and short URL." },
              { step: 2, title: "Edit", desc: "Change the redirect URL anytime—your QR code image stays the same." },
              { step: 3, title: "Download", desc: "Get your QR as PNG or SVG, with the serial number printed for tracking." },
              { step: 4, title: "Manage", desc: "View, test, and organize all your QR codes in your dashboard." },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{ minWidth: 180, flex: "1 1 180px", background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", padding: 24, margin: "12px 0" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#dbeafe", color: "#2563eb", fontWeight: 700, fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>{step}</div>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
                <div style={{ color: "#555", fontSize: 15 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Benefits */}
      <section>
        <div style={{ maxWidth: 900, margin: "0 auto 32px", textAlign: "center", background: "#fff", borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Why Choose 1QR?</h2>
          <p style={{ color: "#666", marginBottom: 24 }}>Empower your business, event, or project with flexible, permanent, and trackable QR codes.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center" }}>
            {[
              { icon: "💸", title: "Save Time & Money", desc: "Update links without reprinting QR codes. Your QR images stay valid forever." },
              { icon: "🔢", title: "Stay Organized", desc: "Serial numbers make it easy to track, sort, and manage all your QR codes." },
              { icon: "⬇️", title: "Flexible Downloads", desc: "Download QR codes as PNG or SVG for digital or print use, with serial numbers included." },
              { icon: "📋", title: "Easy Management", desc: "A clean dashboard lets you view, test, edit, and organize all your QR codes in one place." },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ minWidth: 220, flex: "1 1 220px", background: "#f8fafc", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", padding: 24, display: "flex", alignItems: "flex-start", gap: 16, margin: "12px 0" }}>
                <span style={{ fontSize: 28 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
                  <div style={{ color: "#555", fontSize: 15 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Social Proof */}
      <section>
        <div style={{ maxWidth: 900, margin: "0 auto 32px", textAlign: "center", background: "#f1f5f9", borderRadius: 16, padding: 32 }}>
          <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Trusted by businesses, marketers, and event organizers</h3>
          <div style={{ fontSize: 28, color: "#cbd5e1", display: "flex", justifyContent: "center", gap: 32 }}>
            <span>🏢</span>
            <span>🎟️</span>
            <span>🛒</span>
            <span>🏫</span>
            <span>📦</span>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer>
        <div style={{ maxWidth: 900, margin: "0 auto 32px", textAlign: "center", color: "#94a3b8", fontSize: 15, background: "#fff", borderRadius: 16, padding: 24 }}>
          &copy; {new Date().getFullYear()} 1QR. All rights reserved.
          <span style={{ margin: "0 8px" }}>·</span>
          <a href="/about" style={{ color: "#2563eb", textDecoration: "underline" }}>About</a>
          <span style={{ margin: "0 8px" }}>·</span>
          <a href="/privacy" style={{ color: "#2563eb", textDecoration: "underline" }}>Privacy</a>
          <span style={{ margin: "0 8px" }}>·</span>
          <a href="/terms" style={{ color: "#2563eb", textDecoration: "underline" }}>Terms</a>
          <span style={{ margin: "0 8px" }}>·</span>
          <a href="/contact" style={{ color: "#2563eb", textDecoration: "underline" }}>Contact</a>
        </div>
      </footer>
    </div>
  );
}
