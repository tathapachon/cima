import { setCookie  } from "../../pages/Login/cookies.js"
const initialState = {
    user: [null],
    error: null,
    isAuthenticate:false,
    token: false, 
    isAuthenticated: false,
  };

  
export  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
      setCookie('token', action.payload.token, 7); 
      return {
        ...state, 
        isAuthenticate:true,         
        token: true, 
        user: action.payload.user,
        error: null,
      };
      case 'SET_AUTHENTICATION_TRUE':
        return {
          ...state,
          isAuthenticated: true,
        };
      case 'LOGIN_FAILURE':
        return {
          ...state,
          isAuthenticated: false,
          token: null,
          user: null,
          error: action.payload.error,
        };
      case 'LOGOUT':
        return {
          ...state,
          isAuthenticated: false,
          token: null,
          user: null,
          error: null,
        };
      default:
        return state;
    }
  };
  
