import type { VercelRequest, VercelResponse } from "@vercel/node";
import { list } from "@vercel/blob";

const FALLBACK_MENU_URL =
  "https://cdn.prod.website-files.com/63a2161950ebce0ce95268f9/6985d7bce3b0bcfd13203048_meny2026%20korrektur2.pdf";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Vercel-CDN-Cache-Control", "no-store");
  res.setHeader("CDN-Cache-Control", "no-store");

  try {
    // List all blobs with menu/ prefix and find the latest PDF by upload date
    const { blobs } = await list({ prefix: "menu/meny-" });

    if (blobs.length > 0) {
      // Sort by uploadedAt descending to get the newest
      blobs.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
      return res.redirect(302, blobs[0].url);
    }

    return res.redirect(302, FALLBACK_MENU_URL);
  } catch (error) {
    console.error("Menu redirect failed:", error);
    return res.redirect(302, FALLBACK_MENU_URL);
  }
}
