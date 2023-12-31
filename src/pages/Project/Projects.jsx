import "./projects.css";
import Nav from "../../components/Nav/Nav";
import { Link } from "react-router-dom";
const Projects = () => {
 return (
    <div className="admin-project" >
    <Nav />
    <div className="admin-project-content">
    <div className="nav-project">
      <div >
        <input className="search-project" type="text" placeholder="Search..." />
      </div>
      <div >
      <Link to="/project"> <button className="button-project">      Create</button></Link>
      </div>
    </div>
    <div className="grid-project">
     

    </div>

    </div>
  </div>
    
  );
};

export default Projects;
