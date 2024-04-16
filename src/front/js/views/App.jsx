import { useState } from "react";
import "../../styles/App.css";
import About from "./About";
import Home from "./Home";
import Projects from "./Projects";
import Footer from "./Footer";
import Menu from "../components/Menu";

const App = () => {
  const [isActive, setIsActive] = useState(false);
  const [idioma, setIdioma] = useState(localStorage.getItem("idioma") || "eng");
  return (
    <>
      <Menu
        setIsActive={setIsActive}
        isActive={isActive}
        setIdioma={setIdioma}
        idioma={idioma}
      />
      <div className={`m-5 content ${isActive ? "fade-out" : ""}`}>
        <Home idioma={idioma} />
        <About idioma={idioma} />
        <Projects idioma={idioma} />
        <Footer idioma={idioma} />
      </div>
    </>
  );
};

export default App;
