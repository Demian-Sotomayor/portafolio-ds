import React, { useEffect, useState } from "react";
import "../../styles/Game.css";
import marcoMenu from "../../../assets/marco-menu.svg";
import michi from "../../../assets/michi.svg";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// ESTAMBRES FIJOS (HUD)
import estambreFijoNivel1 from "../../img/game/con-hilo/bola-estambre-verde.png";
import estambreFijoNivel2 from "../../img/game/con-hilo/bola-estambre-azul.png";
import estambreFijoNivel3 from "../../img/game/con-hilo/bola-estambre-morada.png";
import estambreFijoNivel4 from "../../img/game/con-hilo/bola-estambre-naranja.png";
import estambreFijoNivel5 from "../../img/game/con-hilo/bola-estambre-roja.png";

// ESTAMBRES DE NIVELES
import bolaEstambre1 from "../../img/game/sin-hilo/bola-estambre-1-sin-hilo.png";
import bolaEstambre2 from "../../img/game/sin-hilo/bola-estambre-2-sin-hilo.png";
import bolaEstambre3 from "../../img/game/sin-hilo/bola-estambre-3-sin-hilo.png";
import bolaEstambre4 from "../../img/game/sin-hilo/bola-estambre-4-sin-hilo.png";
import bolaEstambre5 from "../../img/game/sin-hilo/bola-estambre-5-sin-hilo.png";

// OBSTÁCULOS
import pescadoNivel1 from "../../img/game/pescados/pescado-lvl-1.png";
import pescadoNivel2 from "../../img/game/pescados/pescado-lvl-2.png";
import pescadoNivel3 from "../../img/game/pescados/pescado-lvl-3.png";
import pescadoNivel4 from "../../img/game/pescados/pescado-lvl-4.png";
import pescadoNivel5 from "../../img/game/pescados/pescado-lvl-5.png";

import happy from "../../img/happy-cat.gif"

