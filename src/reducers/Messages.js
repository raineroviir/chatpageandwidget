const initialState = {
  messages: [],
  memoized: {},
  conversationid: null
};

export function messages(state = initialState, action) {
  switch (action.type) {
  case 'FETCH_MESSAGES':
    return {
      ...state,
      messages: action.posts.messages,
      conversationid: action.posts.conversationid,
      memoized: Object.assign({}, { [action.posts.conversationid]: action.posts.messages })
    };
  case 'FETCH_MESSAGES_MEMOIZED':
    if(!state.memoized[action.posts.conversationid]) return state;
    return {
      ...state,
      messages: [ ...state.memoized[action.posts.conversationid]],
      conversationid: action.posts.conversationid
    };
  case 'ADD_MESSAGE':
    return {
      ...state,
      messages: state.messages.concat(action.posts),
      conversationid: action.posts.conversationid,
      memoized: Object.assign({}, state.memoized, { [action.posts.conversationid]: action.posts })
    };
  case 'RESET_MESSAGES':
    return initialState;
  default:
    return state;
  }
}
