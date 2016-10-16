import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { items } from './items';
import { channels } from './Channels';
import { conversations } from './Conversations';
import { messages } from './Messages';
import { orgs } from './Organizations';
import { createMessage } from './CreateMessage';
import { userinfo } from './Userinfo';
import { registrationDetails } from './registrationDetails';
import { loginDetails } from './loginDetails';
import { guest } from './Guest';
import { channelDetails } from './ChannelDetails';
import { createChannel } from './CreateChannel';
import { widget } from './widget';
import { widgetConfig } from './widget-config';
import { upgradeForm } from './upgradeForm';
import { upgradePlan } from './upgradePlan';
import { poptart } from './poptart';
import { loader } from './loader';
import { tabnav } from './tabnav';

import { settings } from './settings'; 

const rootReducer = combineReducers({
  form: formReducer,
  /* your reducers */
  items,
  channels,
  conversations,
  messages,
  createMessage,
  registrationDetails,
  loginDetails,
  userinfo,
  orgs,
  guest,
  channelDetails,
  createChannel,
  widget,
  widgetConfig,
  upgradePlan,
  upgradeForm,
  poptart,
  loader,
  tabnav,
  settings
});

export default rootReducer;
