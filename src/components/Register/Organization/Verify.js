import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';

export class RegisterOrgVerifyComp extends Component {


  handleNext(e){
    e.preventDefault();
    //service call to register and move to chat message home screen
    let RegisterPassword = this.refs.RegisterPassword.value;

    this.refs.submitButton.disabled = true;
    
    if(RegisterPassword === ''){
      alert('please enter password');
      return;
    } 

    //store the value in STORE by dispatching event in action
    this.props.handleNext(RegisterPassword);
    //this.props.actions.submitRegistration();
    //window.location.hash = "#";
  }

  inputChange(){
    this.refs.submitButton.disabled = !(this.refs.RegisterPassword.value&&this.refs.RegisterPassword.value.length>=8);
  }

  componentDidMount() {
    this.refs.submitButton.disabled = true;
    console.log(this.props.registrationDetails.Organisation);
  }

  render() {

    //redirect to first page if refreshed
    if(this.props.registrationDetails.Organisation.payload.team_description === ''){
      window.location.hash = "#/signup/organization/name";
    }
    
    const Organisation = this.props.registrationDetails.Organisation.payload
    return (
      <div id="signupbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal verify-details" role="form">
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="inner-title">Verify your details</h1>                
                <div className="input-group input-group-lg">
                  <label className="qn-label">Name of your chat.center</label>
                  <span className="ans-label">{Organisation.team_description}</span>
                </div>
                <div className="input-group input-group-lg">
                  <label className="qn-label">Address of your chat.center</label>
                  <span className="ans-label">https://{Organisation.team}.chat.center</span>
                </div>
                <div className="input-group input-group-lg">
                  <label className="qn-label">Full Name</label>
                  <span className="ans-label">{Organisation.first_name} {Organisation.last_name}</span>
                </div>
                <div className="input-group input-group-lg">
                  <label className="qn-label">Email</label>
                  <span className="ans-label">{Organisation.email}</span>
                </div>
                <div className="input-group input-group-lg">
                  <label className="qn-label">Your personal chat address</label>
                  <span className="ans-label">https://{Organisation.team}.chat.center/{Organisation.channel}</span>
                </div>
                <div className="input-group input-group-lg password-input-group">
                  <label htmlFor="password" className="input-group-addon" onChange={this.inputChange.bind(this)} id="password-addon"><img className="prefix" src="dist/images/password-icon.svg" /></label>
                  <input autoFocus id="password" type="password" ref="RegisterPassword" onChange={this.inputChange.bind(this)} className="form-control" placeholder="Set password" aria-describedby="password-addon" />
                </div>
                <div className="error-message">
                  {this.props.registrationDetails.Organisation.error}
                </div>
                <div className="form-group button-wrapper">
                    <div className="col-sm-12">
                      <div className="row">
                    <button type="button" className="btn btn-default back" onClick={this.props.handleBack}>BACK</button>
                    <button type="submit" ref="submitButton" className="btn btn-default sign-in pull-right domain-big-button" onClick={this.handleNext.bind(this)}>CREATE <span className="domain-big">CHAT.CENTER</span></button>
                  </div>
                   </div>
                </div>
                <p className="terms">
                By creating your account and using chat.center, you are agreeing to our <a href="javascript:;" title="Terms of Service">Terms of Service</a> and <a href="javascript:;" title="Privacy Policy">Privacy Policy</a>. 
                </p>            
            </form>
       </div> 
    );
  }
}

RegisterOrgVerifyComp.propTypes = {
  //actions: PropTypes.object.isRequired
}

