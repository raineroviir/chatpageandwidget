import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';
import { browserHistory } from 'react-router';

import {RegisterOrgDomainComp} from '../../../components/Register/Organization/Domain';

export class RegisterOrgDomain extends Component {

  handleBack(){
    //window.location.hash = "#/signup/organization/name";
    browserHistory.push("/signup/organization/name");
  }

  handleNext(RegisterTeam){

    //store the value in STORE by dispatching event in action
    this.props.actions.registerTeam(RegisterTeam);    
    //window.location.hash = "#/signup/organization/detail";
    browserHistory.push("/signup/organization/detail");
  }

  checkForTeamNameAvailability(CurrentTeamName){
    this.props.actions.checkTeamName(CurrentTeamName + '.' + window.config.cc);
  }

  render() {
    //const { actions } = this.props
    return (
      <RegisterOrgDomainComp checkForTeamNameAvailability={this.checkForTeamNameAvailability.bind(this)} registrationDetails={this.props.registrationDetails} handleBack={this.handleBack} handleNext={this.handleNext.bind(this)} />  

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
