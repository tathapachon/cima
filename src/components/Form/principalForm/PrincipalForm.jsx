import { useState} from "react";
import { useDispatch } from "react-redux";
import { updateSection } from "../../../store/actions/principalFormActions.js";
import "./Principal-form.css";
import checkbox from "../../../assets/checkbox.png";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
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
  const [uploadedImage, setUploadedImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    section.media=file
    console.log("file", section.media)
    setUploadedImage(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });



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

        <div className="input-project-principal">
             

            <input
              className="input-form"
              placeholder="Add the project title"
              type="text"
              id="title"
              name="title"
              value={section.title}
              onChange={handleInputChange}
            />
          
            <input
              className="input-form-subtitle"
              placeholder="Add the project subtitle"
              type="text"
              id="subtitle"
              name="subtitle"
              value={section.subtitle}
              onChange={handleInputChange}
            />
        
          
        {!uploadedImage && (  
      <div {...getRootProps()} className={`project-drap-drop ${isDragActive ? 'drag-active' : ''}`}>
        <input {...getInputProps()} />
        <span>{isDragActive ? 'Drop the files here' : 'Drag and drop media, or Browse'}</span>
      </div>
)}
      {uploadedImage && (
        <div className="image-form-proyect">
        
          <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: '90%' , maxHeight: '90%'}}  />
        </div>
      )}
  
        

            

         
                <textarea
                placeholder="Give a short description of the project or add relevant details"
                  className="textarea-form"
                  id="description"
                  name="description"
                  value={section.description}
                  onChange={handleInputChange}
                />
             
         
          <div>
           
          </div>
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
