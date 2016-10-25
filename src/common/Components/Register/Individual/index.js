import React, { Component } from 'react';
import { connect } from 'react-redux';
import MailIcon from "../../images/iconMail.svg"
import PasswordIcon from "../../images/password-icon.svg"
import UserIcon from "../../images/user-icon.svg"
/* component styles */
import { styles } from '../styles.scss';

import {registerIndividualDetails} from '../../../actions/register'

class RegisterIndividual extends Component {

  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this)
    // this.state.first_name=this.props.registrationDetails.Organisation.payload.first_name;
    // this.state.last_name=this.props.registrationDetails.Organisation.payload.last_name;
    // this.state.email=this.props.registrationDetails.Organisation.payload.email;
    // this.state.password=this.props.registrationDetails.Organisation.payload.password;
  }
  prepareToRegisterIndividual(e) {
    e.preventDefault();
    let FirstName = this.refs.FirstName.value;
    let LastName = this.refs.LastName.value;
    let Email = this.refs.Email.value;
    let Password = this.refs.Password.value;

    dispatch(registerIndividualDetails(FirstName,LastName,Email,Password))
  }
  inputChange(){
    this.refs.nextBtn.disabled = !(this.refs.FirstName.value && this.refs.LastName.value && this.refs.Password.value && this.refs.Password.value.length>=8 && this.validateEmail(this.refs.Email.value))
  }
  handleBack() {
    
  }
  validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  componentDidMount() {
    // if(!(this.state.first_name && this.state.last_name && this.state.password && this.state.password.length>=8 && this.validateEmail(this.state.email))){
    //   this.refs.nextBtn.disabled = true;
    // }
    // this.refs.FirstName.value = this.state.first_name;
    // this.refs.LastName.value = this.state.last_name;
    // this.refs.Email.value = this.state.email;
    // this.refs.Password.value = this.state.password;
  }

  render() {
    return (
      <div id="signupbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal ind-details-from" role="form">
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="inner-title">Your personal details</h1>
                <div style={{display: "flex"}} className="input-group input-group-lg">
                  <label style={{display: "flex"}} htmlFor="firstName" className="input-group-addon" id="first-name-addon"><img style={{alignSelf: "center"}} src={UserIcon} /></label>
                  <input style={{width: "100%"}} autoFocus id="firstName" type="text" className="form-control first-name" ref="FirstName" placeholder="First name" aria-describedby="first-name-addon" onChange={this.inputChange.bind(this)} />
                </div>
                 <div style={{display: "flex"}} className="input-group input-group-lg">
                  <label style={{display: "flex"}} htmlFor="lastName" className="input-group-addon" id="last-name-addon"><img style={{alignSelf: "center"}} src={UserIcon} /></label>
                  <input style={{width: "100%"}} id="lastName" type="text" className="form-control last-name" ref="LastName" placeholder="Last name" aria-describedby="last-name-addon" onChange={this.inputChange.bind(this)} />
                </div>
                <div style={{display: "flex"}} className="input-group input-group-lg">
                  <label style={{display: "flex"}} htmlFor="email" className="input-group-addon email" id="email-addon"><img style={{alignSelf: "center"}} src={MailIcon} /></label>
                  <input style={{width: "100%"}} id="email" type="email" className="form-control" ref="Email" placeholder="Email" aria-describedby="email-addon" onChange={this.inputChange.bind(this)} />
                </div>
                <div style={{display: "flex"}} className="input-group input-group-lg">
                  <label style={{display: "flex"}} htmlFor="password" className="input-group-addon" id="password-addon"><img style={{alignSelf: "center"}} className="prefix" src={PasswordIcon} /></label>
                  <input style={{width: "100%"}} id="password" type="password" className="form-control" ref="Password" placeholder="Password" aria-describedby="password-addon" onChange={this.inputChange.bind(this)} />
                </div>
                <div className="form-group button-wrapper" style={{display: "flex", justifyContent: "center"}}>
                  <button style={{width: "100%"}} type="submit" className="btn btn-default pull-right" ref="nextBtn" onClick={this.prepareToRegisterIndividual.bind(this)}>NEXT</button>
                </div>
            </form>
       </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapDispatchToProps
)(RegisterIndividual)
