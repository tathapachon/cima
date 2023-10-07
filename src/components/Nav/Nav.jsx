import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import off from "../../assets/power-off.png";
 function Nav() {
  const [isNavHovered, setIsNavHovered] = useState(false);
  const navigateTo = useNavigate();
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
      <nav
        className={`nav ${isNavHovered ? "nav-hovered" : ""}`}
        onMouseEnter={() => setIsNavHovered(true)}
        onMouseLeave={() => setIsNavHovered(false)}
      >
        
        <div className="image">
          <img src={Logo} height={"60px"} width={"60px"} alt="" />
        </div>
        <div className="columns">
          <div className="menu">
            <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="menu-center">
                <div className="menu-item">
                  <img src={apps} height={"20px"} width={"20px"} alt="" />
                </div>
              </div>
            </Link>
            <Link to="/projects" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="menu-center">
                <div className="menu-item">
                  <img src={Project} height={"20px"} width={"20px"} alt="" />
                </div>
              </div>
            </Link>
            <Link to="/blogs" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="menu-item">
                <img src={documents} height={"20px"} width={"20px"} alt="" />
              </div>
            </Link>
            <Link to="/featureds" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="menu-item">
                <img src={bulb} height={"20px"} width={"20px"} alt="" />
              </div>
            </Link>
            <Link to="/contact" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="menu-item">
                <img src={comment} height={"20px"} width={"20px"} alt="" />
              </div>
            </Link>
            <Link to="/about" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="menu-item">
                <img src={sparkles} height={"20px"} width={"20px"} alt="" />
              </div>
            </Link>
          </div>
          {isNavHovered && (
            <div className="item">
              <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="menu-center">
                  <div className="menu-item-center">
                    <label>Home</label>
                  </div>
                </div>
              </Link>
              <Link to="/projects" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="menu-center">
                  <div className="menu-item-center">
                    <label>Projects</label>
                  </div>
                </div>
              </Link>
              <Link to="/blogs" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="menu-item-center">
                  <label>Blogs</label>
                </div>
              </Link>
              <Link to="/featureds" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="menu-item-center">
                  <label>Featured</label>
                </div>
              </Link>
              <Link to="/contact" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="menu-item-center">
                  <label>Contact</label>
                </div>
              </Link>
              <Link to="/about" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="menu-item-center">
                  <label>About</label>
                </div>
              </Link>
            </div>
          )}
        </div>
        <div className="dropbtn" >
          <div className="image">
          <img className="dropbtn-img" src={imgDefault} height="90px" width="90px" alt="" />
          </div>
          
        
       
        <div className="columns">
        <div className="menu">
            <Link to="" onClick={handleLogout} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="menu-center">
                <div className="menu-item">
                  <img src={off} height={"20px"} width={"20px"} alt="" />
                </div>
                </div>
                </Link>
           </div>  
           <div className="item">
           <Link  onClick={handleLogout} to="" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="menu-item-center">
                  <label>Logout</label>
                </div>
              </Link>
              </div>
              </div>
              </div>
      </nav>
    </div>
  );
}

export default Nav;
