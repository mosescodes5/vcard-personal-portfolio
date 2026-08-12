const services = [
  {
    icon: "../assets/images/icon-dev.svg",
    title: "Web Development",
    text: "Building scalable and secure web applications using React.js, Next.js, PHP, Python, MySQL, and REST APIs.",
  },
  {
    icon: "../assets/images/icon-app.svg",
    title: "WordPress Development",
    text: "Custom themes, plugins, and WooCommerce integrations built for performance and SEO.",
  },
  {
    icon: "../assets/images/icon-design.svg",
    title: "UI/UX Design",
    text: "Prototyping and component design in Figma, translated into pixel-perfect, responsive interfaces.",
  },
  {
    icon: "../assets/images/icon-photo.svg",
    title: "Web Security",
    text: "Applying an ethical-hacking background to build safer applications and catch vulnerabilities early.",
  },
];

const skills = [
  { name: "React.js & Next.js", value: 88 },
  { name: "Web Development (PHP, JavaScript)", value: 85 },
  { name: "Python & SQL", value: 78 },
  { name: "WordPress & Elementor", value: 90 },
];

export default function About() {
  return (
    <article className="about active">
      <header>
        <h2 className="h2 article-title">About me</h2>
      </header>

      <section className="about-text">
        <p>
          I'm a highly motivated and detail-oriented software developer from Lagos,
          Nigeria, with a passion for building scalable, user-focused solutions. I
          specialize in full-stack development with a strong focus on{" "}
          <strong>React.js and Next.js</strong>, and I'm experienced in data analysis,
          creating innovative solutions that make a difference.
        </p>
        <p>
          My expertise spans across WordPress development, custom software
          engineering, and modern web application development. I'm organized,
          dependable, and possess strong problem-solving abilities. Currently
          pursuing my BSc in Computer Science at Ecole Supérieure Sainte Felicite,
          I'm committed to continuous learning and contributing to innovative
          projects that push boundaries.
        </p>
      </section>

      <section className="service">
        <h3 className="h3 service-title">What I'm doing</h3>
        <ul className="service-list">
          {services.map((s) => (
            <li className="service-item" key={s.title}>
              <div className="service-icon-box">
                <img src={s.icon} alt={`${s.title} icon`} width="40" />
              </div>
              <div className="service-content-box">
                <h4 className="h4 service-item-title">{s.title}</h4>
                <p className="service-item-text">{s.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="skill">
        <h3 className="h3 skills-title">My skills</h3>
        <ul className="skills-list content-card">
          {skills.map((s) => (
            <li className="skills-item" key={s.name}>
              <div className="title-wrapper">
                <h5 className="h5">{s.name}</h5>
                <data value={s.value}>{s.value}%</data>
              </div>
              <div className="skill-progress-bg">
                <div
                  className="skill-progress-fill"
                  style={{ width: `${s.value}%` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
