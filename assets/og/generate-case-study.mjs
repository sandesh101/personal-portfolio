// Regenerates app/work/chynabazar/opengraph-image.png (1200x630).
//   cd <scratch> && npm i skia-canvas && cp <repo>/assets/og/generate-case-study.mjs . && node generate-case-study.mjs <repo>
import { Canvas, FontLibrary, loadImage } from "skia-canvas";

const repo = process.argv[2] ?? process.cwd();
FontLibrary.use("Plex", [`${repo}/assets/og/IBMPlexSans-SemiBold.ttf`]);

const c = new Canvas(1200, 630);
const g = c.getContext("2d");
g.fillStyle = "#ffffff";
g.fillRect(0, 0, 1200, 630);

g.fillStyle = "#595959";
g.font = "600 26px Plex";
g.fillText("CASE STUDY", 72, 96);

g.fillStyle = "#0A0A0A";
g.font = "600 92px Plex";
g.fillText("Chynabazar", 72, 230);

g.fillStyle = "#2D52E0";
g.fillRect(72, 262, 96, 6);

g.fillStyle = "#0A0A0A";
g.font = "600 40px Plex";
g.fillText("Flutter and NestJS", 72, 350);
g.fillText("e-commerce platform", 72, 402);

g.fillStyle = "#595959";
g.font = "600 28px Plex";
g.fillText("500+ downloads on Google Play", 72, 478);

g.fillStyle = "#0A0A0A";
g.font = "600 30px Plex";
g.fillText("Sandesh Rimal", 72, 560);
g.fillStyle = "#595959";
g.font = "600 24px Plex";
g.fillText("sandeshrimal.com.np", 72, 596);

const shot = await loadImage(`${repo}/public/work/chynabazar-storefront-wide.webp`);
const x = 640, y = 150, w = 488, h = 305;
g.save();
g.beginPath();
g.roundRect(x, y, w, h, 10);
g.clip();
g.drawImage(shot, x, y, w, h);
g.restore();
g.strokeStyle = "#e5e5e5";
g.lineWidth = 2;
g.beginPath();
g.roundRect(x, y, w, h, 10);
g.stroke();

await c.toFile(`${repo}/app/work/chynabazar/opengraph-image.png`);
