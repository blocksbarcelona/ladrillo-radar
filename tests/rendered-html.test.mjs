import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
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

test("exports the complete static radar", async () => {
  const html = await readFile(new URL("index.html", root), "utf8");

  assert.match(html, /Ladrillo Radar/);
  assert.match(html, /Actuales y próximos/);
  assert.match(html, /Proyectos pasados/);
  assert.match(
    html,
    /Se conservan durante (?:<!-- -->)?30(?:<!-- -->)? días desde su fecha y hora de apertura/,
  );
  assert.match(html, /Fecha · más cercanos/);
  assert.match(html, /Residencial Mas Martí/);
  assert.match(html, /Urban Suites Alicante/);
  assert.match(html, /Toboso Madrid/);
  assert.match(html, /Vivaldi II/);
  assert.match(html, /Residencial Altay/);
  assert.match(html, /Madrid Atlas Nuevo Ahijones/);
  assert.match(html, /proyectos\/residencial-mas-marti\//);
  assert.match(html, /proyectos\/vivaldi-ii\//);
  assert.match(html, /proyectos\/residencial-altay\//);
  assert.match(html, /proyectos\/madrid-atlas-nuevo-ahijones\//);
  const projectCardLinks = [...html.matchAll(/<a class="project-card-link" href="proyectos\/([^\"]+)\/"/g)];
  assert.equal(projectCardLinks.length, 6);
  assert.doesNotMatch(html, /<a class="detail-link"/);
  assert.match(html, /6,5, escala de 0 a 10/);
  assert.match(html, /7,1, escala de 0 a 10/);
  assert.match(html, /2,5, escala de 0 a 10/);
  assert.match(html, /score-chip score-band-yellow" data-score-band="yellow" aria-label="6,5/);
  assert.match(html, /score-chip score-band-orange" data-score-band="orange" aria-label="5,5/);
  assert.match(html, /score-chip score-band-green-soft" data-score-band="green-soft" aria-label="7,1/);
  assert.match(html, /score-chip score-band-red" data-score-band="red" aria-label="4,0/);
  assert.doesNotMatch(html, /COMPARATIVA DIRECTA|href="\#comparativa"/);
  assert.doesNotMatch(html, /\/10/);
  assert.match(html, /logos\/urbanitae\.svg/);
  assert.match(html, /logos\/wecity\.png/);
  assert.match(html, /\.\/assets\//);
  assert.doesNotMatch(html, /(?:href|src)=["']\/assets\//);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
  assert.match(html, /property="og:site_name" content="Ladrillo Radar"/);
  assert.match(html, /property="og:image" content="[^"]*\/og\.png\?v=2"/);
  assert.doesNotMatch(html, /Seis proyectos de Civislend/);
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
  "madrid-atlas-nuevo-ahijones",
]) {
  test(`exports the complete detail page for ${id}`, async () => {
    const html = await readFile(new URL(`proyectos/${id}/index.html`, root), "utf8");

    assert.match(html, /Carencias y riesgos pendientes/);
    assert.match(html, /Inconsistencias y matices/);
    assert.match(html, /Quién está detrás/);
    const companyHeadingIndex = html.indexOf("Quién está detrás");
    const analysisLimitIndex = html.indexOf("LÍMITE DEL ANÁLISIS");
    const companyLeadIndex = html.indexOf('class="company-lead"');
    assert.ok(companyHeadingIndex < analysisLimitIndex && analysisLimitIndex < companyLeadIndex);
    assert.match(html, /<h2>Documentación<\/h2>/);
    assert.doesNotMatch(html, /CONTROL DE EVIDENCIAS|Documentación localizada/);
    assert.match(html, /data-document-access="(?:public|investors)"/);
    assert.match(html, /Documentación reservada a inversores|Ver documento|Acceso para inversores/);
    assert.match(html, /Preguntas que deben tener respuesta/);
    assert.match(html, /escala de 0 a 10/);
    assert.match(html, /class="detail-score score-band-(?:green-strong|green-soft|yellow|orange|red)" data-score-band=/);
    const documentLinks = [...html.matchAll(/<a class="document-row document-link" href="([^"]+)"/g)]
      .map((match) => match[1].replaceAll("&amp;", "&"));
    assert.ok(documentLinks.length > 0, "cada ficha debe enlazar sus documentos localizados");
    for (const link of documentLinks) {
      const url = new URL(link);
      assert.equal(url.protocol, "https:");
      assert.doesNotMatch(url.hostname, /^(?:localhost|127\.0\.0\.1)$/);
    }
    assert.doesNotMatch(html, /Archivado localmente|repositorio local|archivo local|servidor local|\/Volumes\//i);
    assert.doesNotMatch(html, /\/10/);
    assert.match(html, /\.\.\/\.\.\/assets\//);
    assert.doesNotMatch(html, /(?:href|src)=["']\/assets\//);
    assertCloudflareAnalytics(html);
    assertUberleapCredit(html);
  });
}
