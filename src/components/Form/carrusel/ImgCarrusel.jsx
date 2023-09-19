import React from "react";
import PropTypes from "prop-types";
const ImageItem = React.memo(({ image, index }) => {
  // Tu lógica para renderizar la imagen
  return (
    <img
      height={"150px"}
      src={URL.createObjectURL(image.file)}
      alt={`Image ${index}`}
    />
  );
});

ImageItem.displayName = "ImageItem"; // Establece el nombre de visualización

ImageItem.propTypes = {
    image: PropTypes.object.isRequired, // Espera un objeto llamado 'image' como prop
    index: PropTypes.number.isRequired, // Espera un número llamado 'index' como prop
  };
  
export default ImageItem;
