import { combineReducers } from 'redux';
import principalFormReducer from './principalFormReducer.js';
import titleFormReducer from './titleFormReducer.js';
import subtitleFormReducer from './subtitleFormReducer.js';
import { authReducer } from './authReducer.js';


const rootReducer = combineReducers({
  principalForm: principalFormReducer, 
  titleForm: titleFormReducer,
  subtitleForm: subtitleFormReducer,
  auth: authReducer,
});

export default rootReducer;
