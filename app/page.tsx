"use client";

import { useEffect, useMemo, useState } from "react";
import { PlatformLogo } from "./components/PlatformLogo";
import { UberleapCredit } from "./components/UberleapCredit";
import {
  formatScore,
  getScoreBand,
  isPastProject,
  projects,
  SNAPSHOT_DATE,
  SNAPSHOT_LABEL,
  type Platform,
  type Project,
  type Risk,
} from "../data/projects";

type SortMode = "nearest" | "farthest" | "score";
const SHOW_COMPARISON = false;

const methodology = [
  ["Garantía y cobertura", "20%", "Rango, alcance de la garantía, LTV total y colchón en ejecución"],
  ["Apalancamiento y equity", "15%", "LTC, fondos propios reales, subordinación y orden de desembolso"],
  ["Técnico y coste pendiente", "15%", "Licencia, urbanización, obra, presupuesto y coste a terminación"],
  ["Salida y comercialización", "15%", "Ventas, preventas, refinanciación y concentración de la demanda"],
  ["Promotor y capacidad", "10%", "Experiencia verificable, solvencia y cobertura de desviaciones"],
  ["Legal y regulatorio", "10%", "Titularidad, cargas, permisos y estructura contractual"],
  ["Coherencia documental", "10%", "Trazabilidad, vigencia y concordancia entre cifras y documentos"],
  ["Condiciones y retorno", "5%", "Remuneración frente a plazo, iliquidez, prórrogas y riesgo asumido"],
];

const platformOptions: Platform[] = ["Civislend", "Urbanitae", "wecity"];
const riskOrder: Risk[] = ["Medio", "Medio-alto", "Alto", "Muy alto"];
const availableRisks = riskOrder.filter((item) =>
  projects.some((project) => project.risk === item),
);

const day = 86_400_000;
const snapshotTime = new Date(`${SNAPSHOT_DATE}T12:00:00+02:00`).getTime();

function distanceFromSnapshot(project: Project) {
  return Math.abs(
    new Date(project.date.isoDateTime).getTime() - snapshotTime,
  ) / day;
}

function sortProjects(items: Project[], mode: SortMode) {
  return [...items].sort((a, b) => {
    if (mode === "score") return b.score - a.score;

    const difference = distanceFromSnapshot(a) - distanceFromSnapshot(b);
    return mode === "nearest" ? difference : -difference;
  });
}

