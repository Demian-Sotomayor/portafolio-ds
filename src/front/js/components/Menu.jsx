import "../../styles/Menu.css";
import verMas from "../../../assets/ver-mas.svg";
import x from "../../../assets/x.svg";
import marcoMenu from "../../../assets/marco-menu.svg";
import michi from "../../../assets/michi.svg";

const Menu = ({ isActive, setIsActive }) => {
  const handleMenuActive = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  return (
    <>
      <div className={`menu ${isActive ? "active" : ""}`}>
        <p className="cambiar-esp">Es</p>
        <img
          src={isActive ? x : verMas}
          alt="menu"
          className="ver-mas-menu"
          onClick={handleMenuActive}
        />
      </div>

      {/* Modal */}
      <div className={`${isActive ? "menu-opened" : "opacity-0"}`}>
        <img src={marcoMenu} alt="" className="marco-menu" />
        <h2 className="text-menu">Over time I will bring more sections! For now help this kitten in this minigame I made!</h2>
        <img src={michi} alt="" className="michi-menu" />
        <button
            type="button"
            className="btn-menu"
          >
            Help!
          </button>
      </div>
    </>
  );
};

export default Menu;
