const initialState = {
  guest: false,
  convid: null,
  user_id: null,
  token: ''
};

export function guest(state = initialState, action) {
  switch (action.type) {
  case 'SET_GUEST':
    return {
      ...state,
      guest: action.posts.guest
    };
  case 'SET_GUEST_CONV':
    return {
      ...state,
      convid: action.posts.convid
    };
  case 'SET_GUEST_ID':
      return {
        ...state,
        user_id: action.posts.user_id
      };
  case 'TOKEN_SET':
    return {
      ...state,
      token: action.token
    }
  default:
    return state;
  }
}
