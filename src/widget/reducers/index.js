import { combineReducers } from 'redux';
import { register } from '../../common/reducers/register'
import { channels } from '../../common/reducers/channels';
import { conversations } from '../../common/reducers/conversations';
import { messages } from '../../common/reducers/messages';
import { user } from '../../common/reducers/user';
import { guest } from '../../common/reducers/guest';
import { widget } from './widget';

import { bot } from '../../common/reducers/bot'
import { environment } from './environment';

const rootReducer = combineReducers({
  /* your reducers */
  register,
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
