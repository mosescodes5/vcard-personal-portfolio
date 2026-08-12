import { useState } from "react";
import projects from "../data/projects";

const categories = ["all", "web development", "applications", "design"];

export default function Portfolio() {
  const [filter, setFilter] = useState("all");
  const [selectOpen, setSelectOpen] = useState(false);

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const label = (cat) => (cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1));

  return (
    <article className="portfolio active">
      <header>
        <h2 className="h2 article-title">Portfolio</h2>
      </header>

      <section className="projects">
        <ul className="filter-list">
          {categories.map((cat) => (
            <li className="filter-item" key={cat}>
              <button
                className={filter === cat ? "active" : ""}
                onClick={() => setFilter(cat)}
              >
                {label(cat)}
              </button>
            </li>
          ))}
        </ul>

        <div className="filter-select-box">
          <button
            className="filter-select"
            onClick={() => setSelectOpen((v) => !v)}
          >
            <div className="select-value">{label(filter)}</div>
            <div className="select-icon">
              <ion-icon name="chevron-down"></ion-icon>
            </div>
          </button>

          <ul className={`select-list ${selectOpen ? "active" : ""}`}>
            {categories.map((cat) => (
              <li className="select-item" key={cat}>
                <button
                  onClick={() => {
                    setFilter(cat);
                    setSelectOpen(false);
                  }}
                >
                  {label(cat)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <ul className="project-list">
          {filtered.map((project) => (
            <li className="project-item active" key={project.id}>
              <a href={project.link} target="_blank" rel="noreferrer">
                <figure className="project-img">
                  <div className="project-item-icon-box">
                    <ion-icon name="eye-outline"></ion-icon>
                  </div>
                  <img src={project.image} alt={project.title} loading="lazy" />
                </figure>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-category">{project.category}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
