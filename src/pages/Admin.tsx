import { useRef, useState, useEffect } from "react";
import { Upload, FileText, CheckCircle, AlertCircle, ArrowLeft, Eye } from "lucide-react";

const Admin = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [currentMenuUrl, setCurrentMenuUrl] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    // Check if there's a current menu uploaded
    fetch("/api/menu", { method: "HEAD", redirect: "manual" })
      .then((res) => {
        const location = res.headers.get("Location");
        if (location) {
          setCurrentMenuUrl(location);
        }
      })
      .catch(() => {});
  }, []);

  async function handleUpload() {
    if (!file) {
      setStatus({ type: "error", message: "Velg en PDF-fil først" });
      return;
    }

    if (file.type !== "application/pdf") {
      setStatus({ type: "error", message: "Kun PDF-filer er tillatt" });
      return;
    }

    setIsUploading(true);
    setStatus(null);

    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });

      // Read the raw text first to avoid JSON parse errors on empty/HTML responses
      const raw = await res.text();
      let data: any;
      try {
        data = JSON.parse(raw);
      } catch {
        throw new Error(
          `Serveren svarte med uventet format (${res.status}). Sjekk at API-rutene er deployet på Vercel.`
        );
      }

      if (!res.ok) {
        throw new Error(data.error || "Opplasting feilet");
      }

      setStatus({ type: "success", message: "Menyen er oppdatert!" });
      setCurrentMenuUrl(`${data.url}?v=${data.updatedAt}`);
      setLastUpdated(new Date(data.updatedAt).toLocaleString("nb-NO"));
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
    } catch (err: any) {
      setStatus({ type: "error", message: err.message || "Noe gikk galt" });
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="min-h-screen bg-pub-darker">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-pub-gold/70 hover:text-pub-gold transition-colors text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Tilbake til forsiden
          </a>
          <h1 className="text-3xl font-serif font-bold text-pub-gold">
            Oppdater meny
          </h1>
          <p className="text-pub-warm/60 mt-2">
            Last opp en ny meny-PDF. Den erstatter den nåværende menyen på
            nettsiden umiddelbart.
          </p>
        </div>

        {/* Current menu */}
        {currentMenuUrl && (
          <div className="card p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-pub-gold" />
                <div>
                  <p className="text-pub-warm font-medium">Nåværende meny</p>
                  {lastUpdated && (
                    <p className="text-pub-warm/50 text-sm">
                      Oppdatert: {lastUpdated}
                    </p>
                  )}
                </div>
              </div>
              <a
                href="/api/menu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-pub-gold hover:text-pub-gold-light transition-colors"
              >
                <Eye className="w-4 h-4" />
                Vis meny
              </a>
            </div>
          </div>
        )}

        {/* Upload form */}
        <div className="card p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-pub-warm/70 text-sm font-medium mb-2">
                Velg PDF-fil
              </label>
              <div
                className="border-2 border-dashed border-pub-wood/40 rounded-lg p-8 text-center cursor-pointer hover:border-pub-gold/50 transition-colors"
                onClick={() => inputRef.current?.click()}
              >
                <Upload className="w-8 h-8 text-pub-gold/50 mx-auto mb-3" />
                {file ? (
                  <p className="text-pub-warm">
                    <span className="font-medium">{file.name}</span>
                    <span className="text-pub-warm/50 ml-2">
                      ({(file.size / 1024 / 1024).toFixed(1)} MB)
                    </span>
                  </p>
                ) : (
                  <p className="text-pub-warm/50">
                    Klikk for å velge en PDF-fil
                  </p>
                )}
                <input
                  ref={inputRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    setFile(e.target.files?.[0] || null);
                    setStatus(null);
                  }}
                />
              </div>
            </div>

            {/* Status message */}
            {status && (
              <div
                className={`flex items-center gap-3 p-4 rounded-lg ${
                  status.type === "success"
                    ? "bg-green-900/30 border border-green-700/30"
                    : "bg-red-900/30 border border-red-700/30"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                )}
                <p
                  className={
                    status.type === "success"
                      ? "text-green-300"
                      : "text-red-300"
                  }
                >
                  {status.message}
                </p>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={isUploading || !file}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isUploading ? "Laster opp..." : "Last opp ny meny"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
