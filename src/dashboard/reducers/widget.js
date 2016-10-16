const initialState = {
    channelid: '',
    classId: '',
    isNewChannelConfig: false,
    initialConfig: null,
    error: true
};

export function widget(state = initialState, action) {

    switch (action.type) {
      case 'WIDGET_UPDATE_KEY':
        return {
          ...state,
          [action.key]: action.value
        };
      case  'INIT_WIDGET_CONFIG_INITIAL_STATE': {
        let returnState = {
            ...state
          };
          returnState.initialConfig = action.data;
          return returnState;
      }

      case 'WIDGET_UPDATE_STATE': 
          return {
              ...state,
              ...action.newState
          }
      default: return state;
    }
}