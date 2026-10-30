// Regenerates app/opengraph-image.png (1200x630).
// skia-canvas shapes Devanagari correctly; next/og (Satori) does not, so the PNG is pre-rendered.
//   cd /tmp && npm i skia-canvas && cp <repo>/assets/og/generate.mjs . && node generate.mjs <repo>
import { Canvas, FontLibrary } from "skia-canvas";

const repo = process.argv[2] ?? process.cwd();
const fonts = `${repo}/assets/og/`;
FontLibrary.use("Mukta", [fonts + "Mukta-ExtraBold.ttf"]);
FontLibrary.use("Plex", [fonts + "IBMPlexSans-SemiBold.ttf"]);

const c = new Canvas(1200, 630);
const g = c.getContext("2d");
g.fillStyle = "#ffffff";
g.fillRect(0, 0, 1200, 630);
g.fillStyle = "#595959";
g.font = "600 28px Plex";
g.fillText("sandeshrimal.com.np", 80, 100);
g.fillStyle = "#2D52E0";
g.font = "800 340px Mukta";
g.fillText("सन्देश", 72, 440);
g.fillStyle = "#0A0A0A";
g.font = "600 52px Plex";
g.fillText("Sandesh Rimal", 80, 530);
g.fillStyle = "#595959";
g.font = "600 34px Plex";
g.fillText("Flutter developer and backend engineer", 80, 580);
await c.toFile(`${repo}/app/opengraph-image.png`);
