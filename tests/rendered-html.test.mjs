import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../dist/client/", import.meta.url);

test("exports the complete static radar", async () => {
  const html = await readFile(new URL("index.html", root), "utf8");

  assert.match(html, /Ladrillo Radar/);
  assert.match(html, /Actuales y próximos/);
  assert.match(html, /Proyectos pasados/);
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

  await Promise.all([
    access(new URL(".nojekyll", root)),
    access(new URL("og.png", root)),
    access(new URL("favicon.png", root)),
    access(new URL("logos/civislend.svg", root)),
    access(new URL("logos/urbanitae.svg", root)),
    access(new URL("logos/wecity.png", root)),
  ]);
});

test("uses a vivid, clearly differentiated score palette", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /--score-bg: #009f5d/);
  assert.match(css, /--score-bg: #8bd448/);
  assert.match(css, /--score-bg: #ffd60a/);
  assert.match(css, /--score-bg: #ff8a00/);
  assert.match(css, /--score-bg: #ef3340/);
  assert.match(css, /\.score-chip strong \{[^}]*font-size: 32px/);
  assert.match(css, /\.detail-score strong \{[^}]*font-size: 78px/);
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
  });
}
