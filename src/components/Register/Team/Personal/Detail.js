import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../../actions/Registration';
 
export class RegisterTeamPersonalDetail extends Component {

  handleBack(){
    //console.log('Moving 1 step back');
    window.location.hash = "#/register/team/domain";
  }

  handleNext(){
    let FirstName = this.refs.FirstName.value;
    let LastName = this.refs.LastName.value;
    let Email = this.refs.Email.value;

    // if(RegisterTeam === ''){
    //   alert('please enter team name');
    //   return;
    // } 

    //store the value in STORE by dispatching event in action
    this.props.actions.registerPersonalDetails(FirstName,LastName,Email);
    //console.log('Moving 1 step back');
    window.location.hash = "#/register/team/personal/address";
  }

  render() {
    //const { actions } = this.props
    return (
      <div id="signupbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal" role="form">
                <div className="user-status"><span className="offline"></span><span className="inactive"></span><span className="online"></span></div>
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="title">Your Personal Details</h1>                
                <div className="input-group input-group-lg">
                  <span className="input-group-addon user-name" id="username-addon"><img src="dist/images/user-icon.svg" /></span>
                  <input type="text" className="form-control" ref="FirstName" placeholder="First Name" aria-describedby="username-addon" />
                </div>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon user-name" id="username-addon"><img src="dist/images/user-icon.svg" /></span>
                  <input type="text" className="form-control" ref="LastName" placeholder="Last Name" aria-describedby="username-addon" />
                </div>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon email" id="email-addon"><img src="dist/images/user-icon.svg" /></span>
                  <input type="email" className="form-control" ref="Email" placeholder="Email" aria-describedby="email-addon" />
                </div>
                <div className="form-group button-wrapper">
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

RegisterTeamPersonalDetail.propTypes = {
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
)(RegisterTeamPersonalDetail)