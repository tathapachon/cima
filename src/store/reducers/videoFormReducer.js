// reducer.js
import { createReducer } from '@reduxjs/toolkit';
import { addSection, updateSection } from '../actions/videoFormActions.js';

const initialState = [];

const sectionReducer = createReducer(initialState, {
  [addSection]: (state, action) => {
    return [...state, action.payload]; // Agrega una nueva sección al array
  },
  [updateSection]: (state, action) => {
    const updatedSection = action.payload;
    const sectionIndex = state.findIndex((section) => section.id === updatedSection.id);

    if (sectionIndex !== -1) {
      // Actualiza la sección existente
      state[sectionIndex] = updatedSection;
    } else {
      // Si la sección no existe, la agrega (esto podría no ser necesario si siempre agregas antes de actualizar)
      state.push(updatedSection);
    }
  },
});

export default sectionReducer;

