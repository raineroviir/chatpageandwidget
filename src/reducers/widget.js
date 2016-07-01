const initialState = {
    channelid: '',
    classId: '',
    widgetMenuState : false,
    isNewChannelConfig: false
};

export function widget(state = initialState, action) {

    switch (action.type) {
      case 'INIT_WIDGET_CONFIG': 
          if( action.channelid && !action.data.error ) {
            return {
              ...state,
              channelid: action.channelid
            }
          } else {
            return state;
          }
      case 'INIT_WIDGET': 
            return state;
      case 'WIDGET_UPDATE_KEY':
        return {
          ...state,
          [action.key]: action.value
        };
      
      default: return state;
    }
}