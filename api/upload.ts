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

    // Use the Web API Request to parse FormData
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

    // Delete old menu PDFs to avoid accumulating files
    try {
      const { blobs } = await list({ prefix: "menu/" });
      const toDelete = blobs.map((b) => b.url);
      if (toDelete.length > 0) {
        await del(toDelete);
      }
    } catch {
      // Ignore cleanup errors
    }

    // Upload the PDF with a unique name (random suffix = unique URL = no caching issues)
    const timestamp = Date.now();
    const result = await put(`menu/meny-${timestamp}.pdf`, file, {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/pdf",
    });

    // Store metadata pointing to the new unique URL
    const meta = { updatedAt: timestamp, url: result.url };
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
