const initialState = {
    keyColor: '#fdb22b',
    teamAvatar: false,
    channel: {
      avatar: false, // boolean 
      avatarUrl: '/dist/images/preview.png', // url || datauri 
      id: '', //string 
    },
    
    content: {
      welcomeMessage: 'Hi there, thanks for checking out chat.center, if you have any questions we will be happy to help, just let us know!',
      autoAnswer: 'We normally answer within 60 minutes or less. Please leave your questions here and someone will be with you shortly.',
      emailPrompt: 'Let us notify you via email:',
      emailPlaceholder: 'Your email',
      inputMsgholder: 'Type your message here',
      sendBtnText: 'Send',
    },
    bot: {
      name: '(Bot)', // string 
      avatarUrl: "/dist/images/msg-env.png", // url || datauri 
    },
    ccBranding: false,
    proChatInvitation: false,
    renderRuleSet: {
      rules: [
        {
          variable: 'time_on_website',
          operator: 'more_then',
          value: '' 
        }
      ],
      ruleExpression: "any"
    }
};

let ccTextChanged = false;

export function widgetConfig(state = initialState, action) {

    if( !ccTextChanged && window.config ) {
      initialState.content.welcomeMessage = 'Hi there, thanks for checking out '+ window.config.cc +', if you have any questions we will be happy to help, just let us know!';
      ccTextChanged = true;
    }

    switch (action.type) {

      case 'INIT_WIDGET_CONFIG': 
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
          
      case 'WIDGET_CONFIG_UPDATE_KEY' : 
        return {
          ...state,
          [action.key]: action.value
        };
      case 'WIDGET_CONFIG_UPDATE_STATE': 
            return {
                ...state,
                ...action.newState
            }

      default: return state;
    }
}