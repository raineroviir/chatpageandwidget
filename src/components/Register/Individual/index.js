import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';

/* component styles */
import { styles } from '../styles.scss';

export class RegisterIndividual extends Component {

  handleBack(){
    //console.log('Moving 1 step back');
    window.location.hash = "#/signup/";
  }

  handleNext(){
    let FirstName = this.refs.FirstName.value;
    let LastName = this.refs.LastName.value;
    let Email = this.refs.Email.value;
    let Password = this.refs.Password.value;

    //store the value in STORE by dispatching event in action
    this.props.actions.registerIndividualDetails(FirstName,LastName,Email,Password);
    
    window.location.hash = "#/signup/individual/domain";
  }
  inputChange(){
    this.refs.nextBtn.disabled = !(this.refs.FirstName.value && this.refs.LastName.value && this.refs.Email.value && this.refs.Password.value)
  }
  componentDidMount() {
    this.refs.nextBtn.disabled = true;
  }

  render() {
    return (
      <div id="signupbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal" role="form">
                <div className="user-status"><span className="offline"></span><span className="inactive"></span><span className="online"></span></div>
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="title">Your personal details</h1>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon first-name" id="first-name-addon"><img src="dist/images/user-icon.svg" /></span>
                  <input type="text" className="form-control" ref="FirstName" placeholder="First name" aria-describedby="first-name-addon" onChange={this.inputChange.bind(this)} />
                </div>
                 <div className="input-group input-group-lg">
                  <span className="input-group-addon last-name" id="last-name-addon"><img src="dist/images/user-icon.svg" /></span>
                  <input type="text" className="form-control" ref="LastName" placeholder="Last name" aria-describedby="last-name-addon" onChange={this.inputChange.bind(this)} />
                </div>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon email" id="email-addon"><img src="dist/images/user-icon.svg" /></span>
                  <input type="email" className="form-control" ref="Email" placeholder="Email" aria-describedby="email-addon" onChange={this.inputChange.bind(this)} />
                </div>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon" id="password-addon"><img src="dist/images/password-icon.svg" /></span>
                  <input type="password" className="form-control" ref="Password" placeholder="Password" aria-describedby="password-addon" onChange={this.inputChange.bind(this)} />
                </div>
                <div className="form-group button-wrapper">
                    <div className="col-sm-12">
                      <button type="button" className="btn btn-default back" onClick={this.handleBack}>BACK</button>
                      <button type="button" className="btn btn-default sign-in" ref="nextBtn" onClick={this.handleNext.bind(this)}>NEXT</button>
                    </div>
                </div> 
            </form>
       </div> 
    );
  }
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
)(RegisterIndividual)