
import 'react-toastify/dist/ReactToastify.css';


export const loginSuccess = (user, token) => {
  return {
    type: 'LOGIN_SUCCESS',
    payload: { user, token },
  };
};

export const loginFailure = (errorMessage) => {
  return {
    type: "LOGIN_FAILURE",
    payload: errorMessage,
  };
};

// authActions.js
export const setAuthenticationTrue = () => {
  return {
    type: 'SET_AUTHENTICATION_TRUE',
  };
};


