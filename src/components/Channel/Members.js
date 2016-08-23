import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ChannelActions from '../../actions/Channels';
import classnames from 'classnames';
import { Link, browserHistory } from 'react-router';

export class ChannelMembers extends Component {

  handleNext(evt){
    evt.preventDefault();
    this.props.handleNext();
  }

  inputChange(){
    var _this = this;
    var userDiff = _.filter(_this.props.details.users, function(obj){ return !_.findWhere(_this.props.details.payload.temp_members, obj); });
    //var userDiff = _this.props.details.users;
    if(_this.props.details.payload.findDirectAddress) {
      _this.props.getDirectUser(_this.refs.DirectMembersName.value);
    } else if(_this.refs.membersName.value && userDiff.length && userDiff.filter(u => (u.username.toLowerCase().indexOf(_this.refs.membersName.value.toLowerCase()) != -1 || u.first_name.toLowerCase().indexOf(_this.refs.membersName.value.toLowerCase()) != -1  || u.last_name.toLowerCase().indexOf(_this.refs.membersName.value.toLowerCase()) != -1)).length) {
      _this.props.details.payload.filtered_members = userDiff.filter(u => (u.username.toLowerCase().indexOf(_this.refs.membersName.value.toLowerCase()) != -1 || u.first_name.toLowerCase().indexOf(_this.refs.membersName.value.toLowerCase()) != -1  || u.last_name.toLowerCase().indexOf(_this.refs.membersName.value.toLowerCase()) != -1));
      _this.props.updateAutoSuggest(_this.props.details.payload.filtered_members)
    } else if(!_this.refs.membersName.value)  {
      _this.props.details.payload.filtered_members = userDiff;
      _this.props.updateAutoSuggest(_this.props.details.payload.filtered_members)
    } else  {
      _this.props.details.payload.filtered_members = [];
      _this.props.updateAutoSuggest(_this.props.details.payload.filtered_members)
    }
    
  }

  inputFocus(){
    var _this = this;
    var userDiff = _.filter(_this.props.details.users, function(obj){ return !_.findWhere(_this.props.details.payload.temp_members, obj); });
    var userDiff = _this.props.details.users;
    if(_this.props.details.payload.findDirectAddress) {
      _this.props.getDirectUser(_this.refs.DirectMembersName.value);
    } else if(_this.refs.membersName.value && userDiff.length && userDiff.filter(u => (u.username.toLowerCase().indexOf(_this.refs.membersName.value.toLowerCase()) != -1 || u.first_name.toLowerCase().indexOf(_this.refs.membersName.value.toLowerCase()) != -1  || u.last_name.toLowerCase().indexOf(_this.refs.membersName.value.toLowerCase()) != -1)).length) {
      _this.props.details.payload.filtered_members = userDiff.filter(u => (u.username.toLowerCase().indexOf(_this.refs.membersName.value.toLowerCase()) != -1 || u.first_name.toLowerCase().indexOf(_this.refs.membersName.value.toLowerCase()) != -1  || u.last_name.toLowerCase().indexOf(_this.refs.membersName.value.toLowerCase()) != -1));
      _this.props.updateAutoSuggest(_this.props.details.payload.filtered_members)
    } else if(!_this.refs.membersName.value)  {
      _this.props.details.payload.filtered_members = userDiff;
      _this.props.updateAutoSuggest(_this.props.details.payload.filtered_members)
    } else  {
      _this.props.details.payload.filtered_members = [];
      _this.props.updateAutoSuggest(_this.props.details.payload.filtered_members)
    }
  }

  removeMember(member) {
    let item = this.props.details.payload.temp_members.indexOf(member);
    this.props.details.payload.temp_members.splice(item, 1);
    this.props.updateMembers(this.props.details.payload.temp_members)
  }

  clearMember(){
    this.props.updateMembers([]);
  }

  addMember(user) {
    if(this.props.details.payload.temp_members.indexOf(user) == -1 && this.props.validateEmail(user.email)) {
      this.props.details.payload.temp_members.push(user);
      this.props.updateMembers(this.props.details.payload.temp_members)
    }
    this.refs.DirectMembersName.value = "";
    this.refs.membersName.value = "";
    this.props.updateAutoSuggest([]);
  }

  toggleFind(bool){
    this.props.toggleFind(bool);
    this.refs.DirectMembersName.value = '';
    this.refs.membersName.value = '';
    this.props.details.payload.filtered_members = [];
    this.props.updateAutoSuggest(this.props.details.payload.filtered_members);
  }

  removeAutoSuggest(){
    this.props.details.payload.filtered_members = [];
    this.props.updateAutoSuggest(this.props.details.payload.filtered_members);
  }

  componentWillMount() {
    this.props.fetchMembersList();
  }

