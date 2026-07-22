"use client";

import { useEffect, useState } from "react";
import type { DocumentStatus } from "../../data/projects";

type PublicDocument = {
  name: string;
  status: DocumentStatus;
  note: string;
  located: boolean;
};

function statusClass(status: string) {
  return status
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll(" ", "-")
    .toLowerCase();
}

function useProjectPassed(eventDateTime: string, initialPassed: boolean) {
  const [passed, setPassed] = useState(initialPassed);

  useEffect(() => {
    const deadline = Date.parse(eventDateTime);
    let timer: number | undefined;

    const update = () => {
      const remaining = deadline - Date.now();

      if (remaining <= 0) {
        setPassed(true);
        return;
      }

      setPassed(false);
      timer = window.setTimeout(update, Math.min(remaining + 100, 60_000));
    };

    timer = window.setTimeout(update, 0);
    return () => window.clearTimeout(timer);
  }, [eventDateTime]);

  return passed;
}

export function ProjectDocuments({
  documents,
  eventDateTime,
  eventLabel,
  initialPassed,
  projectUrl,
}: {
  documents: PublicDocument[];
  eventDateTime: string;
  eventLabel: string;
  initialPassed: boolean;
  projectUrl: string;
}) {
  const passed = useProjectPassed(eventDateTime, initialPassed);

  return (
    <>
      {passed && (
        <div className="documents-access-notice" role="status">
          <span>ACCESO TRAS LA APERTURA</span>
          <div>
            <strong>Documentación reservada a inversores</strong>
            <p>
              Desde el {eventLabel}, la plataforma puede limitar el acceso a quienes invirtieron en
              el proyecto. Los documentos se consultan y descargan manualmente desde la página
              oficial del proyecto y el acceso puede exigir una cuenta inversora autorizada.
            </p>
          </div>
        </div>
      )}

      <div className="documents-list" data-document-access={passed ? "investors" : "public"}>
        {documents.map((document) => {
          const restrictedToInvestors = passed && document.located;
          const displayedStatus = restrictedToInvestors ? "Solo para inversores" : document.status;
          const content = (
            <>
              <div className="document-title">
                <strong>{document.name}</strong>
                {document.located && <span>Abrir página del proyecto ↗</span>}
              </div>
              <span className={`document-status status-${statusClass(displayedStatus)}`}>
                {displayedStatus}
              </span>
              <p>{document.note}</p>
            </>
          );

          return document.located ? (
            <a
              className="document-row document-link"
              href={projectUrl}
              target="_blank"
              rel="noreferrer"
              key={document.name}
            >
              {content}
            </a>
          ) : (
            <div className="document-row" key={document.name}>{content}</div>
          );
        })}
      </div>
    </>
  );
}
