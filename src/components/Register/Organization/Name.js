import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';
import classNames from 'classnames';

export class RegisterOrgNameComp extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.team_description=this.props.registrationDetails.Organisation.payload.team_description;
  }

  handleNext(evt){
    evt.preventDefault();
    let RegisterOrganisationName = this.refs.RegisterOrganisationName.value;
    this.props.handleNext(this.capitalizeFirstLetter(RegisterOrganisationName));
  }

  inputChange(){
    this.refs.nextButton.disabled = !(this.refs.RegisterOrganisationName.value);
  }

  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  componentDidMount() {
    if(this.state.team_description === ''){
      this.refs.nextButton.disabled = true;
    }
    this.refs.RegisterOrganisationName.value = this.state.team_description;
  }

  render() { 

  //  console.log("SignUpRegistrationComponentRender"+this.props.registrationDetails);
    
    return (
      <div id="signupbox"  className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal name-chat-form" role="form">
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="inner-title">Name your chat.center</h1>
                <div className="input-group input-group-lg">
                  <label htmlFor="organizationName" className="input-group-addon user-name" id="username-addon"><img src="dist/images/user-icon.svg" /></label>
                  <input autoFocus id="organizationName" type="text" className="form-control capitalize" ref="RegisterOrganisationName" placeholder="Organization, team, department name" onChange={this.inputChange.bind(this)} aria-describedby="username-addon" />
                </div> 
                <div className="desc">Example: Virgin Galactic; Techcrunch; Stanford United; Beyonce; Photo Review Blog etc. </div>
                <div className="form-group button-wrapper">
                    <div className="col-sm-12">
                      <div className="row">
                    <button type="button" className="btn btn-default back" onClick={this.props.handleBack}>BACK</button>
                    <button type="submit" ref="nextButton" className="btn btn-default sign-in pull-right" onClick={this.handleNext.bind(this)}>NEXT</button>
                  </div>
                   </div>
                </div>            
            </form>
       </div> 
    );
  }
}

//PropTypes required to make sure props are  formed as per the component requirement, else will throw an error in
//console. This is used only in developers mode.
RegisterOrgNameComp.propTypes = {
  handleBack:PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired
}