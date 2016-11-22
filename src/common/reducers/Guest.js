const initialState = {
  guest: false,
  convid: null,
  data: {
    "avatar_96": null,
    "avatar_384": null,
    "avatar_960": null,
    "id": null,
    "email": null,
    "first_name": null,
    "last_name": null,
    "invite_status": null,
    "plan": null,
    "team": null,
    "username": null
  },
  token: null,
  channel: '',
  conversations: ''
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
  case 'RECEIVED_GUEST_INFO':
      return {
        ...state,
        data: action.data.guest
      };
  case 'TOKEN_SET':
    return {
      ...state,
      guest: true,
      token: action.token
    }
  case 'RECEIVE_GUEST_TOKEN_FROM_LOCAL_STORAGE':
    console.log(action)
    return {
      ...state,
      guest: true,
      token: action.token
    }
  case 'GUEST_UPDATED':
    return {
      ...state,
      data: action.guest
    }
  case 'RESET_USER_DETAILS':
    return initialState;
  case 'FORGET_USER':
    return {...state, data: initialState.data}
  case 'WIDGET_CHANNEL_CREATED':
    return {...state, channel: action.channel}
  case 'CONVERSATION_CREATED':
    return {...state, conversations: action.conversation}
  case 'CONVERSATION_RECEIVED_FROM_LOCAL_STORAGE':
    return {...state, conversations: action.conversation}
  case 'RECEIVED_CHANNELS_FROM_SERVER':
    return {...state, channel: action.channels[0]}
  case 'USER_LOGIN_SUCCESS':
    return initialState
  default:
    return state;
  }
}
