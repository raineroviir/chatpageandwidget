const initialState = {
  messages: []
};

export function messages(state = initialState, action) {
  switch (action.type) {
  case 'FETCH_MESSAGES':
    return {
      ...state,
      messages: action.posts
    };    
  default:
    return state;
  }
}
