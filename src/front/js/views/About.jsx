import { useEffect, useRef } from "react";
import "../../styles/About.css";
import demianProfile from "../../img/demian.jpg";

const About = () => {
  const aboutTextsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const aboutElement = aboutRef.current;
      if (isElementVisible(aboutElement)) {
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
    <div id="about" className="container-fluid container-about">
      <h1 id="about-title" className="about-title">
        About
      </h1>
      <div className="img-container">
        <img
          src={demianProfile}
          alt="demian-profile"
          className="demian-profile"
        />
      </div>
      <div className="about-texts" ref={aboutTextsRef}>
        <p>
          My path into programming began in early 2022, when I was just 17 years
          old. I started studying the fundamentals and delving into web design
          using HTML5 and CSS3. As I gained momentum, I dug deeper and continued
          with JavaScript.
        </p>
        <p>
          Upon discovering my passion for this field, I continued studying and
          entered an intensive course to learn better and polish myself a little
          more.
        </p>
        <p>
          I started from web design to exploring ethical hacking and
          cybersecurity as a hobby and along the way I also studied how to work
          with terminals and shell scripts.
        </p>
        <p>
          Currently, I am expanding my experience by learning about cloud
          development with Google Cloud. I&#39;m excited to continue growing and
          learning!
        </p>
      </div>
    </div>
  );
};

export default About;
