import fetch from 'isomorphic-fetch';
import urlConfig from '../../url-config';

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
export function resetDetails() {
  return (dispatch, getState) => {
      dispatch({
        type: 'RESET_CREATE_CHANNEL'
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
      window.location.hash = "#/dashboard/" + json.channel.name;
    }
  }
}

function createRequest(payload){
    if (typeof(Storage) !== "undefined") {
      var token = JSON.parse(localStorage.getItem("token"));
    }
    var data = new FormData();
    if(payload.avatar) {
      data.append('avatar', payload.avatar);
    }
    data.append('channel', payload.channel);
    data.append('description', payload.description);
    data.append('is_public', payload.is_public);
    data.append('is_group', payload.is_group);
    data.append('is_direct', payload.is_direct);
    return fetch(urlConfig.base + '/channels.create',
      {
        method: 'POST',
        headers:{
          'enctype':"multipart/form-data",
          'Authorization': 'Bearer ' + token.access_token
        },
        body: data
    })
} 