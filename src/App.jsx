import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Resume from "./components/Resume";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import "./style.css";

const pageComponents = {
  about: About,
  resume: Resume,
  portfolio: Portfolio,
  contact: Contact,
};

export default function App() {
  const [activePage, setActivePage] = useState("about");
  const ActivePageComponent = pageComponents[activePage];

  return (
    <main>
      <Sidebar />

      <div className="main-content">
        <Navbar activePage={activePage} onNavigate={setActivePage} />
        <ActivePageComponent />
      </div>
    </main>
  );
}
