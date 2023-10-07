import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../../components/Nav/Nav";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./createBlog.css";
import PrincipalForm from "../../../components/Form/principalForm/PrincipalForm";
import TitleForm from "../../../components/Form/titleForm/TitleForm";
import SubtitleForm from "../../../components/Form/subtitleForm/SubtitleForm";
import DescriptionForm from "../../../components/Form/descriptionForm/DescriptionForm";
import VideoForm from "../../../components/Form/videoForm/VideoForm";
import ImageForm from "../../../components/Form/imageForm/ImageForm";
import Carrusel from "../../../components/Form/carrusel/Carrusel";
import { useSelector } from "react-redux";
import { uploadByte, deleteImageOrVideo } from "../../../firebase/config.js";
import Modal from "react-modal";
import Preview from "../../../components/Preview/Preview";
import { useParams } from "react-router-dom";
function App() {
  const [sections, setSections] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [isAddPrincipalFormActive, setAddPrincipalFormActive] = useState(true);
  const { principalForm } = useSelector((state) => state);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState();
  const [imgSec, setImaSec] = useState([]);
  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
      width: "100vw",
    },
    content: {
      width: "100vw",
      padding: "0",
      zIndex: 9999,
      margin: "50px",
    },
  };
  const addPrincipalForm = () => {
    const newSection = {
      id: `principal-${nextId}`,
      type: "principal",
      order: 1,
    };
    setSections([...sections, newSection]);
    setNextId(nextId);
    setAddPrincipalFormActive(false);
  };
  const addNewForm = (formType) => {
    const newId = `${formType}-${nextId}-${Date.now()}`;
    const newSection = {
      id: newId,
      type: formType,
      order: nextId + 1,
    };
    setSections([...sections, newSection]);
    setNextId(nextId + 1);
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/blog/${id}`)
        .then((response) => {
          setSections(response.data.formData);
          setImaSec(response.data.formData);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [id]);
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedSections = [...sections];
    const [reorderedItem] = reorderedSections.splice(result.source.index, 1);
    reorderedSections.splice(result.destination.index, 0, reorderedItem);

    let principalOrder = 1;
    let nonPrincipalOrder = 2;

    const usedIds = {};

    reorderedSections.forEach((section) => {
      if (section.type === "principal") {
        // Generar un nuevo ID único para las secciones principales
        let newId;
        do {
          newId = `principal-${principalOrder}`;
          principalOrder++;
        } while (usedIds[newId]);

        // Actualizar el ID de la sección principal
        section.id = newId;

        // Marcar el ID como utilizado
        usedIds[newId] = true;
      } else {
        section.order = nonPrincipalOrder;
        nonPrincipalOrder++;
      }
    });

    setSections(reorderedSections);
  };
  const openModal = () => {
    const combinedSections = sections.map((section) => {
      const matchingPrincipal = principalForm.find(
        (item) => item.id === section.id
      );
      if (matchingPrincipal) {
        return {
          ...section,
          ...matchingPrincipal,
        };
      }
      return section;
    });

    setData(combinedSections);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSaveData = async () => {
    try {
      const combinedSections = sections.map((section) => {
        const matchingPrincipal = principalForm.find(
          (item) => item.id === section.id
        );
        return matchingPrincipal
          ? { ...section, ...matchingPrincipal }
          : section;
      });

      const formData = combinedSections;

      await Promise.all(
        formData.map(async (section, index) => {
          if (section.type === "carrusel") {
            const updatedSection = { ...section };
            for (const key in updatedSection) {
              if (
                typeof updatedSection[key] === "object" &&
                updatedSection[key] !== null &&
                "file" in updatedSection[key]
              ) {
                const url = await uploadByte(updatedSection[key].file);
                updatedSection[key] = { url };
              }
            }
            formData[index] = updatedSection;
          }

          if (section.media || section.video || section.image) {
            const url = await uploadByte(
              section.media[0].file || section.video || section.image
            );
            section.url = url;

            delete section.video;
            delete section.image;
            console.log("originalSection.usrl", section.media);

            const originalSection = imgSec?.find((s) => s.id === section.id);
            if (
              originalSection &&
              originalSection.url !== url &&
              originalSection.url
            ) {
              console.log("originalSection.url", originalSection);
              await deleteImageOrVideo(originalSection.url);
            }
          }
        })
      );

      if (id) {
        console.log("formData3", formData);
        const response = await axios.put(`http://localhost:3001/blog/${id}`, {
          formData,
        });

        if (response.status === 200) {
          console.log(
            "Datos actualizados exitosamente en el backend:",
            response.data
          );
        }
      } else {
        console.log("formData", formData);
        const response = await axios.post(
          "http://localhost:3001/blog/guardar",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          console.log(
            "Datos creados exitosamente en el backend:",
            response.data
          );
        }
      }
    } catch (error) {
      console.error("Error al guardar datos en el backend:", error);
    }
  };

  const handleDelete = (sectionId) => {
    const seccionesRestantes = sections.filter(
      (section) => section.id !== sectionId
    );

    const seccionesActualizadas = seccionesRestantes.map((section, index) => ({
      ...section,
      order: index + 1,
    }));

    const maxOrder = seccionesActualizadas.reduce(
      (max, section) => (section.order > max ? section.order : max),
      0
    );

    setNextId(maxOrder + 1);
    setSections(seccionesActualizadas);
  };

  return (
    <div className="admin-container">
      <Nav />
      <div className="content-t">
        <div className="div-content-t">
          {sections.map((section) => (
            <div className="formPart" key={section.id}>
              {section.type === "principal" && (
                <PrincipalForm
                  data={section}
                  sectionId={section.id}
                  key={section.id}
                  onDelete={handleDelete}
                />
              )}
            </div>
          ))}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            data={data}
            contentLabel="Modal"
            style={modalStyles}
          >
            <Preview data={data} />
          </Modal>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {sections.map((section, index) => (
                    <Draggable
                      key={section.id}
                      draggableId={section.id}
                      index={index}
                      isDragDisabled={
                        section.type === "principal" &&
                        !isAddPrincipalFormActive
                      }
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {section.type === "title" && (
                            <div className="formPart" key={section.id}>
                              <TitleForm
                                key={section.id}
                                sectionId={section.id}
                                onDelete={handleDelete} // Pasa la función de eliminación como prop
                              />
                            </div>
                          )}
                          {section.type === "video" && (
                            <div className="formPart" key={section.id}>
                              <VideoForm
                                sectionId={section.id}
                                key={section.id}
                                onDelete={handleDelete}
                              />
                            </div>
                          )}
                          {section.type === "carrusel" && (
                            <div className="formPart" key={section.id}>
                              <Carrusel
                                data={section}
                                sectionId={section.id}
                                key={section.id}
                                onDelete={handleDelete}
                              />
                            </div>
                          )}

                          {section.type === "image" && (
                            <div className="formPart" key={section.id}>
                              <ImageForm
                                sectionId={section.id}
                                key={section.id}
                                onDelete={handleDelete}
                              />
                            </div>
                          )}
                          {section.type === "description" && (
                            <div className="formPart" key={section.id}>
                              <DescriptionForm
                                sectionId={section.id}
                                key={section.id}
                                onDelete={handleDelete}
                              />
                            </div>
                          )}
                          {section.type === "subtitle" && (
                            <div className="formPart" key={section.id}>
                              <SubtitleForm
                                sectionId={section.id}
                                key={section.id}
                                onDelete={handleDelete}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div className="div-nav-t paint-center">
          <div className=" paint-center">
            <button
              className="button-create"
              disabled={!isAddPrincipalFormActive}
              onClick={addPrincipalForm}
            >
              Agregar Principal Form
            </button>
            <button
              className="button-create"
              onClick={() => addNewForm("video")}
            >
              Agregar Video Form
            </button>
            <button
              className="button-create"
              onClick={() => addNewForm("carrusel")}
            >
              Agregar carrusel Form
            </button>
            <button
              className="button-create"
              onClick={() => addNewForm("title")}
            >
              Agregar Title Form
            </button>
            <button
              className="button-create"
              onClick={() => addNewForm("subtitle")}
            >
              Agregar Subtitle Form
            </button>
            <button
              className="button-create"
              onClick={() => addNewForm("description")}
            >
              Agregar Description Form
            </button>
            <button
              className="button-create"
              onClick={() => addNewForm("image")}
            >
              Agregar image Form
            </button>
            <button className="button-create" onClick={openModal}>
              Preview
            </button>
            <button className="button-create" onClick={handleSaveData}>
              Guardar Datos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
