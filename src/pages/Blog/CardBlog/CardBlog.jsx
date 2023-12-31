import "./blog-card.css";
import imgDefault from "../../../assets/img-default.jpg";

const CardBlog = () => {
  return (
    <div className="card-container">
      <img
        className="card-image"
        height={"300px"}
        src="https://cdn.dribbble.com/userupload/7476960/file/original-919fe3bcebd88e940c849397cc529c54.png?resize=1024x768"
        alt=""
      />
      <div className="card-content">
        <div>
          <img
            className="img-profile"
            src={imgDefault}
            height="25px"
            width="25px"
            alt=""
          />       
          <span className="date"> Lunes, 04 de Octubre 2023</span>
        </div>
        <h1 className="card-title">Diseño y arte Diseño y arte Diseño y arte ¿por qué seguir la tendencia?</h1>
  
      </div>
    </div>
  );
};

export default CardBlog;
