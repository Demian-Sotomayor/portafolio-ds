import "../../styles/Home.css";
import Contact from "../components/Contact.jsx";
import marcoHome from "../../../assets/Marco.svg";

  // ---------------------------------- Pendiente margen mal a la izquierda --------------------------------
  // -------------------------------------------------------------------------------------------------------

const Home = ({ idioma }) => {
  return (
    <>
      <img src={marcoHome} alt="" className="marco-home" />
      <div className="container-fluid mb-5 container-home">
        <div className={`posicion-obj-home ${idioma === "esp" ? "textos-hero-esp" : ""}`}>
          <div id="textos-hero" className="textos-hero">
            <p className="text-left">{idioma === "esp" ? "¡Hola!" : "Hi!"}</p>
            <p className="text-left">{idioma === "esp" ? "Soy Demian," : "I'm Demian,"}</p>
            <p className="text-left">
              <strong>{idioma === "esp" ? "Desarrollador Full-Stack" : "Full-Stack Developer"}</strong>
            </p>
          </div>

          <button
            type="button"
            className="btn-contact"
            data-bs-toggle="modal"
            data-bs-target="#modalContact"
          >
            {idioma === "esp" ? "¡Contáctame!" : "Contact me!"}
          </button>
        </div>
      </div>

      {/* Llamado al componente Contact para traer el modal de contacto */}
      <Contact idioma={idioma} />
    </>
  );
};

export default Home;
