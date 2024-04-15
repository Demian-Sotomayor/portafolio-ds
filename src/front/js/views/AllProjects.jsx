import { Link } from "react-router-dom";
import Menu from "../components/Menu";
import { useState } from "react";
import "../../styles/AllProjects.css"

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

      <div className="all-projects-container">

      </div>
    </>
  );
};

export default AllProjects;
