import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {registerOrganizationName} from '../../../actions/register'

class RegisterOrgName extends Component {

  constructor(props) {
    super(props);
    this.prepareToRegisterOrganization = this.prepareToRegisterOrganization.bind(this)
    this.handleBack = this.handleBack.bind(this)
  }
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  prepareToRegisterOrganization(e) {
    e.preventDefault()
    const { dispatch } = this.props
    let organizationName = this.capitalizeFirstLetter(this.refs.RegisterOrganizationName.value)
    dispatch(registerOrganizationName(organizationName))
    this.context.router.push("signup/organization/domain")
  }
  handleBack() {
    this.context.router.goBack()
  }
  inputChange(){
    this.refs.nextButton.disabled = !(this.refs.RegisterOrganizationName.value);
  }
  componentDidMount() {
    const { register } = this.props
    if (register.organizationName) {
      this.refs.RegisterOrganizationName.value = register.organizationName
    }
  }
  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  render() {
    return (
      <div id="signupbox"  className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        <form id="signupform" className="form-horizontal name-chat-form" role="form">
          <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
          <h1 className="inner-title">Name your {window.config.cc}</h1>
          <div className="input-group input-group-lg" style={{display: "flex"}}>
            <label style={{display: "flex"}} htmlFor="organizationName" className="input-group-addon user-name" id="username-addon"><img style={{alignSelf: "center"}} src="dist/images/user-icon.svg" /></label>
            <input style={{width: "100%"}} autoFocus id="organizationName" type="text" className="form-control capitalize" ref="RegisterOrganizationName" placeholder="Organization name" onChange={this.inputChange.bind(this)} aria-describedby="username-addon" />
          </div>
          <div className="desc">Example: Virgin Galactic; Techcrunch; Stanford United; Beyonce; Photo Review Blog etc. </div>
          <div className="form-group button-wrapper" style={{display: "flex", justifyContent: "center"}}>
            <button type="button" className="btn btn-default back" onClick={this.handleBack}>BACK</button>
            <button style={{width: "100%"}} type="submit" ref="nextButton" className="btn btn-default pull-right" onClick={this.prepareToRegisterOrganization}>NEXT</button>
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
)(RegisterOrgName)
