import moment from 'moment';
var _ = require('lodash');
const initialState = {
  conversations: [],
  memoized: {},
  channelid: null
};

export function conversations(state = initialState, action) {
  switch (action.type) {
  case 'FETCH_CONVERSATIONS':
    let conv = _.sortBy(action.posts.conversations, a => parseInt(moment(a.updated_at).format("x"))).reverse();
    return {
      ...state,
      conversations: conv,
      channelid: action.posts.channelid,
      memoized: Object.assign({}, { [action.posts.channelid]: conv })
    };
  case 'FETCH_CONVERSATIONS_MEMOIZED':
    if(!state.memoized[action.posts.channelid]) return state;
    return {
      ...state,
      conversations: [ ...state.memoized[action.posts.channelid]],
      channelid: action.posts.channelid
    };
    return {
      ...state,
      conversations: _.sortBy(action.posts.conversations, a => parseInt(moment(a.updated_at).format("x"))).reverse(),
      channelid: action.posts.channelid
    };
  case 'RESET_CONVERSATIONS':
    return initialState;
  default:
    return state;
  }
}
