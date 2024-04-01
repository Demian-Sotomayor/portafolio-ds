import React, { useEffect, useState } from "react";
import "../../styles/Game.css";
import marcoMenu from "../../../assets/marco-menu.svg";
import michi from "../../../assets/michi.svg";
import { Link } from "react-router-dom";

// ESTAMBRES FIJOS (HUD)
import estambreFijoNivel1 from "../../img/game/con-hilo/bola-estambre-verde.png";
import estambreFijoNivel2 from "../../img/game/con-hilo/bola-estambre-azul.png";
import estambreFijoNivel3 from "../../img/game/con-hilo/bola-estambre-morada.png";
import estambreFijoNivel4 from "../../img/game/con-hilo/bola-estambre-naranja.png";
import estambreFijoNivel5 from "../../img/game/con-hilo/bola-estambre-roja.png";

// ESTAMBRES EN MOVIMIENTO (USADOS EN CADA NIVEL)
import estambreNivel1 from "../../img/game/sin-hilo/bola-estambre-verde-sin-hilo.png";
import estambreNivel2 from "../../img/game/sin-hilo/bola-estambre-azul-sin-hilo.png";
import estambreNivel3 from "../../img/game/sin-hilo/bola-estambre-morada-sin-hilo.png";
import estambreNivel4 from "../../img/game/sin-hilo/bola-estambre-naranja-sin-hilo.png";
import estambreNivel5 from "../../img/game/sin-hilo/bola-estambre-roja-sin-hilo.png";

const Game = () => {
  // Cambiar idioma a inglés o español
  const [idioma, setIdioma] = useState(localStorage.getItem("idioma") || "eng");
  // Temporalmente manejando la opacidad así
  const [opacity, setOpacity] = useState(25);
  // Bolas de estambre
  const [balls, setBalls] = useState([]);
  // Posición de bolas de estambre
  const [ballPosition, setBallPosition] = useState({ x: 200, y: 600 });
  // Velocidad de rebote de la pelota
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  // Área de juego para que la bola no se vaya al infinito
  const [gameArea, setGameArea] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  // Niveles
  const [level, setLevel] = useState(1);
  // Juego finalizado
  const [gameOver, setGameOver] = useState(false);
  // Juego iniciado
  const [gameStarted, setGameStarted] = useState(false);
  // Ajustar la velocidad dependiendo del nivel
  const [initialSpeed, setInitialSpeed] = useState(10);

  const levelSpeeds = {
    1: 800,
    2: 500,
    3: 1000,
    4: 2000,
    5: 5000,
  };

  useEffect(() => {
    initializeBalls();
  }, []);

  useEffect(() => {
    if (gameOver) {
      alert("¡Has recuperado todos los juguetes del gatito! ¡Victoria!");
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
    ];
    setBalls(initialBalls);
  };

  const handleBallClick = (ballId) => {
    const updatedBalls = balls.map((ball) => {
      if (ball.id === ballId) {
        return { ...ball, recovered: true }; // Marcar la bola como recuperada si coincide con el ID
      }
      return ball;
    });

    setBalls(updatedBalls);

    // Verificar si recuperamos todos los juguetes
    const allRecovered = updatedBalls.every((ball) => ball.recovered);
    if (allRecovered) {
      setGameOver(true);
    }
  };

  const startGame = () => {
    const randomAngle = Math.random() * Math.PI * 2;
    const speed = levelSpeeds[level] || levelSpeeds[1];
    setVelocity({ x: Math.cos(randomAngle) * speed, y: Math.sin(randomAngle) * speed });
    setGameStarted(true);
    setOpacity(75);
  };


  const updateBallPosition = () => {
    setBallPosition((prevPosition) => {
      const timePassed = 16 / 1000; // Tiempo pasado en segundos desde el último fotograma
      let nextX = prevPosition.x + velocity.x * timePassed;
      let nextY = prevPosition.y + velocity.y * timePassed;
  
      // Limitar el movimiento dentro del contenedor
      const containerRect = document.querySelector(".container-ball").getBoundingClientRect();
      const ballWidth = 50;
      const ballHeight = 50;
  
      // Lógica de rebote en los bordes horizontales del contenedor
      if (nextX >= containerRect.right - ballWidth || nextX <= containerRect.left) {
        // Invertir la dirección horizontal
        nextX = prevPosition.x - velocity.x * timePassed; // Regresamos a la posición anterior
        velocity.x = -velocity.x; // Invertimos la dirección
      }
  
      // Lógica de rebote en los bordes verticales del contenedor
      if (nextY >= containerRect.bottom - ballHeight || nextY <= containerRect.top) {
        // Invertir la dirección vertical
        nextY = prevPosition.y - velocity.y * timePassed; // Regresamos a la posición anterior
        velocity.y = -velocity.y; // Invertimos la dirección
      }
  
      return { x: nextX, y: nextY };
    });
  };

  useEffect(() => {
    if (gameStarted) {
      const interval = setInterval(() => {
        updateBallPosition();
      }, 16);

      return () => clearInterval(interval);
    }
  }, [gameStarted]);

  return (
    <div className="container-game">
      <Link to="/" className="button-back-home">
        <i className="fa-solid fa-arrow-left me-2"></i>
        {idioma === "esp" ? "Inicio" : "Home"}
      </Link>
      <img src={michi} alt="" className="michi-menu-game" />
      <img src={marcoMenu} alt="" className="marco-menu-game" />

      <div className="estambres-recuperados">
        <img
          src={estambreFijoNivel1}
          alt=""
          className={opacity >= 25 ? "opacity-25" : "opacity-75"}
          onClick={() => handleBallClick(1)}
        />
        <img
          src={estambreFijoNivel2}
          alt=""
          className={opacity >= 25 ? "opacity-25" : "opacity-75"}
          onClick={() => handleBallClick(2)}
        />
        <img
          src={estambreFijoNivel3}
          alt=""
          className={opacity >= 25 ? "opacity-25" : "opacity-75"}
          onClick={() => handleBallClick(3)}
        />
        <img
          src={estambreFijoNivel4}
          alt=""
          className={opacity >= 25 ? "opacity-25" : "opacity-75"}
          onClick={() => handleBallClick(4)}
        />
        <img
          src={estambreFijoNivel5}
          alt=""
          className={opacity >= 25 ? "opacity-25" : "opacity-75"}
          onClick={() => handleBallClick(5)}
        />
      </div>

      {!gameOver && !gameStarted && (
        <button className="start-game-button" onClick={startGame}>
          <i className="fa-solid fa-play"></i>
        </button>
      )}

      <div className="container-ball">
        {gameStarted && (
          <img
            src={estambreNivel1}
            alt=""
            className="estambre-movimiento opacity-75"
            style={{ left: `${ballPosition.x}px`, top: `${ballPosition.y}px` }}
          />
        )}
      </div>
    </div>
  );
};

export default Game;
