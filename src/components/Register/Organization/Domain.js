import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';
import classNames from 'classnames';

export class RegisterOrgDomainComp extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.team=this.props.registrationDetails.Organisation.team;
  }

  handleBack(){
    window.location.hash = "#/signup/organization/name";
  }

  handleNext(){
    let RegisterTeam = this.refs.RegisterTeam.value;
    this.props.handleNext(RegisterTeam+'.chat.center');
  }

  inputChange(){
    this.props.checkForTeamNameAvailability(this.refs.RegisterTeam.value);
    this.refs.nextButton.disabled = !(this.refs.RegisterTeam.value&&!this.props.registrationDetails.Organisation.TeamAvailable.ok)
  }

  componentDidMount() {

    if(this.props.registrationDetails.Organisation.team === ''){
      this.state.team = this.props.registrationDetails.Organisation.team_description;
    }
    
    if(this.props.registrationDetails.Organisation.TeamAvailable.ok){
      this.refs.nextButton.disabled = true;
    }

    this.refs.RegisterTeam.value = this.state.team;

    //check for team name availability on component load
    this.props.checkForTeamNameAvailability(this.refs.RegisterTeam.value);

  }

  render() {
    
    //redirect to first page if refreshed
    if(this.props.registrationDetails.Organisation.team_description === ''){
      window.location.hash = "#/signup/organization/name";
    }

    //this.props.registrationDetails.Organisation.TeamAvailable.ok?'Already exists':'Available'
    var availability = '';
    if(this.props.registrationDetails.Organisation.TeamAvailable.ok){
        availability = <span style={{color:'red'}}>Already exists</span>
      }else{
          availability = <span style={{color:'green'}}>Available</span>
      }

    return (

      
      <div id="signupbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal" role="form">
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="inner-title">What address would you like for your chat.center?</h1>
                
                <div className="input-group input-group-lg">

                  <span className="input-group-addon user-name" id="username-addon"><img src="dist/images/user-icon.svg" className="prefix" /><span className="prefix-text">http://</span></span>
                  <input type="text" className="form-control" ref="RegisterTeam" onChange={this.inputChange.bind(this)} placeholder="address" aria-describedby="username-addon" />
                  <span className="input-group-addon suffix"><span className="prefix-text">.chat.center</span></span>
                  
                </div> 
                <div className="col-sm-12">
                      {availability}
                </div> 

                <div className="own-domain-wrapper">
                      <a className="own-domain" href="javascript:;" title="Use my own domain">Use my own domain</a>
                </div>  
                <div className="desc">This is your organization's dedicated name space. You will be able to create external chats for sales, support and alike, and internal chats to talk privately with your team, for example:  extraordinaryfoods.chat.center/sales, /support, /internal, etc.</div> 
                <div className="form-group button-wrapper">
                    <div className="col-sm-12">
                      <div className="row">
                    <button type="button" className="btn btn-default back" onClick={this.handleBack}>BACK</button>
                    <button type="button" disabled={this.props.registrationDetails.Organisation.TeamAvailable.ok} ref="nextButton" className="btn btn-default sign-in pull-right" onClick={this.handleNext.bind(this)}>NEXT</button>
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
RegisterOrgDomainComp.propTypes = {
  handleBack:PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired
}
