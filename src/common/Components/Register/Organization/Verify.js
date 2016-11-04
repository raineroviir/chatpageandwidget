import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import classNames from 'classnames';

import {submitRegistration} from '../../../actions/register'


class RegisterOrgVerify extends Component {

  constructor() {
    super()
    this.handleBack = this.handleBack.bind(this)
    this.handleNext = this.handleNext.bind(this)
  }
  handleNext(e){
    e.preventDefault();
    const { dispatch } = this.props
    //service call to register and move to chat message home screen
    let RegisterPassword = this.refs.RegisterPassword.value;
    this.refs.submitButton.disabled = true;
    if(RegisterPassword === ''){
      alert('please enter password');
      return;
    }
    console.log(RegisterPassword)
    dispatch(submitRegistration(RegisterPassword))
  }
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  handleBack() {
    this.context.router.goBack()
  }
  inputChange(){
    this.refs.submitButton.disabled = !(this.refs.RegisterPassword.value&&this.refs.RegisterPassword.value.length>=8);
  }

  componentDidMount() {
    this.refs.submitButton.disabled = true;
  }

  render() {

    //redirect to first page if refreshed
    // var notOwnDomainContent = 'show';
    // var ownDomainContent = 'hide';
    // if(this.props.registrationDetails.Organisation.ownDomain){
    //   notOwnDomainContent = 'hide';
    //   ownDomainContent = 'show';
    // }
    //
    // const Organisation = this.props.registrationDetails.Organisation.payload
    const { register } = this.props
    return (
      <div id="signupbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal verify-details" role="form">
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="inner-title">Verify your details</h1>
                <div className="input-group input-group-lg">
                  <label className="qn-label">Name of your {window.config.cc}</label>
                  <span className="ans-label">{register.organizationName}</span>
                </div>
                <div className="input-group input-group-lg">
                  <label className="qn-label">Address of your {window.config.cc}</label>
                  {register.ownDomain ?
                  <span className={"ans-label " }>http://{register.ownDomainValue}</span> :
                  <span className={"ans-label " }>https://{register.payload.teamDomain}.{window.config.cc}</span>
                }
                </div>
                <div className="input-group input-group-lg">
                  <label className="qn-label">Full Name</label>
                  <span className="ans-label">{register.payload.first_name} {register.payload.last_name}</span>
                </div>
                <div className="input-group input-group-lg">
                  <label className="qn-label">Email</label>
                  <span className="ans-label">{register.payload.email}</span>
                </div>
                <div className="input-group input-group-lg">
                  <label className="qn-label">Your personal chat address</label>
                  {register.ownDomain ?
                  <span className={"ans-label " }>http://{register.ownDomainValue}/{register.payload.channel}</span> :
                  <span className={"ans-label " }>https://{register.payload.teamDomain}.{window.config.cc}/{register.payload.channel}</span>
                  }
                </div>
                <div style={{display: "flex"}} className="input-group input-group-lg password-input-group">
                  <label style={{display: "flex"}} htmlFor="password" className="input-group-addon" onChange={this.inputChange.bind(this)} id="password-addon"><img style={{alignSelf: "center"}} className="prefix" src="dist/images/password-icon.svg" /></label>
                  <input style={{width: "100%"}} autoFocus id="password" type="password" ref="RegisterPassword" onChange={this.inputChange.bind(this)} className="form-control" placeholder="Set password" aria-describedby="password-addon" />
                </div>
                <div className="error-message">
                  {register.error}
                </div>
                <div className="form-group button-wrapper" style={{display: "flex", justifyContent: "center"}}>
                    <button type="button" className="btn btn-default back" onClick={this.handleBack}>BACK</button>
                    <button style={{height: "initial"}} type="submit" ref="submitButton"
                    className={
                      classNames("btn btn-default sign-in pull-right domain-big-button", {
                        'btn-loading': register.signupRequestStatus === 'loading'
                      })
                    }
                     onClick={this.handleNext.bind(this)}>
                    CREATE <span className="domain-big">{window.config.cc.toUpperCase()}</span>
                    </button>
                </div>
                <p className="terms">
                By creating your account and using {window.config.cc}, you are agreeing to our <a href="javascript:;" title="Terms of Service">Terms of Service</a> and <a href="javascript:;" title="Privacy Policy">Privacy Policy</a>.
                </p>
            </form>
       </div>
    );
  }
}

function mapStateToProps(state) {
  const { register } = state
  return {
    register
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps
)(RegisterOrgVerify)
