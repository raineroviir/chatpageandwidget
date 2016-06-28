import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as RegistrationActions from '../../../actions/Registration';
import { browserHistory } from 'react-router';

import {SimpleForm} from './simpleForm';

export class SFCont extends Component {

  // constructor(props) {
  //   super(props); 
  // }

  handleBack(){
    //console.log('Moving 1 step back'); 
    //window.location.hash = "#/signup/organization";
    browserHistory.push("/signup/organization");
  }

  handleNext(RegisterOrganisationName){
    //store the value in STORE by dispatching event in action
    this.props.actions.registerOrganisationName(RegisterOrganisationName);

    //navigate to next screen
    //window.location.hash = "#/signup/organization/domain";
    browserHistory.push("/signup/organization/domain");

  }

  handleChange(){
    console.log(this);
  }

  render() {
    //var asd = {teamName:"team name"};
     // const {
     //  fields: { firstName}      
     //  } = this.props

    return (
      <div>
      kjnjk
      <SimpleForm />
      </div>
    );
  }
}

// <form>
//         <div>
//           <label>First Name</label>
//           <div>
//             <input type="text" onChange={this.handleChange.bind(this)} placeholder="First Name"  {...firstName}/>
//           </div>
//         </div>
//       </form>

SFCont.propTypes = {
  // todos: PropTypes.array.isRequired,
  //actions: PropTypes.object.isRequired
  //dispatch: PropTypes.func.isRequired
}


// var form = reduxForm({
//   form: 'contact',                      // the name of your form and the key to
//                                         // where your form's state will be mounted
//   fields: ['team_name'], // a list of all your fields in your form
//   //validate: validateContact             // a synchronous validation function
// })();

var form = reduxForm({
  form: 'addTravel',
  fields: ['firstName'],
  //touchOnChange: true, // react-widgets DateTimePicker doesn't blur
  // validate(travel) {
  //   var errors = {}
  //   if (!travel.startDate) errors.startDate = 'Please enter a start date.'
  //   if (!travel.endDate) errors.endDate = 'Please enter an end date.'
  //   if (travel.startDate && travel.endDate &&
  //       zeroTime(travel.endDate) < zeroTime(travel.startDate)) {
  //     errors.endDate = 'End date must not be earlier than start date.'
  //   }
  //   if (!travel.origin) errors.origin = 'Please enter an origin.'
  //   if (!travel.destination) errors.destination = 'Please enter a destination.'
  //   return errors
  // }
})

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
)(SFCont)
