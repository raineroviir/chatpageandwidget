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

    if(this.props.details.users.filter(u => u.email.indexOf(this.refs.membersName.value) != -1).length) {
      this.props.details.payload.filtered_members = this.props.details.users.filter(u => u.email.indexOf(this.refs.membersName.value) != -1);
    } else {
      this.props.details.payload.filtered_members = [{prefix: 'Invite ', first_name:this.refs.membersName.value,email:this.refs.membersName.value}];
    }
    
    this.props.updateAutoSuggest(this.props.details.payload.filtered_members)
    
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
      this.props.updateAutoSuggest([])
      this.refs.membersName.value = "";
    }
  }

  componentWillMount() {
    this.props.fetchMembersList();
  }

  componentDidMount() {
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
    
    return (
      <div id="create-ext-chat-form"  className="create-ext-chat create-ext-chat-form moderators-form " >
        <Link to="/dashboard" className="close-wrapper">
          <span className="glyphicon glyphicon-remove"></span>
        </Link>
        <div className="section-content">
          <h1 className="section-title-1" style={{display:((this.props.details.payload.is_public && !this.props.details.payload.is_group) ? "" : "none")}}>External Team-to-One chat channel</h1>
          <h1 className="section-title-1" style={{display:((this.props.details.payload.is_public && this.props.details.payload.is_group) ? "" : "none")}}>External group chat</h1>
          <h1 className="section-title-1" style={{display:((!this.props.details.payload.is_public) ? "" : "none")}}>Internal group chat</h1>
          <h1 className="section-title" style={{display:((this.props.details.payload.is_public && this.props.details.payload.is_group) ? "" : "none")}}>Who can delete unwanted messages and block for bad behaviour?</h1>
          <h1 className="section-title" style={{display:((this.props.details.payload.is_public && !this.props.details.payload.is_group) ? "" : "none")}}>Who can see and answer incoming chats?</h1>
          <h1 className="section-title" style={{display:((!this.props.details.payload.is_public) ? "" : "none")}}>Channel Members</h1>
          <div className={classnames('error-message', { hide: !(this.props.details.error)})}>
                    Error in processing the request, please trying again..
                  </div>
          <div className="form-wrapper">
            <div className="input-wrapper">
              <input id="membersName" type="text" className="input-field" ref="membersName" placeholder={'Invite people' + (this.props.details.payload.team ? ' from ' + this.props.details.payload.team : '')} onChange={this.inputChange.bind(this)} aria-describedby="username-addon" />
              <a href="javascript:;" title="add" className="add-via-chat-link">Add via chat address </a>
              
            </div>

            <div className="moderator-item-wrapper filter-result">
            {
                filtered_members.map(filtered_member => {
                  return (
                    <div className="moderator-item" key={filtered_member.id}  onClick={this.addMember.bind(this, filtered_member)}>
                      <div className="avatar-wrapper">
                        <img  className="avatar-img" />
                        <span className="avatar-text">{filtered_member.first_name ? filtered_member.first_name[0].toUpperCase() : ''}</span>
                      </div>
                      <span className="user-name">{(filtered_member.prefix ? filtered_member.prefix : '') + filtered_member.first_name + ' ' + (filtered_member.last_name ? filtered_member.last_name : '')}</span>

                      <div className="user-chat-address-wrapper">
                        <span className="user-chat-address">{filtered_member.email}</span>
                      </div>
                    </div>
                  );
                })
              }
              
            </div>

            <div className={classnames('moderators-count', { hide: this.props.id})}>
              <div className={classnames('desc', { hide: !this.props.details.payload.is_public})}>{temp_members.length} Moderators</div>
              <div className={classnames('desc', { hide: this.props.details.payload.is_public})}>{temp_members.length} Members</div>
            </div>

            
            <div className="moderator-item-wrapper">
            {
                temp_members.map(temp_member => {
                  return (
                    <div className="moderator-item" key={temp_member.id}>
                      <div className="avatar-wrapper">
                        <img  className="avatar-img" />
                        <span className="avatar-text">{temp_member.first_name ? temp_member.first_name[0].toUpperCase() : ''}</span>
                      </div>
                      <span className="user-name">{temp_member.first_name + ' ' + (temp_member.last_name ? temp_member.last_name : '')}</span>

                      <div className="user-chat-address-wrapper">
                        <span className="user-chat-address">{temp_member.email}</span>
                        <button className="remove-button" onClick={this.removeMember.bind(this, temp_member)}>X</button>
                      </div>
                    </div>
                  );
                })
              }
              
            </div>
            
            <div className="button-wrapper">
              <button type="button" className={classnames('btn btn-default back', { hide: !this.props.id})} onClick={this.clearMember.bind(this)}>Clear</button>
              <button type="button" className={classnames('btn btn-default back', { hide: this.props.id})} onClick={this.props.handleBack.bind(this)}>Back</button>
              <button type="submit" ref="createButton" className="btn btn-default sign-in pull-right" onClick={this.handleNext.bind(this)}>CREATE</button>
            </div> 

            <div className={classnames('moderators-count', { hide: !this.props.id})}>
              <div className={classnames('desc', { hide: !this.props.details.payload.is_public})}>{members.length} Moderators</div>
              <div className={classnames('desc', { hide: this.props.details.payload.is_public})}>{members.length} Members</div>
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
                      <span className="user-name">{(member.first_name ? member.first_name :  member.email) + ' ' + (member.last_name ? member.last_name : '')}</span>

                      <div className="user-chat-address-wrapper">
                        <span className="user-chat-address">{member.email}</span>
                        <button className="remove-button" onClick={this.props.deleteMembers.bind(this, member.id)}>X</button>
                      </div>
                    </div>
                  );
                })
              }
              
            </div>
            <div className="footer-help">
              <div>
                <span>Questions?</span>
                <Link to="/login" title="Sign in">Chat with us</Link>
              </div>
            </div> 
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