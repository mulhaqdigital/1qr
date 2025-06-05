'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function NavBar() {
  const { logout, user } = useAuth();
  const router = useRouter();

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
      {/* Left side: Logo and About */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 20, color: "#2563eb", textDecoration: "none" }}>
          1QR
        </Link>
        <Link href="/about" style={{ padding: "8px 6px", borderRadius: 6, color: "#222", textDecoration: "none", fontWeight: 500, background: "#f1f5f9" }}>
          About
        </Link>
      </div>

      {/* Right side: Dashboard and Logout (only when logged in) */}
      <div style={{ display: "flex", gap: 6 }}>
        {user && (
          <>
            <Link href="/dashboard" style={{ padding: "8px 6px", borderRadius: 6, color: "#222", textDecoration: "none", fontWeight: 500, background: "#f1f5f9" }}>
              Dashboard
            </Link>
            <button
              onClick={async () => {
                await logout();
                router.push("/login");
              }}
              style={{
                padding: "8px 8px",
                borderRadius: 6,
                color: "#fff",
                background: "#ef4444",
                border: "none",
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}
            >
              Log out
            </button>
          </>
        )}
      </div>
    </nav>
  );
} 