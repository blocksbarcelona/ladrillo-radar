import { readdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative, sep } from "node:path";

const root = new URL("../dist/client/", import.meta.url);
const textExtensions = new Set([".html", ".rsc"]);

async function collect(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) paths.push(...(await collect(path)));
    else if (textExtensions.has(extname(entry.name))) paths.push(path);
  }

  return paths;
}

for (const path of await collect(root.pathname)) {
  const source = await readFile(path, "utf8");
  const assetDirectory = relative(dirname(path), join(root.pathname, "assets"))
    .split(sep)
    .join("/");
  const assetPrefix = assetDirectory.startsWith(".")
    ? `${assetDirectory}/`
    : `./${assetDirectory}/`;
  const relativeAssets = source.replaceAll("/assets/", assetPrefix);
  await writeFile(path, relativeAssets);
}

await writeFile(new URL(".nojekyll", root), "");

// vinext may emit its starter font cache even when the final site does not
// reference it. Keep the GitHub Pages package limited to assets in use.
await rm(new URL("assets/_vinext_fonts/", root), {
  recursive: true,
  force: true,
});
