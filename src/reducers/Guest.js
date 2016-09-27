const initialState = {
  guest: false,
  convid: null,
  user_id: null,
  data: {},
  token: '',
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
        data: action.data,
        user_id: action.data.id
      };
  case 'TOKEN_SET':
    return {
      ...state,
      guest: true,
      token: action.token.access_token
    }
    case 'TOKEN_FROM_LOCAL_STORAGE':
      return {
        ...state,
        guest: true,
        token: action.token.access_token
      }
  case 'WIDGET_CHANNEL_CREATED':
    return {...state, channel: action.channel}
  case 'CONVERSATION_CREATED':
    return {...state, conversations: action.conversation}
  case 'CONVERSATION_RECEIVED_FROM_LOCAL_STORAGE':
    return {...state, conversations: action.conversation}
  case 'RECEIVED_CHANNELS_FROM_SERVER':
    return {...state, channel: action.channels[0]}
  default:
    return state;
  }
}
