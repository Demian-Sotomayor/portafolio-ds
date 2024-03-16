import { useEffect } from "react";
import "../../styles/Footer.css";
import line3 from "../../../assets/line3.svg";
import line1_2 from "../../../assets/line1-2.svg";

const Footer = ({id, isActive, onChange}) => {

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(id);
      const rect = element.getBoundingClientRect();
      const scrollPosition = window.scrollY + (window.innerHeight / 2);

      if(scrollPosition >= rect.top && scrollPosition < rect.bottom) {
        onChange("footer");
      }
    };

    window.addEventListener('scroll',handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id, onChange]);

  return (
    <div id={id} className={`container-fluid d-flex row justify-content-around container-footer ${isActive ? 'active' : ''}`}>
      <div className="container-contact-footer col-4">
        <h3 className="text-center mb-3 footer-title">Contact</h3>
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
        <p>Home</p>
        <p className="my-4">About</p>
        <p>Projects</p>
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
