import { put } from "@vercel/blob";

export const config = { runtime: "edge" };

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ error: "Ingen fil valgt" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    if (file.type !== "application/pdf") {
      return new Response(
        JSON.stringify({ error: "Kun PDF-filer er tillatt" }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }

    // Upload the PDF
    const result = await put("menu/current.pdf", file, {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/pdf",
    });

    // Store metadata with upload timestamp for cache busting
    const meta = { updatedAt: Date.now(), url: result.url };
    await put("menu/meta.json", JSON.stringify(meta), {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
    });

    return new Response(JSON.stringify({ url: result.url, ...meta }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Upload failed:", error);
    return new Response(JSON.stringify({ error: "Opplasting feilet" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
