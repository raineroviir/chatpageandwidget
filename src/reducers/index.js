import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { items } from './items';
import { channels } from './Channels';
import { conversations } from './Conversations';
import { registrationDetails } from './registrationDetails';
import { loginDetails } from './loginDetails';

const rootReducer = combineReducers({
  form: formReducer,
  /* your reducers */
  items,
  channels,
  conversations,
  registrationDetails,
  loginDetails,
});

export default rootReducer;
