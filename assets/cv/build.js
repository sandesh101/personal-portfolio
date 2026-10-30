// Rebuilds the CV (docx). Run with: npm i docx && node build.js, then export the docx to PDF into public/.
const fs = require("fs");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  ExternalHyperlink,
  TabStopType,
  LevelFormat,
  AlignmentType,
  BorderStyle,
} = require("docx");

const FONT = "Arial";
const W = 9906; // A4 content width in DXA with 1000 margins
const INK = "0A0A0A";
const MUTED = "595959";

const run = (text, o = {}) =>
  new TextRun({ text, font: FONT, size: 18, color: INK, ...o });
const link = (text, url) =>
  new ExternalHyperlink({
    link: url,
    children: [run(text, { style: "Hyperlink", color: INK })],
  });

const section = (title) =>
  new Paragraph({
    spacing: { before: 190, after: 80 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: INK, space: 3 },
    },
    keepNext: true,
    children: [
      run(title.toUpperCase(), { bold: true, size: 17, characterSpacing: 30 }),
    ],
  });

const entry = (left, right, sub) => [
  new Paragraph({
    spacing: { before: 90, after: 0 },
    tabStops: [{ type: TabStopType.RIGHT, position: W }],
    keepNext: true,
    children: [
      run(left, { bold: true, size: 20 }),
      run("\t" + right, { size: 17, color: MUTED }),
    ],
  }),
  ...(sub
    ? [
        new Paragraph({
          spacing: { after: 20 },
          children: [run(sub, { color: MUTED })],
        }),
      ]
    : []),
];

const bullet = (parts) =>
  new Paragraph({
    numbering: { reference: "b", level: 0 },
    spacing: { after: 20 },
    children: (Array.isArray(parts) ? parts : [parts]).map((p) =>
      typeof p === "string" ? run(p) : p,
    ),
  });

const sep = () => run("  ·  ", { color: MUTED });

