const initialState = {
    keyColor: '#fdb22b',
    teamAvatar: false,
    channelLogo: false,
    channelLogoUrl: '/dist/images/preview.png',
    welcomeMessage: 'Hi there, thanks for checking out chat.center, if you have any questions we will be happy to help, just let us know!',
    autoAnswer: 'We normally answer within 60 minutes or less. Please leave your questions here and someone will be with you shortly.',
    emailPrompt: 'Let us notify you via email:',
    emailPlaceholder: 'Your email',
    inputMsgholder: 'Type your message here',
    sendBtnText: 'Send',
    botName: 'Alex (Bot)',
    ccBranding: false,
    botAvatarUrl: "/dist/images/user-icon-black.svg",
    proChatInvitation: false,
    conditionList: [],
    channelid: '',
    primeCondition: {
      condition1: 'time_on_website',
      condition2: 'more_then',
      value: '' 
    },
    conditionCriteria: 'all'

};

export function widgetConfig(state = initialState, action) {
    switch (action.type) {

      case 'INIT_WIDGET_CONFIG': 
          if( action.data && !action.data.error ) {
            return {
              ...initialState,
              ...action.data,
              channelid: action.channelid
            }
          } else {
            return state;
          }
          
      case 'WIDGET_CONFIG_UPDATE_KEY' : 
        return {
          ...state,
          [action.key]: action.value
        };

      default: return state;
    }
}