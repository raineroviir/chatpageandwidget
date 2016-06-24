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
    botAvatarUrl: "/dist/images/msg-env.png",
    proChatInvitation: false,
    conditionList: [{}]

};

export function widget(state = initialState, action) {
    switch (action.type) {

      case 'INIT_WIDGET': 
          if( action.data && !action.data.error ) {
            return action.data
          } else {
            return state;
          }
      case 'UPDATE_KEY' : 
        return {
          ...state,
          [action.key]: action.value
        };

      default: return state;
    }
}