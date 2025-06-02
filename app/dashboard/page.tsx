"use client";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { generateQRCode } from "@/utils/qr";

function randomShortUrl(length = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function Page() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [destinationUrl, setDestinationUrl] = useState("");
  const [error, setError] = useState("");
  const [qrCodes, setQrCodes] = useState<any[]>([]);
  const [loadingQrs, setLoadingQrs] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchQRCodes();
    }
  }, [user]);

  async function fetchQRCodes() {
    if (!user) return;
    setLoadingQrs(true);
    const { data } = await supabase
      .from("qr_codes")
      .select("id, serial_number, short_url, destination_url, created_at, updated_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setQrCodes(data || []);
    setLoadingQrs(false);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setCreating(true);
    if (!user) return;
    let shortUrl = randomShortUrl();
    // Ensure shortUrl is unique
    let exists = true;
    while (exists) {
      const { data } = await supabase.from("qr_codes").select("id").eq("short_url", shortUrl);
      if (!data || data.length === 0) exists = false;
      else shortUrl = randomShortUrl();
    }
    const { error: insertError } = await supabase.from("qr_codes").insert({
      short_url: shortUrl,
      destination_url: destinationUrl,
      user_id: user.id,
    });
    if (insertError) setError(insertError.message);
    else {
      setDestinationUrl("");
      fetchQRCodes();
    }
    setCreating(false);
  }

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div style={{ minHeight: "80vh", background: "#f8fafc", padding: "40px 0" }}>
      <div style={{
        maxWidth: 700,
        margin: "0 auto",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        padding: 36,
      }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 18, textAlign: "center" }}>Dashboard</h1>
        <form
          onSubmit={handleCreate}
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 24,
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          <input
            type="url"
            placeholder="Destination URL"
            value={destinationUrl}
            onChange={e => setDestinationUrl(e.target.value)}
            required
            style={{
              flex: 1,
              minWidth: 220,
              padding: "12px 14px",
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              fontSize: 16,
              outline: "none",
              background: "#f9fafb"
            }}
          />
          <button
            type="submit"
            disabled={creating}
            style={{
              background: "#2563eb",
              color: "#fff",
              fontWeight: 600,
              border: "none",
              borderRadius: 8,
              padding: "12px 28px",
              fontSize: 17,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
              transition: "background 0.2s"
            }}
            onMouseOver={e => (e.currentTarget.style.background = "#1d4ed8")}
            onMouseOut={e => (e.currentTarget.style.background = "#2563eb")}
          >
            {creating ? "Creating..." : "Create QR"}
          </button>
        </form>
        {error && <div style={{ color: "#e11d48", fontSize: 15, textAlign: "center", marginBottom: 16 }}>{error}</div>}
        <div>
          {loadingQrs ? (
            <div>Loading QR codes...</div>
          ) : qrCodes.length === 0 ? (
            <div style={{ textAlign: "center", color: "#888" }}>No QR codes yet.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {qrCodes.map(qr => (
                <QRCodeItem key={qr.id} qr={qr} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function QRCodeItem({ qr }: { qr: any }) {
  const [qrImg, setQrImg] = useState<string>("");
  const [showEdit, setShowEdit] = useState(false);
  const [newDest, setNewDest] = useState(qr.destination_url);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    generateQRCode(`${window.location.origin}/qr/${qr.short_url}`).then(setQrImg);
  }, [qr.short_url, refresh]);

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const { error } = await supabase
      .from("qr_codes")
      .update({ destination_url: newDest })
      .eq("id", qr.id);
    if (error) setError(error.message);
    else {
      setShowEdit(false);
      setRefresh(r => r + 1);
    }
    setSaving(false);
  }

  async function handleDelete() {
    setDeleting(true);
    await supabase.from("qr_codes").delete().eq("id", qr.id);
    setDeleting(false);
    window.location.reload();
  }

  async function handleDownload() {
    setDownloading(true);
    // Create a canvas, draw QR, then serial number below
    const img = new window.Image();
    img.src = qrImg;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const width = img.width;
      const height = img.height + 32;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0);
      ctx.font = "bold 18px sans-serif";
      ctx.fillStyle = "#222";
      ctx.textAlign = "center";
      ctx.fillText(`Serial: ${qr.serial_number}`, width / 2, height - 8);
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = `qr_${qr.serial_number}.png`;
      a.click();
      setDownloading(false);
    };
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        border: "1px solid #e5e7eb",
        borderRadius: 14,
        background: "#f9fafb",
        padding: 18,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        position: "relative"
      }}
    >
      {qrImg && (
        <img src={qrImg} alt="QR" style={{ width: 96, height: 96, borderRadius: 8, background: "#fff" }} />
      )}
      <div style={{ flex: 1 }}>
        <div>
          <b>Short URL:</b>{" "}
          <a href={`/qr/${qr.short_url}`} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", textDecoration: "underline" }}>
            {window.location.origin}/qr/{qr.short_url}
          </a>
        </div>
        <div>
          <b>Destination:</b> {qr.destination_url}
        </div>
        <div>
          <b>Serial #:</b> {qr.serial_number}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <button
          onClick={() => setShowEdit(true)}
          style={{
            background: "#f1f5f9",
            color: "#222",
            border: "none",
            borderRadius: 6,
            padding: "7px 16px",
            fontWeight: 500,
            cursor: "pointer",
            fontSize: 15,
            marginBottom: 2,
            transition: "background 0.2s"
          }}
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          style={{
            background: "#fee2e2",
            color: "#b91c1c",
            border: "none",
            borderRadius: 6,
            padding: "7px 16px",
            fontWeight: 500,
            cursor: deleting ? "not-allowed" : "pointer",
            fontSize: 15,
            marginBottom: 2,
            transition: "background 0.2s"
          }}
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
        <button
          onClick={handleDownload}
          disabled={downloading}
          style={{
            background: "#f1f5f9",
            color: "#222",
            border: "none",
            borderRadius: 6,
            padding: "7px 16px",
            fontWeight: 500,
            cursor: downloading ? "not-allowed" : "pointer",
            fontSize: 15,
            marginBottom: 2,
            transition: "background 0.2s"
          }}
        >
          {downloading ? "Downloading..." : "Download PNG"}
        </button>
        <a
          href={qr.destination_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#2563eb",
            color: "#fff",
            borderRadius: 6,
            padding: "7px 16px",
            fontWeight: 500,
            textAlign: "center",
            textDecoration: "none",
            fontSize: 15,
            transition: "background 0.2s"
          }}
          onMouseOver={e => (e.currentTarget.style.background = "#1d4ed8")}
          onMouseOut={e => (e.currentTarget.style.background = "#2563eb")}
        >
          Test Redirect
        </a>
      </div>
      {showEdit && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50
          }}
        >
          <form
            onSubmit={handleEdit}
            style={{
              background: "#fff",
              padding: 32,
              borderRadius: 14,
              boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
              minWidth: 320,
              display: "flex",
              flexDirection: "column",
              gap: 16
            }}
          >
            <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Edit Redirect</h2>
            <input
              type="url"
              value={newDest}
              onChange={e => setNewDest(e.target.value)}
              required
              style={{
                padding: "12px 14px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                fontSize: 16,
                outline: "none",
                background: "#f9fafb"
              }}
            />
            {error && <div style={{ color: "#e11d48", fontSize: 15 }}>{error}</div>}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setShowEdit(false)}
                style={{
                  background: "#f1f5f9",
                  color: "#222",
                  border: "none",
                  borderRadius: 6,
                  padding: "8px 18px",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontSize: 15,
                  transition: "background 0.2s"
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "8px 18px",
                  fontWeight: 500,
                  cursor: saving ? "not-allowed" : "pointer",
                  fontSize: 15,
                  transition: "background 0.2s"
                }}
                onMouseOver={e => (e.currentTarget.style.background = "#1d4ed8")}
                onMouseOut={e => (e.currentTarget.style.background = "#2563eb")}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}