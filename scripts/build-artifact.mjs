// Builds the browser-only app (vite.artifact.config.ts) and writes dist-artifact/index.html,
// a page fragment ready to publish with the Artifact tool:
//   file_path: dist-artifact/index.html
//   files: every other file in dist-artifact (see the list this script prints)
import { execFileSync } from "node:child_process";
import { readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

execFileSync("vite", ["build", "-c", "vite.artifact.config.ts", "--logLevel", "warn"], {
  stdio: "inherit",
});

const out = "dist-artifact";
for (const extra of ["robots.txt", "favicon.ico"]) rmSync(join(out, extra), { force: true });

const stamp = new Date().toISOString().slice(0, 16).replace("T", " ");
writeFileSync(
  join(out, "index.html"),
  `<title>BAR SKILLS</title>
<meta name="theme-color" content="#1c1a17">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&family=Unbounded:wght@500;600;700;800&display=swap">
<link rel="stylesheet" href="assets/styles.css">
<style>:root{color-scheme:dark}html,body{background:#1c1a17}</style>
<div id="app" data-built="${stamp}"></div>
<script type="module" src="app.js"></script>
`,
);

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [relative(out, p)];
  });
console.log("Built", stamp, "\nFiles to publish beside index.html:");
for (const f of walk(out).filter((f) => f !== "index.html")) console.log(" ", f);
