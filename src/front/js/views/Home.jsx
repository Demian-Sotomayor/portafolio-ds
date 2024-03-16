import { useEffect } from "react";
import "../../styles/Home.css";
import Contact from "../components/Contact.jsx";

const Home = ({id, isActive, onChange}) => {

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(id);
      const rect = element.getBoundingClientRect();
      const scrollPosition = window.scrollY + (window.innerHeight / 2);

      if(scrollPosition >= rect.top && scrollPosition < rect.bottom) {
        onChange("home");
      }
    };

    window.addEventListener('scroll',handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id, onChange]);

  return (
    <>
      <div id={id} className={`container-fluid mb-5 container-home ${isActive ? 'active' : ''}`}>
        <div className="posicion-obj-home">
          <div className="textos-hero">
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
