import "../../styles/Home.css";
import Contact from "../components/Contact.jsx";
import marcoHome from "../../../assets/Marco.svg";

const Home = () => {

  return (
    <>
      <img src={marcoHome} alt="" className="marco-home" />
      <div className="container-fluid mb-5 container-home">
        <div className="posicion-obj-home">
          <div id="textos-hero" className="textos-hero">
            <p className="text-left">Hi!</p>
            <p className="text-left">I&#39;m Demian,</p>
            <p className="text-left">
              <strong>Full-Stack Developer</strong>
            </p>
          </div>

          <button
            type="button"
            className="btn-contact"
            data-bs-toggle="modal"
            data-bs-target="#modalContact"
          >
            Contact me!
          </button>
        </div>
      </div>

      {/* Llamado al componente Contact para traer el modal de contacto */}
      <Contact />
    </>
  );
};

export default Home;
