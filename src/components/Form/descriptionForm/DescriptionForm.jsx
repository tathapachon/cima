import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSection } from "../../../store/actions/descriptionFormActions.js"; // Importa la acción adecuada desde tu aplicación
import PropTypes from "prop-types";
import checkbox from "../../../assets/checkbox.png";
import { deleteSection } from "../../../store/actions/principalFormActions.js"; // Importa la acción adecuada desde tu aplicación


const DescriptionForm = ({ sectionId , onDelete}) => {
    const [section, setSection] = useState({
        description: "",
       
      });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
   
    setSection({
      ...section,
      [name]: value,
    });
    
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedSection = {
      ...section,
      id: sectionId// Ejemplo de orden
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
              <label htmlFor="Description">Description:</label>
            </div>
            <div>
                <textarea
                  className="textarea-form"
                  id="description"
                  name="description"
                  value={section.description}
                  onChange={handleInputChange}
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

DescriptionForm.propTypes = {
    sectionId: PropTypes.string,
  sectionType: PropTypes.string,
  sectionOrder: PropTypes.string,
  onDelete: PropTypes.func,
  };
export default DescriptionForm;
