import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import "./priview.css";
import Previewprincipal from "./PrincipalPreview";

import { useRef } from "react";

const Preview = ({ data }) => {
  console.log("data",data)
  const [principal,setPrincipal] =useState()
  const [scrollOpacity, setScrollOpacity] = useState(1);
  console.log(principal)
  useEffect(()=>{
    for (let index = 0; index < data.length; index++) {
      if(data[index].type ==="principal"){
        setPrincipal(data[index])
      }
      
    }
  
  },[])
  let ref = useRef(null);
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
     
      // Haz algo con locomotiveScroll si es necesario
    })();
  }, []); // Asegúrate de tener las dependencias correctas aquí si es necesario

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const containerHeight = document.querySelector(".background").offsetHeight;

    const newScrollPercentage = (scrollY / containerHeight) * 100;
    const newOpacity = 1 - newScrollPercentage / 50;
    const clampedOpacity = Math.min(Math.max(newOpacity, 0), 1);

    setScrollOpacity(clampedOpacity);
  }, []);

  useEffect(() => {
    const handleScrollRAF = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", handleScrollRAF);

    return () => {
      window.removeEventListener("scroll", handleScrollRAF);
    };
  }, [handleScroll]);

  const gradientColor = `linear-gradient(to bottom, var(--color, rgba(173, 165, 156)), transparent)`;

  const backgroundStyle = {
    background: `${gradientColor}, rgba(173, 165, 156, ${scrollOpacity})`,
    transform: `translate3d(0px, 0px, 0px)`,
    transition: "background 1s ease, opacity 0.5s ease fade-in"
  };

  return (
    <div ref={ref} className="background" style={backgroundStyle}>
      <div style={{ height: "200px" }}></div>
      <Previewprincipal principal={principal} />
    </div>
  );
};

Preview.propTypes = {
  data: PropTypes.array
};

export default Preview;
