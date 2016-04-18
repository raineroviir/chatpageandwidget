import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { items } from './items';
import { registrationDetails } from './registrationDetails';

const rootReducer = combineReducers({
  form: formReducer,
  /* your reducers */
  items,
  registrationDetails,
});

export default rootReducer;
