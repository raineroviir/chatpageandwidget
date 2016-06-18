import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as ChannelActions from '../../actions/Channels';
import classNames from 'classnames';

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

  componentDidMount() {
  }

  render() { 

  //  console.log("SignUpRegistrationComponentRender"+this.props.registrationDetails);
    
    return (
      <div id="create-ext-chat-form"  className="create-ext-chat create-ext-chat-form moderators-form " >
        <a href="#/dashboard" className="close-wrapper">
          <span className="glyphicon glyphicon-remove"></span>
        </a>
        <div className="section-content">
          <h1 className="section-title-1">Internal group chat</h1>
          <h1 className="section-title">Who can delete unwanted messages and block for bad behaviour?</h1>
          <div className="form-wrapper">

            <div className="input-wrapper">
              <input id="membersName" type="text" className="input-field" ref="membersName" placeholder="Invite people from Extraordinary Foods" onChange={this.inputChange.bind(this)} aria-describedby="username-addon" />
              <a href="javascript:;" title="add" className="add-via-chat-link">Add via chat address</a>
            </div>

            <div className="moderators-count">
              <div className="desc">6 Moderators</div>
            </div>
            <div className="moderator-item-wrapper">
              <div className="moderator-item">
                <div className="avatar-wrapper">
                  <img  className="avatar-img" />
                  <span className="avatar-text">KT</span>
                </div>
                <span className="user-name">Keith Teare</span>
                <div className="user-chat-address-wrapper">
                  <span className="user-chat-address">team.chat.center/keith</span>
                  <button className="remove-button">X</button>
                </div>
              </div>
              <div className="moderator-item">
                <div className="avatar-wrapper">
                  <img  className="avatar-img" />
                  <span className="avatar-text">KT</span>
                </div>
                <span className="user-name">Keith Teare</span>
                <div className="user-chat-address-wrapper">
                  <span className="user-chat-address">team.chat.center/keith</span>
                  <button className="remove-button">X</button>
                </div>
              </div>
            </div>
            <div className="button-wrapper">
              <button type="button" className="btn btn-default back" onClick={this.props.handleBack}>BACK</button>
              <button type="submit" ref="nextButton" className="btn btn-default sign-in pull-right" onClick={this.handleNext.bind(this)}>CREATE</button>
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