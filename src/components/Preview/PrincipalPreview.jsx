import "./priview.css";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
const PreviewPrincipal = ({ principal }) => {
  const scrollContainerRef = useRef(null);

  

  useEffect(() => {
    // Función para desplazar lentamente al elemento deseado
    const scrollToElement = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const targetElement = container.querySelector(".target-element");

        if (targetElement) {
          // Obtén la posición del elemento objetivo
          const targetOffsetTop = targetElement.offsetTop;

          // Ajusta la velocidad de desplazamiento
          const scrollSpeed = 10; // Cuanto mayor sea el número, más lento será el desplazamiento

          const scrollStep = targetOffsetTop / scrollSpeed;

          // Inicia el desplazamiento
          let scrollPosition = 0;

          const scrollInterval = setInterval(() => {
            if (scrollPosition < targetOffsetTop) {
              container.scrollTop += scrollStep;
              scrollPosition += scrollStep;
            } else {
              clearInterval(scrollInterval);
              // Agrega clases "animate-fade-in-active" para activar las animaciones una vez que se completa el desplazamiento
              document.querySelectorAll(".animate-fade-in").forEach((element) => {
                element.classList.add("animate-fade-in-active");
              });
            }
          }, 15); // Ajusta este valor para controlar la velocidad
        }
      }
    };

    scrollToElement(); // Llama a la función de desplazamiento al cargar el componente
  }, []);
 
  return (
    <div ref={scrollContainerRef} className="scroll-container">
     
  <div className="principalview target-element">
        
        <div className="principalcenter">
          <div>
            <h3 className="animate-fade-in">CAsa</h3>
            <h4 className="animate-fade-in">Branding Identity</h4>
            <img
              src="https://tendril.studio/wp-content/uploads/2022/09/image-26-2048x1152.png"
              alt="Example"
              className="animate-fade-in"
            />
            <div >
              <p className="animate-fade-in">
                The hero logo is the primary brand signifier. Comprising of a holding shape, typography, and the Worlds existing shield, we crafted a wordmark that echoes the same sensibilities and keeps the worlds logo front and center across all design work. The logo forms the basis of the grid system, meaning that all elements within the system scale up or down while maintaining a consistent relationship with one another.
              </p>
            </div>
          </div>
        </div>
  
     
      </div>
   
       
      
       
      
    </div>
  );
};

PreviewPrincipal.propTypes = {
  principal: PropTypes.object,
};

export default PreviewPrincipal;
