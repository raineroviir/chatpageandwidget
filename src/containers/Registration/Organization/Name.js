import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as RegistrationActions from '../../../actions/Registration';

import {RegisterOrgNameComp} from '../../../components/Register/Organization/Name';

export class RegisterOrgName extends Component {

  // constructor(props) {
  //   super(props); 
  // }

  handleBack(){
    //console.log('Moving 1 step back'); 
    window.location.hash = "#/signup/organization";
  }

  handleNext(RegisterOrganisationName){
    //store the value in STORE by dispatching event in action
    this.props.actions.registerOrganisationName(RegisterOrganisationName);

    //navigate to next screen
    window.location.hash = "#/signup/organization/domain";

  }

  render() {
    return (
      <RegisterOrgNameComp registrationDetails={this.props.registrationDetails} handleBack={this.handleBack} handleNext={this.handleNext.bind(this)} />
    );
  }
}

RegisterOrgName.propTypes = {
  // todos: PropTypes.array.isRequired,
  //actions: PropTypes.object.isRequired
  //dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    registrationDetails: state.registrationDetails
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RegistrationActions, dispatch),
    //handleBack:PropTypes.func.isRequired 
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterOrgName)
