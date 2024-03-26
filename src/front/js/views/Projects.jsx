import "../../styles/Projects.css";
import empty from "../../img/portafolio/logo.jpg";
import michiEng from "../../img/portafolio/michi-eng.png";
import michiEsp from "../../img/portafolio/michi-esp.png";
import Swal from "sweetalert2";
import lineaProjects from "../../../assets/linea-lado-a-lado.svg";

const Projects = ({idioma}) => {

  const handleAlertMoreProjects = () => {

    if (idioma === "esp") {
      Swal.fire({
        icon: "info",
        title: "¡Espera!",
        text: "Parece que no hay más contenido disponible... ¡Pero no te preocupes! con el tiempo añadiremos más.",
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Stop there!",
        text: "There appears to be no more content available at this time, but don't worry, more will be added over time!",
      });
    }
  };

  return (
    <>
      <img src={lineaProjects} alt="" className="linea-projects" />
      <div id="projects" className="container-fluid container-projects">
        {/* ---- TÍTULO ---- */}
        <h1 className="projects-title text-center">{idioma === "esp" ? "Proyectos" : "Projects"}</h1>
        {/* ---- CONTAINER CARRUSEL ---- */}
        <div className="container-carousel">
          <div id="carouselExampleDark" className="carousel slide">
            {/* INDICADOR DIAPOSITIVAS */}
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="3"
                aria-label="Slide 4"
              ></button>
            </div>

            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="10000">
                <div className="container-img-carousel">
                  <img src={empty} className="img-carousel" alt="..." />
                  <img src={empty} className="img-carousel" alt="..." />
                  <img src={empty} className="img-carousel" alt="..." />
                </div>
                {/* INFO PRIMER PROYECTO */}
                <div className="carousel-caption">
                  <h5>&#34;El Rincón del Vino&#34;</h5>
                  <p className="opacity-75">
                    React.js, Bootstrap, Python, Flask, Node.js, SQL-Alchemy
                  </p>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <div className="container-img-carousel">
                  <img src={empty} className="img-carousel" alt="..." />
                  <img src={empty} className="img-carousel" alt="..." />
                  <img src={empty} className="img-carousel" alt="..." />
                </div>
                {/* INFO SEGUNDO PROYECTO */}
                <div className="carousel-caption">
                  <h5>&#34;Battleship&#34;</h5>
                  <p className="opacity-75">React.js, Vite, Bootstrap, CSS3</p>
                </div>
              </div>
              <div className="carousel-item">
                <div className="container-img-carousel">
                  <img src={empty} className="img-carousel" alt="..." />
                  <img src={empty} className="img-carousel" alt="..." />
                  <img src={empty} className="img-carousel" alt="..." />
                </div>
                {/* INFO TERCER PROYECTO */}
                <div className="carousel-caption">
                  <h5>&#34;Tercer proyecto&#34;</h5>
                  <p className="opacity-75">Tecnologías utilizadas</p>
                </div>
              </div>
              <div className="carousel-item">
                <div className="container-img-carousel">
                  <img
                    src={idioma === "esp" ? michiEsp : michiEng}
                    className="img-carousel"
                    alt="..."
                    onClick={handleAlertMoreProjects}
                  />
                </div>
                {/* INFO MÁS PROYECTOS */}
                <div className="carousel-caption">
                  <h5>{idioma === "esp" ? "¡Descubre más de mis proyectos!" : "Discover more of my projects!"}</h5>
                  <p className="opacity-75">
                    {idioma === "esp" ? "Efectivamente, no se me ocurrió otra forma de que hagas click en la foto" : "Exactly, I couldn't think of any other way to get you to click the photo."}

                  </p>
                </div>
              </div>
            </div>
            {/* BOTÓN DE PREVIA */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="prev"
            >
              <span aria-hidden="true">
                <i className="fa-solid fa-chevron-left carousel-button carousel-button--left"></i>
              </span>
              <span className="visually-hidden">Previous</span>
            </button>
            {/* BOTÓN DE SIGUIENTE */}
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="next"
            >
              <span aria-hidden="true">
                <i className="fa-solid fa-chevron-right carousel-button carousel-button--right"></i>
              </span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
