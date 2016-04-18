import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';

export class RegisterTeamDomain extends Component {

  handleBack(){
    //console.log('Moving 1 step back');
    window.location.hash = "#/register/team/name";
  }

  handleNext(){
    let RegisterTeam = this.refs.RegisterTeam.value;

    if(RegisterTeam === ''){
      alert('please enter team name');
      return;
    } 

    //store the value in STORE by dispatching event in action
    this.props.actions.registerTeam(RegisterTeam);
    
    window.location.hash = "#/register/team/personal/detail";
  }

  render() {
    //const { actions } = this.props
    return (
      <div id="signupbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal" role="form">
                <div className="user-status"><span className="offline"></span><span className="inactive"></span><span className="online"></span></div>
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="title">What address would you like for your chat.center?</h1>
                
                <div className="input-group input-group-lg">

                  <span className="input-group-addon user-name" id="username-addon"><img src="dist/images/user-icon.svg" />https://</span>
                  <input type="text" className="form-control" ref="RegisterTeam" placeholder="address" aria-describedby="username-addon" />
                  <span className="input-group-addon suffix">.chat.center</span>
                  
                </div> 
                <div className="col-sm-12 text-center">
                      <a className="quick-link" href="javascript:;" title="Use my own domain">Use my own domain</a>
                </div>  
                <div className="desc">This is your organization's dedicated name space. You will be able to create external chats for sales, support and alike, and internal chats to talk privately with your team, for example:  extraordinaryfoods.chat.center/sales, /support, /internal, etc.</div> 
                <div className="form-group  button-wrapper">
                  <div className="col-sm-12">
                    <button type="button" className="btn btn-default back" onClick={this.handleBack}>BACK</button>
                    <button type="button" className="btn btn-default sign-in" onClick={this.handleNext.bind(this)}>NEXT</button>
                  </div>
                </div>
            </form>
       </div> 
    );
  }
}

RegisterTeamDomain.propTypes = {
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
)(RegisterTeamDomain)
