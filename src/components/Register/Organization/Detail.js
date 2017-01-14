import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';
import classNames from 'classnames';
import { browserHistory } from 'react-router';

export class RegisterOrgDetailComp extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.first_name=this.props.registrationDetails.Organisation.payload.first_name;
    this.state.last_name=this.props.registrationDetails.Organisation.payload.last_name;
    this.state.email=this.props.registrationDetails.Organisation.payload.email;
    this.state.password=this.props.registrationDetails.Organisation.payload.password;
     this.state.wrapperCls = 'sucess';
    this.state.labelIconClr = 'colorblack';
  }

  handleNext(e){
    e.preventDefault();
    let FirstName = this.refs.FirstName.value;
    let LastName = this.refs.LastName.value;
    let Email = this.refs.Email.value;
    let Password = this.refs.RegisterPassword.value;

    //store the value in STORE by dispatching event in action
    this.props.handleNext(FirstName,LastName,Email,Password);
    //console.log('Moving 1 step back');
    //window.location.hash = "#/signup/organization/address";
    browserHistory.push("/signup/organization/address");
  }

  inputChange(){
    this.refs.nextButton.disabled = !(this.refs.FirstName.value && this.refs.LastName.value && (this.refs.Email.value.length>0?this.validateEmail(this.refs.Email.value): false) && this.refs.RegisterPassword.value.length>=8);
  }

  componentDidMount() {  
    if(!(this.state.first_name && this.state.last_name && this.validateEmail(this.state.email) && this.state.password)){
      this.refs.nextButton.disabled = true;
    }
    this.refs.FirstName.value = this.state.first_name;
    this.refs.LastName.value = this.state.last_name;
    this.refs.Email.value = this.state.email;
    this.refs.RegisterPassword.value = this.state.password;
  }

  validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email)){
      this.setState({
            wrapperCls: 'sucess',
            labelIconClr:'colorblack'
           
        });
    }else{
       this.setState({
            wrapperCls: 'error',
            labelIconClr:'colorred'
        });
    }
    
    return re.test(email);
  }

  render() {

    //redirect to first page if refreshed
    if(this.props.registrationDetails.Organisation.payload.team_description === ''){
      //window.location.hash = "#/signup/organization/name";
      browserHistory.push("/signup/organization/name");
    }
    
    
    return (
      <div id="signupbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal org-detail-form" role="form">
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="inner-title">Your Personal Details</h1>                
                <div className="input-group input-group-lg">
                  <label htmlFor="firstName" className="input-group-addon user-name" id="username-addon"><i className="glyphicon glyphicon-user"></i></label>
                  <input autoFocus type="text" className="form-control first-name" ref="FirstName" placeholder="First Name" onChange={this.inputChange.bind(this)} aria-describedby="username-addon" />
                </div>
                <div className="input-group input-group-lg">
                  <label htmlFor="lastName" className="input-group-addon user-name" id="username-addon"><i className="glyphicon glyphicon-user"></i></label>
                  <input id="lastName" type="text" className="form-control last-name" ref="LastName" placeholder="Last Name" onChange={this.inputChange.bind(this)} aria-describedby="username-addon" />
                </div>
                <div className={'input-group input-group-lg '+ this.state.wrapperCls}>
                  <label  htmlFor="email" className={'input-group-addon email '+this.state.labelIconClr} id="email-addon"><i className="glyphicon glyphicon-envelope"></i></label>
                  <input id="email" type="email" className="form-control" ref="Email" placeholder="Email" onChange={this.inputChange.bind(this)} aria-describedby="email-addon" />
                </div>
                <div className="input-group input-group-lg password-input-group">
                  <label htmlFor="password" className="input-group-addon"  onChange={this.inputChange.bind(this)} id="password-addon"><i className="glyphicon glyphicon-lock"></i></label>
                  <input id="password" type="password" ref="RegisterPassword" onChange={this.inputChange.bind(this)} className="form-control" placeholder="Password" aria-describedby="password-addon" />
                </div>
                <div className="desc">
                  <ul><li>We need your email</li>
                      <li>- To be able to restore your account if you forget your password</li>
                      <li>- To send you notifications in case you miss some of your messages (You can to set your notification preferences once you register.)</li>
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

RegisterOrgDetailComp.propTypes = {
  //actions: PropTypes.object.isRequired
}
