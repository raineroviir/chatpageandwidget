const initialState = {
  active: false,
  botResponse: false
}

export function bot(state = initialState, action) {
  switch (action.type) {
    case 'BOT_ACTIVE':
      return {...state, active: true}
    case 'BOT_RESPONSE':
      return {...state, botResponse: true}
    default:
      return state
  }
}
