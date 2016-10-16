const initialState = {
  userinfo: {
    "id": null,
    "first_name": null,
    "last_name": null,
    "avatar_96": null,
    "avatar_384": null,
    "avatar_960": null,
    "team": {
      "id": null,
      "name": null,
      "description": null
    }
  }
};

export function userinfo(state = initialState, action) {
  switch (action.type) {
  case 'USER_ME':
    return {
      ...state,
      userinfo: action.posts
    };
  case 'RESET_USER':
    return initialState;    
  default:
    return state;
  }
}
