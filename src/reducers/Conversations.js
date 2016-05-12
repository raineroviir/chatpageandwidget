import moment from 'moment';
var _ = require('lodash');
const initialState = {
  conversations: [],
  channelid: null
};

export function conversations(state = initialState, action) {
  switch (action.type) {
  case 'FETCH_CONVERSATIONS':
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