  componentDidMount() {
    var _this = this;
    if(!this.props.id && (this.props.details.payload.is_public === "" || this.props.details.payload.is_direct==="" || this.props.details.payload.is_group==="")) {
      //window.location.hash = "#/channel/type";
      browserHistory.push("/channel/type");
    } else if(!this.props.id && (this.props.details.payload.channel == "" || this.props.details.payload.description=="")) {
      //window.location.hash = "#/channel/create";
      browserHistory.push("/channel/create");
    }
    if(!(this.props.details.payload.temp_members && this.props.details.payload.temp_members.length)) {
      this.refs.createButton.disabled = true;
    }

     $('body').on('click', function (e) {
        if(!$(e.target).closest('#channelMemberForm .input-wrapper').length && !$(e.target).closest('#channelMemberForm .filter-result').length)
          _this.removeAutoSuggest();
      });
    
  }

  componentDidUpdate() { 
    if(!(this.props.details.payload.temp_members && this.props.details.payload.temp_members.length)) {
      this.refs.createButton.disabled = true;
    } else {
      this.refs.createButton.disabled = false;
    }
  }

  render() { 

    let members = this.props.details.payload.members;
    let temp_members = this.props.details.payload.temp_members;
    let filtered_members = this.props.details.payload.filtered_members;
    let users = this.props.details.users;
    let findDirectAddress = this.props.details.payload.findDirectAddress;
    
    return (
      <div id="create-ext-chat-form"  className="create-ext-chat create-ext-chat-form moderators-form " >
        
        <Link to="/dashboard" className="close-wrapper">
          <span className="cc-icon-cross"></span>
        </Link>
        <div className="section-content">
          
          <h1 className="section-title-1" style={{display:((this.props.isTeam && this.props.details.payload.is_public && !this.props.details.payload.is_group) ? "" : "none")}}>External Team-to-One chat channel</h1>
          <h1 className="section-title-1" style={{display:((!this.props.isTeam && this.props.details.payload.is_public && !this.props.details.payload.is_group) ? "" : "none")}}>External One-to-One chat channel</h1>
          <h1 className="section-title-1" style={{display:((this.props.details.payload.is_public && this.props.details.payload.is_group) ? "" : "none")}}>External group chat</h1>
          <h1 className="section-title-1" style={{display:((!this.props.details.payload.is_public) ? "" : "none")}}>Internal group chat</h1>
          <h1 className="section-title" style={{display:((this.props.details.payload.is_public && this.props.details.payload.is_group) ? "" : "none")}}>Who can delete unwanted messages and block for bad behaviour?</h1>
          <h1 className="section-title" style={{display:((this.props.details.payload.is_public && !this.props.details.payload.is_group) ? "" : "none")}}>Who can see and answer incoming chats?</h1>
          <h1 className="section-title" style={{display:((!this.props.details.payload.is_public) ? "" : "none")}}>Channel Members</h1>
          
          <div className="form-wrapper">
          <form name="channelMemberForm" id="channelMemberForm" role="form">
            <div className="input-wrapper">
              <span className={
                  classnames('chataddress-addon-http', { hide: !findDirectAddress }
                )}
              >http://</span>
              <input id="membersName" type="text" className={classnames('input-field', { hide: findDirectAddress})} ref="membersName" placeholder={'Invite people' + (this.props.teamDesc ? ' from ' + this.props.teamDesc : '')} onChange={this.inputChange.bind(this, 'membersName')} onFocus={this.inputChange.bind(this, 'membersName')} aria-describedby="username-addon" />
              <input id="DirectMembersName" type="text" 
              className={classnames('input-field input-field-http-addon', { hide: !findDirectAddress})} ref="DirectMembersName" placeholder={"chat address of any "+ window.config.cc +" user"} onChange={this.inputChange.bind(this, 'DirectMembersName')} onFocus={this.inputChange.bind(this, 'DirectMembersName')} aria-describedby="username-addon" />
              <a href="javascript:;" onClick={this.toggleFind.bind(this, !findDirectAddress)} title="add" className={classnames('add-via-chat-link', { hide: this.props.details.payload.team == window.config.cc})}>{findDirectAddress ? 'Add team members' : 'Add via chat address'}</a>
              
            </div>

            <div className="moderator-item-wrapper filter-result">
            {
                filtered_members.map(filtered_member => {
                  return (
                    <div className="moderator-item" key={filtered_member.id}  onClick={this.addMember.bind(this, filtered_member)}>
                      <div className="avatar-wrapper">
                        <img  className="avatar-img" />
                        <span className="avatar-text">{filtered_member.first_name ? filtered_member.first_name[0].toUpperCase() : filtered_member.email[0].toUpperCase()}</span>
                      </div>
                      <span className="user-name">{filtered_member.first_name ? (filtered_member.first_name + ' ' + (filtered_member.last_name ? filtered_member.last_name : '')): filtered_member.email}</span>

                      <div className="user-chat-address-wrapper">
                        <span className="user-chat-address">{(filtered_member.username && filtered_member.team) ? (filtered_member.team.name + '/' +filtered_member.username) : (window.config.cc + '/' +filtered_member.username)}</span>
                      </div>
                    </div>
                  );
                })
              }
              
            </div>

            <div className={classnames('moderators-count', { hide: this.props.id})}>
              <div className={classnames('desc', { hide: !(this.props.details.payload.is_public && this.props.details.payload.is_group)})}>{temp_members.length > 1 ? (temp_members.length + ' moderators') : (temp_members.length + ' moderator')}</div>
              <div className={classnames('desc', { hide: (this.props.details.payload.is_public && this.props.details.payload.is_group)})}>{temp_members.length > 1 ? (temp_members.length + ' members') : (temp_members.length + ' member')}</div>
            </div>

            
            <div className="moderator-item-wrapper">
            {
                temp_members.map(temp_member => {
                  return (
                    <div className="moderator-item" key={temp_member.id}>
                      <div className="avatar-wrapper">
                        <img  className="avatar-img" />
                        <span className="avatar-text">{temp_member.first_name ? temp_member.first_name[0].toUpperCase() : temp_member.email[0].toUpperCase()}</span>
                      </div>
                      <span className="user-name">{temp_member.first_name ? (temp_member.first_name + ' ' + (temp_member.last_name ? temp_member.last_name : '')):temp_member.email}</span>

                      <div className="user-chat-address-wrapper">
                        <span className="user-chat-address">{(temp_member.username && temp_member.team)  ? (temp_member.team.name + '/' +temp_member.username) : (window.config.cc + '/' +temp_member.username)}</span>
                        <button type="button" className={classnames('cc-icon-cross', { hide: temp_members.length ==  1})} onClick={this.removeMember.bind(this, temp_member)}></button>
                      </div>
                    </div>
                  );
                })
              }
              
            </div>
            <div className="button-wrapper">
              <div className={classnames('error-message', { hide: !(this.props.details.error)})}>
                Error in processing the request, please trying again...
              </div>
              <button type="button" className={classnames('btn btn-default back', { hide: !this.props.id})} onClick={this.clearMember.bind(this)}>Clear</button>
              <button type="button" className={classnames('btn btn-default back', { hide: this.props.id})} onClick={this.props.handleBack.bind(this)}>Back</button>
              <button type="submit" ref="createButton" className="btn btn-default sign-in pull-right" onClick={this.handleNext.bind(this)}>CREATE</button>
            </div> 

            <div className={classnames('moderators-count', { hide: !this.props.id})}>
              <div className={classnames('desc', { hide: !(this.props.details.payload.is_public && this.props.details.payload.is_group)})}>{members.length > 1 ? members.length + ' moderators' : members.length + ' moderator'}</div>
              <div className={classnames('desc', { hide: (this.props.details.payload.is_public && this.props.details.payload.is_group)})}>{members.length > 1 ? members.length + ' members' : members.length + ' member'}</div>
            </div>

            <div className={classnames('moderator-item-wrapper', { hide: !this.props.id})}>
            {
                members.map(member => {
                  return (
                    <div className="moderator-item" key={member.id}>
                      <div className="avatar-wrapper">
                        <img  className="avatar-img" />
                        <span className="avatar-text">{member.first_name ? member.first_name[0].toUpperCase() : member.email[0].toUpperCase()}</span>
                      </div>
                      <span className="user-name">{member.first_name ? (member.first_name + ' ' + (member.last_name ? member.last_name : '')) :  member.email}</span>

                      <div className="user-chat-address-wrapper">
                        <span className="user-chat-address">{(member.username && member.team) ? (member.team.name + '/' +member.username) : ( window.config.cc + '/' +member.username)}</span>
                        <button type="button" className={classnames('cc-icon-cross', { 'hide': members.length ==  1})} onClick={this.props.deleteMembers.bind(this, member.id)}></button>
                      </div>
                    </div>
                  );
                })
              }
              
            </div>
            <div className="footer-help">
              <div>
                <span>Questions?</span>
                <Link to="/login?login" title="Sign in">Chat with us</Link>
              </div>
            </div> 
            </form> 
          </div>
        </div> 
        
       </div>  
    );
  }
}

//PropTypes required to make sure props are  formed as per the component requirement, else will throw an error in
//console. This is used only in developers mode.
ChannelMembers.propTypes = {
  handleBack:PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired
}