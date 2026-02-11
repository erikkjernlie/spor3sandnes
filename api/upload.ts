import type { VercelRequest, VercelResponse } from "@vercel/node";
import { put } from "@vercel/blob";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Parse multipart form data from the raw body
    const contentType = req.headers["content-type"] || "";
    if (!contentType.includes("multipart/form-data")) {
      return res.status(400).json({ error: "Expected multipart/form-data" });
    }

    // Use the Web API Request to parse FormData
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    const webRequest = new Request(`${protocol}://${host}${req.url}`, {
      method: "POST",
      headers: req.headers as any,
      body: req as any,
      // @ts-ignore - duplex needed for streaming body
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

    // Upload the PDF
    const result = await put("menu/current.pdf", file, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/pdf",
    });

    // Store metadata with upload timestamp for cache busting
    const meta = { updatedAt: Date.now(), url: result.url };
    await put("menu/meta.json", JSON.stringify(meta), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });

    return res.status(200).json({ url: result.url, ...meta });
  } catch (error: any) {
    console.error("Upload failed:", error);
    return res.status(500).json({ error: error.message || "Opplasting feilet" });
  }
}
