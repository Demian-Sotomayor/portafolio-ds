import "../../styles/About.css";
import demianProfile from "../../img/portafolio/demian.jpg";

const About = ({ idioma }) => {
  return (
    <div className="container-fluid container-about">
      <h1 id="about-title" className="about-title">
        {idioma === "esp" ? "Sobre mí" : "About"}
      </h1>
      <div className="img-container">
        <img
          src={demianProfile}
          alt="demian-profile"
          className="demian-profile"
        />
      </div>
      <div className="about-texts">
        {idioma === "esp" ? (
          <>
            <p>
              Mi camino en la programación comenzó a inicios de 2022 cuando
              tenía 17 años. Empecé a estudiar las bases y profundizar en el
              diseño web con HTML5 y CSS3. A medida que fuí avanzando,
              profundicé y seguí con JavaScript.
            </p>
            <p>
              Al ver que me estaba gustando, seguí estudiando y entré a un curso
              intensivo para aprender mejor y pulirme un poco más. Empecé desde
              el diseño web hasta explorar el hacking ético y la ciberseguridad
              como hobby, además en el camino estudié cómo trabajar con
              terminales y shell scripting.
            </p>
            <p>
              Actualmente estoy aprendiendo y estudiando sobre desarrollo en la
              nube en Google Cloud. ¡Tengo ganas de seguir creciendo y ganando
              experiencia! Poco a poco formandome mejor y adquiriendo los
              conocimientos que me sean necesarios ahora y a futuro.
            </p>
          </>
        ) : (
          <>
            <p>
              My path into programming began in early 2022, when I was just 17
              years old. I started studying the fundamentals and delving into
              web design using HTML5 and CSS3. As I gained momentum, I dug
              deeper and continued with JavaScript.
            </p>
            <p>
              Upon discovering my passion for this field, I continued studying
              and entered an intensive course to learn better and polish myself
              a little more.
            </p>
            <p>
              I started from web design to exploring ethical hacking and
              cybersecurity as a hobby and along the way I also studied how to
              work with terminals and shell scripts.
            </p>
            <p>
              Currently, I am expanding my experience by learning about cloud
              development with Google Cloud. I&#39;m excited to continue growing
              and learning!
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default About;
