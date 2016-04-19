import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';
import classNames from 'classnames';

export class RegisterOrgDetailComp extends Component {

  constructor(props) {
    super(props);
  }

  handleNext(){
    let FirstName = this.refs.FirstName.value;
    let LastName = this.refs.LastName.value;
    let Email = this.refs.Email.value;

    //store the value in STORE by dispatching event in action
    this.props.handleNext(FirstName,LastName,Email);
    //console.log('Moving 1 step back');
    window.location.hash = "#/signup/organization/address";
  }

  inputChange(){
    this.refs.nextButton.disabled = !(this.refs.FirstName.value && this.refs.LastName.value && this.refs.Email.value);
  }

  componentDidMount() {
    this.refs.nextButton.disabled = true;
  }

  render() {

    return (
      <div id="signupbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal" role="form">
                <div className="user-status"><span className="offline"></span><span className="inactive"></span><span className="online"></span></div>
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="title">Your Personal Details</h1>                
                <div className="input-group input-group-lg">
                  <span className="input-group-addon user-name" id="username-addon"><img src="dist/images/user-icon.svg" /></span>
                  <input type="text" className="form-control" ref="FirstName" placeholder="First Name" onChange={this.inputChange.bind(this)} aria-describedby="username-addon" />
                </div>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon user-name" id="username-addon"><img src="dist/images/user-icon.svg" /></span>
                  <input type="text" className="form-control" ref="LastName" placeholder="Last Name" onChange={this.inputChange.bind(this)} aria-describedby="username-addon" />
                </div>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon email" id="email-addon"><img src="dist/images/user-icon.svg" /></span>
                  <input type="email" className="form-control" ref="Email" placeholder="Email" onChange={this.inputChange.bind(this)} aria-describedby="email-addon" />
                </div>
                <div className="form-group button-wrapper">
                    <div className="col-sm-12">
                      <button type="button" className="btn btn-default back" onClick={this.props.handleBack}>BACK</button>
                      <button type="button" ref="nextButton" className="btn btn-default sign-in" onClick={this.handleNext.bind(this)}>NEXT</button>
                    </div>
                </div>           
            </form>
       </div> 
    );
  }
}

RegisterOrgDetailComp.propTypes = {
  //actions: PropTypes.object.isRequired
}
