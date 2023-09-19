import "./profile.css";
import { Link } from "react-router-dom";
import { getCookie } from "../Login/cookies.js";
import { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Profile = () => {
  const token = getCookie("token");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.put("http://localhost:3001/decode-token", {
          token: token,
        });
        console.log(response.data);
        setUser(response.data);
        setEmail(response.data.email);
        setName(response.data.name);
        setLastname(response.data.lastname);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleId = (e) => {
    e.preventDefault();
 

    if (!name || !lastname || !email) {
      toast.error("Por favor, complete todos los campos requeridos.", {
        position: "top-right",
      });
      return;
    }
    // Crear un objeto con los datos del usuario
    const userData = {
      name,
      email,
     lastname
    };

    // Enviar los datos al servidor
    // Aquí puedes hacer una petición a la API utilizando Axios, fetch, u otra librería de tu elección
    axios
      .put(`http://localhost:3001/user/${user.id}`, userData)
      .then((response) => {
        // Manejar la respuesta exitosa del servidor
        if (response.data) {
          toast.success("¡Edición exitosa!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setTimeout(() => {
            navigate("/usuarios");
          }, 2000);
        }
      })
      .catch((error) => {
        // Manejar el error en caso de que la petición al servidor falle
        if (error) {
          toast.success("¡Edición fallida!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });
  };
  return (
    <div className="profile">
      <div>
        <Link to="/home">
          <button className="create-button">volver</button>
        </Link>
  </div>

      <div className="profile-card">
      
        <form onSubmit={handleId}>
          <div>
          
            <label>Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
       
      
            <label>Apellido:</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
              required
            />
        
          </div>
         
          <div>
            <label>Correo:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
        
            <label>Fecha de Nacimiento:</label>
            <input
              type="date"
              id="fecha_nacimiento"
              name="fecha_nacimiento"
              required
            />
          </div>

          <div>
            <label>Numero de telefono:</label>
            <input type="text" id="phone" name="phone" required />
            </div>
            <div>
            <label>Sobre Nosotros:</label>
            <textarea
              id="intereses"
              name="intereses"
              rows="4"
              cols="50"
            ></textarea>
          </div>
          <input type="submit" value="Guardar" />
        </form>
      </div>
    </div>
  );
};

export default Profile;
