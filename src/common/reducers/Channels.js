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
  },
  activeChannelId: null,
  activeChannelUrl: null
};

export function channels(state = initialState, action) {
  switch (action.type) {
  case 'FETCH_CHANNELS':
    return {
      ...state,
      channels: Object.assign({}, state.channels, action.posts.processed, { count: action.posts.meta.count})
    };
  case 'FETCHED_CHANNEL':
    return {
      ...state,
      channels: {
        ...state.channels,
        all: [...state.channels.all, action.json.channel]
      },
      isGroupChat: action.json.channel.is_group,
      activeChannelId: action.json.channel.id
    }
  case 'RESET_CHANNELS':
    return initialState;
  //
  // case 'STORE_CHANNEL_INFO':
  //   return {...state, activeChannelId: action.channelId, activeChannelUrl: action.channelUrl}

  case 'RECEIVE_CHANNEL_INFO':
    return {...state,
      channels: {
        isGroupChat: action.channelInfo.channel.is_group,
        tempChannelInfo: action.channelInfo.channel
      }
    }
  case 'SAVE_SUBDOMAIN_AS_ACTIVE_CHANNEL':
  console.log(action)
    return {...state, activeChannelId: action.subdomain}
  default:
    return state;
  }
}
