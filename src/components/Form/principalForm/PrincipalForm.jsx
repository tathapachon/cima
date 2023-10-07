import { useState} from "react";
import { useDispatch } from "react-redux";
import { updateSection } from "../../../store/actions/principalFormActions.js";
import "./Principal-form.css";
import checkbox from "../../../assets/checkbox.png";
import PropTypes from "prop-types";

const PrincipalForm = ({ data, sectionId }) => {
  console.log("datata", data);
  const [section, setSection] = useState({
    title: data && data.title ? data.title : "",
    subtitle: data && data.subtitle ? data.subtitle : "",
    mediaType: data && data.mediaType ? data.mediaType : "null",
    url: data && data.url ? data.url : "",
    media: data && data.media ? data.media : "",
    description: data && data.description ? data.description : "",
    color: data && data.color ? data.color : "#FF0000",
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
    console.log("updatedSection ", section);
    const updatedSection = {
      ...section,
      id: sectionId,
    };

    console.log("updatedSection* ", updatedSection);
    dispatch(updateSection(updatedSection));
  };

  const removeImage = () => {
    setSection({
      ...section,
      media: "",
      url: "",
      mediaType: null,
    });
  };

  const handleFileSelect = (event) => {
    const files = event.target.files;
  console.log("files",files)
   
      const newImages = Array.from(files).map((file, index) => {
        const id = `image-${index}`;
        const url = URL.createObjectURL(file);
  
        return {
          id: id,
          file: file,
          url: url,
        };
      });
  
      setSection((prevSection) => ({
        ...prevSection,
    media: newImages,
      }));
      console.log("filesa",section)
   
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <div id="swatch" style={{ height: "90px", width: "60px" }}>
          <input
            type="color"
            id="color"
            name="color"
            value={section.color}
            onChange={handleInputChange}
          />

          <h1>Color</h1>
        </div>
        <div className="section-principal">
          <label htmlFor="title">Principal section</label>

          <div>
            <label htmlFor="title">Título:</label>

            <input
              className="input-form"
              type="text"
              id="title"
              name="title"
              value={section.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="subtitle">Subtítulo:</label>

            <input
              className="input-form"
              type="text"
              id="subtitle"
              name="subtitle"
              value={section.subtitle}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Tipo de Media:</label>

            <label>
              <input
                type="radio"
                name="mediaType"
                value="image"
                checked={section.mediaType === "image"}
                onChange={handleInputChange}
              />
              Image
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
          <div>
            <div className="media-center">
              <div>
                <input
                  type="file"
                  id="media"
                  name="media"
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                />
              </div>

              {section.mediaType === "image" &&
                (section.media["0"]?.url || section.url) && (
                <div>
                  <img
                    src={section.url ? section.url : section.media["0"]?.url}
                    alt=""
                    style={{ height: "90px" }}
                  />
                  <button onClick={removeImage}>Eliminar</button>
                </div>
              )}

              {section.mediaType === "video" &&
                (section.media["0"]?.url || section.url) && (
                  <div>
                    <video width="640" height="360" controls>
                      <source
                        src={
                          section.url ? section.url : section.media["0"]?.url
                        }
                        type="video/mp4"
                      />
                    </video>
                    <button onClick={removeImage}>Eliminar</button>
                  </div>
                )}

              <div></div>
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
            <button type="submit" className="submit-button">
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
  data: PropTypes.object,
 };

export default PrincipalForm;
