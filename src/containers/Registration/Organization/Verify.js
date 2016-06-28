import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';
import { browserHistory } from 'react-router';

import {RegisterOrgVerifyComp} from '../../../components/Register/Organization/Verify';

export class RegisterOrgVerify extends Component {

  handleBack(){
    //window.location.hash = "#/signup/organization/address";
    browserHistory.push("/signup/organization/address");
  }

  handleNext(RegisterPassword){
    //store the value in STORE by dispatching event in action
    this.props.actions.registerPassword(RegisterPassword);
    this.props.actions.submitRegistration();
  }

  render() {
    return (
      <RegisterOrgVerifyComp registrationDetails={this.props.registrationDetails} handleBack={this.handleBack} handleNext={this.handleNext.bind(this)} registrationDetails={this.props.registrationDetails} />
    );
  }
}

RegisterOrgVerify.propTypes = {
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    registrationDetails: state.registrationDetails
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RegistrationActions, dispatch)
  }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(RegisterOrgVerify)
