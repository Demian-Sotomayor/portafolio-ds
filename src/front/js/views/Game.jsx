import React, { useEffect, useState } from "react";
import "../../styles/Game.css";
import marcoMenu from "../../../assets/marco-menu.svg";
import michi from "../../../assets/michi.svg";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

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
import huesoPerro from "../../img/game/hueso-perro.png";

const Game = () => {
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
  // Obstáculos
  const [obstacles, setObstacles] = useState([]);
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
    1: 2500,
    2: 1700,
    3: 1100,
    4: 800,
    5: 650,
  };
  // Juguetes por cada nivel
  const levelImages = {
    1: bolaEstambre1,
    2: bolaEstambre2,
    3: bolaEstambre3,
    4: bolaEstambre4,
    5: bolaEstambre5,
  };

  useEffect(() => {
    initializeBalls();
    initializeObstacles();
  }, []);

  useEffect(() => {
    if (gameStarted) {
      // Inicializar obstáculos al comenzar el juego
      initializeObstacles();
  
      // Mostrar la primera pelota al comienzo del juego
      setFirstBallVisible(true);
  
      // Iniciar intervalos de movimiento para bolas y obstáculos
      const ballInterval = setInterval(() => {
        moveBall();
      }, levelSpeeds[level]);
  
      const obstacleInterval = setInterval(() => {
        moveObstacles();
      }, 3000); // Intervalo para mover los obstáculos
  
      return () => {
        clearInterval(ballInterval);
        clearInterval(obstacleInterval);
      };
    }
  }, [gameStarted, level]);

  useEffect(() => {
    if (firstBallVisible) {
      const ballInterval = setInterval(() => {
        moveBall();
      }, levelSpeeds[level]);
      const obstacleInterval = setInterval(() => {
        moveObstacles();
      }, 3000);

      return () => {
        clearInterval(ballInterval);
        clearInterval(obstacleInterval);
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

  const initializeObstacles = () => {
    // Definir arreglo con los obstáculos según el nivel
    let newObstacles = [];
    switch (level) {
      case 2:
        newObstacles = [
          { id: 1, level: 2, type: "huesoPerro", size: 50 },
          { id: 2, level: 2, type: "huesoPerro", size: 50 },
          { id: 3, level: 2, type: "huesoPerro", size: 50 },
        ];
        break;
      case 3:
        newObstacles = [
          { id: 1, level: 3, type: "huesoPerro", size: 60 },
          { id: 2, level: 3, type: "huesoPerro", size: 60 },
          { id: 3, level: 3, type: "huesoPerro", size: 60 },
          { id: 4, level: 3, type: "huesoPerro", size: 60 },
        ];
        break;
      case 4:
        newObstacles = [
          { id: 1, level: 4, type: "huesoPerro", size: 75 },
          { id: 2, level: 4, type: "huesoPerro", size: 75 },
          { id: 3, level: 4, type: "huesoPerro", size: 75 },
          { id: 4, level: 4, type: "huesoPerro", size: 75 },
          { id: 5, level: 4, type: "huesoPerro", size: 75 },
        ];
        break;
      case 5:
        newObstacles = [
          { id: 1, level: 5, type: "huesoPerro", size: 70 },
          { id: 2, level: 5, type: "huesoPerro", size: 70 },
          { id: 3, level: 5, type: "huesoPerro", size: 70 },
          { id: 4, level: 5, type: "huesoPerro", size: 70 },
          { id: 5, level: 5, type: "huesoPerro", size: 70 },
          { id: 6, level: 5, type: "huesoPerro", size: 70 },
          { id: 7, level: 5, type: "huesoPerro", size: 70 },
          { id: 8, level: 5, type: "huesoPerro", size: 70 },
        ];
        break;
      default:
        break;
    }
    setObstacles(newObstacles);
  };

  const moveObstacles = () => {
    const newObstacles = obstacles.map((obstacle) => {
      switch (obstacle.type) {
        case "huesoPerro":
          return {
            ...obstacle,
            position: {
              x: Math.random() * (window.innerWidth - 150),
              y: Math.random() * (window.innerHeight - 150),
            },
            rotation: Math.random() * 360,
          };
        default:
          return obstacle;
      }
    });
    setObstacles(newObstacles);
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
      // Mostrar mensaje con SweetAlert2
      Swal.fire({
        title: "¡Primer juguete recuperado!",
        allowOutsideClick: false,
        icon: "success",
        confirmButtonText: "Siguiente nivel",
      }).then((result) => {
        if (result.isConfirmed) {
          // Pasar al siguiente nivel
          setLevel(2);
          setLevelCompleted(true);
        }
      });
    } else if (level === 2 && ballId === 2) {
      Swal.fire({
        title: "¡Segundo juguete recuperado!",
        text: "El gatito te mira con admiración...",
        allowOutsideClick: false,
        icon: "success",
        confirmButtonText: "Siguiente nivel",
      }).then((result) => {
        if (result.isConfirmed) {
          // Pasar al siguiente nivel
          setLevel(3);
          setLevelCompleted(true);
        }
      });
    } else if (level === 3 && ballId === 3) {
      Swal.fire({
        title: "¡Tercer juguete recuperado!",
        text: "¡El gatito no puede creer tus reflejos!",
        allowOutsideClick: false,
        icon: "success",
        confirmButtonText: "Siguiente nivel",
      }).then((result) => {
        if (result.isConfirmed) {
          // Pasar al siguiente nivel
          setLevel(4);
          setLevelCompleted(true);
        }
      });
    } else if (level === 4 && ballId === 4) {
      Swal.fire({
        title: "¡Cuarto juguete recuperado!",
        text: "¡Que huesos más molestos!",
        allowOutsideClick: false,
        icon: "success",
        confirmButtonText: "Siguiente nivel",
      }).then((result) => {
        if (result.isConfirmed) {
          // Pasar al siguiente nivel
          setLevel(5);
          setLevelCompleted(true);
        }
      });
    } else if (level === 5 && ballId === 5) {
      Swal.fire({
        title: "¡Victoria! El michi está feliz",
        text: "Este gatito te apreciará y recordará de por vida... ¡¡Gracias!!",
        allowOutsideClick: false,
        icon: "success",
        confirmButtonText: "Volver al menú",
      }).then((result) => {
        if (result.isConfirmed) {
          // Pasar al siguiente nivel
          setLevel(5);
          setLevelCompleted(true);
        }
      });
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

      {!gameOver && !gameStarted && (
        <button className="start-game-button" onClick={startGame}>
          <i className="fa-solid fa-play"></i>
        </button>
      )}

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
                }}
                width="50px"
                height="50px"
                onClick={() => handleBallClick(ball.id)}
              />
            );
          } else {
            return null; // No renderizar la pelota si no es del nivel actual
          }
        })}

      {obstacles.map((obstacle) => (
        <img
          key={obstacle.id}
          src={huesoPerro}
          alt="Obstacle"
          className="hueso-perro"
          style={{
            left: obstacle.position?.x ?? "-50%",
            top: obstacle.position?.y  ?? "-50%",
            transform: `rotate(${obstacle.rotation}deg)`,
          }}
          width={`${obstacle.size + 20}px`}
          height={`${obstacle.size}px`}
        />
      ))}
    </div>
  );
};

export default Game;
