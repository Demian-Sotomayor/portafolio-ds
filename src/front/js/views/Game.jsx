import React, { useEffect, useState } from "react";
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
  // Cambiar idioma a inglés o español
  const [idioma, setIdioma] = useState(localStorage.getItem("idioma") || "eng");
  // Temporalmente manejando la opacidad así
  const [opacity, setOpacity] = useState(25);
  // Bolas de estambre
  const [balls, setBalls] = useState([]);
  // Niveles
  const [level, setLevel] = useState(1);
  // Juego finalizado
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    initializeBalls();
  }, []);

  useEffect(() => {
    if (gameOver) {
      alert("¡Has recuperado todos los juguetes del gatito! ¡Victoria!")
    }
  }, [gameOver]);

  const initializeBalls = () => {
    // Definir arreglo con bolas de estambre y sus propiedades
    const initialBalls = [
      { id: 1, level: 1, recovered: false },      
      { id: 2, level: 2, recovered: false },
      { id: 3, level: 3, recovered: false },
      { id: 4, level: 4, recovered: false },
      { id: 5, level: 5, recovered: false },      
    ]
    setBalls(initialBalls);
  } 

  const handleBallClick = (ballId) => {
    const updatedBalls = balls.map(ball => {
      if(ball.id === ballId) {
        return { ...ball, recovered: true }; // Marcar la bola como recuperada si coincide con el ID
      }
      return ball
    });

    setBalls(updatedBalls);

    // Verificar si recuperamos todos los juguetes
    const allRecovered = updatedBalls.every(ball => ball.recovered);
    if(allRecovered) {
      setGameOver(true);
    }

  }

  const updateGame = () => {

  }




  return (
    <div className="container-fluid">
      <Link to="/" className="button-back-home">
        <i class="fa-solid fa-arrow-left me-2"></i>
        {idioma === "esp" ? "Inicio" : "Home"}
      </Link>
      <img src={michi} alt="" className="michi-menu-game" />
      <img src={marcoMenu} alt="" className="marco-menu-game" />

      <div className="estambres-recuperados">
        <img src={estambreFijoNivel1} alt="" className={opacity >= 25 ? "opacity-25" : "opacity-75"} onClick={handleBallClick(1)} />
        <img src={estambreFijoNivel2} alt="" className={opacity >= 25 ? "opacity-25" : "opacity-75"} onClick={handleBallClick(2)} />
        <img src={estambreFijoNivel3} alt="" className={opacity >= 25 ? "opacity-25" : "opacity-75"} onClick={handleBallClick(3)} />
        <img src={estambreFijoNivel4} alt="" className={opacity >= 25 ? "opacity-25" : "opacity-75"} onClick={handleBallClick(4)} />
        <img src={estambreFijoNivel5} alt="" className={opacity >= 25 ? "opacity-25" : "opacity-75"} onClick={handleBallClick(5)} />
      </div>
    </div>
  );
};

export default Game;