function ProjectCard({ project, currentTime }: { project: Project; currentTime: number }) {
  const past = isPastProject(project, currentTime);

  return (
    <article className="project-card" id={project.id}>
      <a
        className="project-card-link"
        href={`proyectos/${project.id}/`}
        aria-labelledby={`project-title-${project.id}`}
      >
      <div className="project-card-topline">
        <PlatformLogo platform={project.platform} compact />
        <span className={`state-pill ${past ? "state-past" : "state-current"}`}>
          {past ? "PASADO" : "ACTUAL"}
        </span>
      </div>

      <div className="project-title-row">
        <div>
          <h3 id={`project-title-${project.id}`}>{project.name}</h3>
          <p>{project.location}</p>
        </div>
        <div
          className={`score-chip score-band-${getScoreBand(project.score)}`}
          data-score-band={getScoreBand(project.score)}
          aria-label={`${formatScore(project.score)}, escala de 0 a 10`}
        >
          <strong>{formatScore(project.score)}</strong>
        </div>
      </div>

      <div className="project-date">
        <span>{project.date.type}</span>
        <strong>{project.date.label}</strong>
      </div>

      <div className="card-metrics">
        <div>
          <span>RETORNO</span>
          <strong>{project.returnLabel}</strong>
        </div>
        <div>
          <span>PLAZO</span>
          <strong>{project.term}</strong>
        </div>
        <div>
          <span>IMPORTE</span>
          <strong>{project.size}</strong>
        </div>
        <div>
          <span>RIESGO</span>
          <strong>{project.risk}</strong>
        </div>
      </div>

      <p className="card-verdict">{project.verdict}</p>

      <div className="card-alerts">
        <span>PRINCIPALES ALERTAS</span>
        <ul>
          {project.watch.slice(0, 2).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <span className="detail-link">
        Ver auditoría completa
        <span aria-hidden="true">→</span>
      </span>
      </a>
    </article>
  );
}

export default function Home() {
  const [platform, setPlatform] = useState<"Todas" | Platform>("Todas");
  const [risk, setRisk] = useState<"Todos" | Risk>("Todos");
  const [sortMode, setSortMode] = useState<SortMode>("nearest");
  const [currentTime, setCurrentTime] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(Date.now()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const visibleProjects = useMemo(() => {
    const filtered = projects.filter(
      (project) =>
        (platform === "Todas" || project.platform === platform) &&
        (risk === "Todos" || project.risk === risk),
    );

    return sortProjects(filtered, sortMode);
  }, [platform, risk, sortMode]);

  const currentProjects = visibleProjects.filter((project) => !isPastProject(project, currentTime));
  const pastProjects = visibleProjects.filter((project) => isPastProject(project, currentTime));

  return (
    <main id="inicio">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Ladrillo Radar, inicio">
          <span className="brand-mark" aria-hidden="true">LR</span>
          <span>Ladrillo Radar</span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#proyectos">Proyectos</a>
          {SHOW_COMPARISON && <a href="#comparativa">Comparativa</a>}
          <a href="#metodo">Método</a>
        </nav>
        <span className="snapshot">CORTE · {SNAPSHOT_LABEL}</span>
      </header>

      <section className="overview">
        <div>
          <p className="eyebrow">ANÁLISIS INDEPENDIENTE · CROWDFUNDING INMOBILIARIO</p>
          <h1>Proyectos en radar</h1>
          <p className="overview-copy">
            Seis auditorías locales de Civislend, Urbanitae y wecity, normalizadas
            con sus fechas, cifras, documentación, promotor e inconsistencias.
          </p>
        </div>
        <div className="overview-stats" aria-label="Resumen del corte">
          <div><strong>{projects.length}</strong><span>analizados</span></div>
          <div><strong>{projects.filter((project) => !isPastProject(project, currentTime)).length}</strong><span>actuales</span></div>
          <div><strong>{projects.filter((project) => isPastProject(project, currentTime)).length}</strong><span>pasados</span></div>
        </div>
      </section>

      <section className="project-controls" id="proyectos" aria-label="Controles del radar">
        <div className="platform-picker">
          <button
            className={platform === "Todas" ? "active" : ""}
            onClick={() => setPlatform("Todas")}
            aria-pressed={platform === "Todas"}
          >
            <span className="all-platforms-mark">LR</span>
            <span>Todas</span>
          </button>
          {platformOptions.map((item) => (
            <button
              key={item}
              className={platform === item ? "active" : ""}
              onClick={() => setPlatform(item)}
              aria-pressed={platform === item}
            >
              <PlatformLogo platform={item} compact />
              <span className="sr-only">{item}</span>
            </button>
          ))}
        </div>

        <div className="select-controls">
          <label>
            <span>RIESGO</span>
            <select value={risk} onChange={(event) => setRisk(event.target.value as "Todos" | Risk)}>
              <option>Todos</option>
              {availableRisks.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span>ORDENAR</span>
            <select value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)}>
              <option value="nearest">Fecha · más cercanos</option>
              <option value="farthest">Fecha · más lejanos</option>
              <option value="score">Puntuación · mayor primero</option>
            </select>
          </label>
        </div>
      </section>

      <section className="projects-section current-section" aria-labelledby="current-title">
        <div className="list-heading">
          <div>
            <span className="section-index">01</span>
            <h2 id="current-title">Actuales y próximos</h2>
          </div>
          <p>{currentProjects.length} proyecto{currentProjects.length === 1 ? "" : "s"} en el filtro actual</p>
        </div>
        {currentProjects.length ? (
          <div className="project-grid">
            {currentProjects.map((project) => <ProjectCard project={project} currentTime={currentTime} key={project.id} />)}
          </div>
        ) : (
          <p className="empty-state">No hay proyectos actuales con estos filtros.</p>
        )}
      </section>

      <section className="projects-section past-section" aria-labelledby="past-title">
        <div className="list-heading">
          <div>
            <span className="section-index">02</span>
            <h2 id="past-title">Proyectos pasados</h2>
          </div>
          <p>La clasificación usa la fecha y hora publicadas y se actualiza automáticamente.</p>
        </div>
        {pastProjects.length ? (
          <div className="project-grid">
            {pastProjects.map((project) => <ProjectCard project={project} currentTime={currentTime} key={project.id} />)}
          </div>
        ) : (
          <p className="empty-state">No hay proyectos pasados con estos filtros.</p>
        )}
      </section>

      {SHOW_COMPARISON && (
      <section className="comparison-section" id="comparativa">
        <div className="section-heading inverse">
          <div>
            <p className="eyebrow">COMPARATIVA DIRECTA</p>
            <h2>Seis proyectos, un mismo criterio.</h2>
          </div>
          <p>
            La comparación usa la financiación total y la garantía final siempre
            que están disponibles, no sólo la primera disposición publicada.
          </p>
        </div>
        <div className="comparison-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Criterio</th>
                {projects.map((project) => (
                  <th key={project.id}>
                    <span>{project.platform}</span>
                    {project.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Fecha", ...projects.map((p) => p.date.label)],
                ["Estado", ...projects.map((p) => p.status)],
                ["Interés nominal", ...projects.map((p) => p.returnLabel)],
                ["Plazo", ...projects.map((p) => p.term)],
                ["Garantía", ...projects.map((p) => p.guarantee)],
                ["Apalancamiento", ...projects.map((p) => p.ltv)],
                ["Alineación", ...projects.map((p) => p.promoter)],
                ["Madurez", ...projects.map((p) => p.progress)],
                ["Salida", ...projects.map((p) => p.exit)],
              ].map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) => <td key={`${row[0]}-${index}`}>{cell}</td>)}
                </tr>
              ))}
              <tr className="total-row">
                <td>Puntuación</td>
                {projects.map((project) => <td key={project.id}>{formatScore(project.score)}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      )}

      <section className="method-section" id="metodo">
        <div className="method-intro">
          <p className="eyebrow">MÉTODO · ESCALA 0–10</p>
          <h2>Una puntuación auditable, no una caja negra.</h2>
          <p>
            La nota aplica ocho bloques ponderados de la metodología local. Las
            ausencias críticas limitan la puntuación y una rentabilidad alta no
            compensa una garantía, licencia o salida débiles. No es una
            probabilidad matemática de impago.
          </p>
        </div>
        <div className="method-list">
          {methodology.map(([title, index, description]) => (
            <div className="method-row" key={title}>
              <strong>{index}</strong>
              <span>{title}</span>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <div><span className="brand-mark" aria-hidden="true">LR</span><strong>Ladrillo Radar</strong></div>
        <p>
          Análisis independiente con corte a {SNAPSHOT_LABEL.toLowerCase()}. No es asesoramiento
          financiero: existe riesgo de pérdida de capital e iliquidez.
        </p>
        <a href="#inicio">Volver arriba ↑</a>
        <UberleapCredit />
      </footer>
    </main>
  );
}
