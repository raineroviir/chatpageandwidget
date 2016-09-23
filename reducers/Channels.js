const initialState = {
  channels: {
    all: [],
    publicChannels: [],
    privateChannels:[],
    groupChannels: [],
    otherChannels: [],
    recentContacts: [],
    directChannel: null,
    count: 0,
    isGroupChat: false,
    guest: {
      email: null,
      first_name: null,
      last_name: null,
      widgetChannel: ''
    }
  }
};

export function channels(state = initialState, action) {
  switch (action.type) {
  case 'FETCH_CHANNELS':
    return {
      ...state,
      channels: Object.assign({}, state.channels, action.posts.processed, { count: action.posts.meta.count})
    };
  case 'SET_IS_GROUP':
    return {
      ...state,
      channels: Object.assign({}, state.channels, { isGroupChat: action.posts.isGroupChat })
    };
  case 'RESET_CHANNELS':
    return initialState;
  default:
    return state;
  }
}
