import "../../styles/Menu.css";
import verMas from "../../../assets/ver-mas.svg";
import x from "../../../assets/x.svg";
import marcoMenu from "../../../assets/marco-menu.svg";
import michi from "../../../assets/michi.svg";
import { useEffect, useState } from "react";

const Menu = ({ isActive, setIsActive, idioma, setIdioma }) => {

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
        <h2 className="text-menu">Over time I will bring more sections! For now help this kitten in this minigame I made!</h2>
        <img src={michi} alt="" className="michi-menu" />
        <button
            type="button"
            className="btn-menu"
          >
            Help!
          </button>
      </div>
    </>
  );
};

export default Menu;
