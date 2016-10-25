import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {registerChannel} from '../../../actions/register'

class RegisterOrgChannel extends Component {

  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this)
    this.handleNext = this.handleNext.bind(this)
  }
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  handleNext(e){
    e.preventDefault();
    const { dispatch } = this.props
    let RegisterChannel = this.refs.RegisterChannel.value;
    dispatch(registerChannel(RegisterChannel))
    this.context.router.push("orgverify")
  }
  handleBack() {
    this.context.router.goBack()
  }
  inputChange(){
    this.refs.RegisterChannel.value = ('' + this.refs.RegisterChannel.value.replace(/[^a-zA-Z0-9\-\_]/gi, '')) ? ('' + this.refs.RegisterChannel.value.replace(/[^a-zA-Z0-9\-\_]/gi, '').toLowerCase()) : '' ;
  }
  componentDidMount() {
    const { register } = this.props
    // if(this.state.channel === ''){
    //   this.refs.RegisterChannel.value = ('' + this.props.registrationDetails.Organisation.payload.first_name.replace(/[^a-zA-Z0-9-._]/gi, '')) ? ('' + this.props.registrationDetails.Organisation.payload.first_name.replace(/[^a-zA-Z0-9-._]/gi, '').toLowerCase()) : '';
    // }
    // else{
    //   this.refs.RegisterChannel.value = this.state.channel;
    // }
    //
    // if(this.refs.RegisterChannel.value  === ''){
    //   this.refs.nextButton.disabled = true;
    // }else{
    //   this.refs.nextButton.disabled = false;
    // }
    if (register.payload.channel) {
      this.refs.RegisterChannel.value = register.payload.channel
    }
  }

  render() {
    console.log("RENDERING ADDRESS")
    //redirect to first page if refreshed
    // if(this.props.registrationDetails.Organisation.payload.team_description === ''){
    //   //window.location.hash = "#/signup/organization/name";
    // }
    // const Organisation = this.props.registrationDetails.Organisation;
    const { register } = this.props
    return (
      <div id="signupbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        <form id="signupform" className="form-horizontal org-address-form" role="form">
          <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
          <h1 className="inner-title">Pick your personal chat address</h1>
          <div className="chat-address">{`https://${register.address}.${window.config.cc}`}</div>
          <div className="input-group input-group-lg">
            <label htmlFor="registerChannel" className="input-group-addon user-name" id="username-addon"><span className="prefix-text slash">/</span></label>
            <input autoFocus id="registerChannel" type="text" className="form-control channel-field" ref="RegisterChannel" placeholder="Your name or nickname" aria-describedby="username-addon" onChange={this.inputChange.bind(this)} />
          </div>
          <div className="desc">
            <ul><li>&ndash; Use this chat address to log in.</li>
                <li>&ndash; Anyone from your team and from the outside world will be able to use it to start a chat with you by typing your chat address in any browser on any device.</li>
                <li>&ndash; Your team members can refer to you by using <a href="javascript">@username</a></li>
              </ul>
            </div>
          <div className="form-group button-wrapper" style={{display: "flex", justifyContent: "center"}}>
            <button type="button" className="btn btn-default back" onClick={this.handleBack}>BACK</button>
            <button type="submit" ref="nextButton" className="btn btn-default sign-in pull-right" onClick={this.handleNext}>NEXT</button>
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
)(RegisterOrgChannel)
