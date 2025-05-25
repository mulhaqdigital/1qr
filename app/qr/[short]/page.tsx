import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";

export default async function QRRedirectPage({ params }: { params: { short: string } }) {
  const { data, error } = await supabase
    .from("qr_codes")
    .select("destination_url")
    .eq("short_url", params.short)
    .single();

  if (data?.destination_url) {
    redirect(data.destination_url);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">QR Not Found</h1>
      <p>The QR code you scanned does not exist or has been deleted.</p>
    </div>
  );
} 