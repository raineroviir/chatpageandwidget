import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import classNames from 'classnames';

import loaderDots from '../../../Components/images/loader-dots.gif'
import { registerTeam, ownDomainStateFunction, checkTeamName } from '../../../actions/register'
class RegisterOrgDomain extends Component {

  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this)
    this.handleNext = this.handleNext.bind(this)
  }
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  handleBack() {
    this.context.router.goBack()
  }
  handleNext(e) {
    e.preventDefault();
    const { dispatch } = this.props
    let domain = this.props.register.payload.teamDomain
    var ownDomainState = this.refs.ownDomainLink.style.display === 'none'?true:false;
    var ownDomainValue = this.refs.RegisterTeamOwnDomain.value;
    dispatch(registerTeam(domain))
    dispatch(ownDomainStateFunction(ownDomainState, ownDomainValue))
    this.context.router.push("signup/organization/detail")
    console.log(this.props)
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
  handleChatCenterDomain(e) {
    e.preventDefault();
    this.refs.registerTeamWrapper.style.display = 'table';
    this.refs.registerOwnDomainWrapper.style.display = 'none';
    this.refs.chatCenterDomainLink.style.display = 'none';
    this.refs.ownDomainLink.style.display = 'block';

    //enable/disable next button
    // this.refs.RegisterTeam.value = this.validateTeam(this.refs.RegisterTeam.value);
    if(this.refs.RegisterTeam.value){
        this.refs.nextButton.disabled = false;
    }else{
      this.refs.nextButton.disabled = true;
    }

  }
  inputDomainChange() {
    if(this.refs.RegisterTeamOwnDomain.value && this.validateUrl(this.refs.RegisterTeamOwnDomain.value)){
      this.refs.nextButton.disabled = false;
    }else{
      this.refs.nextButton.disabled = true;
    }
  }
  validateUrl(value) {
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    return value.match(regex);
  }
  inputChange(e) {
    e.preventDefault()
    const { dispatch, register } = this.props
    dispatch(registerTeam(this.validateTeam(e.target.value)))
    dispatch(checkTeamName(register.payload.teamDomain))
    if(register.payload.teamDomain){
        this.refs.nextButton.disabled = false;
    } else {
      this.refs.nextButton.disabled = true;
    }
  }
  validateTeam(team_desc){
    let finalStr = team_desc.replace(/[^a-zA-Z-0-9]/gi, '');
    return finalStr.toLowerCase().substring(0,18);
  }
  componentDidMount() {
    const { register, dispatch } = this.props
    if(register.ownDomain){
      this.handleOwnDomain();
    }
  }
  isTeamAvailable() {
    const { register } = this.props
    if (register.TeamAvailable) {
      return (<span style={{color:'green'}}>Available</span>)
    }
    return (<span style={{color:'red'}}>Already exists</span>)
  }
  render() {
    const { register } = this.props
    console.log(register.TeamAvailable)
    let wrapperCls = 'loading';
    let imgSrc = '';
    // if(Object.keys(register.TeamAvailable).length && register.TeamAvailable) {
    //   wrapperCls = 'error';
    //   imgSrc = '-error';
    // } else if(Object.keys(register.TeamAvailable).length && !register.TeamAvailable) {
    //   if(register.TeamAvailable.error.indexOf('empty') === -1)
    //   wrapperCls = 'success';
    // }
    return (
      <div id="signupbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal domain-form" role="form">
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="inner-title">What address would you like for your {window.config.cc}?</h1>
                <div style={{display: "flex"}} ref="registerTeamWrapper" className={'chat-center-address-input input-group input-group-lg ' + wrapperCls }>
                  <label style={{display: "flex", alignSelf: "center", color:"#9a9da1", fontSize: "18px"}} htmlFor="registerTeam" className=" user-name" id="username-addon"><span className="prefix-text">https:<span className="double-slashes">//</span></span></label>
                  <input style={{width: "100%"}} autoFocus id="registerTeam" type="text" className="form-control" ref="RegisterTeam"
                  value={this.props.register.payload.teamDomain} onChange={this.inputChange.bind(this)} aria-describedby="username-addon" />
                  <span style={{display: "flex", color:"#9a9da1", fontSize: "18px"}}><span style={{alignSelf: "center"}} className="prefix-text">.{window.config.cc}</span></span>

                </div>

                <div ref="registerOwnDomainWrapper" className={'chat-center-address-input input-group input-group-lg ' + wrapperCls } style={{display:'none'}}>

                  <label htmlFor="registerTeamOwnDomain" className="input-group-addon user-name" id="ownDomain"><span className="prefix-text">http:<span className="double-slashes">//</span></span></label>
                  <input id="registerTeamOwnDomain" type="text" className="form-control" ref="RegisterTeamOwnDomain" onChange={this.inputDomainChange.bind(this)} placeholder="your domain address" aria-describedby="ownDomain" style={{width:"100%"}} />

                </div>

                <div className="message-wrapper">
                  {register.payload.teamDomain.length === 0 ? <span style={{padding: "15px"}}></span> : this.isTeamAvailable()}
                  {/* <p className="loading-msg"><img src={loaderDots} title="loading" /></p> */}
                </div>

                <div className="own-domain-wrapper">
                      <a className="own-domain" ref="ownDomainLink" href="javascript:;" title="Use my own domain" onClick={this.handleOwnDomain.bind(this)}>Use my own domain</a>
                      <a className="own-domain" ref="chatCenterDomainLink" href="javascript:;" title={"Use " + window.config.cc } onClick={this.handleChatCenterDomain.bind(this)} style={{display:'none'}}>Use {window.config.cc}</a>
                </div>

                <div className="desc">This is your organization's dedicated name space. You will be able to create external chats for sales, support and alike, and internal chats to talk privately with your team, for example:
                  :<p className="desc-ex">extraordinaryfoods.{window.config.cc}/sales, /support, /internal, etc.</p>
                </div>
                <div className="form-group button-wrapper" style={{display: "flex", justifyContent: "center"}}>
                  <button type="button" className="btn btn-default back" onClick={this.handleBack}>BACK</button>
                  <button style={{width: "100%"}} type="submit" ref="nextButton" className="btn btn-default pull-right" onClick={this.handleNext}>NEXT</button>
                </div>
            </form>
       </div>
    );
  }
}

function mapStateToProps(state) {
  const { register } = state
  return {
    register
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps
)(RegisterOrgDomain)
