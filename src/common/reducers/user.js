const initialState = {
  data: {
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
  },
  token: null
};

export function user(state = initialState, action) {
  switch (action.type) {
  case 'RECEIVED_USER_INFO':
  console.log(action.data)
    return {
      ...state,
      data: action.data.user,
    };
  // case 'RESET_USER':
  //   return initialState;
  // // case 'SETTING_USER_INFO':
  // //   return initialState
  case 'USER_UPDATED':
    return {
      ...state,
      data: action.user
    }
  case 'USER_LOGIN_SUCCESS':
    console.log(action)
    return {
      ...state, token: action.token
    }
  default:
    return state;
  }
}
