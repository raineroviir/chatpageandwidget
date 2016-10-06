import { combineReducers } from 'redux';
import { channels } from './channels';
import { conversations } from './conversations';
import { messages } from './messages';
import { user } from './user';
import { guest } from './guest';
import { widget } from './widget';
import { environment } from './environment';
import { bot } from './bot'
const rootReducer = combineReducers({
  /* your reducers */
  environment,
  channels,
  conversations,
  messages,
  user,
  guest,
  widget,
  bot,
});

export default rootReducer;
