import "../../styles/App.css";
import About from "./About";
import Home from "./Home";
import verMas from "../../../assets/ver-mas.svg";
import Projects from "./Projects";

const App = () => {
  return (
    <>
      <div className="menu">
        <p className="cambiar-esp">Es</p>
        <img src={verMas} alt="ver-mas" className="ver-mas-menu" />
      </div>
      <div className="m-5">
        <Home />
        <About />
        <Projects />
      </div>
    </>
  );
};

export default App;
