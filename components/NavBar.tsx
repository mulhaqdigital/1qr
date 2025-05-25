import Link from "next/link";

export default function NavBar() {
  return (
    <nav style={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 32px",
      background: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
      position: "sticky",
      top: 0,
      zIndex: 50
    }}>
      <Link href="/" style={{ fontWeight: 800, fontSize: 22, color: "#2563eb", textDecoration: "none" }}>
        1QR
      </Link>
      <div style={{ display: "flex", gap: 16 }}>
        <Link href="/" style={{ padding: "8px 18px", borderRadius: 6, color: "#222", textDecoration: "none", fontWeight: 500, background: "#f1f5f9" }}>Home</Link>
        <Link href="/dashboard" style={{ padding: "8px 18px", borderRadius: 6, color: "#222", textDecoration: "none", fontWeight: 500, background: "#f1f5f9" }}>Dashboard</Link>
        <Link href="/about" style={{ padding: "8px 18px", borderRadius: 6, color: "#222", textDecoration: "none", fontWeight: 500, background: "#f1f5f9" }}>About</Link>
      </div>
    </nav>
  );
} 