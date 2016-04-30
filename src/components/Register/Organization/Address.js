import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration'; 

export class RegisterOrgAddressComp extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.channel=this.props.registrationDetails.Organisation.payload.channel;
  }

  handleBack(){
    window.location.hash = "#/signup/organization/detail";
  }

  handleNext(e){
    e.preventDefault();
    let RegisterChannel = this.refs.RegisterChannel.value;

    /*if(RegisterChannel === ''){
      alert('please enter team name');
      return;
    } */

    //store the value in STORE by dispatching event in action
    this.props.handleNext(RegisterChannel);
    window.location.hash = "#/signup/organization/verify";
  }

  inputChange(){
    //this.props.checkForChannelNameAvailability(this.refs.RegisterChannel.value, this.props.registrationDetails.Organisation.payload.team);
    this.refs.nextButton.disabled = !(this.refs.RegisterChannel.value)
  }

  componentDidMount() {
    if(this.state.channel === ''){
      this.refs.nextButton.disabled = true;
    }
    this.refs.RegisterChannel.value = this.state.channel;
  }

  render() {
    
    //redirect to first page if refreshed
    if(this.props.registrationDetails.Organisation.payload.team_description === ''){
      window.location.hash = "#/signup/organization/name";
    }
    const Organisation = this.props.registrationDetails.Organisation;
    
    return (
      <div id="signupbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal org-address-form" role="form">
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="inner-title">Pick your personal chat address</h1>
                <div className="chat-address">https://{Organisation.payload.team}.chat.center</div>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon user-name" id="username-addon"><span className="prefix-text slash">/</span></span>
                  <input type="text" className="form-control" ref="RegisterChannel" placeholder="Your name or nickname" aria-describedby="username-addon" onChange={this.inputChange.bind(this)} />
                </div> 
                <div className="desc">
                  <ul><li>&ndash; Use this chat address to log in.</li>
                      <li>&ndash; Anyone from your team and from the outside world will be able to use it to start a chat with you by typing your chat address in any browser on any device.</li>
                      <li>&ndash; Your team members can refer to you by using <a href="javascript">@username</a></li>
                    </ul> 
                  </div>   
                <div className="form-group button-wrapper">
                    <div className="col-sm-12">
                      <div className="row">
                      <button type="button" className="btn btn-default back" onClick={this.props.handleBack}>BACK</button>
                      <button type="submit" ref="nextButton" className="btn btn-default sign-in pull-right" onClick={this.handleNext.bind(this)}>NEXT</button>
                    </div>
                    </div>
                </div>           
            </form>
       </div> 
    );
  }
}

RegisterOrgAddressComp.propTypes = {
  //actions: PropTypes.object.isRequired
}
