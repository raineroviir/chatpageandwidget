import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';
import { browserHistory } from 'react-router';

export class RegisterIndividualDomain extends Component {

  handleBack(){
    //console.log('Moving 1 step back');
    //window.location.hash = "#/login";
    browserHistory.push("/login");
  }

  handleNext(e){
    e.preventDefault();
        //service call to register and move to chat message home screen
    let RegisterPassword = this.refs.RegisterPassword.value;

    if(RegisterPassword === ''){
      alert('please enter password');
      return;
    } 

    //store the value in STORE by dispatching event in action
    this.props.actions.registerPassword(RegisterPassword);
    this.props.actions.submitRegistration();
    //window.location.hash = "#";
  }

  render() {
    //const { actions } = this.props
    return (
      <div id="signupbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal org-join-form" role="form">
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="title">Join Extraordinary Foods {window.config.cc} </h1>
                <div className="chat-address">Pick your personal chat address</div>
                <div className="chat-address">https://extraordinaryfoods.{window.config.cc}</div>
                
                <div className="input-group input-group-lg">

                  <span className="input-group-addon user-name" id="username-addon"><span className="prefix-text slash">/</span></span>
                  <input type="text" className="form-control" ref="RegisterTeam" placeholder="address" aria-describedby="username-addon" />
                  
                </div> 
                <div className="desc">All lowercase.</div>
                <div className="desc">Anyone from your team and from the outside world will be able to use it to start a chat with you by using your chat address. Your team members can refer to you by using <a href="javascript:;">@username</a></div>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon" id="password-addon"><img className="prefix" src="dist/images/password-icon.svg" /></span>
                  <input type="text" className="form-control" placeholder="Set password" aria-describedby="password-addon" />
                </div>
                <div className="form-group text-center">
                  <div className="col-sm-12">
                    <button type="submit" className="btn btn-default sign-in" onClick={this.handleNext.bind(this)}>JOIN</button>
                  </div>
                </div>
            </form>
       </div> 
    );
  }
}

RegisterIndividualDomain.propTypes = {
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
)(RegisterIndividualDomain)
