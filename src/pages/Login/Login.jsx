import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginSuccess, loginFailure } from "../../store/actions/authActions";
import Modal from "react-modal";
import Logo from "../../assets/Logo.jpg";
const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailModal, setEmailModal] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    },
    content: {
      position: "relative",
      width: "700px", // Ancho deseado  
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      border: "none",
      zIndex: 9999,
      top: "-0%", // Centrar verticalmente
      left: "-0%", // Centrar horizontalmente
      transform: "translate(-0%, -0%)", // Corregir el centro
    },
    
  };
  
  
  
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
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
        email: emailModal,
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

  return (
    <div className="login">
      <div className="login-content">
        <div>
          <img src={Logo} alt="" />
        </div>
        <div>
          <div className="form-login">
            <form onSubmit={handleSubmit}>
              <div className="login-div">
                <label className="login-label">Email</label>
                <input
                  className="login-input"
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailError && (
                  <div className="error-message">{emailError}</div>
                )}
              </div>
              <div className="login-div">
                <label className="login-label" htmlFor="password">
                  Password
                </label>
                <input
                  className="login-input"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {passwordError && (
                  <div className="error-message">{passwordError}</div>
                )}
              </div>
              <p className="forgot-password-link">
                <a href="#" onClick={openModal}>
                  Forgot your password?
                </a>
              </p>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                email={email}
                onEmailChange={setEmail}
                contentLabel="Modal"
                style={modalStyles}
              >
                <div>
                  <h2>Enter your registered email</h2>
                  <p>
                    After providing your registered email, you'll get password
                    reset instructions sent to that address. Follow them in your
                    inbox. If not found, check your spam folder.
                  </p>
                  <form>
                    
                    <input
                    className="input"
                      type="email"
                      id="emailModal"
                      name="emailModal"
                      required
                      value={emailModal}
                      onChange={(e) => setEmailModal(e.target.value)}
                    />
                    <button onClick={handleResetLinkClick}>Enviar</button>
                  </form>
                </div>
              </Modal>
              <div className="button">
                <button type="submit" className="login-button ">
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
