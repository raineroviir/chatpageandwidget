import urlConfig from '../../url-config';
import fetch from 'isomorphic-fetch';
import { getChannels } from '../Channels';
import { browserHistory } from 'react-router';

export function populateUserInfo () {
  return dispatch => {
    let unauth = false;
    if(typeof(Storage) === "undefined" || !localStorage.getItem("token")){
      return;
    }
    fetchUserInfo().then(response => {
      if (response.status == 401) {
        unauth = true;
        browserHistory.push("/"); 
      }
      return response.json()
    })  
    .then(json => {
      if(!unauth){
        dispatch(processUserInfoForDispatch(json))
        dispatch(processOrgsForDispatch(json));
      }
    });
  }
}

export function switchOrganization(org, orgs, history) {
  let old_token; 
  if (typeof(Storage) !== "undefined") {
    old_token = localStorage.getItem("token");
    localStorage.setItem("token", JSON.stringify(org.token));     
  }
  //window.location = "/dashboard/" + org.name.split("/")[1];
  browserHistory.push("/dashboard/" + org.name.split("/")[1])
  //dispatch(processOrgForDispatch(org, orgs));
  org.active = true;
  return dispatch => {
    let unauth = false;
    fetchUserInfo().then(response => {
      if (response.status == 401) {
        unauth = true;
        if(typeof(Storage) !== "undefined"){
          localStorage.setItem("token", old_token);
        } 
        //window.location.hash = "#";
        browserHistory.push("/"); 
      }
    }).then(() => {
      !unauth && dispatch(getChannels(null))
    })
    return dispatch(processOrgForDispatch(org, orgs))
  }
  /*return {
    type: "DUMMY_DISPATCH",
    posts : null,
    receivedAt: Date.now()
  }*/
}

export function addOrganization(org) {
  var orgs = JSON.parse(localStorage.getItem("orgs")) || [],
    orgn = orgs.filter(item => item.token.access_token == org.token.access_token);
  if(!orgn.length) {
    org.active = false;
    orgs.push(org);
    localStorage.setItem("orgs", JSON.stringify(orgs));
  }
  return {
    type: "DUMMY_DISPATCH",
    posts : null,
    receivedAt: Date.now()
  };
}

export function fetchUserInfo() {
  if (typeof(Storage) !== "undefined") {
    var token = JSON.parse(localStorage.getItem("token")) || {};
  }
  return fetch( urlConfig.base + 'users.me', {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.access_token,
    }
  })
}

function processUserInfoForDispatch(user) {
  return {
    type: 'USER_ME',
    posts: user.user,
    receivedAt: Date.now()
  }
}

function processOrgsForDispatch(userinfo) {
  if (typeof(Storage) !== "undefined") {
    var orgs = JSON.parse(localStorage.getItem("orgs")) || [],
      token = JSON.parse(localStorage.getItem("token")),
      org = orgs.find(item => {
        return item.token.access_token == token.access_token
      });
    orgs = orgs.filter(item => {item.active = false; return true; });
    if(!org){
      let chname = window.location.pathname.split("dashboard/")[1],
        name = (userinfo.user.team) ? userinfo.user.team.name + "/" + chname : "chat.center/" + chname,
        orgNew = orgs.find(item => {
          return item.name == name
        });
      if(orgNew){
        orgNew.token = token;
        orgNew.active = true;
      }
      else {
        orgs.push({
          name: name,
          token: token,
          user: userinfo.user,
          active: true
        })
      }
    }
    else{
      org.active = true;
    }
    if(org && !org.user){
      org.user = userinfo.user;
      localStorage.setItem("orgs", JSON.stringify(orgs)); 
      //console.log(localStorage.getItem("orgs"));
    }
  }
  return {
    type: "SET_ORGANIZATIONS",
    posts: orgs,
    receivedAt: Date.now()
  }
}

function processOrgForDispatch(org) {
  if (typeof(Storage) !== "undefined") {
    var orgs = JSON.parse(localStorage.getItem("orgs")) || [];
    orgs.filter(item => {
      item.active = false;
      if(item.name == org.name){
        item.active = true;
      }
    });
  }
  return {
    type: "SET_ORGANIZATION",
    posts: orgs,
    receivedAt: Date.now()
  }
}

