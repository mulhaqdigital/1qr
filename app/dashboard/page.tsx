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

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-[80vh] bg-slate-50 py-8 px-2 sm:px-4">
      <div className="container max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Dashboard</h1>
        <form
          onSubmit={handleCreate}
          className="flex flex-col sm:flex-row gap-3 mb-6 items-stretch"
        >
          <input
            type="url"
            placeholder="Destination URL"
            value={destinationUrl}
            onChange={e => setDestinationUrl(e.target.value)}
            required
            className="flex-1 min-w-0 px-4 py-3 rounded-lg border border-gray-200 text-base outline-none bg-slate-50 focus:ring-2 focus:ring-blue-200"
          />
          <button
            type="submit"
            disabled={creating}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-3 text-base shadow transition w-full sm:w-auto"
          >
            {creating ? "Creating..." : "Create QR"}
          </button>
        </form>
        {error && <div className="text-rose-600 text-sm text-center mb-4">{error}</div>}
        <div>
          {loadingQrs ? (
            <div className="text-center text-gray-500 py-8">Loading QR codes...</div>
          ) : qrCodes.length === 0 ? (
            <div className="text-center text-gray-400 py-8">No QR codes yet.</div>
          ) : (
            <div className="flex flex-col gap-4">
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
    <div className="flex flex-col sm:flex-row items-center gap-4 border border-gray-200 rounded-xl bg-slate-50 p-4 shadow-sm relative w-full">
      {qrImg && (
        <img src={qrImg} alt="QR" className="w-24 h-24 rounded bg-white object-cover mb-2 sm:mb-0" />
      )}
      <div className="flex-1 w-full">
        <div className="break-all">
          <b>Short URL:</b>{" "}
          <a href={`/qr/${qr.short_url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">
            {typeof window !== "undefined" ? window.location.origin : ""}/qr/{qr.short_url}
          </a>
        </div>
        <div className="break-all">
          <b>Destination:</b> {qr.destination_url}
        </div>
        <div>
          <b>Serial #:</b> {qr.serial_number}
        </div>
      </div>
      <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0">
        <button
          onClick={() => setShowEdit(true)}
          className="bg-slate-100 text-gray-800 rounded px-4 py-2 font-medium text-sm hover:bg-slate-200 transition w-full sm:w-auto"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="bg-rose-100 text-rose-700 rounded px-4 py-2 font-medium text-sm hover:bg-rose-200 transition w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="bg-slate-100 text-gray-800 rounded px-4 py-2 font-medium text-sm hover:bg-slate-200 transition w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {downloading ? "Downloading..." : "Download PNG"}
        </button>
        <a
          href={qr.destination_url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 font-medium text-sm text-center transition w-full sm:w-auto"
        >
          Open Redirect
        </a>
      </div>
      {showEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            onSubmit={handleEdit}
            className="bg-white p-6 rounded-xl shadow-xl min-w-[90vw] max-w-xs flex flex-col gap-4"
          >
            <h2 className="font-bold text-lg mb-2">Edit Redirect</h2>
            <input
              type="url"
              value={newDest}
              onChange={e => setNewDest(e.target.value)}
              required
              className="px-4 py-3 rounded-lg border border-gray-200 text-base outline-none bg-slate-50 focus:ring-2 focus:ring-blue-200"
            />
            {error && <div className="text-rose-600 text-sm">{error}</div>}
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowEdit(false)}
                className="bg-slate-100 text-gray-800 rounded px-4 py-2 font-medium text-sm hover:bg-slate-200 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 font-medium text-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
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