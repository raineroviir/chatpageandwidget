const initialState = {
  channels: {
    publicChannels: [],
    privateChannels:[],
    groupChannels: [],
    otherChannels: [],
    recentContacts: [],
    meta: {
      count: 0
    }
  }
};

export function channels(state = initialState, action) {
  switch (action.type) {
  case 'FETCH_CHANNELS':
    return {
      ...state,
      channels: action.posts
    };    
  default:
    return state;
  }
}
