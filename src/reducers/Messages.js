const initialState = {
  messages: [],
  conversationid: null
};

export function messages(state = initialState, action) {
  switch (action.type) {
  case 'FETCH_MESSAGES':
    return {
      ...state,
      messages: action.posts.messages,
      conversationid: action.posts.conversationid
    };
  case 'ADD_MESSAGE':
    return {
      ...state,
      messages: state.messages.concat(action.posts),
      conversationid: action.posts.conversationid
    };
  case 'RESET_MESSAGES':
    return initialState;
  default:
    return state;
  }
}
