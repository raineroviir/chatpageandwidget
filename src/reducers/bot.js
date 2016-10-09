const initialState = {
  active: false,
  botResponse: false,
  emailReceived: false
}

export function bot(state = initialState, action) {
  switch (action.type) {
    case 'BOT_ACTIVE':
      return {...state, active: true}
    case 'BOT_RESPONSE':
      return {...state, botResponse: true}
    case "SUBMITTED_EMAIL_TO_BOT":
      return {...state, emailReceived: true}
    default:
      return state
  }
}
