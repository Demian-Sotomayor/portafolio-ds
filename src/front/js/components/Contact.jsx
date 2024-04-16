import "../../styles/Home.css";

const Contact = ({idioma}) => {
  return (
    <div
      className="modal fade"
      id="modalContact"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <button
            type="button"
            className="btn-close-modal"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark icon-close-modal"></i>
          </button>

          <div className="modal-body">
            <h3 className="text-center title-modal-contact">
              {idioma === "esp" ? "¡Ésta es mi información de contacto y mis perfiles!" : "This is my contact info and my profiles!"}

            </h3>

            <div className="social mt-5">
              <i className="fa-solid fa-envelope icon-contact"></i>
              <h5 className="social-name">demian.sotomayor.ur@gmail.com</h5>
            </div>

            <div className="social">
              <i className="fa-solid fa-phone icon-contact"></i>
              <h5 className="social-name">+56 9 7874 9131</h5>
            </div>

            <div className="social">
              <a
                className="icon-contact"
                href="https://www.github.com/Demian-Sotomayor"
                target="_blank"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <h5 className="text-white social-name">Demian-Sotomayor</h5>
            </div>

            <div className="social">
              <a
                className="icon-contact"
                href="https://www.linkedin.com/in/demian-sotomayor-urrutia/"
                target="_blank"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <h5 className="text-white social-name">
                demian-sotomayor-urrutia
              </h5>
            </div>
            <h6 className="advice-modal">{idioma === "esp" ? "(Puedes clickear en algunos íconos)" : "(You can click on some icons)"}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
