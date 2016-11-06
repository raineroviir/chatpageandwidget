const initialState = {
    keyColor: '#e74c3c',
    bgColor:'#ffffff',
    teamAvatar: true,
    channel: {
      avatar: false, // boolean 
      avatarUrl: '/dist/images/preview.png', // url || datauri 
      id: '', //string 
    },
    
    content: {
     channelDescription: 'Hi there, thanks for checking out chat.center, if you have any questions we will be happy to help, just let us know!',
      welcomeMessage: 'Hi there, thanks for checking out chat.center, if you have any questions we will be happy to help, just let us know!',
      inputMsgholder: 'Type your message here',
      sendBtnText: 'Send',
    },
    
    ccBranding: false,
    
};

let ccTextChanged = false;

export function chatPageConfig(state = initialState, action) {

    if( !ccTextChanged && window.config ) {
      initialState.content.welcomeMessage = 'Hi there, thanks for checking out '+ window.config.cc +', if you have any questions we will be happy to help, just let us know!';
      ccTextChanged = true;
    }

    switch (action.type) {

      case 'INIT_CHATPAGE_CONFIG': 
          if( action.data && !action.data.error ) {
            let returnState = {
              ...initialState,
              ...action.data
            };
            returnState.channel.id = action.channelid;
            return returnState;
          } else {
            return state;
          }
          
      case 'CHATPAGE_CONFIG_UPDATE_KEY' : 
        return {
          ...state,
          [action.key]: action.value
        };
      case 'CHATPAGE_CONFIG_UPDATE_STATE': 
            return {
                ...state,
                ...action.newState
            }

      default: return state;
    }
}