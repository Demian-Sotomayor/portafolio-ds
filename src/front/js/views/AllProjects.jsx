import { Link } from "react-router-dom";
import Menu from "../components/Menu";
import { useState } from "react";
import "../../styles/AllProjects.css";
import { projectsImages } from "../../img/images.js";

const AllProjects = () => {
  const [isActive, setIsActive] = useState(false);
  const [idioma, setIdioma] = useState(localStorage.getItem("idioma") || "eng");
  const [previewImage, setPreviewImage] = useState("");
  const [currentProject, setCurrentProject] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const handleProjectHover = (projectName) => {
    setCurrentProject(projectName);
    setPreviewImage(projectsImages[projectName][1]);
  };

  const handleProjectClick = (projectName) => {
    setCurrentProject(projectName);
    setGalleryImages(Object.values(projectsImages[projectName]));
  };

  return (
    <>
      <Menu
        setIsActive={setIsActive}
        isActive={isActive}
        setIdioma={setIdioma}
        idioma={idioma}
      />
      <Link to="/" className="button-back-home button-back-home-projects">
        <i className="fa-solid fa-arrow-left me-2"></i>
        {idioma === "esp" ? "Inicio" : "Home"}
      </Link>

      <div className="all-projects-container row">
        <div className="projects-left col-7">
          <img src={previewImage} alt="" className="projects-images" />
        </div>

        <div className="projects-right col-5">
          <div className="projects-texts">
            <h3
              className="my-5"
              id="project1"
              onMouseEnter={() => handleProjectHover("elRinconDelVino")}
              onClick={() => handleProjectClick("elRinconDelVino")}
              data-bs-toggle="modal"
              data-bs-target="#modalGalleryProjects"
            >
              - El Rincón del Vino
              <p className="opacity-50 h6">
                {idioma === "esp" ? "(Lamentablemente no cuento con imágenes de mejor resolución, ¡Perdón!)" : "(Unfortunately I don't have better resolution images of this project, sorry!)"}

              </p>
            </h3>
            <h3
              className="my-5"
              id="project2"
              onMouseEnter={() => handleProjectHover("battleship")}
              onClick={() => handleProjectClick("battleship")}
              data-bs-toggle="modal"
              data-bs-target="#modalGalleryProjects"
            >
              - Battleship
            </h3>
            <h3
              className="my-5"
              id="project3"
              onMouseEnter={() => handleProjectHover("starwars")}
              onClick={() => handleProjectClick("starwars")}
              data-bs-toggle="modal"
              data-bs-target="#modalGalleryProjects"
            >
              - Starwars Blog
            </h3>
            <h3 className="my-5">{idioma === "esp" ? "- ¡Más próximamente!" : "- More coming soon!"}</h3>
          </div>
        </div>
      </div>

      {/* --- // MODAL // --- */}
      <div
        className="modal modal-projects fade"
        id="modalGalleryProjects"
        tabIndex="-1"
        aria-labelledby="#modalGalleryProjectsLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-projects">
          <div className="modal-content">
            <div className="d-flex justify-content-end mx-3 mt-3">
              <button
                type="button"
                className="btn-close-projects"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark icon-close-modal-projects"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="gallery-projects">
                {galleryImages.map((image, index) => (
                  <img key={index} src={image} alt={`Image ${index}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProjects;
