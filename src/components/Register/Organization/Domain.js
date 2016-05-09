import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';
import classNames from 'classnames';

export class RegisterOrgDomainComp extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.team=this.props.registrationDetails.Organisation.payload.team;
  }

  handleBack(){
    window.location.hash = "#/signup/organization/name";
  }

  handleNext(e){
    e.preventDefault();
    let RegisterTeam = this.refs.RegisterTeam.value;
    this.props.handleNext(RegisterTeam);
  }

  inputChange(){
    this.refs.RegisterTeam.value = this.validateTeam(this.refs.RegisterTeam.value);     
    
    this.props.checkForTeamNameAvailability(this.refs.RegisterTeam.value);
    
    if(this.refs.RegisterTeam.value){
        this.refs.nextButton.disabled = false;
    }else{
      this.refs.nextButton.disabled = true;
    }
  }

  validateTeam(team_desc){
     var finalStr = team_desc.replace(/[^a-zA-Z-0-9]/gi, '')
     return finalStr.toLowerCase().substring(0,18);
   }

  componentDidMount() {

    var team_desc = this.props.registrationDetails.Organisation.payload.team_description;
    
    var team_name = team_desc.split(' ');
    var processed_team_name =[];
    for(var i=0;i<team_name.length;i++){
      processed_team_name.push(this.validateTeam(team_name[i]))
    }

    var finalStr = '';
    for(var i=0;i<processed_team_name.length;i++){
      if(finalStr.length<19){
        if(processed_team_name[i].length < 19){
          if(finalStr.length + processed_team_name[i].length < 19){
            finalStr += processed_team_name[i];
          }
        }else{
          if(finalStr.length === 0){
            finalStr = processed_team_name[i].substring(0,18);
            return;
          }
        }
      }      
    }
    
    this.state.team = finalStr;

    this.refs.nextButton.disabled = true;
    if(finalStr){
      if(!this.props.registrationDetails.Organisation.TeamAvailable.ok){
        this.refs.nextButton.disabled = false;
      }
    }

    this.refs.RegisterTeam.value = this.state.team;

    //check for team name availability on component load
    if(this.refs.RegisterTeam.value)
      this.props.checkForTeamNameAvailability(this.refs.RegisterTeam.value);

  }

  render() {
    
    //redirect to first page if refreshed
    if(this.props.registrationDetails.Organisation.payload.team_description === ''){
      window.location.hash = "#/signup/organization/name";
    }

    var availability = '';
    var boolAvailability= true;
    if(this.props.registrationDetails.Organisation.TeamAvailable.ok){
        boolAvailability = false
        availability = <span style={{color:'red'}}>Already exists</span>
      }else{
          availability = <span style={{color:'green'}}>Available</span>
    }

    let wrapperCls = 'loading';
    let imgSrc = '';

    if(Object.keys(this.props.registrationDetails.Organisation.TeamAvailable).length && this.props.registrationDetails.Organisation.TeamAvailable.ok) {
      wrapperCls = 'error';
      imgSrc = '-error';
    } else if(Object.keys(this.props.registrationDetails.Organisation.TeamAvailable).length && !this.props.registrationDetails.Organisation.TeamAvailable.ok) {
      if(this.props.registrationDetails.Organisation.TeamAvailable.error.indexOf('empty') === -1)
        wrapperCls = 'success';
    }

    return (      
      <div id="signupbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal domain-form" role="form">
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="inner-title">What address would you like for your chat.center?</h1>
                
                <div className={'input-group input-group-lg ' + wrapperCls}>

                  <label htmlFor="registerTeam" className="input-group-addon user-name" id="username-addon"><span className="prefix-text">https:<span className="double-slashes">//</span></span></label>
                  <input autoFocus id="registerTeam" type="text" className="form-control" ref="RegisterTeam" onChange={this.inputChange.bind(this)} placeholder="address" aria-describedby="username-addon" />
                  <span className="input-group-addon suffix"><span className="prefix-text">.chat.center</span></span>
                  
                </div>
                <div className="message-wrapper">
                  <p className="error-msg">This name is already taken</p>
                  <p className="success-msg">Available</p>
                  <p className="loading-msg"><img src="dist/images/loader-dots.gif" title="loading" /></p>
                </div>
                
                <div className="own-domain-wrapper">
                      <a className="own-domain" href="javascript:;" title="Use my own domain">Use my own domain</a>
                </div>  
                <div className="desc">This is your organization's dedicated name space. You will be able to create external chats for sales, support and alike, and internal chats to talk privately with your team, for example:  extraordinaryfoods.chat.center/sales, /support, /internal, etc.</div> 
                <div className="form-group button-wrapper">
                    <div className="col-sm-12">
                      <div className="row">
                    <button type="button" className="btn btn-default back" onClick={this.handleBack}>BACK</button>
                    <button type="submit" disabled={!boolAvailability} ref="nextButton" className="btn btn-default sign-in pull-right" onClick={this.handleNext.bind(this)}>NEXT</button>
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
