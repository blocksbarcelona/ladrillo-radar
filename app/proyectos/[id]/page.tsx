import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlatformLogo } from "../../components/PlatformLogo";
import { OfficialDocumentActions } from "../../components/OfficialDocumentActions";
import { ProjectDocuments } from "../../components/ProjectDocuments";
import { UberleapCredit } from "../../components/UberleapCredit";
import {
  formatScore,
  getProject,
  getScoreBand,
  isPastProject,
  platformMeta,
  projects,
  SNAPSHOT_LABEL,
} from "../../../data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);

  if (!project) return {};

  return {
    title: `${project.name} — Auditoría · Ladrillo Radar`,
    description: `Análisis documental, inconsistencias, riesgos y promotor de ${project.name} en ${project.platform}.`,
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) notFound();

  const past = isPastProject(project);
  const platform = platformMeta[project.platform];

  return (
    <main id="detalle">
      <header className="site-header detail-header">
        <a className="brand" href="../../" aria-label="Volver a Ladrillo Radar">
          <span className="brand-mark" aria-hidden="true">LR</span>
          <span>Ladrillo Radar</span>
        </a>
        <nav aria-label="Navegación de la ficha">
          <a href="#carencias">Carencias</a>
          <a href="#empresa">Empresa</a>
          <a href="#documentos">Documentos</a>
        </nav>
        <a className="back-link" href="../../">← Todos los proyectos</a>
      </header>

      <section className="detail-hero">
        <div className="detail-breadcrumb">
          <a href="../../">Proyectos</a><span>/</span><span>{project.name}</span>
        </div>
        <div className="detail-hero-grid">
          <div className="detail-title">
            <div className="detail-platform-row">
              <PlatformLogo platform={project.platform} prefix="../../" />
              <span className={`state-pill ${past ? "state-past" : "state-current"}`}>
                {past ? "PROYECTO PASADO" : "PROYECTO ACTUAL"}
              </span>
            </div>
            <h1>{project.name}</h1>
            <p className="detail-location">{project.location}</p>
            <p className="detail-verdict">{project.verdict}</p>
          </div>
          <aside
            className={`detail-score score-band-${getScoreBand(project.score)}`}
            data-score-band={getScoreBand(project.score)}
            aria-label={`Puntuación ${formatScore(project.score)}, escala de 0 a 10`}
          >
            <span>PUNTUACIÓN DEL CORTE</span>
            <div><strong>{formatScore(project.score)}</strong></div>
            <p>Riesgo observable · {project.risk}</p>
          </aside>
        </div>

        <div className="detail-date-banner">
          <span>{project.date.type}</span>
          <strong>{project.date.label}</strong>
          <p>{project.date.note}</p>
        </div>

        <div className="detail-metrics">
          <div><span>RETORNO</span><strong>{project.returnLabel}</strong></div>
          <div><span>PLAZO</span><strong>{project.term}</strong></div>
          <div><span>IMPORTE</span><strong>{project.size}</strong></div>
          <div><span>GARANTÍA</span><strong>{project.guarantee}</strong></div>
          <div><span>LTV</span><strong>{project.ltv}</strong></div>
          <div><span>SALIDA</span><strong>{project.exit}</strong></div>
        </div>
      </section>

      <section className="detail-content">
        <div className="detail-section detail-summary" id="resumen">
          <div className="detail-section-heading">
            <span>01</span>
            <div><p>LECTURA RÁPIDA</p><h2>Lo mejor y lo que frena la nota</h2></div>
          </div>
          <div className="summary-columns">
            <div className="positive-box">
              <h3>A favor</h3>
              <ul>{project.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="warning-box">
              <h3>Vigilar</h3>
              <ul>{project.watch.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        </div>

        <div className="detail-section" id="carencias">
          <div className="detail-section-heading">
            <span>02</span>
            <div><p>AUDITORÍA DOCUMENTAL</p><h2>Carencias y riesgos pendientes</h2></div>
          </div>
          <div className="issues-list">
            {project.deficiencies.map((issue, index) => (
              <article className="issue-card" key={issue.title}>
                <div className="issue-index">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <span className={`severity severity-${issue.severity.toLowerCase()}`}>{issue.severity}</span>
                  <h3>{issue.title}</h3>
                  <p>{issue.detail}</p>
                </div>
                <div className="issue-impact">
                  <span>POR QUÉ IMPORTA</span>
                  <p>{issue.impact}</p>
                </div>
                <div className="issue-verify">
                  <span>QUÉ VERIFICAR</span>
                  <p>{issue.verify}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="detail-section calculation-section" id="inconsistencias">
          <div className="detail-section-heading">
            <span>03</span>
            <div><p>CÁLCULOS PROPIOS</p><h2>Inconsistencias y matices</h2></div>
          </div>
          <div className="calculation-grid">
            {project.inconsistencies.map((item) => (
              <article className="calculation-card" key={item.title}>
                <h3>{item.title}</h3>
                <div><span>PUBLICADO</span><p>{item.published}</p></div>
                <div className="formula"><span>CÁLCULO</span><strong>{item.calculation}</strong></div>
                <div><span>LECTURA</span><p>{item.reading}</p></div>
              </article>
            ))}
          </div>
        </div>

        <div className="detail-section" id="proyecto">
          <div className="detail-section-heading">
            <span>04</span>
            <div><p>FICHA NORMALIZADA</p><h2>El proyecto, dato a dato</h2></div>
          </div>
          <dl className="facts-grid">
            {project.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
                {fact.note && <p>{fact.note}</p>}
              </div>
            ))}
          </dl>
        </div>

        <div className="detail-section company-section" id="empresa">
          <div className="detail-section-heading inverse">
            <span>05</span>
            <div><p>PROMOTOR Y ESTRUCTURA</p><h2>Quién está detrás</h2></div>
          </div>
          <div className="company-caveat"><strong>LÍMITE DEL ANÁLISIS</strong><p>{project.company.caveat}</p></div>
          <div className="company-lead">
            <div>
              <span>NOMBRE PÚBLICO</span>
              <h3>{project.company.publicName}</h3>
              <p>{project.company.legalName}</p>
            </div>
            <div>
              <span>PLATAFORMA</span>
              <PlatformLogo platform={project.platform} prefix="../../" />
              <p>{platform.legalName}<br />{platform.register}</p>
            </div>
          </div>
          {project.company.summary && project.company.evidence ? (
            <>
              <div className="company-snapshot" aria-label="Indicadores empresariales destacados">
                {project.company.summary.map((item) => (
                  <div key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                    <p>{item.note}</p>
                  </div>
                ))}
              </div>
              <div className="company-evidence" aria-label="Comprobaciones sobre empresa y promotor">
                <div className="company-evidence-header" aria-hidden="true">
                  <span>COMPROBACIÓN</span><span>ESTADO</span><span>CONCLUSIÓN Y EVIDENCIA</span><span>FUENTES</span>
                </div>
                {project.company.evidence.map((item) => (
                  <article className="company-evidence-row" key={item.label}>
                    <h3>{item.label}</h3>
                    <div>
                      <span className={`company-status company-status-${item.status.toLowerCase().replace(" ", "-")}`}>
                        {item.status}
                      </span>
                    </div>
                    <p>{item.summary}</p>
                    <div className="company-evidence-source">
                      <small>{item.asOf}</small>
                      <div>
                        {item.sources.map((source) => (
                          <div className="company-evidence-document" key={`${item.label}-${source.label}`}>
                            <strong>{source.label}</strong>
                            <OfficialDocumentActions
                              projectUrl={project.projectUrl}
                              label={`${project.name} · ${source.label}`}
                              compact
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="company-grid">
              <div><span>IDENTIDAD</span><p>{project.company.identity}</p></div>
              <div><span>PERFIL</span><p>{project.company.profile}</p></div>
              <div><span>HISTORIAL</span><p>{project.company.trackRecord}</p></div>
              <div><span>ALINEACIÓN</span><p>{project.company.alignment}</p></div>
            </div>
          )}
        </div>

        <div className="detail-section" id="documentos">
          <div className="detail-section-heading">
            <span>06</span>
            <div><h2>Documentación</h2></div>
          </div>
          <ProjectDocuments
            documents={project.documents.map(({ name, status, note }) => ({
              name,
              status,
              note,
              located: status !== "No localizado",
            }))}
            eventDateTime={project.date.isoDateTime}
            eventLabel={project.date.label}
            initialPassed={past}
            projectUrl={project.projectUrl}
          />
        </div>

        <div className="detail-section questions-section" id="preguntas">
          <div className="detail-section-heading inverse">
            <span>07</span>
            <div><p>ANTES DE INVERTIR</p><h2>Preguntas que deben tener respuesta</h2></div>
          </div>
          <ol>
            {project.questions.map((question) => <li key={question}>{question}</li>)}
          </ol>
        </div>

        <div className="detail-section sources-section" id="fuentes">
          <div className="detail-section-heading">
            <span>08</span>
            <div><p>TRAZABILIDAD</p><h2>Fuentes utilizadas</h2></div>
          </div>
          <div className="sources-list">
            {project.sources.map((source, index) => (
              <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><strong>{source.label}</strong><p>{source.note}</p></div>
                <em>{source.type}</em>
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </div>
          <p className="analysis-note">
            Corte documental: {SNAPSHOT_LABEL.toLowerCase()}. La ficha parte de los informes,
            datos normalizados y documentos originales consultados en las plataformas. Las referencias
            documentales enlazan a la página oficial del proyecto, donde el usuario puede consultar o
            descargar manualmente los archivos; algunos requieren iniciar sesión. Tras la fecha y hora de
            apertura, el radar avisa automáticamente de que el acceso queda reservado a inversores. “No localizado”
            significa que no aparece en el material revisado y no prueba que el documento no exista.
          </p>
        </div>
      </section>

      <footer>
        <div><span className="brand-mark" aria-hidden="true">LR</span><strong>Ladrillo Radar</strong></div>
        <p>No es asesoramiento financiero. La inversión puede implicar pérdida de capital, retrasos e iliquidez.</p>
        <a href="../../">← Volver al radar</a>
        <UberleapCredit />
      </footer>
    </main>
  );
}
