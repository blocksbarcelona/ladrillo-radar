"use client";

import { useEffect, useState } from "react";
import type { Project } from "../../data/projects";

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
}: {
  documents: Project["documents"];
  eventDateTime: string;
  eventLabel: string;
  initialPassed: boolean;
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
              Desde el {eventLabel}, los documentos ya no están disponibles para todo el mundo:
              la plataforma limita el acceso a quienes invirtieron en el proyecto. Los enlaces se
              conservan como referencia oficial y pueden exigir una cuenta inversora autorizada.
            </p>
          </div>
        </div>
      )}

      <div className="documents-list" data-document-access={passed ? "investors" : "public"}>
        {documents.map((document) => {
          const restrictedToInvestors = passed && Boolean(document.url);
          const displayedStatus = restrictedToInvestors ? "Solo para inversores" : document.status;
          const content = (
            <>
              <div className="document-title">
                <strong>{document.name}</strong>
                {document.url && (
                  <span>{restrictedToInvestors ? "Acceso para inversores ↗" : "Ver documento ↗"}</span>
                )}
              </div>
              <span className={`document-status status-${statusClass(displayedStatus)}`}>
                {displayedStatus}
              </span>
              <p>{document.note}</p>
            </>
          );

          return document.url ? (
            <a
              className="document-row document-link"
              href={document.url}
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
