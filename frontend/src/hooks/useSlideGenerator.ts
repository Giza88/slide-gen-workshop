import { useState } from "react";
import type { SlideRequest } from "../types/api";

export function useSlideGenerator() {
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function generate(req: SlideRequest): Promise<void> {
    setLoading(true);
    setStatus("Generating...");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      });
      if (!res.ok) {
        const t = await res.text();
        setStatus(`Error ${res.status}: ${t || "unknown"}`);
        return;
      }
      const blob: Blob = await res.blob();
      const a = document.createElement("a") as HTMLAnchorElement;
      a.href = URL.createObjectURL(blob);
      a.download = "slides.pptx";
      a.click();
      URL.revokeObjectURL(a.href);
      setStatus("✅ Downloaded!");
    } catch {
      setStatus("Cannot reach backend. Is FastAPI running?");
    } finally {
      setLoading(false);
    }
  }

  return { status, loading, generate };
}
