const initialState = {
  messages: [],
  conversationid: null
};

export function messages(state = initialState, action) {
  switch (action.type) {
  case 'FETCH_MESSAGES':
    console.log("aconversationid")
    return {
      ...state,
      messages: action.posts.messages,
      conversationid: action.posts.conversationid
    };    
  default:
    return state;
  }
}
