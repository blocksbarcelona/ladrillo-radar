export function OfficialDocumentActions({
  projectUrl,
  label,
  compact = false,
}: {
  projectUrl: string;
  label: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`official-document-actions${compact ? " official-document-actions-compact" : ""}`}
      data-official-project-url={projectUrl}
    >
      <div>
        <a
          href={projectUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Abrir la página oficial del proyecto para consultar: ${label}`}
        >
          Abrir página del proyecto ↗
        </a>
      </div>
    </div>
  );
}
