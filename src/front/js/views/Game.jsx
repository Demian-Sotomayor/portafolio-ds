import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Game.css";
import marcoMenu from "../../../assets/marco-menu.svg";
import michi from "../../../assets/michi.svg";
import Swal from "sweetalert2";
// IMÁGENES DE JUEGO
import { gameImages } from "../../img/images";
import happy from "../../img/happy-cat.gif";

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
    4: 750,
    5: 750,
  };
  const levelSpeedsMobile = {
    1: 1000,
    2: 800,
    3: 600,
    4: 500,
    5: 350,
  };
  const [currentSpeed, setCurrentSpeed] = useState(levelSpeeds[1]);

  // Juguetes por cada nivel
  const levelImages = {
    1: gameImages["juguetesMovimiento"]["estambreNivel1"],
    2: gameImages["juguetesMovimiento"]["estambreNivel2"],
    3: gameImages["juguetesMovimiento"]["estambreNivel3"],
    4: gameImages["juguetesMovimiento"]["estambreNivel4"],
    5: gameImages["juguetesMovimiento"]["estambreNivel5"],
  };
  // Imágenes de los obstáculos
  const obstacleImages = {
    1: gameImages["pescados"]["pescadoNivel1"],
    2: gameImages["pescados"]["pescadoNivel2"],
    3: gameImages["pescados"]["pescadoNivel3"],
    4: gameImages["pescados"]["pescadoNivel4"],
    5: gameImages["pescados"]["pescadoNivel5"],
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
    const handleResize = () => {
      const speedByLevel =
        window.innerWidth <= 768 ? levelSpeedsMobile : levelSpeeds;
      setCurrentSpeed(speedByLevel[level]);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      }, currentSpeed);

      return () => {
        clearInterval(ballInterval);
      };
    }
  }, [gameStarted, level, currentSpeed]);

  useEffect(() => {
    if (firstBallVisible) {
      const ballInterval = setInterval(() => {
        moveBall();
      }, levelSpeeds[level]);
      return () => {
        clearInterval(ballInterval);
      };
    }
  }, [firstBallVisible, level, currentSpeed]);

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
        title: `${
          idioma === "esp"
            ? "¡Primer juguete recuperado!"
            : "First toy recovered!"
        }`,
        allowOutsideClick: false,
        icon: "success",
        confirmButtonText: `${
          idioma === "esp" ? "Siguiente nivel" : "Next level"
        }`,
      }).then((result) => {
        if (result.isConfirmed) {
          // Pasar al siguiente nivel
          setLevel(2);
          setLevelCompleted(true);
        }
      });
    } else if (level === 2 && ballId === 2) {
      Swal.fire({
        title: `${
          idioma === "esp"
            ? "¡Segundo juguete recuperado!"
            : "Second toy recovered!"
        }`,
        text: `${
          idioma === "esp"
            ? "El gatito te mira con admiración..."
            : "The kitten looks at you with admiration..."
        }`,
        allowOutsideClick: false,
        icon: "success",
        confirmButtonText: `${
          idioma === "esp" ? "Siguiente nivel" : "Next level"
        }`,
      }).then((result) => {
        if (result.isConfirmed) {
          // Pasar al siguiente nivel
          setLevel(3);
          setLevelCompleted(true);
        }
      });
    } else if (level === 3 && ballId === 3) {
      Swal.fire({
        title: `${
          idioma === "esp"
            ? "¡Tercer juguete recuperado!"
            : "Third toy recovered!"
        }`,
        text: `${
          idioma === "esp"
            ? "¡El gatito no puede creer tus reflejos!"
            : "The kitten can't believe your reflexes!!"
        }`,
        allowOutsideClick: false,
        icon: "success",
        confirmButtonText: `${
          idioma === "esp" ? "Siguiente nivel" : "Next level"
        }`,
      }).then((result) => {
        if (result.isConfirmed) {
          // Pasar al siguiente nivel
          setLevel(4);
          setLevelCompleted(true);
        }
      });
    } else if (level === 4 && ballId === 4) {
      Swal.fire({
        title: `${
          idioma === "esp"
            ? "¡Cuarto juguete recuperado!"
            : "Fourth toy recovered!"
        }`,
        text: `${
          idioma === "esp"
            ? '"¿Por qué hay tanta comida volando?"'
            : '"Why is there so much food flying around?"'
        }`,
        allowOutsideClick: false,
        icon: "success",
        confirmButtonText: `${
          idioma === "esp" ? "Siguiente nivel" : "Next level"
        }`,
      }).then((result) => {
        if (result.isConfirmed) {
          // Pasar al siguiente nivel
          setLevel(5);
          setLevelCompleted(true);
        }
      });
    } else if (level === 5 && ballId === 5) {
      Swal.fire({
        title: `${
          idioma === "esp"
            ? "¡Victoria! El michi está feliz"
            : "Victory! The kitten is happy!"
        }`,
        text: `${
          idioma === "esp"
            ? "Este gatito te apreciará y recordará de por vida... ¡¡Gracias!!"
            : "This kitten will appreciate and remember you for a lifetime... Thank you!!"
        }`,
        allowOutsideClick: false,
        html: `<img src=${happy} alt="GIF" width="100px" height="auto" />`,
        confirmButtonText: `${
          idioma === "esp" ? "Volver al menú" : "Back to home"
        }`,
        showCancelButton: true,
        cancelButtonText: `${
          idioma === "esp" ? "Volver a jugar" : "Play again"
        }`,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        } else {
          window.location.reload(false);
        }
      });
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setOpacity(75);
  };

  const moveBall = () => {
    // Mover la pelota a su próxima posición
    const newBalls = balls.map((ball) => {
      if (ball.level === level) {
        // Calcular la nueva posición basada en la velocidad y dirección
        const deltaX = (Math.random() * 2 - 1) * 25; // Ejemplo de velocidad horizontal
        const deltaY = (Math.random() * 2 - 1) * 25; // Ejemplo de velocidad vertical
        const newX = ball.position.x + deltaX;
        const newY = ball.position.y + deltaY;
  
        // Limitar la posición dentro de los límites de la ventana
        const maxX = window.innerWidth - ballSize;
        const maxY = window.innerHeight - ballSize;
        const boundedX = Math.max(0, Math.min(newX, maxX));
        const boundedY = Math.max(0, Math.min(newY, maxY));
  
        return {
          ...ball,
          position: { x: boundedX, y: boundedY },
        };
      }
      return ball;
    });
  
    setBalls(newBalls);
  };

  const handleBackHome = () => {
    Swal.fire({
      title: `${idioma === "esp" ? "¿Estás seguro?" : "Are you sure?"}`,
      text: `${
        idioma === "esp"
          ? '¡Si clickeaste por error, presiona "no"!'
          : `If you clicked by mistake, just press "no"!`
      }`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${
        idioma === "esp" ? "Volver a inicio" : "Back to home"
      }`,
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  return (
    <div className="container-game">
      <button className="button-back-home" onClick={handleBackHome}>
        <i className="fa-solid fa-arrow-left me-2"></i>
        {idioma === "esp" ? "Inicio" : "Home"}
      </button>
      <img src={michi} alt="" className="michi-menu-game" />
      <img src={marcoMenu} alt="" className="marco-menu-game" />

      <div className="estambres-recuperados">
        <img
          src={gameImages["juguetesFijos"]["estambreFijoNivel1"]}
          alt=""
          className={recoveredToys[1] ? "opacity-75" : "opacity-25"}
          onClick={() => handleBallClick(1)}
        />
        <img
          src={gameImages["juguetesFijos"]["estambreFijoNivel2"]}
          alt=""
          className={recoveredToys[2] ? "opacity-75" : "opacity-25"}
          onClick={() => handleBallClick(2)}
        />
        <img
          src={gameImages["juguetesFijos"]["estambreFijoNivel3"]}
          alt=""
          className={recoveredToys[3] ? "opacity-75" : "opacity-25"}
          onClick={() => handleBallClick(3)}
        />
        <img
          src={gameImages["juguetesFijos"]["estambreFijoNivel4"]}
          alt=""
          className={recoveredToys[4] ? "opacity-75" : "opacity-25"}
          onClick={() => handleBallClick(4)}
        />
        <img
          src={gameImages["juguetesFijos"]["estambreFijoNivel5"]}
          alt=""
          className={recoveredToys[5] ? "opacity-75" : "opacity-25"}
          onClick={() => handleBallClick(5)}
        />
      </div>

      {/* Renderizar pelotas */}
      {gameStarted && (
        <div
          className="pelotas-container"
          onClick={(e) => handlePelotasContainerClick(e)}
        >
          {balls.map((ball) => {
            if (ball.level === level) {
              return (
                <img
                  key={ball.id}
                  src={levelImages[ball.level]} // Usa levelImages para obtener la ruta de la imagen
                  alt=""
                  className="estambre-movimiento opacity-75"
                  style={{
                    position: "absolute",
                    left: ball.position?.x ?? "-50%",
                    top: ball.position?.y ?? "-50%",
                    width: `${ballSize}px`,
                    height: `${ballSize}px`,
                    pointerEvents: "none", // Hacer que la imagen ignore los eventos del mouse
                  }}
                />
              );
            } else {
              return null; // No renderizar la pelota si no es del nivel actual
            }
          })}
        </div>
      )}

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
