// actions.js
import { createAction } from '@reduxjs/toolkit';

// Acción para agregar una nueva sección
export const addSection = createAction('addSection');

// Acción para actualizar una sección existente
export const updateSection = createAction('updateSection');

// Acción para eliminar una sección por su ID
export const deleteSection = createAction('deleteSection');