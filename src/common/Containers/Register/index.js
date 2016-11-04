import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { Link } from 'react-router';
import Logo from "../../Components/images/logo.svg"
import IndIcon from "../../Components/images/ind-icon.svg"
import OrgIcon from "../../Components/images/org-icon.svg"

const metaData = {
  title: 'Register | Chat Center',
  description: 'Chat Center',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'chat,center',
    },
  },
};

import RegisterOrgName from './Organization/Name'
import RegisterIndividual from './Individual'

export class Register extends Component {
  render() {
    return (
      <div id="signupbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 logo-centered">
        <form id="signupform" className="form-horizontal" style={{display: "flex", flexDirection: "column", width: "100%"}} role="form">
          <div style={{width: "100%", display: "flex", "justifyContent": "center"}} className="logo-wrapper">
            <img className="logo" src={Logo} title="Chat Center" />
          </div>
          <div>
            <div style={{fontSize: "36px", width: "100%", textAlign: "center"}}>{window.config.cc}</div>
          </div>
          <div>
            <div style={{fontSize: "16px", width: "100%", textAlign: "center"}} className="details text-center">Create a free {window.config.cc} for:</div>
          </div>
          <Link to="orgname" style={{display: "flex", justifyContent: "center", flexDirection: "column"}} className="user-type org col-sm-12 text-center" onClick={this.toggleRegisterOrg}>
            <img src={OrgIcon} title="Organization" />
            <span style={{alignItems: "center", display: "flex", flexDirection: "column"}} className="user-type-content">
              <strong>Organization</strong>
              <span>Great for teams and collaboration</span>
            </span>
          </Link>
          <div className="user-type median col-sm-12 text-center">
          </div>
          <div className="user-type ind col-sm-12 text-center">
          <Link to="individual" style={{display: "flex", justifyContent: "center", flexDirection: "column"}} onClick={this.toggleRegisterIndividual}>
            <img src={IndIcon} title="Organization" />
            <span style={{alignItems: "center", display: "flex", flexDirection: "column"}} className="user-type-content">
              <strong>Individual</strong>
              <span>If you want to keep it nice and simple </span>
            </span>
          </Link>
          </div>
          <div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%", padding: "11 0 11 0"}} className="sign-in-wrapper">
              <span>Have an account?</span>
              <div title="Sign in" className="pull-right">Sign in.</div>
            </div>
          </div>
        </form>
       </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return dispatch
}

export default connect(mapDispatchToProps)(Register)
