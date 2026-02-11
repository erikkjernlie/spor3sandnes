import { list } from "@vercel/blob";

export const config = { runtime: "edge" };

// Fallback to the external Webflow-hosted menu if no blob upload exists yet
const FALLBACK_MENU_URL =
  "https://cdn.prod.website-files.com/63a2161950ebce0ce95268f9/6985d7bce3b0bcfd13203048_meny2026%20korrektur2.pdf";

export default async function handler(): Promise<Response> {
  try {
    // List blobs with the menu/meta.json prefix to find the metadata
    const { blobs } = await list({ prefix: "menu/meta.json", limit: 1 });

    if (blobs.length > 0) {
      // Fetch the meta.json to get the timestamp
      const metaRes = await fetch(blobs[0].url, { cache: "no-store" });
      if (metaRes.ok) {
        const meta = await metaRes.json();
        // Redirect to the PDF with a cache-busting version param
        const pdfUrl = `${meta.url}?v=${meta.updatedAt}`;
        return new Response(null, {
          status: 302,
          headers: {
            Location: pdfUrl,
            "Cache-Control": "public, max-age=86400, s-maxage=86400",
          },
        });
      }
    }

    // No uploaded menu yet — redirect to fallback
    return new Response(null, {
      status: 302,
      headers: { Location: FALLBACK_MENU_URL },
    });
  } catch (error) {
    console.error("Menu redirect failed:", error);
    // On error, fall back to external URL
    return new Response(null, {
      status: 302,
      headers: { Location: FALLBACK_MENU_URL },
    });
  }
}
