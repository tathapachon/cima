import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './index.js';


const store = configureStore({
  reducer: {
    root: rootReducer, // Reemplaza 'root' con la clave que desees para tu rootReducer
   
  },
  middleware: [thunk], // Agrega middleware si es necesario
  devTools: true, // Habilita Redux DevTools Extension
});

export default store;