const Game = () => {
  const navigate = useNavigate();
  // Cambiar idioma a inglés o español
  const [idioma, setIdioma] = useState(localStorage.getItem("idioma") || "eng");
  // Temporalmente manejando la opacidad así
  const [opacity, setOpacity] = useState(25);
  // Bolas de estambre
  const [balls, setBalls] = useState([]);
  // Nivel actual
  const [level, setLevel] = useState(1);
  // Juego finalizado
  const [gameOver, setGameOver] = useState(false);
  // Juego iniciado
  const [gameStarted, setGameStarted] = useState(false);
  // Estado de la primera pelota
  const [firstBallVisible, setFirstBallVisible] = useState(false);
  // Estado para controlar si el nivel ha sido completado
  const [levelCompleted, setLevelCompleted] = useState(false);
  // Juguetes recuperados
  const [recoveredToys, setRecoveredToys] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  // Velocidad de niveles
  const levelSpeeds = {
    1: 2000,
    2: 1200,
    3: 800,
    4: 650,
    5: 600,
  };
  // Juguetes por cada nivel
  const levelImages = {
    1: bolaEstambre1,
    2: bolaEstambre2,
    3: bolaEstambre3,
    4: bolaEstambre4,
    5: bolaEstambre5,
  };
  // Imágenes de los obstáculos
  const obstacleImages = {
    1: pescadoNivel1,
    2: pescadoNivel2,
    3: pescadoNivel3,
    4: pescadoNivel4,
    5: pescadoNivel5,
  };
  // Tamaños de los obstáculos por nivel
  const obstacleSizes = {
    1: { width: 100, height: 70 },
    2: { width: 110, height: 80 },
    3: { width: 120, height: 90 },
    4: { width: 130, height: 100 },
    5: { width: 120, height: 90 },
  };
  // Tamaño pelota
  const baseBallSize = 50;
  // Calcular tamaño de pelota por nivel
  const ballSize = baseBallSize - (level - 1) * 3;

  useEffect(() => {
    initializeBalls();
  }, []);

  useEffect(() => {
    if (gameStarted) {
      // Mostrar la primera pelota al comienzo del juego
      setFirstBallVisible(true);

      // Iniciar intervalos de movimiento para bolas y obstáculos
      const ballInterval = setInterval(() => {
        moveBall();
      }, levelSpeeds[level]);

      return () => {
        clearInterval(ballInterval);
      };
    }
  }, [gameStarted, level]);

  useEffect(() => {
    if (firstBallVisible) {
      const ballInterval = setInterval(() => {
        moveBall();
      }, levelSpeeds[level]);
      return () => {
        clearInterval(ballInterval);
      };
    }
  }, [firstBallVisible, level]);

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

    // Marcar el juguete como recuperado
    setRecoveredToys({ ...recoveredToys, [ballId]: true });

    // Condiciones de victoria
    if (level === 1 && ballId === 1) {
        Swal.fire({
          title: `${idioma === "esp" ? "¡Primer juguete recuperado!" : "First toy recovered!"}`,
          allowOutsideClick: false,
          icon: "success",
          confirmButtonText: `${idioma === "esp" ? "Siguiente nivel" : "Next level"}`,
        }).then((result) => {
          if (result.isConfirmed) {
            // Pasar al siguiente nivel
            setLevel(2);
            setLevelCompleted(true);
          }
        });
    } else if (level === 2 && ballId === 2) {
      Swal.fire({
        title: `${idioma === "esp" ? "¡Segundo juguete recuperado!" : "Second toy recovered!"}`,
        text: `${idioma === "esp" ? "El gatito te mira con admiración..." : "The kitten looks at you with admiration..."}`,
        allowOutsideClick: false,
        icon: "success",
        confirmButtonText: `${idioma === "esp" ? "Siguiente nivel" : "Next level"}`,
      }).then((result) => {
        if (result.isConfirmed) {
          // Pasar al siguiente nivel
          setLevel(3);
          setLevelCompleted(true);
        }
      });
    } else if (level === 3 && ballId === 3) {
      Swal.fire({
        title: `${idioma === "esp" ? "¡Tercer juguete recuperado!" : "Third toy recovered!"}`,
        text: `${idioma === "esp" ? "¡El gatito no puede creer tus reflejos!" : "The kitten can't believe your reflexes!!"}`,
        allowOutsideClick: false,
        icon: "success",
        confirmButtonText: `${idioma === "esp" ? "Siguiente nivel" : "Next level"}`,
      }).then((result) => {
        if (result.isConfirmed) {
          // Pasar al siguiente nivel
          setLevel(4);
          setLevelCompleted(true);
        }
      });
    } else if (level === 4 && ballId === 4) {
      Swal.fire({
        title: `${idioma === "esp" ? "¡Cuarto juguete recuperado!" : "Fourth toy recovered!"}`,
        text: `${idioma === "esp" ? '"¿Por qué hay tanta comida volando?"' : '"Why is there so much food flying around?"'}`,
        allowOutsideClick: false,
        icon: "success",
        confirmButtonText: `${idioma === "esp" ? "Siguiente nivel" : "Next level"}`,
      }).then((result) => {
        if (result.isConfirmed) {
          // Pasar al siguiente nivel
          setLevel(5);
          setLevelCompleted(true);
        }
      });
    } else if (level === 5 && ballId === 5) {
      Swal.fire({
        title: `${idioma === "esp" ? "¡Victoria! El michi está feliz" : "Victory! The kitten is happy!"}`,
        text: `${idioma === "esp" ? "Este gatito te apreciará y recordará de por vida... ¡¡Gracias!!" : "This kitten will appreciate and remember you for a lifetime... Thank you!!"}`,
        allowOutsideClick: false,
        html: `<img src=${happy} alt="GIF" width="100px" height="auto" />`,
        confirmButtonText: `${idioma === "esp" ? "Volver al menú" : "Back to home"}`,
        showCancelButton: true,
        cancelButtonText: `${idioma === "esp" ? "Volver a jugar" : "Play again"}`
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/")
        } else {
          window.location.reload(false)          
        }
      })
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setOpacity(75);
  };

  const moveBall = () => {
    // Mover la pelota a una nueva posición aleatoria
    const newBalls = balls.map((ball) => {
      if (ball.level === level) {
        return {
          ...ball,
          position: {
            x: Math.random() * (window.innerWidth - 50),
            y: Math.random() * (window.innerHeight - 50),
          },
        };
      }
      return ball;
    });

    setBalls(newBalls);
  };

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
          className={recoveredToys[1] ? "opacity-75" : "opacity-25"}
          onClick={() => handleBallClick(1)}
        />
        <img
          src={estambreFijoNivel2}
          alt=""
          className={recoveredToys[2] ? "opacity-75" : "opacity-25"}
          onClick={() => handleBallClick(2)}
        />
        <img
          src={estambreFijoNivel3}
          alt=""
          className={recoveredToys[3] ? "opacity-75" : "opacity-25"}
          onClick={() => handleBallClick(3)}
        />
        <img
          src={estambreFijoNivel4}
          alt=""
          className={recoveredToys[4] ? "opacity-75" : "opacity-25"}
          onClick={() => handleBallClick(4)}
        />
        <img
          src={estambreFijoNivel5}
          alt=""
          className={recoveredToys[5] ? "opacity-75" : "opacity-25"}
          onClick={() => handleBallClick(5)}
        />
      </div>

      {/* Renderizar pelotas */}
      {gameStarted &&
        balls.map((ball) => {
          if (ball.level === level) {
            return (
              <img
                key={ball.id}
                src={levelImages[ball.level]} // Usa levelImages para obtener la ruta de la imagen
                alt=""
                className="estambre-movimiento opacity-75"
                style={{
                  left: ball.position?.x ?? "-50%",
                  top: ball.position?.y ?? "-50%",
                  width: `${ballSize}px`,
                  height: `${ballSize}px`
                }}
                onClick={() => handleBallClick(ball.id)}
              />
            );
          } else {
            return null; // No renderizar la pelota si no es del nivel actual
          }
        })}

      {/* Botón de inicio del juego */}
      {!gameOver && !gameStarted && (
        <button className="start-game-button" onClick={startGame}>
          <i className="fa-solid fa-play"></i>
        </button>
      )}

      {/* Renderizar obstáculos */}
      {gameStarted && level >= 1 && level <= 5 && (
        <div className="obstacles">
          {/* Condición para renderizar obstáculos según el nivel */}
          {level >= 1 && (
            <>
              <img
                src={obstacleImages[level]}
                alt=""
                className="obstaculo-default"
                style={{
                  width: `${obstacleSizes[level].width}px`,
                  height: `${obstacleSizes[level].height}px`,
                }}
              />
              <img
                src={obstacleImages[level]}
                alt=""
                className="obstaculo-default"
                style={{
                  width: `${obstacleSizes[level].width}px`,
                  height: `${obstacleSizes[level].height}px`,
                }}
              />
              <img
                src={obstacleImages[level]}
                alt=""
                className="obstaculo-default"
                style={{
                  width: `${obstacleSizes[level].width}px`,
                  height: `${obstacleSizes[level].height}px`,
                }}
              />
              <img
                src={obstacleImages[level]}
                alt=""
                className="obstaculo-default"
                style={{
                  width: `${obstacleSizes[level].width}px`,
                  height: `${obstacleSizes[level].height}px`,
                }}
              />
            </>
          )}
          {level >= 2 && (
            <img
              src={obstacleImages[level]}
              alt=""
              className="obstaculo-extra"
              style={{
                width: `${obstacleSizes[level].width}px`,
                height: `${obstacleSizes[level].height}px`,
              }}
            />
          )}
          {level >= 3 && (
            <img
              src={obstacleImages[level]}
              alt=""
              className="obstaculo-extra"
              style={{
                width: `${obstacleSizes[level].width}px`,
                height: `${obstacleSizes[level].height}px`,
              }}
            />
          )}
          {level >= 4 && (
            <img
              src={obstacleImages[level]}
              alt=""
              className="obstaculo-extra"
              style={{
                width: `${obstacleSizes[level].width}px`,
                height: `${obstacleSizes[level].height}px`,
              }}
            />
          )}
          {level === 5 && (
            <img
              src={obstacleImages[level]}
              alt=""
              className="obstaculo-extra"
              style={{
                width: `${obstacleSizes[level].width}px`,
                height: `${obstacleSizes[level].height}px`,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Game;
