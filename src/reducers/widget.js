const initialState = {
    channelid: '',
    classId: '',
    widgetMenuState : false,
    isNewChannelConfig: false
};

export function widget(state = initialState, action) {

    switch (action.type) {
      case 'WIDGET_UPDATE_KEY':
        return {
          ...state,
          [action.key]: action.value
        };
      
      default: return state;
    }
}