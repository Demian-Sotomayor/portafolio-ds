import "../../styles/Footer.css";
import line3 from "../../../assets/line3.svg";
import line1_2 from "../../../assets/line1-2.svg";
import Swal from "sweetalert2";

const Footer = () => {
  const handleClickProjects = () => {

    Swal.fire({
      text: "Oh my god, did you actually click for a shortcut even though if you scroll 1 millimeter there are the projects?",
      confirmButtonText: "Yes, I do",
      cancelButtonText: "Cancel",
      showCancelButton: true,
    }).then((result) => {
      if(result.isConfirmed) {
        setTimeout(() => {
          window.scrollTo(0, 1720)
        }, 400);
      }
    });
  };

  const handleClickAbout = () => {
    window.scrollTo(0,750)
  }

  const handleClickHome = () => {
    window.scrollTo(0, 0)
  }

  return (
    <div className="container-fluid d-flex row justify-content-around container-footer">
      <div className="container-contact-footer col-4">
        <h3 className="text-center mb-3 footer-title">
          Contact
        </h3>
        <img src={line1_2} alt="" className="line1and2" />
        <div className="texts-footer-social">
          <p>Email:</p>
          <p className="email-footer">demian.sotomayor.ur@gmail.com</p>
          <p>Phone:</p>
          <p>+56 9 7874 9131</p>
        </div>
      </div>

      <div className="container-shortcuts-footer text-center col-4">
        <h3 className="mb-3 footer-title">Shortcuts</h3>
        <img src={line1_2} alt="" className="line1and2" />
        <p onClick={handleClickHome}>Home</p>
        <p onClick={handleClickAbout} className="my-4">About</p>
        <p onClick={handleClickProjects}>Projects</p>
      </div>

      <img src={line3} alt="" className="line3-footer" />

      <div className="container-copyright-social-footer col-12">
        <h4 className="copyright">© Demian Sotomayor 2024</h4>
        <div className="social-footer">
          <a
            className="icon-contact-footer"
            href="https://www.github.com/Demian-Sotomayor"
            target="_blank"
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a
            className="icon-contact-footer"
            href="https://www.linkedin.com/in/demian-sotomayor-urrutia/"
            target="_blank"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
