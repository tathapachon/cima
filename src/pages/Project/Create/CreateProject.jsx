import PrincipalForm from "../../../components/Form/principalForm/PrincipalForm";
import TitleForm from "../../../components/Form/titleForm/TitleForm";
import SubtitleForm from "../../../components/Form/subtitleForm/SubtitleForm";
import DescriptionForm from "../../../components/Form/descriptionForm/DescriptionForm";
import ImageForm from "../../../components/Form/imageForm/ImageForm";
import VideoForm from "../../../components/Form/videoForm/VideoForm";
import Carrusel from "../../../components/Form/carrusel/Carrusel";
import "./createProject.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const CreateProject = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [sections, setSections] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };
  useEffect(() => {
    console.log("hola", sections)
  });
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const toggleMenuClose = () => {
    setShowMenu(false);
    setShowSubMenu(false);
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
    setShowMenu(false);
    setShowSubMenu(false);
  };
  return (
    <div>
      <div className={`create-project ${!showMenu ? 'with-menu' : ''}`}>
        <div className="complete-form">
          <div className="button-create-project">
            <Link to="/projects">
              <button className="cancel-create">Cancel</button>
            </Link>
            <button className="post-create">Continue</button>
          </div>
          <div className="form-create-project">
            <PrincipalForm />
            <div className="insert-block-btn">
              <div className="line"></div>
              <button className="insert-block" onClick={toggleMenu}>
                Insert Block
              </button>
              <div className="line"></div>
            </div>
          </div>
          <div className="section-principal-drap">
            {sections.map((section, index) => (
              <div key={index}>
                {section.type === "title" && (
                  <div className="formPart" key={section.id}>
                    <TitleForm
                      key={section.id}
                      sectionId={section.id}// Pasa la función de eliminación como prop
                    />

                  </div>
                )}
                {section.type === "description" && (
                  <div className="formPart" key={section.id}>
                    <DescriptionForm
                      sectionId={section.id}
                      key={section.id}
                    />
                  </div>
                )}
                {section.type === "subtitle" && (
                  <div className="formPart" key={section.id}>
                    <SubtitleForm
                      sectionId={section.id}
                      key={section.id}
                    />
                  </div>
                )}
                {section.type === "video" && (
                  <div className="formPart" key={section.id}>
                    <VideoForm
                      sectionId={section.id}
                      key={section.id}
                    />
                  </div>
                )}
                {section.type === "carousel" && (
                  <div className="formPart" key={section.id}>
                    <Carrusel
                      data={section}
                      sectionId={section.id}
                      key={section.id}
                    />
                  </div>
                )}
                 {section.type === "gallery" && (
                  <div className="formPart" key={section.id}>
                    <Carrusel
                      data={section}
                      sectionId={section.id}
                      key={section.id}
                    />
                  </div>
                )}

                {section.type === "image" && (
                  <div className="formPart" key={section.id}>
                    <ImageForm
                      sectionId={section.id}
                      key={section.id}
                    />
                  </div>
                )}
              </div>

            ))}
          </div>




        </div>
        <div className="option-menu">
          {showMenu && <div className="menu-insert">
            <span onClick={toggleMenuClose} >X</span>
            <span className="insert-form">Insert block</span>
            <ul className="menu-ul">
              <li onClick={toggleSubMenu}>Text</li>
              <li onClick={() => addNewForm("image")}>Image</li>
              <li onClick={() => addNewForm("video")}>Video</li>
              <li onClick={() => addNewForm("gallery")}>Gallary</li>
              <li onClick={() => addNewForm("carousel")}>Carousel</li>
            </ul>
          </div>}  {showSubMenu && (
            <span className="menu-insert-sub">
              <ul>
                <li onClick={() => addNewForm("title")}>Title</li>
                <li onClick={() => addNewForm("subtitle")}>Subtitle</li>
                <li onClick={() => addNewForm("description")}>Description</li>
              </ul>
            </span>
          )}</div>
      </div>
    </div>
  );
};

export default CreateProject;
