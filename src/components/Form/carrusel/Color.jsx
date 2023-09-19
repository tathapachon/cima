import { useState } from "react";
import PropTypes from "prop-types";
import "../principalForm/principal-form.css";

const ColorInput = ({ sectionId }) => {
  const [colorSection, setColorSection] = useState(false);
  const [sections, setSections] = useState([]);
  const handleColorChange = () => {
    setColorSection(true);
    const newSection = {
      type: "color",
      id: "color" + sections.length + 1,
    };
    setSections([...sections, newSection]);
  };

  const handleInputChange = (e, sectionId, field) => {
    if (field === "media") {
      const updatedSections = sections.map((section) =>
        section.id === sectionId
          ? { ...section, [field]: e.target.files[0] }
          : section
      );
      setSections(updatedSections);
    } else {
      const updatedSections = sections.map((section) =>
        section.id === sectionId
          ? { ...section, [field]: e.target.value }
          : section
      );
      console.log("updatedSections", updatedSections);
      setSections(updatedSections);
    }
  };
  return (
    <div id="swatch" style={{ height: "90px", width: "60px" }}>
      <input
        type="color"
        id={`color-${sectionId}`}
        value={sections.color || "#FF0000"}
        onChange={(e) => handleInputChange(e, sectionId, "color")}
      />
      <div className="info">
        <h1>Input</h1>
        <h2>Color</h2>
      </div>
    </div>
  );
};
ColorInput.propTypes = {
  sectionId: PropTypes.string, // Cambia 'object' por el tipo correcto de 'section'
  handleInputChange: PropTypes.func.isRequired,
};

export default ColorInput;
