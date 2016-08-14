const initialState = {
  orgs: [],
  addOrg: false
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
  case 'SET_ADD_ORG':
    return {
      ...state,
      addOrg: action.posts.addOrg
    };
  default:
    return state;
  }
}
