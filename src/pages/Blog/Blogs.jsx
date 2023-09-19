import { Link } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import "./blogs.css";
import plus from "../../assets/plus.png"

const Blogs = () => {
  return (
    <div className="admin-container">
      <Nav />
      <div className="content">
        <div className="div-nav">
          <Link to="/blog" className="link-style">
            <div className="image-nav na">
              <img src={plus} height={"30px"} width={"30px"} alt="" />
            </div>
          </Link>
          <div className="image-nav na"></div>
          <div className="image-nav na"></div>
        </div>
        <div className="div-content">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
