import moment from 'moment';
var _ = require('lodash');

const initialState = {
  messages: [],
  memoized: {},
  conversationid: null,
  channelError: true
};

export function messages(state = initialState, action) {
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
