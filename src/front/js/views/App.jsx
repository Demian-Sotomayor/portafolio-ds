import { useEffect, useState } from "react";
import "../../styles/App.css";
import About from "./About";
import Home from "./Home";
import Projects from "./Projects";
import Footer from "./Footer";
import Menu from "../components/Menu";

const App = () => {
  const [currentSection, setCurrentSection] = useState("home");

  const handleSectionChange = (sectionId) => {
    setCurrentSection(sectionId);
    console.log(currentSection, "SECCIONES EN APP.JSX")
  }


  return (
    <>
      <Menu />
      <div className="m-5">
        <div className="home">
        <Home id="home" isActive={currentSection === "home"} onChange={handleSectionChange} />
        </div>
        <div className="about">
        <About id="about" isActive={currentSection === "about"} onChange={handleSectionChange} />
        </div>
        <div className="projects">
        <Projects id="projects" isActive={currentSection === "projects"} onChange={handleSectionChange} />
        </div>
        <div className="footer">
        <Footer id="footer" isActive={currentSection === "footer"} onChange={handleSectionChange} />
        </div>
      </div>
    </>
  );
};

export default App;
