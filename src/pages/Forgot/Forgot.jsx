import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginSuccess, loginFailure } from "../../store/actions/authActions";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Logo from "../../assets/Logo.jpg";
const Forgot = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailModal, setEmailModal] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [username, setUsername] = useState("");

 
  const handleLoginSuccess = (dispatch, user, token) => {
    toast.success("Login successful!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    dispatch(loginSuccess(user, token));

    setTimeout(() => {
      window.location.href = "/home";
    }, 5000);
  };
  const handleLoginError = (dispatch, error) => {
    if (error.response && error.response.status === 401) {
      const errorMessage = error.response.data.error;
      switch (errorMessage) {
        case "Email not registered":
          toast.error(
            "El correo electrónico no está registrado. Por favor, regístrese primero.",
            toastOptions
          );
          dispatch(loginFailure("Correo no registrado"));
          break;
        case "Invalid password":
          toast.error("La contraseña no coincide", toastOptions);
          dispatch(loginFailure("contraseña no coincide"));
          break;
        default:
          toast.error(
            "Credenciales incorrectas. Por favor, intenta nuevamente.",
            toastOptions
          );
          break;
      }
    } else {
      toast.error(
        "Ha ocurrido un error. Por favor, intenta nuevamente más tarde.",
        toastOptions
      );
      dispatch(loginFailure(error.response.data.error));
    }
  };
  const login = (email, password) => {
    return async (dispatch) => {
      try {
        const response = await axios.post("http://localhost:3001/login", {
          email,
          password,
        });
        const token = response.data.token;

        if (token) {
          handleLoginSuccess(dispatch, response.data.user, token);
        }
      } catch (error) {
        handleLoginError(dispatch, error);
      }
    };
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleResetLinkClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("http://localhost:3001/restablecer", {
        email: email,
      });
    } catch (error) {
      console.error("Error al enviar la solicitud de restablecimiento", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) {
      setEmailError("The email is required.");
    } else if (!emailRegex.test(email)) {
      setEmailError("The email is not valid.");
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("The password is required.");
    } else {
      setPasswordError("");
    }

    if (email && password && emailRegex.test(email)) {
      dispatch(login(email, password));
    }
  };
  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };
  return (
    <div className="login">
    <div className="video-login">
      <video  autoPlay muted loop className="video-content">
        <source src="https://cdn.dribbble.com/uploads/48226/original/b8bd4e4273cceae2889d9d259b04f732.mp4?1689028949" type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
    </div>
      <div className="form-login">
        <div className="form-login-div">
          <div className="login-margin">
            <span className="title-login">Forgot Password?</span>
          </div>
            <div>
              <span className="form-login-label"> 
              Hey, can you share your email? We'll shoot you a link to reset your password!
              </span>
            </div>
          <div>
            <form onSubmit={handleResetLinkClick}>
              <div className="login-margin">
                <label className="form-login-label">Email</label>
                <input className="form-login-input" type="text" value={email}
                  onChange={handleInputChange}  />
              </div>
                  <div className="login-margin">
                <button className="form-login-button">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
