const pages = ["about", "resume", "portfolio", "contact"];

export default function Navbar({ activePage, onNavigate }) {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {pages.map((page) => (
          <li className="navbar-item" key={page}>
            <button
              className={`navbar-link ${activePage === page ? "active" : ""}`}
              onClick={() => onNavigate(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
