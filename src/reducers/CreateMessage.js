const initialState = {
  showSuccessMessage: false
};

export function createMessage(state = initialState, action) {
  switch (action.type) {
  case 'MESSAGE_CREATED':
    return {
      ...state,
      showSuccessMessage: action.posts.showSuccessMessage
    };    
  default:
    return state;
  }
}
