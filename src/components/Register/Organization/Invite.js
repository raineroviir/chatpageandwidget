import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';
import { browserHistory } from 'react-router';

export class RegisterIndividualDomain extends Component {

  handleBack(){
    //console.log(this.props.registrationDetails);
    if (typeof(Storage) !== "undefined") {
      //window.location.hash = "#/" ;
      browserHistory.push("/" + localStorage.getItem("user_channel"));
      localStorage.setItem("user_channel", "");
    }
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
            <form id="signupform" className="form-horizontal" role="form">
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="inner-title">Invite your team</h1>
                <div className="chat-address">Email addresses</div>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon email" id="email-addon"><img src="dist/images/user-icon.svg" /></span>
                  <input type="email" className="form-control" placeholder="email@domain.com" aria-describedby="email-addon" />
                </div>
                <div className="form-group button-wrapper">
                    <div className="col-sm-12">
                      <div className="row">
                    <button type="button" className="btn btn-default back" onClick={this.handleBack}>SKIP</button>
                    <button type="button" className="btn btn-default sign-in pull-right" onClick={this.handleNext.bind(this)}>SEND INVITES</button>
                  </div>
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
