import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration'; 
import {RegisterOrgAddressComp} from '../../../components/Register/Organization/Address';
import { browserHistory } from 'react-router';

export class RegisterOrgAddress extends Component {

  handleBack(){
    //window.location.hash = "#/signup/organization/detail";
    browserHistory.push("/signup/organization/detail");
  }

  handleNext(RegisterChannel){
    
    //store the value in STORE by dispatching event in action
    this.props.actions.registerChannel(RegisterChannel);
    //window.location.hash = "#/signup/organization/verify";
    browserHistory.push("/signup/organization/verify");
  }

  checkForChannelNameAvailability(CurrentChannelName, CurrentTeamName){
    this.props.actions.checkChannelName(CurrentChannelName, CurrentTeamName);
  }

  render() {
    return (
      <RegisterOrgAddressComp registrationDetails={this.props.registrationDetails} checkForChannelNameAvailability={this.checkForChannelNameAvailability.bind(this)} handleBack={this.handleBack} handleNext={this.handleNext.bind(this)} />
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