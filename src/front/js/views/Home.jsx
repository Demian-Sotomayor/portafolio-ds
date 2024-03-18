import { useEffect, useRef } from "react";
import "../../styles/Home.css";
import Contact from "../components/Contact.jsx";
import marcoHome from "../../../assets/Marco.svg";

const Home = () => {
  const textosHeroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const textosHero = textosHeroRef.current;
      if (isElementVisible(textosHero)) {
        // Aquí podrías ejecutar alguna acción si el elemento es visible
      }
    };

    const isElementVisible = (element) => {
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight)
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <img src={marcoHome} alt="" className="marco-home" />
      <div id="home" className="container-fluid mb-5 container-home">
        <div className="posicion-obj-home">
          <div id="textos-hero" className="textos-hero" ref={textosHeroRef}>
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
