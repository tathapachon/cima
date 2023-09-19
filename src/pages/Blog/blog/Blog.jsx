import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditPost() {
  const [fields, setFields] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/blog/${id}`)
        .then((response) => {
          setFields(response.data.formData.fields);
          console.log('Exitosamente:', response.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [id]);

  const addField = (type) => {
    const newField = {
      id: fields.length + 1,
      type,
      value: '',
      order: fields.length,
    };
    setFields([...fields, newField]);
  };

  const handleDragStart = (e, field) => {
    e.dataTransfer.setData('text/plain', field.id.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetOrder) => {
    e.preventDefault();
    const fieldId = parseInt(e.dataTransfer.getData('text/plain'));
    const updatedFields = fields.map((field) => {
      if (field.id === fieldId) {
        return { ...field, order: targetOrder };
      } else if (field.order >= targetOrder) {
        return { ...field, order: field.order + 1 };
      }
      return field;
    });
    setFields(updatedFields);
  };

  const handleInputChange = (e, fieldId) => {
    const updatedFields = fields.map((field) =>
      field.id === fieldId ? { ...field, value: e.target.value } : field
    );
    setFields(updatedFields);
  };

  const handleConsoleOutput = () => {
    console.log('Campos del formulario:', fields);
  };

  const handleSaveData = async () => {
    const formData = {
      fields: [...fields],
    };
  
    try {
      const response = await axios.put(`http://localhost:3001/blog/${id}`, { formData });
      if (response.status === 200) {
        console.log('Datos guardados exitosamente en el backend');
      }
    } catch (error) {
      console.error('Error al guardar datos en el backend:', error);
    }
  };

  return (
    <div>
      {fields
        .sort((a, b) => a.order - b.order)
        .map((field) => (
          <div
            key={field.id}
            draggable
            onDragStart={(e) => handleDragStart(e, field)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, field.order)}
          >
            {field.type === 'text' && (
              <input
                type="text"
                value={field.value}
                onChange={(e) => handleInputChange(e, field.id)}
              />
            )}
            {field.type === 'email' && (
              <input
                type="email"
                value={field.value}
                onChange={(e) => handleInputChange(e, field.id)}
              />
            )}
            {field.type === 'number' && (
              <input
                type="number"
                value={field.value}
                onChange={(e) => handleInputChange(e, field.id)}
              />
            )}
          </div>
        ))}
      <button onClick={() => addField('email')}>Agregar Email</button>
      <button onClick={() => addField('number')}>Agregar Número</button>
      <button onClick={handleConsoleOutput}>Mostrar en Consola</button>
      <button onClick={handleSaveData}>Guardar Datos en el Backend</button>
    </div>
  );
}

export default EditPost;
