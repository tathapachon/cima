import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './index.js';
import titleFormReducer from './titleFormReducer.js';
import subtitleFormReducer from './subtitleFormReducer.js';
import principalFormReducer from './principalFormReducer.js';

const store = configureStore({
  reducer: {
    root: rootReducer, // Reemplaza 'root' con la clave que desees para tu rootReducer
    principalForm: principalFormReducer, 
  },
  middleware: [thunk], // Agrega middleware si es necesario
  devTools: true, // Habilita Redux DevTools Extension
});

export default store;


