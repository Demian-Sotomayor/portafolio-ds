import { Link } from "react-router-dom";
import Menu from "../components/Menu";
import { useState } from "react";
import "../../styles/AllProjects.css"
import bt from "../../img/projects/battleship/1-bt.jpeg"
import bt2 from "../../img/projects/battleship/2-bt.jpeg"
import bt3 from "../../img/projects/battleship/3-bt.jpeg"
import rdv from "../../img/projects/elRinconDelVino/1.jpeg"
import rdv2 from "../../img/projects/elRinconDelVino/2.jpeg"
import rdv3 from "../../img/projects/elRinconDelVino/3.jpeg"
import sw from "../../img/projects/star-wars/1-sw.jpg"
import sw2 from "../../img/projects/star-wars/2-sw.jpg"
import sw3 from "../../img/projects/star-wars/3-sw.jpg"

const AllProjects = () => {
  const [isActive, setIsActive] = useState(false);
  const [idioma, setIdioma] = useState(localStorage.getItem("idioma") || "eng");

  return (
  
    <>
      <Menu
        setIsActive={setIsActive}
        isActive={isActive}
        setIdioma={setIdioma}
        idioma={idioma}
      />
      <Link to="/" className="button-back-home">
        <i className="fa-solid fa-arrow-left me-2"></i>
        {idioma === "esp" ? "Inicio" : "Home"}
      </Link>

      <div className="all-projects-container row">
        <div className="projects-left col-7">
          <img src="" alt="" className="projects-images" />
        </div>

        <div className="projects-right col-5">
          <div className="projects-texts">
            <h2 className="my-5" id="project1">- El Rincón del Vino</h2>
            <h2 className="my-5" id="project2">- Battleship</h2>
            <h2 className="my-5" id="project3">- Starwars Blog</h2>
            <h2 className="my-5">- ¡Más próximamente!</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProjects;
