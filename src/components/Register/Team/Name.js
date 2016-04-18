import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';

export class RegisterTeamName extends Component {

  // constructor(props) {
  //   super(props);
  // }

  handleBack(){
    console.log('Moving 1 step back'); 
    window.location.hash = "#/register/start";
  }

  handleNext(){
    //const { dispatch, selectedReddit } = this.props
    let RegisterOrganisationName = this.refs.RegisterOrganisationName.value;

    if(RegisterOrganisationName === ''){
      alert('please enter Organisation Name');
      return;
    } 

    //store the value in STORE by dispatching event in action
    this.props.actions.registerOrganisationName(RegisterOrganisationName);

    //navigate to next screen
    window.location.hash = "#/register/team/domain";

  }

  render() {
    return (
      <div id="signupbox"  className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal" role="form">
                <div className="user-status"><span className="offline"></span><span className="inactive"></span><span className="online"></span></div>
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="title">Name your chat.center</h1>
                <div className="desc">Examples: chat.center/you; yourteam.chat.center/you; chat.yourdomain.com/you</div>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon user-name" id="username-addon"><img src="dist/images/user-icon.svg" /></span>
                  <input type="text" className="form-control" ref="RegisterOrganisationName" placeholder="Organisation, Team, Department Name" aria-describedby="username-addon" />
                </div>    
                <div className="form-group button-wrapper">
                  <div className="col-sm-12">
                    <button type="button" className="btn btn-default back" onClick={this.handleBack}>BACK</button>
                    <button type="button" className="btn btn-default sign-in pull-right" onClick={this.handleNext.bind(this)}>NEXT</button>
                  </div>
                </div>            
            </form>
       </div> 
    );
  }
}

RegisterTeamName.propTypes = {
  // todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
  //dispatch: PropTypes.func.isRequired
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
  mapStateToProps,
  mapDispatchToProps
)(RegisterTeamName)
