import PrincipalForm from "../../../components/Form/principalForm/PrincipalForm";
import "./createProject.css";
import { useState } from "react";
import { Link } from "react-router-dom";
const CreateProject = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
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
        </div>
        {showMenu && <div className="menu-insert">
          <span>X</span>
          <span className="insert-form">Insert block</span>
          <ul>
            <li>Text</li>
            <li>Image</li>
            <li>Video</li>
            <li>Gallary</li>
            <li>Carousel</li>
          </ul>
          </div>}
      </div>
    </div>
  );
};

export default CreateProject;
