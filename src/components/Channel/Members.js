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
    let RegisterOrganisationName = this.refs.RegisterOrganisationName.value;
    this.props.handleNext(RegisterOrganisationName);
  }

  inputChange(){
  }

  componentDidMount() {
  }

  render() { 

  //  console.log("SignUpRegistrationComponentRender"+this.props.registrationDetails);
    
    return (
      <div id="signupbox"  className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal name-chat-form" role="form">
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="inner-title">Who can delete unwanted messages and block for bad behavior? </h1>
                <div className="input-group input-group-lg">
                  <label className="input-group-addon user-name" id="username-addon"></label>
                  <input id="membersName" type="text" className="form-control" ref="membersName" placeholder="Invite people from Extraordinary Foods" onChange={this.inputChange.bind(this)} aria-describedby="username-addon" />
                </div> 
                <a href="javascript:;" title="add">Add via chat address</a>
                <div className="desc">6 Moderators</div>
                <div className="desc">
                  <img src="" className="avatar" />
                  <span>Keith Teare</span>
                  <span>team.chat.center/keith</span>
                  <button>X</button>
                </div>
                <div className="form-group button-wrapper">
                    <div className="col-sm-12">
                      <div className="row">
                    <button type="button" className="btn btn-default back" onClick={this.props.handleBack}>BACK</button>
                    <button type="submit" ref="nextButton" className="btn btn-default sign-in pull-right" onClick={this.handleNext.bind(this)}>CREATE</button>
                  </div>
                   </div>
                </div>  
                <div className="col-sm-12 text-center">
                  <div className="sign-in-wrapper">
                    <span>Questions?</span>
                    <a href="#/login" title="Sign in" className="pull-right">Chat with us</a>
                  </div>
                </div>          
            </form>
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