import moment from 'moment';
var _ = require('lodash');

const initialState = {
  messagesList: [],
  memoized: {},
  conversationid: null,
  channelError: true,
  userCreatedNewMessage: false,
  messageStreamNewMessage: false,
  initialLoadComplete: false,
  reachedEnd: false,
  oldestVisibleMessageUnixTimestamp: false,
  messagesWhileInactive: []
};

export function messages(state = initialState, action) {
  console.log(state);
  switch (action.type) {
  case 'FETCH_MESSAGES':
  console.log("in fetch messages ");
//  console.log(action.data.messages);


    let messages = _.sortBy(action.data.messages, a => (new Date()).getTime() - parseInt(moment(a.created_at).format("x")))
    console.log(messages);
    return {
      ...state,
      messagesList: messages.reverse().concat(state.messagesList),
      memoized: {
        ...state.memoized,
        [action.data.conversationid]: messages
      }
    };
  case 'FETCH_MESSAGES_MEMOIZED':
    if(!state.memoized[action.data.conversationid]) return state;
    return {
      ...state,
      messagesList: [ ...state.memoized[action.data.conversationid]]
    };
    case 'SET_GUEST_GROUP_CONV_ID':
      return {
        ...state,
        conversationid: action.data.conversationid
      };
  case 'ADD_MESSAGE':
    return {
      ...state,
      userCreatedNewMessage: true,
      messagesList: [...state.messagesList, action.message],
      memoized: Object.assign({}, state.memoized, { [action.message.conversationid]: action.message })
    };
  case 'ADD_LOCAL_MESSAGE':
    return {
      ...state,
      userCreatedNewMessage: true,
      messagesList: [...state.messagesList, action.message],
    }
  case 'MSG_SAVED_TO_SERVER':
    return {
      ...state,
      messagesList: state.messagesList.map((message) => {
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
    message.created_at = moment().format()
    return {
      ...state,
      messageStreamNewMessage: true,
      messagesList: [...state.messagesList, message],
      memoized: {
        ...state.memoized,
        [action.conversationid]: [...state.messagesList, message]
      }
    };
  case 'MESSAGE_RECEIVED_FOR_INACTIVE_USER':
    return {...state, messagesWhileInactive: [...state.messagesWhileInactive, action.message]}
  case 'MESSAGE_ERROR':
    return {
      ...state,
      channelError: action.data.flag
    };
  case 'LOAD_MSG_HISTORY':
    return {
      ...state, messagesList: action.messages.reverse().concat(state.messages)
    }
  case 'RESET_MESSAGES':
    return initialState;

  case 'SCROLL_COMPLETE_FOR_NEW_USER_MESSAGE':
    return {...state, userCreatedNewMessage: false}

  case 'SCROLL_COMPLETE_FOR_NEW_MESSAGE_STREAM':
    return {...state, messageStreamNewMessage: false}
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
