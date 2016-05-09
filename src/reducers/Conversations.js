const initialState = {
  conversations: [],
  channelid: null
};

export function conversations(state = initialState, action) {
  switch (action.type) {
  case 'FETCH_CONVERSATIONS':
    return {
      ...state,
      conversations: action.posts.conversations,
      channelid: action.posts.channelid
    };
  case 'RESET_CONVERSATIONS':
    return initialState;
  default:
    return state;
  }
}
