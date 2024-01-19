import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSection } from "../../../store/actions/titleFormActions.js"; // Importa la acción adecuada desde tu aplicación
import PropTypes from "prop-types";
import checkbox from "../../../assets/checkbox.png";
import trash from "../../../assets/trash.png"
import { deleteSection } from "../../../store/actions/principalFormActions.js"; // Importa la acción adecuada desde tu aplicación
import "./title-form.css";
import arrowDown from "../../../assets/arrow-small-down.png";
import arrowUp from "../../../assets/arrow-small-up.png"

const TitleForm = ({ sectionId, onDelete }) => {
  const [section, setSection] = useState({
    title: "",
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
      id: sectionId,
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
      <div >
        <div>
          <input
            className="input-form"
            type="text"
            id="title"
            name="title"
            value={section.title}
            placeholder="Title"
            onChange={handleInputChange}
          />
        </div>
        <div className="menu-float">
          <img src={arrowUp} width={"20px"} alt="" />
          <img src={arrowDown} width={"20px"} alt="" />
          <img src={checkbox} width={"20px"} alt="" />
          <img src={trash} width={"20px"} alt="" />
        </div>


      </div>
    </form>
  );
};

TitleForm.propTypes = {
  sectionId: PropTypes.string,
  onDelete: PropTypes.func,
};

export default TitleForm;
