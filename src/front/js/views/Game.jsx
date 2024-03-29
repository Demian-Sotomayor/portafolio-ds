import React, { useState } from "react";
import "../../styles/Game.css";
import marcoMenu from "../../../assets/marco-menu.svg";
import michi from "../../../assets/michi.svg";
import estambreFijoNivel1 from "../../img/game/con-hilo/bola-estambre-verde.png";
import estambreFijoNivel2 from "../../img/game/con-hilo/bola-estambre-azul.png";
import estambreFijoNivel3 from "../../img/game/con-hilo/bola-estambre-morada.png";
import estambreFijoNivel4 from "../../img/game/con-hilo/bola-estambre-naranja.png";
import estambreFijoNivel5 from "../../img/game/con-hilo/bola-estambre-roja.png";
import { Link } from "react-router-dom";

const Game = () => {
  // Declarando opacidad así por ahora para que no de error
  const [opacity, setOpacity] = useState("opacity-25");

  const [idioma, setIdioma] = useState(localStorage.getItem("idioma") || "eng");

  return (
    <div className="container-fluid">
      <Link to="/" className="button-back-home">
        <i class="fa-solid fa-arrow-left me-2"></i>
        {idioma === "esp" ? "Inicio" : "Home"}
      </Link>
      <img src={michi} alt="" className="michi-menu-game" />
      <img src={marcoMenu} alt="" className="marco-menu-game" />

      <div className="estambres-recuperados">
        <img src={estambreFijoNivel1} alt="" className={opacity} />
        <img src={estambreFijoNivel2} alt="" className={opacity} />
        <img src={estambreFijoNivel3} alt="" className={opacity} />
        <img src={estambreFijoNivel4} alt="" className={opacity} />
        <img src={estambreFijoNivel5} alt="" className={opacity} />
      </div>
    </div>
  );
};

export default Game;
