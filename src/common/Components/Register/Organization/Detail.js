import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import classNames from 'classnames';

import {registerPersonalDetails} from '../../../actions/register'
class RegisterOrgDetail extends Component {

  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this)
    this.handleNext = this.handleNext.bind(this)
  }
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  handleNext(e){
    e.preventDefault();
    const { dispatch } = this.props
    let FirstName = this.refs.FirstName.value;
    let LastName = this.refs.LastName.value;
    let Email = this.refs.Email.value;
    dispatch(registerPersonalDetails(FirstName,LastName,Email))
    this.context.router.push("orgaddress")
  }
  handleBack() {
    this.context.router.goBack()
  }
  inputChange(){
    this.refs.nextButton.disabled = !(this.refs.FirstName.value && this.refs.LastName.value && this.validateEmail(this.refs.Email.value));
  }

  componentDidMount() {
    const { register } = this.props
    if (register.payload.first_name) {
      this.refs.FirstName.value = register.payload.first_name
    }
    if (register.payload.last_name) {
      this.refs.LastName.value = register.payload.last_name
    }
    if (register.payload.email) {
      this.refs.Email.value = register.payload.email
    }
  }

  validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  render() {
    const { register } = this.props
    //redirect to first page if refreshed
    // if(register.payload.team_description === ''){
    //   //window.location.hash = "#/signup/organization/name";
    //   );
    // }
    console.log(this.props)
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
                  <label  htmlFor="email" className="input-group-addon email" id="email-addon"><img src="dist/images/iconMail.svg" /></label>
                  <input id="email" type="email" className="form-control" ref="Email" placeholder="Email" onChange={this.inputChange.bind(this)} aria-describedby="email-addon" />
                </div>
                <div className="desc">
                  <ul><li>We need your email</li>
                      <li>- To be able to restore your account if you forget your password</li>
                      <li>- To send you notifications in case you miss some of your messages (You can to set your notification preferences once you register.)</li>
                    </ul>
                  </div>
                  <div className="form-group button-wrapper" style={{display: "flex", justifyContent: "center"}}>
                    <button type="button" className="btn btn-default back" onClick={this.handleBack}>BACK</button>
                    <button style={{width: "100%"}} type="submit" ref="nextButton" className="btn btn-default pull-right" onClick={this.handleNext}>NEXT</button>
                  </div>
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
)(RegisterOrgDetail)
