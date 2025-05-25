// @ts-nocheck
import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";

type QRPageProps = {
  params: {
    short: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function QRRedirectPage({ params }: QRPageProps) {
  const { data } = await supabase
    .from("qr_codes")
    .select("destination_url")
    .eq("short_url", params.short)
    .single();

  if (data?.destination_url) {
    redirect(data.destination_url);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>QR Not Found</h1>
      <p>The QR code you scanned does not exist or has been deleted.</p>
    </div>
  );
} 