import { useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./carrusel.css";
import { useDispatch } from "react-redux";
import { updateSection } from "../../../store/actions/titleFormActions.js";
import { deleteSection } from "../../../store/actions/principalFormActions.js";
import PropTypes from "prop-types";

const Carrusel = ({ sectionId, onDelete, data }) => {
  const [images, setImages] = useState([]);
  const [nextId, setNextId] = useState(1);

  console.log("lo", data);
  console.log("sectionId", sectionId);

  const handleFileSelect = useCallback(
    (event) => {
      const newImages = Array.from(event.target.files).map((file, index) => {
        const id = `image-${nextId + index}`;
        const url = URL.createObjectURL(file);

        return {
          id: id,
          file: event.target.files[0],
          order: images.length + index + 1,
          url: url,
        };
      });

      setImages((prevImages) => [...prevImages, ...newImages]);
      setNextId(nextId + event.target.files.length);
    },
    [images, nextId]
  );

  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;

      const reorderedImages = [...images];
      const [reorderedImage] = reorderedImages.splice(result.source.index, 1);
      reorderedImages.splice(result.destination.index, 0, reorderedImage);

      reorderedImages.forEach((image, index) => {
        image.order = index + 1;
      });

      setImages([...reorderedImages]);
    },
    [images]
  );

  const removeImage = useCallback(
    (imageId) => {
      const updatedImages = images.filter((image) => image.id !== imageId);

      updatedImages.forEach((image, index) => {
        image.order = index + 1;
      });

      setImages([...updatedImages]);
    },
    [images]
  );

  const uploadImages = async (e) => {
    try {
      console.log("Imágenes subidas exitosamente al servidor.", images);
      e.preventDefault();
      const updatedSection = {
        ...images,
        id: sectionId,
      };
      console.log("Imá.", updatedSection);

      dispatch(updateSection(updatedSection));
    } catch (error) {
      console.error("Error al subir imágenes al servidor:", error);
    }
  };

  const dispatch = useDispatch();

  const handleEliminarClick = () => {
    dispatch(deleteSection(sectionId));
    onDelete(sectionId);
  };

  return (
    <div className="form-container">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        multiple
        style={{ display: "none" }}
        id={`fileInput-${sectionId}`} // Use un identificador único para el input de archivo
      />
      <label htmlFor={`fileInput-${sectionId}`} className="dropzone">
        <p>
          Haz clic aquí para seleccionar imágenes o arrástralas y suéltalas.
        </p>
      </label>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={`images-${sectionId}`} direction="horizontal">
          {(provided) => (
            <div
              style={{
                backgroundColor: "red",
                height: "600px",
                width: "1000px",
              }}
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="image-list-horizontal"
            >
              {images.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div
                        style={{
                          backgroundColor: "blue",
                          height: "500px",
                          width: "200px",
                        }}
                      >
                        <img
                          height={"150px"}
                          src={image.url}
                          alt={`Image ${index}`}
                        />

                        <button onClick={() => removeImage(image.id)}>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div>
        <button type="button" onClick={handleEliminarClick}>
          Eliminar
        </button>
      </div>
      <button type="button" onClick={uploadImages}>
        Subir imágenes
      </button>
    </div>
  );
};

Carrusel.propTypes = {
  sectionId: PropTypes.string,
  onDelete: PropTypes.func,
  data: PropTypes.object,
};

export default Carrusel;
