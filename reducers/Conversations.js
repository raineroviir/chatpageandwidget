import moment from 'moment';
var _ = require('lodash');
const initialState = {
  conversations: [],
  memoized: {},
  memoizedMessage: {},
  channelid: null,
  socket: ''
};

export function conversations(state = initialState, action) {
  switch (action.type) {
  case 'FETCH_CONVERSATIONS':
    let conv = _.sortBy(action.posts.conversations, a => parseInt(moment(a.updated_at).format("x"))).reverse();
    return {
      ...state,
      conversations: conv,
      channelid: action.posts.channelid,
      memoized: {
        ...state.memoized,
        [action.posts.channelid]: conv
      }
    };
  case 'FETCH_CONVERSATIONS_MEMOIZED':
    if(!state.memoized[action.posts.channelid]) return state;
    return {
      ...state,
      conversations: [ ...state.memoized[action.posts.channelid]],
      channelid: action.posts.channelid
    };
  case 'SET_CONVERSATION_CHANNEL_MEMOIZED':
    return {
      ...state,
      memoizedMessage: {
        ...state.memoizedMessage,
        [state.channelid] : action.posts.conversationid
      }
    };
  case 'RESET_CONVERSATIONS':
    return initialState;
  case 'INITALIZED_SOCKET':
    return {
      ...state,
      socket: action.socket
    }
  default:
    return state;
  }
}
