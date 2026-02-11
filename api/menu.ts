import type { VercelRequest, VercelResponse } from "@vercel/node";
import { list } from "@vercel/blob";

// Fallback to the external Webflow-hosted menu if no blob upload exists yet
const FALLBACK_MENU_URL =
  "https://cdn.prod.website-files.com/63a2161950ebce0ce95268f9/6985d7bce3b0bcfd13203048_meny2026%20korrektur2.pdf";

function noCacheHeaders(res: VercelResponse) {
  res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("CDN-Cache-Control", "no-store");
  res.setHeader("Vercel-CDN-Cache-Control", "no-store");
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  noCacheHeaders(res);

  try {
    const { blobs } = await list({ prefix: "menu/meta.json", limit: 1 });

    if (blobs.length > 0) {
      const metaRes = await fetch(blobs[0].url, { cache: "no-store" });
      if (metaRes.ok) {
        const meta = await metaRes.json();
        const pdfUrl = `${meta.url}?v=${meta.updatedAt}`;
        return res.redirect(302, pdfUrl);
      }
    }

    return res.redirect(302, FALLBACK_MENU_URL);
  } catch (error) {
    console.error("Menu redirect failed:", error);
    return res.redirect(302, FALLBACK_MENU_URL);
  }
}
