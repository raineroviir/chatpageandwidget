import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';

import {RegisterOrgDetailComp} from '../../../components/Register/Organization/Detail';

export class RegisterOrgDetail extends Component {

  handleBack(){
    //console.log('Moving 1 step back');
    window.location.hash = "#/signup/organization/domain";
  }

  handleNext(FirstName,LastName,Email){

    //store the value in STORE by dispatching event in action
    this.props.actions.registerPersonalDetails(FirstName,LastName,Email);
    //console.log('Moving 1 step back');
    window.location.hash = "#/signup/organization/address";
  }

  render() {
    //const { actions } = this.props
    return (      
      <RegisterOrgDetailComp registrationDetails={this.props.registrationDetails} handleBack={this.handleBack} handleNext={this.handleNext.bind(this)} />
    );
  }
}

//

RegisterOrgDetail.propTypes = {
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
)(RegisterOrgDetail)