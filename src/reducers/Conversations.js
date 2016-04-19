const initialState = {
  conversations: []
};

export function conversations(state = initialState, action) {
  switch (action.type) {
  case 'FETCH_CONVERSATIONS':
    return {
      ...state,
      conversations: action.posts
    };    
  default:
    return state;
  }
}
