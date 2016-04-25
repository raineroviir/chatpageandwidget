import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { items } from './items';
import { channels } from './Channels';
import { conversations } from './Conversations';
import { messages } from './Messages';
import { userinfo } from './Userinfo';
import { registrationDetails } from './registrationDetails';
import { loginDetails } from './loginDetails';

const rootReducer = combineReducers({
  form: formReducer,
  /* your reducers */
  items,
  channels,
  conversations,
  messages,
  registrationDetails,
  loginDetails,
  userinfo
});

export default rootReducer;
