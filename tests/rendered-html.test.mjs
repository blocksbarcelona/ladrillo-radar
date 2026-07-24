import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";
import {
  getScoreBand,
  isPastProject,
  isProjectWithinRetention,
  PAST_PROJECT_RETENTION_DAYS,
  projects,
} from "../data/projects.ts";

const root = new URL("../dist/client/", import.meta.url);
const cloudflareToken = "ba97714010c641e8a21caf29e648a45f";

function assertCloudflareAnalytics(html) {
  const beaconTags = [
    ...html.matchAll(/<script[^>]*src="https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js"[^>]*>/g),
  ];

  assert.equal(beaconTags.length, 1);
  assert.match(beaconTags[0][0], new RegExp(cloudflareToken));
}

function assertUberleapCredit(html) {
  assert.match(html, new RegExp(`© ${new Date().getFullYear()} · Desarrollo por`));
  assert.match(html, /href="https:\/\/uberleap\.com\/"[^>]*>Uberleap<\/a>/);
}

test("exports the temporary maintenance homepage without analyses", async () => {
  const html = await readFile(new URL("index.html", root), "utf8");

  assert.match(html, /Ladrillo Radar/);
  assert.match(html, /Estamos mejorando Ladrillo Radar/);
  assert.match(html, /Mejora en curso/);
  assert.match(html, /Volveremos pronto/);
  assert.doesNotMatch(
    html,
    /Mientras dura esta mejora, los análisis no se muestran públicamente/,
  );
  assert.doesNotMatch(html, /class="maintenance-notice"/);
  assert.match(html, /Ladrillo Radar — Estamos mejorando/);
  assert.doesNotMatch(html, /Actuales y próximos|Proyectos pasados|COMPARATIVA DIRECTA/);
  assert.doesNotMatch(html, /class="project-card|href="proyectos\//);
  for (const project of projects) {
    assert.doesNotMatch(html, new RegExp(project.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(html, /\.\/assets\//);
  assert.doesNotMatch(html, /(?:href|src)=["']\/assets\//);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
  assert.match(html, /property="og:site_name" content="Ladrillo Radar"/);
  assert.match(html, /property="og:image" content="[^"]*\/og\.png\?v=2"/);
  assert.match(html, /property="og:title" content="Ladrillo Radar — Estamos mejorando"/);
  assert.doesNotMatch(html, /Proyectos de Civislend|Fichas documentales de Civislend/);
  assertCloudflareAnalytics(html);
  assertUberleapCredit(html);

  await Promise.all([
    access(new URL(".nojekyll", root)),
    access(new URL("og.png", root)),
    access(new URL("favicon.png", root)),
    access(new URL("logos/civislend.svg", root)),
    access(new URL("logos/urbanitae.svg", root)),
    access(new URL("logos/wecity.png", root)),
  ]);
});

test("colors only the score number with the five exact bands", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /--score-number: #008a50/);
  assert.match(css, /--score-number: #5d9e2f/);
  assert.match(css, /--score-number: #b27b00/);
  assert.match(css, /--score-number: #e85d04/);
  assert.match(css, /--score-number: #d92d3a/);
  assert.doesNotMatch(css, /--score-bg|background: var\(--score/);
  assert.match(css, /\.score-chip strong \{ color: var\(--score-number\);/);
  assert.match(css, /\.detail-score strong \{ color: var\(--score-number\);/);
  assert.match(css, /\.score-chip strong \{[^}]*font-size: 32px/);
  assert.match(css, /\.detail-score strong \{[^}]*font-size: 78px/);
  assert.deepEqual(
    [9, 8.99, 7, 6.99, 6, 5.99, 5, 4.99].map(getScoreBand),
    ["green-strong", "green-soft", "green-soft", "yellow", "yellow", "orange", "orange", "red"],
  );
});

test("keeps project-detail readable text at the homepage-card body size", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /Project-detail readability floor: matches the 15 px body copy used in homepage cards/);
  assert.match(css, /\.official-document-actions button,[\s\S]*font-size: 15px !important;/);
});

test("applies the enhanced company diligence to every wecity project", () => {
  const requiredChecks = [
    "Identidad y perímetro",
    "Presencia real",
    "Experiencia comparable",
    "Historial en plataformas",
    "Cuentas depositadas",
    "Solvencia y liquidez",
    "Incidencias",
    "Alineación económica",
  ];
  const wecityProjects = projects.filter((project) => project.platform === "wecity");

  assert.equal(wecityProjects.length, 2);
  for (const project of wecityProjects) {
    assert.equal(project.company.summary?.length, 4);
    assert.deepEqual(project.company.evidence?.map((item) => item.label), requiredChecks);
    for (const item of project.company.evidence ?? []) {
      assert.ok(item.asOf.length > 0);
      assert.ok(item.sources.length > 0);
      for (const source of item.sources) {
        const url = new URL(source.url);
        assert.equal(url.protocol, "https:");
        assert.equal(url.hostname, "api.wecity.com");
      }
    }
  }
});

test("defines one canonical official page for every project", () => {
  const expectedProjectUrls = new Map([
    ["toboso-madrid", "https://www.civislend.com/proyecto/963"],
    ["residencial-mas-marti", "https://www.civislend.com/proyecto/966"],
    ["urban-suites-alicante", "https://www.civislend.com/proyecto/978"],
    ["vivaldi-ii", "https://urbanitae.com/es/proyecto/P000499/?goToTab=documents"],
    ["residencial-altay", "https://urbanitae.com/es/proyecto/P000498/?goToTab=documents"],
    ["valencia-mirador-sur", "https://urbanitae.com/es/proyecto/P000501/?goToTab=documents"],
    ["madrid-atlas-nuevo-ahijones", "https://www.wecity.com/oportunidades/madrid-atlas-nuevo-ahijones/"],
    ["malaga-benahavis", "https://www.wecity.com/oportunidades/malaga-benahavis/"],
    ["talvion-puerto-sagunto", "https://www.civislend.com/proyecto/984"],
  ]);

  assert.equal(projects.length, expectedProjectUrls.size);
  for (const project of projects) {
    assert.equal(project.projectUrl, expectedProjectUrls.get(project.id));
    assert.equal(new URL(project.projectUrl).protocol, "https:");
  }
});

test("uses an exact date and time to move projects to the past", () => {
  for (const project of projects) {
    assert.match(project.date.isoDateTime, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+02:00$/);
    assert.match(project.date.label, /\d{2}:\d{2} CEST$/);

    const deadline = Date.parse(project.date.isoDateTime);
    assert.equal(isPastProject(project, deadline - 1), false);
    assert.equal(isPastProject(project, deadline), true);
  }
});

test("keeps past projects visible for 30 full days", () => {
  assert.equal(PAST_PROJECT_RETENTION_DAYS, 30);

  for (const project of projects) {
    const opening = Date.parse(project.date.isoDateTime);
    const retentionDeadline = opening + PAST_PROJECT_RETENTION_DAYS * 24 * 60 * 60 * 1_000;

    assert.equal(isProjectWithinRetention(project, opening - 1), true);
    assert.equal(isProjectWithinRetention(project, retentionDeadline - 1), true);
    assert.equal(isProjectWithinRetention(project, retentionDeadline), false);
  }
});

for (const id of [
  "residencial-mas-marti",
  "urban-suites-alicante",
  "toboso-madrid",
  "vivaldi-ii",
  "residencial-altay",
  "valencia-mirador-sur",
  "madrid-atlas-nuevo-ahijones",
  "malaga-benahavis",
  "talvion-puerto-sagunto",
]) {
  test(`exports the complete detail page for ${id}`, async () => {
    const html = await readFile(new URL(`proyectos/${id}/index.html`, root), "utf8");

    assert.match(html, /Estado y comprobaciones pendientes/);
    assert.match(html, /Diferencias objetivas entre fuentes/);
    assert.match(html, /Quién está detrás/);
    const companyHeadingIndex = html.indexOf("Quién está detrás");
    const analysisLimitIndex = html.indexOf("LÍMITE DEL ANÁLISIS");
    const companyLeadIndex = html.indexOf('class="company-lead"');
    assert.ok(companyHeadingIndex < analysisLimitIndex && analysisLimitIndex < companyLeadIndex);
    assert.match(html, /<h2>Documentación<\/h2>/);
    assert.doesNotMatch(html, /CONTROL DE EVIDENCIAS|Documentación localizada/);
    assert.match(html, /data-document-access="(?:public|investors)"/);
    assert.match(html, /Documentación reservada a inversores|Abrir página del proyecto/);
    assert.match(html, /Preguntas que deben tener respuesta/);
    assert.match(html, /escala de 0 a 10/);
    assert.match(html, /class="detail-score score-band-(?:green-strong|green-soft|yellow|orange|red)" data-score-band=/);
    const documentLinks = [...html.matchAll(/<a class="document-row document-link" href="([^"]+)"/g)]
      .map((match) => match[1].replaceAll("&amp;", "&"));
    const officialSourceLinks = [...html.matchAll(/data-official-project-url="([^"]+)"/g)]
      .map((match) => match[1].replaceAll("&amp;", "&"));
    const project = projects.find((item) => item.id === id);
    assert.ok(project);
    assert.ok(documentLinks.length + officialSourceLinks.length > 0, "cada ficha debe enlazar su página oficial");
    for (const link of [...documentLinks, ...officialSourceLinks]) {
      assert.equal(link, project.projectUrl);
    }
    assert.doesNotMatch(
      html,
      /href="[^"]*(?:api\.wecity\.com\/opportunities\/\d+\/doc|urbanitae-prod-static-content\/project\/P\d+\/public-document|civislend\.com\/document\/)/,
    );
    assert.doesNotMatch(html, />Ver PDF<|>Ver documento|>Descargar<|Fuente oficial \(JSON\)/);
    assert.doesNotMatch(html, /Archivado localmente|repositorio local|archivo local|servidor local|\/Volumes\//i);
    assert.doesNotMatch(html, /\/10/);
    assert.match(html, /\.\.\/\.\.\/assets\//);
    assert.doesNotMatch(html, /(?:href|src)=["']\/assets\//);
    assertCloudflareAnalytics(html);
    assertUberleapCredit(html);
  });
}

test("publishes the complete neutral Talvion audit from the protected originals", async () => {
  const html = await readFile(new URL("proyectos/talvion-puerto-sagunto/index.html", root), "utf8");

  assert.match(html, /6\.640\.125 €/);
  assert.match(html, /10\.300\.000 €/);
  assert.match(html, /5\.973\.843,43 €/);
  assert.match(html, /ARCELORMITTAL ESPAÑA, S\.A\./);
  assert.match(html, /ZYRON HOME, S\.L\./);
  assert.match(html, /WHITE INVESTING RE, S\.A\./);
  assert.match(html, /score-band-orange/);
  assert.match(html, /data-document-access="public"/);
  assert.match(html, /href="https:\/\/www\.civislend\.com\/proyecto\/984"/);
  assert.doesNotMatch(html, /href="https:\/\/www\.civislend\.com\/document\//);
  assert.doesNotMatch(html, /no se ha extraído|no se han extraído|No descargado durante esta revisión/i);
});

test("publishes the compact company diligence for Málaga Benahavís", async () => {
  const html = await readFile(new URL("proyectos/malaga-benahavis/index.html", root), "utf8");

  assert.match(html, /Indicadores empresariales destacados/);
  assert.match(html, /Identidad y perímetro/);
  assert.match(html, /Cuentas depositadas/);
  assert.match(html, /Solvencia y liquidez/);
  assert.match(html, /company-status-contradictorio/);
  assert.match(html, /Impulsa Proyectos Inmobiliarios S\.L\./);
  assert.match(html, />Abrir página del proyecto ↗<\/a>/);
  assert.doesNotMatch(html, />Ver PDF<\/button>|>Descargar<\/button>|Fuente oficial \(JSON\)/);

  const evidenceLinks = [...html.matchAll(/data-official-project-url="([^"]+)"/g)]
    .map((match) => match[1].replaceAll("&amp;", "&"));
  assert.ok(evidenceLinks.length >= 8);
  for (const link of evidenceLinks) {
    assert.equal(link, "https://www.wecity.com/oportunidades/malaga-benahavis/");
  }
});

test("publishes the compact company diligence for Madrid Atlas through its project page", async () => {
  const html = await readFile(new URL("proyectos/madrid-atlas-nuevo-ahijones/index.html", root), "utf8");

  assert.match(html, /Indicadores empresariales destacados/);
  assert.match(html, /Capital circulante de 21\.000 €|capital circulante de 21\.000 €/);
  assert.match(html, /company-status-contradictorio/);
  assert.match(html, /Impulsa Proyectos Inmobiliarios S\.L\./);
  assert.match(html, />Abrir página del proyecto ↗<\/a>/);
  assert.match(html, /data-document-access="investors"/);
  assert.doesNotMatch(html, />Ver PDF<\/button>/);
  assert.match(html, /href="https:\/\/www\.wecity\.com\/oportunidades\/madrid-atlas-nuevo-ahijones\/"/);

  const evidenceLinks = [...html.matchAll(/data-official-project-url="([^"]+)"/g)]
    .map((match) => match[1].replaceAll("&amp;", "&"));
  assert.ok(evidenceLinks.length >= 8);
  assert.ok(evidenceLinks.every((link) => link === "https://www.wecity.com/oportunidades/madrid-atlas-nuevo-ahijones/"));
});

test("publishes the complete company diligence for every project", async () => {
  const projectPages = await readdir(new URL("proyectos/", root), { withFileTypes: true });
  for (const page of projectPages.filter((entry) => entry.isDirectory())) {
    const html = await readFile(new URL(`proyectos/${page.name}/index.html`, root), "utf8");
    assert.match(html, /Indicadores empresariales destacados/, `${page.name}: faltan indicadores empresariales`);
    assert.equal((html.match(/class="company-evidence-row"/g) ?? []).length, 8, `${page.name}: la matriz debe tener ocho comprobaciones`);
    for (const label of [
      "Identidad y perímetro",
      "Presencia real",
      "Experiencia comparable",
      "Historial en plataformas",
      "Cuentas depositadas",
      "Solvencia y liquidez",
      "Incidencias",
      "Alineación económica",
    ]) {
      assert.match(html, new RegExp(label), `${page.name}: falta ${label}`);
    }
  }
});

test("uses only canonical project-page actions for company evidence", async () => {
  const toboso = await readFile(new URL("proyectos/toboso-madrid/index.html", root), "utf8");
  assert.match(toboso, />Abrir página del proyecto ↗<\/a>/);
  assert.doesNotMatch(toboso, /Acceso en |Ver fuente ↗|Ver PDF/);
  assert.doesNotMatch(toboso, /href="https:\/\/www\.civislend\.com\/document\//);

  const vivaldi = await readFile(new URL("proyectos/vivaldi-ii/index.html", root), "utf8");
  assert.match(vivaldi, /href="https:\/\/urbanitae\.com\/es\/proyecto\/P000499\/\?goToTab=documents"/);
  assert.doesNotMatch(vivaldi, /href="[^"]*urbanitae-prod-static-content/);
});
