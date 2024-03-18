import { useEffect, useState } from "react";
import "../../styles/App.css";
import About from "./About";
import Home from "./Home";
import Projects from "./Projects";
import Footer from "./Footer";
import Menu from "../components/Menu";

const App = () => {
    const [visibleComponent, setVisibleComponent] = useState("home");

    useEffect(() => {
      const handleScroll = () => {
        const homeTitle = document.getElementById("textos-hero");
        const aboutTitle = document.getElementById("about-title");
        const projectsTitle = document.getElementById("projects-title");
        const footerTitle = document.getElementById("footer-title");
  
        const isHomeVisible = isElementVisible(homeTitle);
        const isAboutVisible = isElementVisible(aboutTitle);
        const isProjectsVisible = isElementVisible(projectsTitle);
        const isFooterVisible = isElementVisible(footerTitle);
  
        if (isHomeVisible) {
          setVisibleComponent("home");
        } else if (isAboutVisible) {
          setVisibleComponent("about");
        } else if (isProjectsVisible) {
          setVisibleComponent("projects");
        } else if (isFooterVisible) {
          setVisibleComponent("footer");
        }
      };
  
      const isElementVisible = (element) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight)
        );
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

  return (
    <>
      <Menu />
      <div className="m-5">
        {visibleComponent === "home" && <Home />}
        {visibleComponent === "about" && <About />}
        {visibleComponent === "projects" && <Projects />}
        {visibleComponent === "footer" && <Footer />}
      </div>
    </>
  );
};

export default App;
