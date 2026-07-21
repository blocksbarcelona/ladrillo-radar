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
  assert.match(html, /6,5 sobre 10/);
  assert.match(html, /7,1 sobre 10/);
  assert.match(html, /2,5 sobre 10/);
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
    assert.match(html, /Documentación localizada/);
    assert.match(html, /Preguntas que deben tener respuesta/);
    assert.match(html, /sobre 10/);
    assert.match(html, /\.\.\/\.\.\/assets\//);
    assert.doesNotMatch(html, /(?:href|src)=["']\/assets\//);
  });
}
