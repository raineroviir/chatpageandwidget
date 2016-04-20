import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration'; 
import {RegisterOrgAddressComp} from '../../../components/Register/Organization/Address';

export class RegisterOrgAddress extends Component {

  handleBack(){
    window.location.hash = "#/signup/organization/detail";
  }

  handleNext(RegisterChannel){
    
    //store the value in STORE by dispatching event in action
    this.props.actions.registerChannel(RegisterChannel);
    window.location.hash = "#/signup/organization/verify";
  }

  render() {
    return (
      <RegisterOrgAddressComp handleBack={this.handleBack} handleNext={this.handleNext.bind(this)} registrationDetails={this.props.registrationDetails} />
    );
  }
}

RegisterOrgAddress.propTypes = {
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
)(RegisterOrgAddress)