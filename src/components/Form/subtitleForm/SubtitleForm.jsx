import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSection } from "../../../store/actions/subtitleFormActions.js"; // Importa la acción adecuada desde tu aplicación
import PropTypes from "prop-types";
import checkbox from "../../../assets/checkbox.png";
import { deleteSection } from "../../../store/actions/principalFormActions.js"; // Importa la acción adecuada desde tu aplicación

const SubtitleForm = ({ sectionId, onDelete }) => {
    const [section, setSection] = useState({
        subtitle: "",
       
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
      id: sectionId
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
              <label htmlFor="subtitle">Subtitulo:</label>
            </div>
            <div>
              <input
                className="input-form"
                type="text"
                id="subtitle"
                name="subtitle"
                value={section.subtitle}
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

SubtitleForm.propTypes = {
    sectionId: PropTypes.string,
  sectionType: PropTypes.string,
  sectionOrder: PropTypes.string,
  onDelete: PropTypes.func,
  };
export default SubtitleForm;
