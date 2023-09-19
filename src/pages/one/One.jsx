import { useState } from 'react';
import PropTypes from 'prop-types'; // Asegúrate de importar PropTypes
import "./one.css";

const About = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

 

  return (
    <div className="about1">
      <div>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Subtítulo"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Ruta de la imagen"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      
    </div>
  );
};


export default About;

