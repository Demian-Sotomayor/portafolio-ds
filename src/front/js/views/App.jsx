import { useEffect, useState } from "react";
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
      <Menu setIsActive={setIsActive} isActive={isActive} setIdioma={setIdioma} idioma={idioma} />
      <div className={`m-5 content ${isActive ? "fade-out" : "fade-in"}`}>
        <Home setIdioma={setIdioma} idioma={idioma}  />
        <About setIdioma={setIdioma} idioma={idioma}  />
        <Projects setIdioma={setIdioma} idioma={idioma}  />
       <Footer setIdioma={setIdioma} idioma={idioma}  />
      </div>
    </>
  );
};

export default App;
