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
function postTeamFind(response, attr) {
  if(!response.error) {
    attr.error = 'duplicate_channel';
    return (dispatch, getState) => {
        dispatch({
        type: 'CHAT_ERROR_DETAILS',
        attr
      })
    }
  } else {
    window.location.hash = "#/channel/members";
    return (dispatch, getState) => {
        dispatch({
          type: 'CHAT_DETAILS',
          attr
        })
    }
  }
}
export function chatDetails(attr) {
  return (dispatch, getState) => {
      findTeam(attr).then(response => {return response.json()}) 
      .then(json => dispatch(postTeamFind(json, attr)))
  }
}
export function resetDetails() {
  return (dispatch, getState) => {
      dispatch({
        type: 'RESET_CREATE_CHANNEL'
      })
  }
}
export function updateMembers(members) {
  return (dispatch, getState) => {
    dispatch({
        type: 'CHAT_MEMBERS',
        members: members
      })
  }
}
export function createChannel(members) {
  return (dispatch, getState) => {
    dispatch({
        type: 'CHAT_MEMBERS',
        members: members
      })
    createRequest(getState().createChannel.CreateChannel.payload).then(response => {return response.json()}) 
      .then(json => dispatch(postActionConstruct(json)))
  }
}

function postActionConstruct(json, action) {
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
      if(action == 'delete')
        window.location.hash = "#/dashboard/";
      else
        window.location.hash = "#/dashboard/" + json.channel.name;
    }
  }
}

export function updateChannelDetails(attr) {
  
  return (dispatch, getState) => {
    dispatch({
      type: 'CHAT_DETAILS',
      attr
    })
    updateDetailsRequest(getState().createChannel.CreateChannel.payload).then(response => {return response.json()}) 
      .then(json => dispatch(postActionConstruct(json)))
  }
}

export function deleteChannel(id) {
  return (dispatch, getState) => {
    deleteChannelRequest(id).then(response => {return response.json()}) 
      .then(json => dispatch(postActionConstruct(json, 'delete')))
  }
}


function postActionFetch(json) {
  return (dispatch, getState) => {
    if(json.error) {
      dispatch({
        type: 'CHAT_ERROR',
        error: json.error
      })
    } else {
      dispatch({
          type: 'CHAT_DETAILS_FETCH',
          attr: {
            channel : json.channel.name,
            id : json.channel.id,
            team : json.channel.address.domain,
            avatarPreview : json.channel.avatar_96,
            description : json.channel.description,
            is_public : json.channel.is_public,
            is_group : json.channel.is_group,
            is_direct : json.channel.is_direct
          }
        })
    }
  }
}

export function fetchChannel(id) {
  return (dispatch, getState) => {
    fetchChannelInfo(id).then(response => {return response.json()}) 
      .then(json => dispatch(postActionFetch(json)))
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
    if(payload.members && payload.members.length) {
      data.append('user_emails', payload.members.join(','));
    }
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

function updateDetailsRequest(payload){
    if (typeof(Storage) !== "undefined") {
      var token = JSON.parse(localStorage.getItem("token"));
    }
    var data = new FormData();
    if(payload.avatar) {
      data.append('avatar', payload.avatar);
    }
    data.append('name', payload.channel);
    data.append('description', payload.description);
    return fetch(urlConfig.base + '/channels.update/' + payload.id ,
      {
        method: 'PUT',
        headers:{
          'enctype':"multipart/form-data",
          'Authorization': 'Bearer ' + token.access_token
        },
        body: data
    })
} 

function deleteChannelRequest(id){
    if (typeof(Storage) !== "undefined") {
      var token = JSON.parse(localStorage.getItem("token"));
    }
    return fetch(urlConfig.base + '/channels.delete/' + id ,
      {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.access_token
        }
    })
} 

function fetchChannelInfo(id){
    var url =  urlConfig.base + 'channels.info?channel_id=' + id;
    if (typeof(Storage) !== "undefined") {
      var token = JSON.parse(localStorage.getItem("token"));
    }
    return fetch(url,
      {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.access_token
        }
    })
}

function findTeam(channel){
    var url =  urlConfig.base + 'channels.find?channel=' + channel.channel;
    if(channel.team){
      url+= ("&team=" + channel.team);
    }
    if (typeof(Storage) !== "undefined") {
      var token = JSON.parse(localStorage.getItem("token"));
    }
    return fetch(url,
      {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.access_token
        }
    })
} 