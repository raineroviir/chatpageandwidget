import fetch from 'isomorphic-fetch';

export function chatType(attr) {
  return (dispatch, getState) => {
      dispatch({
      type: 'CHAT_TYPE',
      attr
    })
  }
}

export function chatDetails(attr) {
  return (dispatch, getState) => {
      dispatch({
        type: 'CHAT_DETAILS',
        attr
      })
  }
}
export function createChannel() {
  return (dispatch, getState) => {
    createRequest(getState().createChannel.CreateChannel.payload).then(response => {return response.json()}) 
      .then(json => dispatch(postActionConstruct(json)))
  }
}

function postActionConstruct(json) {
  return (dispatch, getState) => {
    if(json.error) {
      dispatch({
        type: 'CHAT_ERROR',
        error: json.error
      })
    } else {
      dispatch({
        type: 'RESET_CREATE_CHANNEL'
      })
    }
  }
}

function createRequest(payload){
    if (typeof(Storage) !== "undefined") {
      var token = JSON.parse(localStorage.getItem("token"));
    }
    delete payload.avatar;
    return fetch('https://api-beta.chat.center/v1/channels.create',
      {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.access_token
        },
        body: JSON.stringify(payload)
    })
} 