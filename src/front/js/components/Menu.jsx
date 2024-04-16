import "../../styles/Menu.css";
import verMas from "../../../assets/ver-mas.svg";
import x from "../../../assets/x.svg";
import marcoMenu from "../../../assets/marco-menu.svg";
import michi from "../../../assets/michi.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

  // ---------------------------------- Pendiente marco width --------------------------------------------
  // -------------------------------------------------------------------------------------------------------

const Menu = ({ isActive, setIsActive, idioma, setIdioma }) => {

  const navigate = useNavigate();

  const handleMenuActive = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  const handleIdioma = () => {
    const cambiarIdioma = idioma === "esp" ? "eng" : "esp";
    setIdioma(cambiarIdioma);
    localStorage.setItem("idioma", cambiarIdioma)
  }

  useEffect(() => {
    if(!localStorage.getItem("idioma")) {
      localStorage.setItem("idioma", "eng");
    }
  }, []);

  const handleClickGame = () => {
    navigate("/game")
  }

  const handleProjects = () => {
    navigate("/projects")
  }

  return (
    <>
      <div className={`menu ${isActive ? "active" : ""}`}>
        <p onClick={handleIdioma} className="cambiar-esp">{idioma === "esp" ? "En" : "Es" }</p>
        <img
          src={isActive ? x : verMas}
          alt="menu"
          className="ver-mas-menu"
          onClick={handleMenuActive}
        />
      </div>

      {/* Modal */}
      <div className={`${isActive ? "menu-opened" : "opacity-0"}`}>
        <img src={marcoMenu} alt="" className="marco-menu" />
        <h2 className="text-menu">{idioma === "esp" ? "¡Con el tiempo traeré más secciones! Por ahora puedes ver mis proyectos o ayudar a este gatito en un minijuego que hice." : "Over time I will bring more sections! For now you can check out my projects or help this kitten in this minigame I made."}</h2>
        <img src={michi} alt="" className="michi-menu" />
        <button
            type="button"
            className={`btn-menu ${isActive ? "" : "d-none"}`}
            onClick={handleClickGame}
          >
            {idioma === "esp" ? "¡Ayuda!" : "Help!"}
          </button>
          <button
            type="button"
            className={`btn-menu-projects ${isActive ? "" : "d-none"}`}
            onClick={handleProjects}
          >
            {idioma === "esp" ? "Proyectos" : "Projects"}
          </button>
      </div>
    </>
  );
};

export default Menu;
