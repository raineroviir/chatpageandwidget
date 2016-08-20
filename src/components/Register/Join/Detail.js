import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';
import classNames from 'classnames';
import { browserHistory } from 'react-router';

export class RegisterJoinDetailComp extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.first_name=this.props.registrationDetails.Organisation.joinDetails.first_name;
    this.state.last_name=this.props.registrationDetails.Organisation.joinDetails.last_name;
    this.state.Password=this.props.registrationDetails.Organisation.joinDetails.password;    
  }

  handleNext(e){
    e.preventDefault();
    let FirstName = this.refs.FirstName.value;
    let LastName = this.refs.LastName.value;
    let Password = this.refs.Password.value;

    //store the value in STORE by dispatching event in action
    this.props.handleNext(this.state.team_name,this.state.invite_token,FirstName,LastName,Password);
    //console.log('Moving 1 step back');
    //window.location.hash = "#/signup/organization/address";
    browserHistory.push("/join/address");
  }

  inputChange(){
    this.refs.nextButton.disabled = !(this.refs.FirstName.value && this.refs.LastName.value && this.refs.Password.value && this.refs.Password.value.length>=8);
  }

  componentDidMount() {

    var paths = window.location.pathname.split('/');
    this.state.team_name = paths[paths.indexOf('join')-1];
    this.state.invite_token = paths[paths.indexOf('join')+1];

    if(!(this.refs.FirstName.value && this.refs.LastName.value && this.refs.Password.value && this.refs.Password.value.length>=8)){
      this.refs.nextButton.disabled = true;
    }
    this.refs.FirstName.value = this.state.first_name;
    this.refs.LastName.value = this.state.last_name;
    this.refs.Password.value = this.state.Password;
  }

  render() {

    //redirect to first page if refreshed
    // if(this.props.registrationDetails.Organisation.payload.team_description === ''){
    //   //window.location.hash = "#/signup/organization/name";
    //   browserHistory.push("/signup/organization/name");
    // }

    return (
      <div id="signupbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal org-detail-form" role="form">
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="inner-title">Your Personal Details</h1>                
                <div className="input-group input-group-lg">
                  <label htmlFor="firstName" className="input-group-addon user-name" id="username-addon"><img src="dist/images/user-icon.svg" /></label>
                  <input autoFocus type="text" className="form-control first-name" ref="FirstName" placeholder="First Name" onChange={this.inputChange.bind(this)} aria-describedby="username-addon" />
                </div>
                <div className="input-group input-group-lg">
                  <label htmlFor="lastName" className="input-group-addon user-name" id="username-addon"><img src="dist/images/user-icon.svg" /></label>
                  <input id="lastName" type="text" className="form-control last-name" ref="LastName" placeholder="Last Name" onChange={this.inputChange.bind(this)} aria-describedby="username-addon" />
                </div>
                <div className="input-group input-group-lg">
                  <label  htmlFor="password" className="input-group-addon email" id="email-addon"><img src="dist/images/password-icon.svg" /></label>
                  <input id="password" type="password" className="form-control" ref="Password" placeholder="Password" onChange={this.inputChange.bind(this)} aria-describedby="password-addon" />
                </div>
                <div className="form-group button-wrapper">
                    <div className="col-sm-12">
                      <div className="row">                      
                        <button type="submit" ref="nextButton" className="btn btn-default sign-in pull-right" onClick={this.handleNext.bind(this)}>NEXT</button>
                      </div>
                    </div>
                </div>           
            </form>
       </div> 
    );
  }
}

RegisterJoinDetailComp.propTypes = {
  //actions: PropTypes.object.isRequired
}
