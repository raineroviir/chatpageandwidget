const initialState = {
    channelid: '',
    classId: '',
    isNewChannelConfig: false,
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

export function widget(state = initialState, action) {

    switch (action.type) {
      case 'WIDGET_UPDATE_KEY':
        return {
          ...state,
          [action.key]: action.value
        };
      case  'INIT_WIDGET_CONFIG_INITIAL_STATE': {
        return {
          ...state,
          initialConfig: action.widgetConfig,
          channelUrl: action.channelUrl ? action.channelUrl : null,
          channelId: action.channelId ? action.channelId : null,
          initialized: true
        }
      }

      case 'WIDGET_UPDATE_STATE':
          return {
              ...state,
              ...action.newState
          }
      default: return state;
    }
}
