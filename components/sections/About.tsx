import Image from "next/image";

const jobs = [
  {
    when: "Nov 2025 – now",
    role: "Flutter Developer",
    org: "DarviLab Pvt. Ltd.",
    note: "Flutter apps for Chynabazar and Najik.",
  },
  {
    when: "Jul 2023 – now",
    role: "Instructor",
    org: "ASMT, St. Lawrence College",
    note: "Mobile, web, Java, PHP and MySQL; mentoring students.",
  },
  {
    when: "Jan – Sep 2024",
    role: "Flutter Developer",
    org: "Eydean Inc.",
    note: "Built Flutter features for Bibaabo, a fintech app, and an ERP project for HERD International.",
  },
  {
    when: "May – Sep 2023",
    role: "Flutter Intern",
    org: "WHive IT Professionals",
    note: "Developed e-commerce and HR management apps in Flutter.",
  },
];

const education = [
  { when: "2026 – 28", what: "MIT, Tribhuvan University" },
  {
    when: "2018 – 22",
    what: "BSc CSIT, Asian School of Management and Technology",
  },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-16 py-[clamp(64px,9vw,128px)]">
      <div className="wrap flex flex-wrap gap-[clamp(40px,6vw,96px)]">
        <div data-reveal className="min-w-0 flex-[1_1_360px]">
          <p className="mono-label">04 — About</p>
          <h2 className="mt-5 text-[clamp(30px,3.6vw,48px)] leading-[1.1] font-medium tracking-[-0.025em]">
            I teach what I ship, and ship what I teach.
          </h2>
          <p className="mt-5 max-w-[460px] text-muted">
            Since 2023 I&apos;ve taught Java, JavaScript, mobile programming,
            PHP, MySQL and web development at St. Lawrence College, to 200+
            students, while building production apps.
          </p>
          <div className="relative mt-7 aspect-[4/5] w-[240px] overflow-hidden rounded-md bg-fill">
            <Image
              src="/work/sandesh-portrait.webp"
              alt="Portrait of Sandesh Rimal"
              fill
              sizes="240px"
              className="object-cover"
            />
          </div>
        </div>
        <div data-reveal className="min-w-0 flex-[1.3_1_480px]">
          <h2 className="mono-label">Experience</h2>
          <ol className="mt-4 border-t border-ink">
            {jobs.map((j) => (
              <li
                key={j.role + j.when}
                className="flex flex-wrap gap-x-6 gap-y-1 border-b border-line py-5"
              >
                <span className="flex-[0_0_150px] font-mono text-xs leading-[1.9] text-muted">
                  {j.when}
                </span>
                <span className="min-w-0 flex-[1_1_260px]">
                  <span className="block text-xl font-medium tracking-[-0.01em]">
                    {j.role}
                  </span>
                  <span className="block text-[15px] text-muted">{j.org}</span>
                  <span className="mt-1.5 block text-[15px]">{j.note}</span>
                </span>
              </li>
            ))}
          </ol>
          <h2 className="mono-label mt-10">Education</h2>
          <ol className="mt-4 border-t border-ink">
            {education.map((e) => (
              <li
                key={e.when}
                className="flex flex-wrap gap-x-6 gap-y-1 border-b border-line py-4"
              >
                <span className="flex-[0_0_150px] font-mono text-xs text-muted">
                  {e.when}
                </span>
                <span className="min-w-0 flex-[1_1_260px] text-[15px]">
                  {e.what}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
