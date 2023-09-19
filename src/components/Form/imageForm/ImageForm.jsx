import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSection } from "../../../store/actions/imageFormActions.js"; // Importa la acción adecuada desde tu aplicación
import PropTypes from "prop-types";
import checkbox from "../../../assets/checkbox.png";
import { deleteSection } from "../../../store/actions/principalFormActions.js"; // Importa la acción adecuada desde tu aplicación


const ImageForm = ({ sectionId , onDelete}) => {
  const [section, setSection] = useState({
    image: "",
  });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;
    setSection({
      ...section,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedSection = {
      ...section,
      id: sectionId // Ejemplo de orden
    };
    dispatch(updateSection(updatedSection));
  };
  const handleEliminarClick = () => {
    // Llama a la función para eliminar la sección con el sectionId actual
    dispatch(deleteSection(sectionId))
    onDelete(sectionId);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <div>
          <div>
            <div>
              <label htmlFor="Description">Cargar image:</label>
            </div>
            <div>
              <input
                type="file"
                id="image"                
                accept="image/*"  
                name="image"             
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
          <div>
            <button type="submit" className="submit-button">
              <img src={checkbox} height={"30px"} alt="" />
            </button>
          </div>
          <div>
          <button type="button" onClick={handleEliminarClick}>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

ImageForm.propTypes = {
  sectionId: PropTypes.string,
  sectionType: PropTypes.string,
  sectionOrder: PropTypes.string,
  onDelete: PropTypes.func,

};
export default ImageForm;
