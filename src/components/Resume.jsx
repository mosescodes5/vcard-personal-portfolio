const experience = [
  {
    title: "Founder & Full-Stack Developer — Evenova, Lagos, Nigeria",
    date: "2024 — Present",
    text: "Architected and single-handedly built a full-stack event-ticketing platform (React.js/Next.js frontend, PHP/MySQL backend) with QR code validation and organiser dashboards, deployed on Vercel.",
  },
  {
    title: "Frontend / WordPress Developer (Intern) — Tobams Group, UK (Remote)",
    date: "Oct 2024 — Feb 2025",
    text: "Developed and maintained client WordPress sites, improving SEO structure and mobile performance. Translated design mockups into pixel-perfect, responsive UIs using React components.",
  },
  {
    title: "Software Engineer / Web Developer — Wristbands Nigeria, Lagos",
    date: "Sept 2024 — Feb 2025",
    text: "Built and deployed custom event-management software (PHP, Python, MySQL, REST APIs) supporting registration, ticketing, and real-time analytics dashboards.",
  },
  {
    title: "Full-Stack Web Developer — Finaxion, Gbagada, Lagos",
    date: "Jan 2020 — 2023",
    text: "Designed responsive, brand-aligned WordPress sites for fintech and retail clients, integrating WooCommerce for e-commerce. Maintained 99%+ uptime across client sites.",
  },
];

const education = [
  {
    title: "B.Sc. Computer Science",
    date: "2022 — 2025",
    text: "Ecole Supérieure Sainte Félicité, Republic of Benin.",
  },
];

const certifications = [
  "Coursera — Build a Full Website Using WordPress (Jun 2025)",
  "Coursera — Build a Free Website with WordPress (Jun 2025)",
  "Coursera — Work with Components in Figma (Jun 2025)",
  "Terra Learning — Frontend Web Development",
  "YAPPI Nigeria — Introduction to Animation",
  "YAPPI Nigeria — Introduction to Generative AI",
  "YAPPI Nigeria — Mobile 3D Animation with Prisma 3D",
  "YAPPI Nigeria — Post-Production",
  "Power Learn Project — Software Development",
  "Udemy — WordPress Web Development: Zero to Hero",
];

function Timeline({ heading, icon, items }) {
  return (
    <section className="timeline">
      <div className="title-wrapper">
        <div className="icon-box">
          <ion-icon name={icon}></ion-icon>
        </div>
        <h3 className="h3">{heading}</h3>
      </div>

      <ol className="timeline-list">
        {items.map((item) => (
          <li className="timeline-item" key={item.title}>
            <h4 className="h4 timeline-item-title">{item.title}</h4>
            <span>{item.date}</span>
            <p className="timeline-text">{item.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function Resume() {
  return (
    <article className="resume active">
      <header>
        <h2 className="h2 article-title">Resume</h2>
      </header>

      <Timeline heading="Education" icon="school-outline" items={education} />
      <Timeline
        heading="Professional Experience"
        icon="briefcase-outline"
        items={experience}
      />

      <section className="skill">
        <h3 className="h3 skills-title">Certifications</h3>
        <ul className="skills-list content-card" style={{ padding: "20px" }}>
          {certifications.map((c) => (
            <li key={c} style={{ marginBottom: "10px", color: "var(--light-gray)", fontSize: "var(--fs-7)" }}>
              • {c}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
