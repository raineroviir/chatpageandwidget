const initialState = {
  channels: {
    publicChannels: [],
    groupChannels: [],
    recentContacts: []
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
