import moment from 'moment';
var _ = require('lodash');

const initialState = {
  messages: [],
  memoized: {},
  conversationid: null,
  channelError: true,
  userCreatedNewMessage: false,
  serverMessages:  []
};

export function messages(state = initialState, action) {
  switch (action.type) {
  case 'FETCH_MESSAGES':
    let messages = _.sortBy(action.posts.messages, a => (new Date()).getTime() - parseInt(moment(a.created_at).format("x")))
    return {
      ...state,
      serverMessages: messages,
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
      userCreatedNewMessage: true,
      messages: state.messages.concat(action.message),
      memoized: Object.assign({}, state.memoized, { [action.message.conversationid]: action.message })
    };
  case 'ADD_LOCAL_MESSAGE':
    return {
      ...state,
      userCreatedNewMessage: true,
      messages: state.messages.concat(action.message),
      memoized: Object.assign({}, state.memoized, { [action.message.conversationid]: action.message })
    }
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
  case 'LOAD_MSG_HISTORY':
    return {
      ...state, messages: action.messages.reverse().concat(state.messages)
    }
  case 'RESET_MESSAGES':
    return initialState;
  case 'PREPARE_TO_CREATE_NEW_CONVERSATION':
    return initialState;

  case 'SCROLL_COMPLETE_FOR_NEW_MESSAGE':
    return {...state, userCreatedNewMessage: false}
  default:
    return state;
  }
}
