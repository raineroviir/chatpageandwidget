import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as ChannelActions from '../../actions/Channels';
import classnames from 'classnames';

export class ChannelMembers extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  
  handleNext(evt){
    evt.preventDefault();
    this.props.handleNext();
  }

  inputChange(){

  }

  removeMember(member) {
    let item = this.props.details.payload.members.indexOf(member);
    this.props.details.payload.members.splice(item, 1);
    this.props.updateMembers(this.props.details.payload.members)
  }

  addMember() {
    if(this.props.details.payload.members.indexOf(this.refs.membersName.value) == -1 && this.props.validateEmail(this.refs.membersName.value)) {
      this.props.details.payload.members.push(this.refs.membersName.value);
      this.props.updateMembers(this.props.details.payload.members)
      this.refs.membersName.value = "";
    }
  }

  componentDidMount() {
    if(!this.props.id && (this.props.details.payload.is_public === "" || this.props.details.payload.is_direct==="" || this.props.details.payload.is_group==="")) {
      window.location.hash = "#/channel/type";
    } else if(!this.props.id && (this.props.details.payload.channel == "" || this.props.details.payload.description=="")) {
      window.location.hash = "#/channel/create";
    }
    if(!(this.props.details.payload.members && this.props.details.payload.members.length)) {
      this.refs.createButton.disabled = true;
      this.refs.saveButton.disabled = true;
    }
  }

  render() { 

    let members = this.props.details.payload.members;
    
    return (
      <div id="create-ext-chat-form"  className="create-ext-chat create-ext-chat-form moderators-form " >
        <a href="#/dashboard" className="close-wrapper">
          <span className="glyphicon glyphicon-remove"></span>
        </a>
        <div className="section-content">
          <h1 className="section-title-1" style={{display:((this.props.details.payload.is_public && !this.props.details.payload.is_group) ? "" : "none")}}>External Team-to-One chat channel</h1>
          <h1 className="section-title-1" style={{display:((this.props.details.payload.is_public && this.props.details.payload.is_group) ? "" : "none")}}>External group chat</h1>
          <h1 className="section-title-1" style={{display:((!this.props.details.payload.is_public) ? "" : "none")}}>Internal group chat</h1>
          <h1 className="section-title" style={{display:((this.props.details.payload.is_public && this.props.details.payload.is_group) ? "" : "none")}}>Who can delete unwanted messages and block for bad behaviour?</h1>
          <h1 className="section-title" style={{display:((this.props.details.payload.is_public && !this.props.details.payload.is_group) ? "" : "none")}}>Who can see and answer incoming chats?</h1>
          <h1 className="section-title" style={{display:((!this.props.details.payload.is_public) ? "" : "none")}}>Channel Members</h1>
          <div className="form-wrapper">

            <div className="input-wrapper">
              <input id="membersName" type="text" className="input-field" ref="membersName" placeholder={'Invite people' + (this.props.details.payload.team ? ' from ' + this.props.details.payload.team : '')} onChange={this.inputChange.bind(this)} aria-describedby="username-addon" />
              <a href="javascript:;" onClick={this.addMember.bind(this)} title="add" className="add-via-chat-link">Add</a>
              
            </div>

            <div className="moderators-count">
              <div className="desc">{members.length} Moderators</div>
            </div>
            <div className="moderator-item-wrapper">
            {
                members.map(member => {
                  return (
                    <div className="moderator-item">
                      <div className="avatar-wrapper">
                        <img  className="avatar-img" />
                        <span className="avatar-text">{member[0].toUpperCase()}</span>
                      </div>
                      <span className="user-name">{member.split('@')[0]}</span>

                      <div className="user-chat-address-wrapper">
                        <span className="user-chat-address">{member}</span>
                        <button className="remove-button" onClick={this.removeMember.bind(this, member)}>X</button>
                      </div>
                    </div>
                  );
                })
              }
              
            </div>
            <div className="button-wrapper">
              <button type="button" className="btn btn-default back" onClick={this.props.handleBack}>BACK</button>
              <button type="submit" ref="createButton" className={classnames('btn btn-default sign-in pull-right', { hide: this.props.id})} onClick={this.handleNext.bind(this)}>CREATE</button>
              <button type="submit" ref="saveButton" className={classnames('btn btn-default sign-in pull-right', { hide: !this.props.id})} onClick={this.handleNext.bind(this)}>SAVE</button>
            </div> 
            <div className="footer-help">
              <div>
                <span>Questions?</span>
                <a href="#/login" title="Sign in">Chat with us</a>
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