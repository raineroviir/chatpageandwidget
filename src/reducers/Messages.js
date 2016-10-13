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
  nextFetchPage: 1,
  initialLoadComplete: false,
  reachedEnd: false,
  oldestVisibleMessageUnixTimestamp: false,
  messagesWhileInactive: []
};

export function messages(state = initialState, action) {
  switch (action.type) {
  case 'FETCH_MESSAGES':
    let messages = _.sortBy(action.posts.messages, a => (new Date()).getTime() - parseInt(moment(a.created_at).format("x")))
    return {
      ...state,
      messages: messages.reverse().concat(state.messages),
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
    console.log(message)
    message.created_at = moment().format()
    return {
      ...state,
      messageStreamNewMessage: true,
      messages: [...state.messages, message],
      memoized: {
        ...state.memoized,
        [action.conversationid]: [...state.messages, message]
      }
    };
  case 'MESSAGE_RECEIVED_FOR_INACTIVE_USER':
    return {...state, messagesWhileInactive: [...state.messagesWhileInactive, action.message]}
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
  case 'INCREASE_NEXT_FETCH_PAGE':
    return {...state, nextFetchPage: state.nextFetchPage + 1}
  case 'CORRECT_NEXT_FETCH_PAGE':
    return {...state, nextFetchPage: state.nextFetchPage - 1}
  case 'INITIAL_MSG_LOAD_COMPLETE':
    return {...state, initialLoadComplete: true}
  case 'REACHED_CONVERSATION_HISTORY_END':
    return {...state, reachedEnd: true}
  case 'SET_OLDEST_VISIBLE_MESSAGE_UNIX_TIME_STAMP':
    return {...state, oldestVisibleMessageUnixTimestamp: action.timestamp}
  case 'MARK_ALL_MESSAGES_AS_READ':
    return {...state, messagesWhileInactive: []}
  default:
    return state;
  }
}
