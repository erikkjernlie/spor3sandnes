import type { VercelRequest, VercelResponse } from "@vercel/node";
import { put, del, list } from "@vercel/blob";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const contentType = req.headers["content-type"] || "";
    if (!contentType.includes("multipart/form-data")) {
      return res.status(400).json({ error: "Expected multipart/form-data" });
    }

    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    const webRequest = new Request(`${protocol}://${host}${req.url}`, {
      method: "POST",
      headers: req.headers as any,
      body: req as any,
      // @ts-ignore
      duplex: "half",
    });

    const formData = await webRequest.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return res.status(400).json({ error: "Ingen fil valgt" });
    }

    if (file.type !== "application/pdf") {
      return res.status(400).json({ error: "Kun PDF-filer er tillatt" });
    }

    // Delete all old menu files first
    try {
      const { blobs } = await list({ prefix: "menu/" });
      if (blobs.length > 0) {
        await del(blobs.map((b) => b.url));
      }
    } catch {
      // Ignore cleanup errors
    }

    // Upload with unique timestamp filename — new URL every time, zero cache issues
    const timestamp = Date.now();
    const result = await put(`menu/meny-${timestamp}.pdf`, file, {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/pdf",
    });

    return res.status(200).json({ url: result.url, updatedAt: timestamp });
  } catch (error: any) {
    console.error("Upload failed:", error);
    return res.status(500).json({ error: error.message || "Opplasting feilet" });
  }
}