const doc = new Document({
  creator: "Sandesh Rimal",
  title: "Sandesh Rimal, CV",
  styles: { default: { document: { run: { font: FONT, size: 18 } } } },
  numbering: {
    config: [
      {
        reference: "b",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "–",
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: { indent: { left: 300, hanging: 220 } },
              run: { font: FONT },
            },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 760, bottom: 640, left: 1000, right: 1000 },
        },
      },
      children: [
        new Paragraph({
          spacing: { after: 20 },
          children: [run("Sandesh Rimal", { bold: true, size: 56 })],
        }),
        new Paragraph({
          spacing: { after: 80 },
          children: [
            run("Flutter developer and backend engineer · Kathmandu, Nepal", {
              size: 21,
              color: MUTED,
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 0 },
          children: [
            link(
              "rimal.sandesh11@gmail.com",
              "mailto:rimal.sandesh11@gmail.com",
            ),
            sep(),
            run("+977 9860807838"),
            sep(),
            link("sandeshrimal.com.np", "https://sandeshrimal.com.np"),
          ],
        }),
        new Paragraph({
          spacing: { before: 20 },
          children: [
            link(
              "linkedin.com/in/sandesh-rimal",
              "https://www.linkedin.com/in/sandesh-rimal/",
            ),
            sep(),
            link("github.com/sandesh101", "https://github.com/sandesh101"),
          ],
        }),

        section("Summary"),
        new Paragraph({
          spacing: { after: 0 },
          children: [
            run(
              "I take mobile apps and the servers behind them from first screen to production, and I teach programming at St. Lawrence College.",
            ),
          ],
        }),

        section("Experience"),
        ...entry(
          "Flutter Developer",
          "Nov 2025 – Present",
          "DarviLab Pvt. Ltd.",
        ),
        bullet(
          "Build Flutter apps with Bloc and Clean Architecture for e-commerce and home-services products.",
        ),
        bullet(
          "Build the NestJS APIs behind them: modular monolith, SuperTokens auth, validated DTOs, payments, notifications and ERP integration.",
        ),
        bullet(
          "Shipped Chynabazar (Flutter apps for shoppers and warehouse staff, plus a Next.js storefront) and Najik Services.",
        ),

        ...entry(
          "Instructor",
          "Jul 2023 – Present",
          "St. Lawrence College, Asian School of Management and Technology",
        ),
        bullet(
          "Teach web development (HTML, CSS, Bootstrap, JavaScript) to BCA 2nd semester and BSc CSIT 1st and 2nd semester students.",
        ),
        bullet(
          "Teach scripting (JavaScript, PHP, MySQL) to BCA 4th semester and mobile programming (Android with Java) to BCA 6th semester.",
        ),

        ...entry("Flutter Developer", "Jan 2024 – Sep 2024", "Eydean Inc."),
        bullet("Built Flutter features for ERP and fintech client apps."),
        bullet(
          "Improved the business-requirement process, which cut project delivery time.",
        ),
        bullet(
          "Added a reporting framework that made project progress more transparent.",
        ),

        ...entry(
          "Flutter Developer Intern",
          "May 2023 – Sep 2023",
          "WHive IT Professionals",
        ),
        bullet(
          "Built three Flutter apps: an HR app, a job-finding app and an e-commerce app.",
        ),

        section("Selected projects"),
        ...entry("Chynabazar", "", null).slice(0, 1),
        new Paragraph({
          spacing: { after: 30 },
          children: [
            run(
              "E-commerce platform on one NestJS backend with Flutter apps for shoppers and warehouse staff and a Next.js storefront. Payments, notifications, SKU and inventory management, ERP integration. ",
            ),
            link(
              "Live on Google Play",
              "https://play.google.com/store/apps/details?id=com.chinabazar.app",
            ),
          ],
        }),
        ...entry("Najik Services", "", null).slice(0, 1),
        new Paragraph({
          spacing: { after: 30 },
          children: [
            run(
              "Platform that connects homes, offices and communities in Kathmandu with trusted professionals for repairs, electrical work, carpentry, cleaning and facility maintenance. ",
            ),
            link("najikservices.com", "https://najikservices.com/"),
          ],
        }),
        ...entry("Liar's Grid", "", null).slice(0, 1),
        new Paragraph({
          spacing: { after: 30 },
          children: [
            run(
              "Offline logic puzzle game in Flutter. Read each suspect's statement, work out who is honest and who lies, across 88 levels in five chapters.",
            ),
          ],
        }),
        ...entry("express-routes-postman", "", null).slice(0, 1),
        new Paragraph({
          spacing: { after: 0 },
          children: [
            run(
              "Zero-config CLI that turns Express route files into a Postman v2.1 collection. ",
            ),
            link("npm", "https://www.npmjs.com/package/express-routes-postman"),
          ],
        }),

        section("Skills"),
        new Paragraph({
          spacing: { after: 30 },
          children: [
            run("Mobile  ", { bold: true }),
            run("Flutter, Dart, Bloc, Riverpod, Clean Architecture, Firebase"),
          ],
        }),
        new Paragraph({
          spacing: { after: 30 },
          children: [
            run("Backend  ", { bold: true }),
            run(
              "NestJS, Node.js, Express, TypeScript, REST APIs, SuperTokens, MongoDB, MySQL",
            ),
          ],
        }),
        new Paragraph({
          spacing: { after: 0 },
          children: [
            run("Tools  ", { bold: true }),
            run("Git, Docker, Postman, Figma, Xcode, Linux"),
          ],
        }),

        section("Education"),
        ...entry("MIT", "2026 – 2028", "Tribhuvan University"),
        ...entry(
          "BSc Computer Science and Information Technology",
          "2018 – 2022",
          "Asian School of Management and Technology",
        ),
        ...entry(
          "+2 Science",
          "",
          "National Institute of Science and Technology",
        ),

        section("Extracurricular"),
        bullet(
          "Instructor, Flutter Bootcamp, Asian School of Management and Technology",
        ),
        bullet("Organizer, AsianHack 2022"),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((b) => {
  fs.writeFileSync("Sandesh-Rimal-CV.docx", b);
  console.log("written", b.length);
});
