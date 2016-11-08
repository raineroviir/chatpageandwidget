import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { items } from './items';
// import { channels } from './Channels';
// import { conversations } from './Conversations';
// import { messages } from './Messages';
import { orgs } from './Organizations';
import { createMessage } from './CreateMessage';
import { userinfo } from './Userinfo';
// import { guest } from './Guest';
import { channelDetails } from './ChannelDetails';
import { createChannel } from './CreateChannel';
// import { widget } from './widget';
import { widgetConfig } from './widget-config';
import { upgradeForm } from './upgradeForm';
import { upgradePlan } from './upgradePlan';
import { poptart } from './poptart';
import { loader } from './loader';
import { tabnav } from './tabnav';
// import { settings } from './settings';

import { login } from '../../common/reducers/login'


import { channels } from '../../common/reducers/channels';
import { conversations } from '../../common/reducers/conversations';
import { messages } from '../../common/reducers/messages';
import { user } from '../../common/reducers/user';
import { guest } from '../../common/reducers/guest';
import { environment } from '../../common/reducers/environment';
import { bot } from '../../common/reducers/bot'


const rootReducer = combineReducers({
  form: formReducer,
  /* your reducers */
  login,
  items,
  user,
  bot,
  channels,
  conversations,
  environment,
  messages,
  createMessage,
  userinfo,
  orgs,
  guest,
  channelDetails,
  createChannel,
  widgetConfig,
  upgradePlan,
  upgradeForm,
  poptart,
  loader,
  tabnav
});

export default rootReducer;
