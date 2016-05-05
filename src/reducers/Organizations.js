const initialState = {
  orgs: []
};

export function orgs(state = initialState, action) {
  switch (action.type) {
  case 'SET_ORGANIZATIONS':
    return {
      ...state,
      orgs: action.posts
    };
  case 'SET_ORGANIZATION':
    return {
      ...state,
      orgs: action.posts
    };
  default:
    return state;
  }
}
