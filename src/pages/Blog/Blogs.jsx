import { Link } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import "./blogs.css";
import CardBlog from "../Blog/CardBlog/CardBlog.jsx";
import plus from "../../assets/plus.png";

const Blogs = () => {
  return (
    <div className="admin-containerr">
      <div className="nav-blog">
        <Nav />
      </div>
      <div className="cont">
        <div className="hola">
          <div className="div-navv">
            <div className="na ">
              <Link to="/blog" className="link-style">
                <img src={plus} height={"30px"} width={"30px"} alt="" />
              </Link>
            </div>
            <div className="image-nav ">
              <div className="input-blog"> <input type="text" placeholder="   Search..." /> </div>
             
            </div>
            <div className="image-nav ">
            <div className="input-blog"> </div>
            </div>
          </div>
          <div className="div-contenttt">
            <div className="grid-item">
              {" "}
              <CardBlog />{" "}
            </div>
            <div className="grid-item">
              {" "}
              <CardBlog />{" "}
            </div>
            <div className="grid-item">
              {" "}
              <CardBlog  />{" "}
            </div>
            <div className="grid-item">
              {" "}
              <CardBlog />{" "}
            </div>
            <div className="grid-item">
              {" "}
              <CardBlog />{" "}
            </div>
            <div className="grid-item">
              {" "}
              <CardBlog />{" "}
            </div>
           
          </div>
          <div className="div-navv"></div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
