import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateSection } from "../../../store/actions/principalFormActions.js";
import "./Principal-form.css";
import checkbox from "../../../assets/checkbox.png";
import PropTypes from "prop-types";

const PrincipalForm = ({data, sectionId}) => {
  console.log("datata",data)
  const [section, setSection] = useState({
    title: data && data.title ? data.title : "",
    subtitle: "",
    mediaType: "image",
    media: null,
    description: "",
    color:"#FF0000"
  });
  const [isButtonActive, setButtonActive] = useState(true); // Estado para controlar el botón

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;
    setSection({
      ...section,
      [name]: newValue,
    });
    setButtonActive(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedSection = {
      ...section,
      id: sectionId,
    };
    dispatch(updateSection(updatedSection));
    setButtonActive(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <div>      
          <div>
            <div>
              <label htmlFor="title">Título:</label>
            </div>
           
            <div>
              <input
                className="input-form"
                type="text"
                id="title"
                name="title"
                value={section.title}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="subtitle">Subtítulo:</label>
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
            <label>Tipo de Media:</label>
            <div className="media-center">
              <div className="media-type-form">
                <label>
                  <input
                    type="radio"
                    name="mediaType"
                    value="image"
                    checked={section.mediaType === "image"}
                    onChange={handleInputChange}
                  />
                  Imagen
                </label>
                <label>
                  <input
                    type="radio"
                    name="mediaType"
                    value="video"
                    checked={section.mediaType === "video"}
                    onChange={handleInputChange}
                  />
                  Video
                </label>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="media">Subir Imagen o Video:</label>
            <div className="media-center">
              <div>
                <input
                  type="file"
                  id="media"
                  name="media"
                  accept="image/*,video/*"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div id="swatch" style={{ height: "90px", width: "60px" }}>
              <input
                type="color"
                id="color"
                name="color"
                value={section.color}
                onChange={handleInputChange}
              />
              <div className="info">
                <h1>Input</h1>
                <h2>Color</h2>
              </div>
            </div>
          <div className="media-center">
            <div>
              <label htmlFor="description">Descripción:</label>

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
          </div>
          <div>
            <button
              disabled={!isButtonActive}
              type="submit"
              className="submit-button"
            >
              <img src={checkbox} height={"30px"} alt="" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

PrincipalForm.propTypes = {
  sectionId: PropTypes.string,
  sectionType: PropTypes.string,
  sectionOrder: PropTypes.string,
  onDelete: PropTypes.func,
  data: PropTypes.object
  // Define el tipo de sectionId, ajusta el tipo según corresponda
};

export default PrincipalForm;
