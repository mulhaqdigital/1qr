import QRCode from 'qrcode';

export async function generateQRCode(text: string): Promise<string> {
  return await QRCode.toDataURL(text, { margin: 2, width: 1000 });
} 