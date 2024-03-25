import { useState } from "react";
import "../../styles/App.css";
import About from "./About";
import Home from "./Home";
import Projects from "./Projects";
import Footer from "./Footer";
import Menu from "../components/Menu";

const App = () => {

  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <Menu setIsActive={setIsActive} isActive={isActive} />
      <div className={`m-5 content ${isActive ? "fade-out" : "fade-in"}`}>
        <Home />
        <About />
        <Projects />
       <Footer />
      </div>
    </>
  );
};

export default App;
