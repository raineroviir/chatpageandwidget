import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';

import {RegisterOrgDomainComp} from '../../../components/Register/Organization/Domain';

export class RegisterOrgDomain extends Component {

  handleBack(){
    window.location.hash = "#/signup/organization/name";
  }

  handleNext(RegisterTeam){

    //store the value in STORE by dispatching event in action
    this.props.actions.registerTeam(RegisterTeam);    
    window.location.hash = "#/signup/organization/detail";
  }

  render() {
    //const { actions } = this.props
    return (
      <RegisterOrgDomainComp handleBack={this.handleBack} handleNext={this.handleNext.bind(this)} />  

    );
  }
}

RegisterOrgDomain.propTypes = {
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
)(RegisterOrgDomain)
