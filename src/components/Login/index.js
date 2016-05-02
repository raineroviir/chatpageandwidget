import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as LoginActions from '../../actions/Login';

/* component styles */
import { styles } from './styles.scss';

export class LoginComponent extends Component {

  handleLogin(e){
      e.preventDefault();
        //service call to register and move to chat message home screen
      let Username = this.refs.Username.value;
      let Password = this.refs.Password.value;

      //store the value in STORE by dispatching event in action
      this.props.actions.loginUser(Username, Password);
      this.props.actions.submitLogin();

      
  }
  inputChange(){
    this.refs.loginBtn.disabled = !(this.refs.Username.value && this.refs.Password.value)
  }
  componentDidMount() {
    this.refs.loginBtn.disabled = true; 
  }

  render() {
    
    var successfulRegistration = '';
    var errorCls = '';
    if(!this.props.loginDetails.User.error) {
      errorCls = 'hide';
    }
    if(this.props.registrationDetails.Organisation.successfulRegistration){
        successfulRegistration = <span style={{color:'green'}}>Your have successfully registered, please login to access your account</span>
    }

    return (
      <div id="loginbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 logo-centered">
            <form id="signupform" className="form-horizontal" role="form">
                <div className="logo-wrapper">
                  <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                </div>
                <h1 className="title text-center">chat.center</h1>
                <div className="details text-center">Sign in to your account</div>
                <div className="text-center" style={{marginTop:'20px'}}>
                  {successfulRegistration}
                </div>
                <div className={'login-error-message ' + errorCls}>
                  Incorrect Chat Address or Password
                </div>
                <div className="input-group input-group-lg">
                  <label htmlFor="username" className="input-group-addon user-name" id="username-addon"><img className="prefix" src="dist/images/user-icon.svg" /><span className="prefix-text">https:<span className="double-slashes">//</span></span></label>
                  <input id="username" type="text" className="form-control" ref="Username" placeholder="your chat address" aria-describedby="username-addon" onChange={this.inputChange.bind(this)}/>
                </div>
                <div className="desc">Examples: chat.center/you; yourteam.chat.center/you; chat.yourdomain.com/you</div>
                <div className="input-group input-group-lg password-field">
                  <label htmlFor="password" className="input-group-addon" id="password-addon"><img className="prefix" src="dist/images/password-icon.svg" /></label>
                  <input id="password" type="password" className="form-control" ref="Password" placeholder="Password" aria-describedby="password-addon" onChange={this.inputChange.bind(this)} />
                </div>
                
                
                <div className="form-group">
                    <div className="col-sm-12 text-center">
                      <button type="submit" className="btn btn-default sign-in" ref="loginBtn" onClick={this.handleLogin.bind(this)}>SIGN IN</button>
                    </div>
                  </div>
                  <div className="support-signin-wrapper">
                    <div className="sign-up">
                      <span>New to chat.center?</span>
                      <a href="#/signup" title="Sign up" className="pull-right">Sign up.</a>
                    </div>
                    <div className="forgot-password">
                      <a className="quick-link" href="javascript:;" title="Forgot password">Forgot password?</a>
                    </div>
                  </div>
            </form>
       </div> 

    );
  }
}

function mapStateToProps(state) {
  return {
    loginDetails: state.loginDetails,
    registrationDetails: state.registrationDetails
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LoginActions, dispatch)
  }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(LoginComponent)