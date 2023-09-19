import PropTypes from "prop-types"; // Importa PropTypes
const Section = ({ section, handleInputChange, handleDragStart, btnState }) => {
    return (
      <div
        key={section.id}
        draggable={!btnState}
        onDragStart={(e) => handleDragStart(e, section.id)}
        className="oo"
      >
        <label htmlFor={`title-${section.id}`}>Título:</label>
        <input
          type="text"
          id={`title-${section.id}`}
          value={section.title}
          onChange={(e) => handleInputChange(e, section.id, "title")}
        />
        <label htmlFor={`subtitle-${section.id}`}>Subtítulo:</label>
        <input
          type="text"
          id={`subtitle-${section.id}`}
          value={section.subtitle}
          onChange={(e) => handleInputChange(e, section.id, "subtitle")}
        />
        <label>Tipo de Media:</label>
        <label>
          <input
            type="radio"
            value="image"
            checked={section.mediaType === "image"}
            onChange={(e) => handleInputChange(e, section.id, "mediaType")}
          />
          Imagen
        </label>
        <label>
          <input
            type="radio"
            value="video"
            checked={section.mediaType === "video"}
            onChange={(e) => handleInputChange(e, section.id, "mediaType")}
          />
          Video
        </label>
        <label htmlFor={`media-${section.id}`}>Subir Imagen o Video:</label>
        <input
          type="file"
          id={`media-${section.id}`}
          accept="image/*,video/*"
          onChange={(e) => handleInputChange(e, section.id, "media")}
        />
        <label htmlFor={`description-${section.id}`}>Descripción:</label>
        <textarea
          id={`description-${section.id}`}
          value={section.description}
          onChange={(e) => handleInputChange(e, section.id, "description")}
        />
      </div>
    );
  };
  
  Section.propTypes = {
    section: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleDragStart: PropTypes.func.isRequired,
    btnState: PropTypes.bool.isRequired, // Agrega la validación para btnState
  };
  
  export default Section;