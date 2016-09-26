import { combineReducers } from 'redux';
import { channels } from './Channels';
import { conversations } from './Conversations';
import { messages } from './Messages';
import { userinfo } from './Userinfo';
import { guest } from './Guest';
import { widget } from './widget';
import { environment } from './environment';
const rootReducer = combineReducers({
  /* your reducers */
  environment,
  channels,
  conversations,
  messages,
  userinfo,
  guest,
  widget,
});

export default rootReducer;
