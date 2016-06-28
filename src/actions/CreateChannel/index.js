import fetch from 'isomorphic-fetch';
import urlConfig from '../../url-config';
import { browserHistory } from 'react-router';

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
    //window.location.hash = "#/channel/members";
    browserHistory.push("/channel/members");
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
export function updateAutoSuggest(members) {
  return (dispatch, getState) => {
    dispatch({
        type: 'CHAT_MEMBERS_SUGGEST',
        members: members
      })
  }
}
export function createChannel(isEdit) {
  return (dispatch, getState) => {
    if(isEdit) {
      updateMembersRequest(getState().createChannel.CreateChannel.payload).then(response => {return response.json()}) 
      .then(json => dispatch(postActionConstruct(json,'member-update',getState().createChannel.CreateChannel.payload.channel)))
    } else {
    createRequest(getState().createChannel.CreateChannel.payload).then(response => {return response.json()}) 
      .then(json => dispatch(postActionConstruct(json)))
    }
  }
}

export function deleteMembers(user_id) {
  return (dispatch, getState) => {
      deleteMembersRequest(getState().createChannel.CreateChannel.payload, user_id).then(response => {return response.json()}) 
      .then(json => dispatch(postActionChannelMembers(json,'member-update',getState().createChannel.CreateChannel.payload.channel)))
  }
}



function postActionConstruct(json, action, channel) {
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
      if(action == 'delete'){
        //window.location.hash = "#/dashboard/";
        browserHistory.push("/dashboard/");
      }
      else if(action == 'member-update'){
        //window.location.hash = "#/dashboard/" + channel;
        browserHistory.push("/dashboard/" + channel);
      }
      else{
        //window.location.hash = "#/dashboard/" + json.channel.name;
        browserHistory.push("/dashboard/" + json.channel.name);
      }
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

export function getTeamMembers(isEdit) {
  return (dispatch, getState) => {
    teamMembersList().then(response => {return response.json()}) 
      .then(json => dispatch(postActionTeamMembers(json, isEdit)))
  }
}

function postActionTeamMembers(json, isEdit) {
  return (dispatch, getState) => {
    if(json.error) {
      dispatch({
        type: 'CHAT_ERROR',
        error: json.error
      })
    } else {
      if(isEdit) {
        dispatch({
            type: 'TEAM_MEMBERS_EDIT',
            attr: json.users
          })
      } else {
        dispatch({
            type: 'CHAT_MEMBERS_CREATE',
            attr: json.users
          })
      }
    }
  }
}

export function clearErrorMessage() {
  return (dispatch, getState) => {
    dispatch({
        type: 'CHAT_ERROR',
        error: ''
      })
  }
}

export function getChannelMembers() {
  return (dispatch, getState) => {
    channelMembersList().then(response => {return response.json()}) 
      .then(json => dispatch(postActionChannelMembers(json)))
  }
}

function postActionChannelMembers(json) {
  return (dispatch, getState) => {
    if(json.error) {
      dispatch({
        type: 'CHAT_ERROR',
        error: json.error
      })
    } else {
      dispatch({
          type: 'CHAT_MEMBERS_EDIT',
          attr: json.users
        })
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
    if(payload.temp_members && payload.temp_members.length) {
      data.append('user_emails', payload.temp_members.map(value => value['email']).join(','));
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
    data.append('channel_id', payload.id);
    data.append('name', payload.channel);
    data.append('description', payload.description);
    return fetch(urlConfig.base + '/channels.update' ,
      {
        method: 'PUT',
        headers:{
          'enctype':"multipart/form-data",
          'Authorization': 'Bearer ' + token.access_token
        },
        body: data
    })
}

function updateMembersRequest(payload){
    if (typeof(Storage) !== "undefined") {
      var token = JSON.parse(localStorage.getItem("token"));
    }
    if(payload.is_public)
      var url = urlConfig.base + '/channels.moderators.create';
    else 
      var url = urlConfig.base + '/channels.members.create';
    var data = new FormData();
    data.append('channel_id', payload.id);
    if(payload.temp_members && payload.temp_members.length) {
      data.append('user_emails', payload.temp_members.map(value => value['email']).join(','));
    }
    return fetch(url ,
      {
        method: 'POST',
        headers:{
          'enctype':"multipart/form-data",
          'Authorization': 'Bearer ' + token.access_token
        },
        body: data
    })
}

function deleteMembersRequest(payload, user_id){
    if (typeof(Storage) !== "undefined") {
      var token = JSON.parse(localStorage.getItem("token"));
    }
    if(payload.is_public)
      var url = urlConfig.base + '/channels.moderators.delete';
    else 
      var url = urlConfig.base + '/channels.members.delete';
    var data = new FormData();
    data.append('channel_id', payload.id);
    data.append('user_id', user_id);
    return fetch(url ,
      {
        method: 'DELETE',
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

function teamMembersList(){
    var url =  urlConfig.base + 'teams.members.list';
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

function channelMembersList(){
    var url =  urlConfig.base + 'teams.members.list';
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
