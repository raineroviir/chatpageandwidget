import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';

export class RegisterTeamVerify extends Component {

  handleBack(){
    window.location.hash = "#/register/team/personal/address";
  }

  handleNext(){
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
                <div className="user-status"><span className="offline"></span><span className="inactive"></span><span className="online"></span></div>
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="title">Verify your details</h1>                
                <div className="input-group input-group-lg">
                  <label className="qn-label">Name of your chat.center</label>
                  <span className="ans-label">https://orgtst.chat.center</span>
                </div>
                <div className="input-group input-group-lg">
                  <label className="qn-label">Address of your chat.center</label>
                  <span className="ans-label">https://orgtst.chat.center</span>
                </div>
                <div className="input-group input-group-lg">
                  <label className="qn-label">Full Name</label>
                  <span className="ans-label">https://orgtst.chat.center</span>
                </div>
                <div className="input-group input-group-lg">
                  <label className="qn-label">Email</label>
                  <span className="ans-label">https://orgtst.chat.center</span>
                </div>
                <div className="input-group input-group-lg">
                  <label className="qn-label">Your personal chat address</label>
                  <span className="ans-label">https://orgtst.chat.center</span>
                </div>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon" id="password-addon"><img src="dist/images/password-icon.svg" /></span>
                  <input type="password" ref="RegisterPassword" className="form-control" placeholder="Set password" aria-describedby="password-addon" />
                </div>
                <div className="form-group button-wrapper">
                  <div className="col-sm-12">
                    <button type="button" className="btn btn-default back" onClick={this.handleBack}>BACK</button>
                    <button type="button" className="btn btn-default sign-up-inline" onClick={this.handleNext.bind(this)}>Create Chat Center</button>
                  </div>
                </div>            
            </form>
       </div> 
    );
  }
}

RegisterTeamVerify.propTypes = {
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
)(RegisterTeamVerify)
