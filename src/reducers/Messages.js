import moment from 'moment';
var _ = require('lodash');

const initialState = {
  messages: [],
  serverMessages:  [],
  memoized: {},
  conversationid: null,
  channelError: true,
  userCreatedNewMessage: false,
  messageStreamNewMessage: false,
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
      messages: [...state.messages, action.message],
      memoized: Object.assign({}, state.memoized, { [action.message.conversationid]: action.message })
    };
  case 'ADD_LOCAL_MESSAGE':
    return {
      ...state,
      userCreatedNewMessage: true,
      messages: [...state.messages, action.message],
    }

  case 'MSG_SAVED_TO_SERVER':
    return {
      ...state,
      messages: state.messages.map((message) => {
        if (message.id === action.message.id) {
          message.status = `Sent ${moment().format("HH:mm A")}`
          return message
        }
        return message
      }),
      memoized: Object.assign({}, state.memoized, { [action.message.conversationid]: action.message })
    }
  case 'MESSAGE_STREAM':
    let message = action.message
    message.created_at = moment().format();
    updatedMessages = [...state.messages, message];
    return {
      ...state,
      messageStreamNewMessage: true,
      messages: updatedMessages,
      memoized: {
        ...state.memoized,
        [action.conversationid]: updatedMessages
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

  case 'SCROLL_COMPLETE_FOR_NEW_USER_MESSAGE':
    return {...state, userCreatedNewMessage: false}

  case 'SCROLL_COMPLETE_FOR_NEW_MESSAGE_STREAM':
    return {...state, messageStreamNewMessage: false}
  default:
    return state;
  }
}
