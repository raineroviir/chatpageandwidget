import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';
import classNames from 'classnames';
import { browserHistory } from 'react-router';

export class RegisterOrgDomainComp extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.team=this.props.registrationDetails.Organisation.payload.team;
    this.state.ownDomainValue = this.props.registrationDetails.Organisation.ownDomainValue;
  }

  handleBack(){
    //window.location.hash = "#/signup/organization/name";
    browserHistory.push("/signup/organization/name");
  }

  handleNext(e){
    e.preventDefault();
    let RegisterTeam = this.refs.RegisterTeam.value;
    var ownDomainState = this.refs.ownDomainLink.style.display === 'none'?true:false;
    var ownDomainValue = this.refs.RegisterTeamOwnDomain.value;
    this.props.handleNext(RegisterTeam, ownDomainState, ownDomainValue);
  }

  handleOwnDomain(e){  
    if(e){
      e.preventDefault();
    }      
    this.refs.registerTeamWrapper.style.display = 'none';
    this.refs.registerOwnDomainWrapper.style.display = 'table';
    this.refs.chatCenterDomainLink.style.display = 'block';
    this.refs.ownDomainLink.style.display = 'none';

    //enable/disable next button
    if(this.refs.RegisterTeamOwnDomain.value && this.validateUrl(this.refs.RegisterTeamOwnDomain.value)){
      this.refs.nextButton.disabled = false;
    }else{
      this.refs.nextButton.disabled = true;
    }
  }

  handleChatCenterDomain(e){      
    e.preventDefault();
    this.refs.registerTeamWrapper.style.display = 'table';
    this.refs.registerOwnDomainWrapper.style.display = 'none';
    this.refs.chatCenterDomainLink.style.display = 'none';
    this.refs.ownDomainLink.style.display = 'block';

    //enable/disable next button
    this.refs.RegisterTeam.value = this.validateTeam(this.refs.RegisterTeam.value);
    if(this.refs.RegisterTeam.value){
        this.refs.nextButton.disabled = false;
    }else{
      this.refs.nextButton.disabled = true;
    }

  }

  inputDomainChange(){
    //enable/disable next button
    if(this.refs.RegisterTeamOwnDomain.value && this.validateUrl(this.refs.RegisterTeamOwnDomain.value)){
      this.refs.nextButton.disabled = false;
    }else{
      this.refs.nextButton.disabled = true;
    }
  }

  validateUrl(value){
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    //var t = 'www.google.com';
    
    return value.match(regex);
  }

  inputChange(){
    this.refs.RegisterTeam.value = this.validateTeam(this.refs.RegisterTeam.value);     
    
    let width = $('#calc-input-width').html(this.refs.RegisterTeam.value).width();
    this.refs.RegisterTeam.style.width = width;

    this.props.checkForTeamNameAvailability(this.refs.RegisterTeam.value);
    
    if(this.refs.RegisterTeam.value){
        this.refs.nextButton.disabled = false;
    }else{
      this.refs.nextButton.disabled = true;
    }
  }

  validateTeam(team_desc){
     var finalStr = team_desc.replace(/[^a-zA-Z-0-9]/gi, '');

     return finalStr.toLowerCase().substring(0,18);
   }

  componentDidMount() {
    //console.log(this.props.registrationDetails.Organisation.ownDomain);
    if(this.props.registrationDetails.Organisation.ownDomain){
      this.handleOwnDomain();
    }

    if( !$('#calc-input-width').length ) {
      $( 'body' ).append( '<span id="calc-input-width">' );  
    } 
    
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
    this.refs.RegisterTeamOwnDomain.value = this.state.ownDomainValue;

    //check for team name availability on component load
    if(this.refs.RegisterTeam.value) {
      
      this.props.checkForTeamNameAvailability(this.refs.RegisterTeam.value);
      let width = $('#calc-input-width').html( this.refs.RegisterTeam.value  ).width();
      this.refs.RegisterTeam.style.width = width;
      
    }
    
  }

  render() {
    
    //redirect to first page if refreshed
    if(this.props.registrationDetails.Organisation.payload.team_description === ''){
      //window.location.hash = "#/signup/organization/name";
      browserHistory.push("/signup/organization/name");
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
                <h1 className="inner-title">What address would you like for your {window.config.cc}?</h1>
                
                <div ref="registerTeamWrapper" className={'chat-center-address-input input-group input-group-lg ' + wrapperCls }>

                  <label htmlFor="registerTeam" className="input-group-addon user-name" id="username-addon"><span className="prefix-text">https:<span className="double-slashes">//</span></span></label>
                  <input autoFocus id="registerTeam" type="text" className="form-control" ref="RegisterTeam" onChange={this.inputChange.bind(this)} aria-describedby="username-addon" />
                  <span className="input-group-addon suffix"><span className="prefix-text">.{window.config.cc}</span></span>
                  
                </div>

                <div ref="registerOwnDomainWrapper" className={'chat-center-address-input input-group input-group-lg ' + wrapperCls } style={{display:'none'}}>

                  <label htmlFor="registerTeamOwnDomain" className="input-group-addon user-name" id="ownDomain"><span className="prefix-text">http:<span className="double-slashes">//</span></span></label>
                  <input id="registerTeamOwnDomain" type="text" className="form-control" ref="RegisterTeamOwnDomain" onChange={this.inputDomainChange.bind(this)} placeholder="your domain address" aria-describedby="ownDomain" style={{width:"100%"}} />                  
                  
                </div>

                <div className="message-wrapper">
                  <p className="error-msg">This name is already taken</p>
                  <p className="success-msg">Available</p>
                  <p className="loading-msg"><img src="dist/images/loader-dots.gif" title="loading" /></p>
                </div>
                
                <div className="own-domain-wrapper">
                      <a className="own-domain" ref="ownDomainLink" href="javascript:;" title="Use my own domain" onClick={this.handleOwnDomain.bind(this)}>Use my own domain</a>
                      <a className="own-domain" ref="chatCenterDomainLink" href="javascript:;" title={"Use " + window.config.cc } onClick={this.handleChatCenterDomain.bind(this)} style={{display:'none'}}>Use {window.config.cc}</a>
                </div>

                <div className="desc">This is your organization's dedicated name space. You will be able to create external chats for sales, support and alike, and internal chats to talk privately with your team, for example: 
                  :<p className="desc-ex">extraordinaryfoods.{window.config.cc}/sales, /support, /internal, etc.</p>
                </div> 
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