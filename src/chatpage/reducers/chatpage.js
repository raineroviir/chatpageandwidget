const initialState = {
  channelid: '',
  initialConfig: {
    keyColor: "#f7a444",
    channel: {
      avatar: null,
      avatarUrl: null,
      id: null
    },
    content: null
  },
  channelUrl: null,
  initialized: false
};

export function chatpage(state = initialState, action) {
  switch (action.type) {
    case 'INIT_CHATPAGE_CONFIG_INITIAL_STATE':
      return {
        ...state,
        initialConfig: action.chatpageConfig,
        channelUrl: action.channelUrl ? action.channelUrl : null,
        channelId: action.channelId ? action.channelId : null,
        initialized: true
      }
    default: return state;
  }
}
