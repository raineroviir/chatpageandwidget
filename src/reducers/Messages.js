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
  default:
    return state;
  }
}
