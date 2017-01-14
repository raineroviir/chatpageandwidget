import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';
import { browserHistory } from 'react-router';

import {RegisterJoinDetailComp} from '../../../components/Register/Join/Detail';

export class RegisterJoinDetail extends Component {

  handleBack(){
    //console.log('Moving 1 step back');
    //window.location.hash = "#/signup/organization/domain";
    browserHistory.push("/signup/organization/domain");
  }

  handleNext(InviteToken,FirstName,LastName,Password,TeamName,Email){

    //store the value in STORE by dispatching event in action
    this.props.actions.registerPersonalDetailsJoin(InviteToken, FirstName, LastName, Password, TeamName,Email);
    
    //browserHistory.push("/signup/organization/address");
    browserHistory.push("/join/address");
  }

  render() {
    //const { actions } = this.props
    return (      
      <RegisterJoinDetailComp registrationDetails={this.props.registrationDetails} handleBack={this.handleBack} handleNext={this.handleNext.bind(this)} />
    );
  }
}

//

RegisterJoinDetail.propTypes = {
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
)(RegisterJoinDetail)