import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';

/* component styles */
import { styles } from '../styles.scss';

export class RegisterIndividual extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.first_name=this.props.registrationDetails.Organisation.payload.first_name;
    this.state.last_name=this.props.registrationDetails.Organisation.payload.last_name;
    this.state.email=this.props.registrationDetails.Organisation.payload.email;
    this.state.password=this.props.registrationDetails.Organisation.payload.password;
  }

  handleBack(){
    //console.log('Moving 1 step back');
    window.location.hash = "#/signup/";
  }

  handleNext(e){
    e.preventDefault();
    let FirstName = this.refs.FirstName.value;
    let LastName = this.refs.LastName.value;
    let Email = this.refs.Email.value;
    let Password = this.refs.Password.value;

    //store the value in STORE by dispatching event in action
    this.props.actions.registerIndividualDetails(FirstName,LastName,Email,Password);
    
    window.location.hash = "#/signup/individual/domain";
  }
  inputChange(){
    this.refs.nextBtn.disabled = !(this.refs.FirstName.value && this.refs.LastName.value && this.refs.Password.value && this.refs.Password.value.length>=8 && this.validateEmail(this.refs.Email.value))
  }

  validateEmail(email){
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  componentDidMount() {
    if(!(this.state.first_name && this.state.last_name && this.state.password && this.state.password.length>=8 && this.validateEmail(this.state.email))){
      this.refs.nextBtn.disabled = true;
    }
    this.refs.FirstName.value = this.state.first_name;
    this.refs.LastName.value = this.state.last_name;
    this.refs.Email.value = this.state.email;
    this.refs.Password.value = this.state.password;
  }

  render() {
    return (
      <div id="signupbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal" role="form">
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="inner-title">Your personal details</h1>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon first-name" id="first-name-addon"><img src="dist/images/user-icon.svg" /></span>
                  <input type="text" className="form-control" ref="FirstName" placeholder="First name" aria-describedby="first-name-addon" onChange={this.inputChange.bind(this)} />
                </div>
                 <div className="input-group input-group-lg">
                  <span className="input-group-addon last-name" id="last-name-addon"><img src="dist/images/user-icon.svg" /></span>
                  <input type="text" className="form-control" ref="LastName" placeholder="Last name" aria-describedby="last-name-addon" onChange={this.inputChange.bind(this)} />
                </div>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon email" id="email-addon"><img src="dist/images/iconMail.svg" /></span>
                  <input type="email" className="form-control" ref="Email" placeholder="Email" aria-describedby="email-addon" onChange={this.inputChange.bind(this)} />
                </div>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon" id="password-addon"><img className="prefix" src="dist/images/password-icon.svg" /></span>
                  <input type="password" className="form-control" ref="Password" placeholder="Password" aria-describedby="password-addon" onChange={this.inputChange.bind(this)} />
                </div>
                <div className="form-group button-wrapper">
                    <div className="col-sm-12">
                      <div className="row">
                        <button type="button" className="btn btn-default back" onClick={this.handleBack}>BACK</button>
                        <button type="submit" className="btn btn-default sign-in pull-right" ref="nextBtn" onClick={this.handleNext.bind(this)}>NEXT</button>
                      </div>
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