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
  const [showModal, setShowModal] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);

  const handleProjectHover = (projectName) => {
    setCurrentProject(projectName);
    setPreviewImage(projectsImages[projectName][1]);
  };

  const handlePreview = (projectName) => {
    setCurrentProject(projectName);
    setPreviewImage(projectsImages[projectName][1]);
  };

  const handleProjectClick = (projectName) => {
    setCurrentProject(projectName);
    setGalleryImages(Object.values(projectsImages[projectName]));
    setShowModal(true);
  };

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
          <img src={previewImage} alt="" className="projects-images" />
        </div>

        <div className="projects-right col-5">
          <div className="projects-texts">
            <h2
              className="my-5"
              id="project1"
              onMouseEnter={() => handleProjectHover("elRinconDelVino")}
              onClick={handleProjectClick}
            >
              - El Rincón del Vino
              <h6 className="opacity-50">
                (Lamentablemente no cuento con imágenes de mejor resolución,
                ¡Perdón!)
              </h6>
            </h2>
            <h2
              className="my-5"
              id="project2"
              onMouseEnter={() => handleProjectHover("battleship")}
              onClick={handleProjectClick}
            >
              - Battleship
            </h2>
            <h2
              className="my-5"
              id="project3"
              onMouseEnter={() => handleProjectHover("starwars")}
              onClick={handleProjectClick}
            >
              - Starwars Blog
            </h2>
            <h2 className="my-5">- ¡Más próximamente!</h2>
          </div>
        </div>
      </div>

      {/* --- // MODAL // --- */}
      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{currentProject}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="gallery">
                  {galleryImages.map((image, index) => (
                    <img key={index} src={image} alt={`Image ${index}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllProjects;
