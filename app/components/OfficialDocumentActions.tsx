"use client";

import { useState } from "react";

type WecityDocumentPayload = {
  result?: string;
  return?: {
    filename?: string;
    raw?: string;
  };
};

export function isEncodedWecityDocumentUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.hostname === "api.wecity.com" && parsed.pathname.endsWith("/doc");
  } catch {
    return false;
  }
}

function mimeTypeFromFilename(filename: string) {
  const extension = filename.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "pdf": return "application/pdf";
    case "doc": return "application/msword";
    case "docx": return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    case "xls": return "application/vnd.ms-excel";
    case "xlsx": return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    case "jpg":
    case "jpeg": return "image/jpeg";
    case "png": return "image/png";
    default: return "application/octet-stream";
  }
}

function decodeBase64(raw: string) {
  const binary = window.atob(raw.replace(/\s/g, ""));
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function platformLabel(url: string) {
  try {
    const hostname = new URL(url).hostname;
    if (hostname.includes("civislend.com")) return "Civislend";
    if (hostname.includes("urbanitae.com") || hostname.includes("urbanitae-prod-static-content")) return "Urbanitae";
    if (hostname.includes("wecity.com")) return "wecity";
  } catch {
    // The URL is also validated by the browser when the link is opened.
  }
  return "la plataforma";
}

async function fetchWecityDocument(url: string) {
  const payload = await new Promise<WecityDocumentPayload>((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "json";
    request.timeout = 30_000;
    request.setRequestHeader("Accept", "application/json");
    request.onload = () => {
      if (request.status !== 200) {
        reject(new Error(`wecity respondió con el estado ${request.status}.`));
        return;
      }

      try {
        const response = typeof request.response === "string"
          ? JSON.parse(request.response) as WecityDocumentPayload
          : request.response as WecityDocumentPayload;
        resolve(response);
      } catch {
        reject(new Error("wecity devolvió una respuesta que no se ha podido interpretar."));
      }
    };
    request.onerror = () => reject(new Error("No se ha podido conectar con wecity."));
    request.ontimeout = () => reject(new Error("wecity ha tardado demasiado en responder. Vuelve a intentarlo."));
    request.send();
  });
  const raw = payload.return?.raw;
  const upstreamFilename = payload.return?.filename ?? "documento-wecity.pdf";

  if (payload.result !== "OK" || !raw) {
    throw new Error("wecity no devolvió un archivo utilizable.");
  }

  const bytes = decodeBase64(raw);
  return new Blob([bytes], { type: mimeTypeFromFilename(upstreamFilename) });
}

export function OfficialDocumentActions({
  url,
  label,
  compact = false,
  restricted = false,
  accessUrl,
}: {
  url: string;
  label: string;
  compact?: boolean;
  restricted?: boolean;
  accessUrl?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  if (restricted) {
    const destination = accessUrl ?? url;
    const provider = platformLabel(destination);
    return (
      <div
        className={`official-document-actions${compact ? " official-document-actions-compact" : ""}`}
        data-official-document-url={url}
        data-document-access="restricted"
      >
        <div>
          <a href={destination} target="_blank" rel="noreferrer" aria-label={`Acceso en ${provider}: ${label}`}>
            Acceso en {provider} ↗
          </a>
        </div>
      </div>
    );
  }

  if (!isEncodedWecityDocumentUrl(url)) {
    return (
      <div
        className={`official-document-actions${compact ? " official-document-actions-compact" : ""}`}
        data-official-document-url={url}
      >
        <div>
          <a href={url} target="_blank" rel="noreferrer" aria-label={`Ver fuente oficial: ${label}`}>
            Ver fuente ↗
          </a>
        </div>
      </div>
    );
  }

  const viewDocument = async () => {
    setError(null);
    setNotice(null);
    setBusy(true);
    const previewWindow = window.open("", "_blank");

    if (previewWindow) {
      previewWindow.opener = null;
      previewWindow.document.title = "Preparando documento…";
      previewWindow.document.body.textContent = "Preparando documento oficial de wecity…";
    }

    try {
      const blob = await fetchWecityDocument(url);
      const blobUrl = URL.createObjectURL(blob);

      if (!previewWindow) {
        URL.revokeObjectURL(blobUrl);
        throw new Error("El navegador ha bloqueado la nueva pestaña. Permite ventanas emergentes y vuelve a intentarlo.");
      }

      previewWindow.location.replace(blobUrl);
      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 5 * 60_000);
      setNotice("Documento abierto en una nueva pestaña.");
    } catch (caught) {
      previewWindow?.close();
      setError(caught instanceof Error ? caught.message : "No se ha podido abrir el documento.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className={`official-document-actions${compact ? " official-document-actions-compact" : ""}`}
      data-official-document-url={url}
    >
      <div>
        <button type="button" onClick={viewDocument} disabled={busy} aria-label={`Ver PDF: ${label}`}>
          {busy ? "Abriendo…" : "Ver PDF"}
        </button>
      </div>
      {notice && <span className="official-document-notice" role="status">{notice}</span>}
      {error && <span className="official-document-error" role="alert">{error}</span>}
    </div>
  );
}
