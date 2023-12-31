import imgDefault from "../../assets/img-default.jpg";
import "./nav.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.jpg";
import Project from "../../assets/pencil.png";
import documents from "../../assets/document.png";
import bulb from "../../assets/bulb.png";
import comment from "../../assets/comment-alt.png";
import sparkles from "../../assets/sparkles.png";
import apps from "../../assets/apps.png";
import flecha from "../../assets/flecha-izquierda.png";
import { Link } from "react-router-dom";
import off from "../../assets/power-off.png";
import { useState } from "react";
function Nav() {
  const navigateTo = useNavigate();
  const [isNavHovered, setIsNavHovered] = useState(false);

  const viewMenu = () => {
    setIsNavHovered(!isNavHovered);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; sameSite=none";

      navigateTo("/login");

      // Aquí puedes mostrar un mensaje de éxito o realizar otras acciones después de la solicitud
    } catch (error) {
      console.error("Error al enviar la solicitud", error);
    }
  };
  return (
    <div className="center-nav">

      
      <div className={`nav ${!isNavHovered ? "nav-hovered" : ""}`}
       onMouseEnter={() => setIsNavHovered(true)}
       onMouseLeave={() => setIsNavHovered(false)}
      >
        <div className="image-nav-logo">
          <img src={Logo} height={"60px"} width={"60px"} alt="" />
        </div>
        
        <div className="columns">
          <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="menu-center">
              <div className="menu-item">
              {!isNavHovered &&(
                <div className="center-img">
                  {" "}
                  <img src={apps} height={"20px"} width={"20px"} alt="" />
                </div>
                 )}
                {isNavHovered && (
                  <div className="center-c">
                    <label>Home</label>
                  </div>
                )}
              </div>
            </div>
          </Link>
          <Link
            to="/projects"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="menu-center">
              <div className="menu-item">
              {!isNavHovered &&(
                <div className="center-img"> <img src={Project} height={"20px"} width={"20px"} alt="" />
               </div>
                         )}
                {isNavHovered && (
                  <div className="center-c">
                    <label>Projects</label>
                  </div>
                )}
              </div>
            </div>
          </Link>
          <Link
            to="/blogs"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="menu-center">
              <div className="menu-item">
              {!isNavHovered &&(
                <div className="center-img">  <img src={documents} height={"20px"} width={"20px"} alt="" />
              </div>)}
                {isNavHovered && (
                  <div className="center-c">
                    <label>Blogs</label>
                  </div>
                )}
              </div>
            </div>
          </Link>
          <Link
            to="/featureds"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="menu-center">
              <div className="menu-item">
              {!isNavHovered &&(
                <div className="center-img">  <img src={bulb} height={"20px"} width={"20px"} alt="" />
              </div> )}
                {isNavHovered && (
                 <div className="center-c">
                    <label>Featured</label>
                  </div>
                )}
              </div>
            </div>
          </Link>
          <Link
            to="/contact"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="menu-center">
              <div className="menu-item">
              {!isNavHovered &&(
                <div className="center-img"> <img src={comment} height={"20px"} width={"20px"} alt="" />
               </div>)}
                {isNavHovered && (
                  <div className="center-c">
                    <label>Contact</label>
                  </div>
                )}
              </div>
            </div>
          </Link>
          <Link
            to="/about"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="menu-center">
              <div className="menu-item">
              {!isNavHovered &&(
                <div className="center-img"> <img src={sparkles} height={"20px"} width={"20px"} alt="" />
               </div>)}
                {isNavHovered && (
                  <div className="center-c">
                    <label>About</label>
                  </div>
                )}
              </div>
            </div>
          </Link>
        </div>
        <div className="dropbtn">
          <div className="columns">
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="menu-center">
                <div className="menu-item">
                {!isNavHovered &&(
                  <div className="center-img">

                    <img
                      className="img-profile"
                      src={imgDefault}
                      height="25px"
                      width="25px"
                      alt=""
                    />
                  </div>)}
                  {isNavHovered && (
                    <div className="center-c">
                      <label>Profile</label>
                    </div>
                  )}
                </div>
              </div>
            </Link>
            <Link
              to=""
              onClick={handleLogout}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="menu-center">
                <div className="menu-item">
                {!isNavHovered &&(
                  <div className="center-img">
                    {" "}
                    <img src={off} height={"20px"} width={"20px"} alt="" />
                  </div>)}
                  {isNavHovered &&(<div className="center-c" >
                  <label>Logout</label>
                </div>)}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
