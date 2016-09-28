import moment from 'moment';
var _ = require('lodash');

const initialState = {
  messages: [],
  memoized: {},
  conversationid: null,
  channelError: true
};

const mockedInitialState = {
  conversationid: 297,
  channelError: false,
  memoized: {},
  messages:  [
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:845,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:386
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:846,
  sender_avatar:null,
  sender_name:"Alex (Bot)",
  text:"We normally answer within 60 minutes or less. Please leave your questions here and someone will be with you shortly.",
  bot: true,
  user_id:387
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:847,
  sender_avatar:null,
  sender_name:"Alex (Bot)",
  text:"Let us notify you via email:",
  bot: true,
  user_id:387
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:848,
  sender_avatar:null,
  sender_name:"Alex (Bot)",
  text:"Enter your email",
  containsInputBox: true,
  bot: true,
  user_id:387
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:849,
  sender_avatar:null,
  sender_name:" ",
  text:"My package didn't arrive",
  user_id:386
}
]}

export function messages(state = mockedInitialState, action) {
  switch (action.type) {
  case 'FETCH_MESSAGES':
    let messages = _.sortBy(action.posts.messages, a => (new Date()).getTime() - parseInt(moment(a.created_at).format("x"))).reverse();
    return {
      ...state,
      messages: messages,
      memoized: {
        ...state.memoized,
        [action.posts.conversationid]: messages
      }
    };
  case 'FETCH_MESSAGES_MEMOIZED':
    if(!state.memoized[action.posts.conversationid]) return state;
    return {
      ...state,
      messages: [ ...state.memoized[action.posts.conversationid]]
    };
    case 'SET_GUEST_GROUP_CONV_ID':
      return {
        ...state,
        conversationid: action.posts.conversationid
      };
  case 'ADD_MESSAGE':
    return {
      ...state,
      messages: state.messages.concat(action.posts),
      memoized: Object.assign({}, state.memoized, { [action.posts.conversationid]: action.posts })
    };
  case 'MESSAGE_STREAM':
    if(!action.posts.message.payload || !action.posts.message.payload.conversation_id || action.posts.message.payload.conversation_id != state.conversationid || state.messages.find(a => a.id == action.posts.message.payload.id)){
      return state;
    }
    let message = action.posts.message.payload,
      user = state.messages.find(a => a.user_id === message.user_id),
      updatedMessages;
    message.created_at = moment().format();
    if(user){
      message.sender_name = user.sender_name;
      message.sender_avatar = user.sender_avatar;
    }
    updatedMessages = [...state.messages, message];
    return {
      ...state,
      messages: updatedMessages,
      memoized: {
        ...state.memoized,
        [action.posts.conversationid]: updatedMessages
      }
    };
  case 'MESSAGE_ERROR':
    return {
      ...state,
      channelError: action.posts.flag
    };
  case 'RESET_MESSAGES':
    return initialState;
  case 'PREPARE_TO_CREATE_NEW_CONVERSATION':
    return initialState;
  default:
    return state;
  }
}
