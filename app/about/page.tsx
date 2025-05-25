"use client";
import React from "react";

export default function AboutPage() {
  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "40px 0", fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", background: "#fff", borderRadius: 18, boxShadow: "0 4px 24px rgba(0,0,0,0.07)", padding: 40 }}>
        <div style={{ marginBottom: 24, textAlign: "center" }}>
          <div style={{ fontSize: 44, marginBottom: 8 }}>ℹ️</div>
          <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8, color: "#2563eb" }}>About 1QR – Permanent QR Code</h1>
          <p style={{ color: "#555", fontSize: 18, marginBottom: 0 }}>
            1QR – Permanent QR Code is a dynamic QR code management platform designed to make QR codes permanent, editable, and reliable.
          </p>
        </div>
        <div style={{ marginBottom: 28, color: "#444", fontSize: 16, lineHeight: 1.7 }}>
          <p style={{ marginBottom: 16 }}>
            Traditional QR codes are static—once printed, they can't be changed. <b>1QR</b> solves that by generating a short URL behind each QR code. This short URL never changes, but you can update the destination it points to anytime. That means your printed QR codes are future-proof, reusable, and adaptable.
          </p>
          <p style={{ marginBottom: 16 }}>
            Whether you're managing logistics, running campaigns, or organizing educational resources, <b>1QR</b> ensures your QR codes stay relevant—without the need to reprint or redistribute.
          </p>
        </div>
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#2563eb", marginBottom: 10 }}>🎯 Why 1QR?</h2>
          <ul style={{ color: "#333", fontSize: 16, paddingLeft: 24, marginBottom: 0, lineHeight: 1.7 }}>
            <li><b>Permanence:</b> Your QR code image never changes—even if the destination does.</li>
            <li><b>Control:</b> Instantly update your URLs anytime from your dashboard.</li>
            <li><b>Traceability:</b> Every QR code has a unique serial number for easy tracking.</li>
            <li><b>Professionalism:</b> Download PNG images with serial numbers visibly printed.</li>
          </ul>
        </div>
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#2563eb", marginBottom: 10 }}>👥 Who It's For</h2>
          <ul style={{ color: "#333", fontSize: 16, paddingLeft: 24, marginBottom: 0, lineHeight: 1.7 }}>
            <li>Marketers running long-term campaigns</li>
            <li>Educators sharing evolving resources</li>
            <li>Operations teams managing logistics</li>
            <li>Event organizers, non-profits, and startups who need flexibility</li>
          </ul>
        </div>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#2563eb", marginBottom: 10 }}>🔐 Built with Privacy & Security</h2>
          <p style={{ color: "#444", fontSize: 16, lineHeight: 1.7 }}>
            1QR uses Supabase for authentication and secure data handling. Your QR data is protected and only accessible to you.
          </p>
        </div>
      </div>
    </div>
  );
} 