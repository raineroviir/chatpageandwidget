import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import classNames from 'classnames'
/* component styles */
import { styles } from './styles.scss';

import Logo from "../../Components/images/logo.svg"
import UserIcon from "../../Components/images/user-icon.svg"
import PasswordIcon from "../../Components/images/password-icon.svg"
import { loginUser, submitLogin } from '../../actions/login'

export class LoginComponent extends Component {

  handleLogin(e){
      e.preventDefault();
      const { dispatch } = this.props
        //service call to register and move to chat message home screen
      let Username = this.refs.Username.value;
      let Password = this.refs.Password.value;

      //store the value in STORE by dispatching event in action
      //currently always adding org
      const addOrg = true
      dispatch(loginUser(Username, Password))
      // dispatch(submitLogin(addOrg))
  }

  inputChange(){
    this.refs.loginBtn.disabled = !(this.refs.Username.value.trim() && this.refs.Password.value)
  }

  componentDidMount() {
    // this.refs.loginBtn.disabled = true;
  }
  determineIfError() {
    if(!this.props.login.user.error) {
      return 'none';
    } else {
      return 'block'
    }
  }
  render() {
    return (
      <div id="loginbox" className="login-wrapper">
            <form id="signupform" className="form-horizontal" role="form">
                <div className="logo-wrapper">
                  <img className="logo" src={Logo} title="Chat Center" />
                </div>
                <h1 className="title text-center">{window.config.cc}</h1>
                <div className="details text-center">Sign in to your account</div>
                <div style={{display: this.determineIfError()}} className={'login-error-message '}>
                  Incorrect Chat Address or Password
                </div>
                <div style={{display: "flex"}} className="input-group input-group-lg">
                  <label style={{display: "flex", "alignItems": "center"}} htmlFor="username" className="input-group-addon user-name" id="username-addon"><img className="prefix" src={UserIcon} /><span className="prefix-text">https:<span className="double-slashes">//</span></span></label>
                  <input style={{width: "100%"}} autoFocus id="username" type="text" className="form-control" ref="Username" placeholder="your chat address" aria-describedby="username-addon" onChange={this.inputChange.bind(this)}/>
                </div>
                <div className="desc">Examples: {window.config.cc}/you; yourteam.{window.config.cc}/you; chat.yourdomain.com/you</div>
                <div style={{display: "flex"}} className="input-group input-group-lg password-field">
                  <label style={{display: "flex", "alignItems": "center"}} htmlFor="password" className="input-group-addon" id="password-addon"><img className="prefix" src={PasswordIcon} /></label>
                  <input style={{width: "100%"}} id="password" type="password" className="form-control" ref="Password" placeholder="Password" aria-describedby="password-addon" onChange={this.inputChange.bind(this)} />
                </div>
                <div className="form-group">
                    <div className="col-sm-12 text-center">
                      <button type="submit" className=
                      {
                        classNames("btn btn-default sign-in", {
                        'btn-loading': this.props.login.loginRequest === 'loading'
                        })
                      }
                      ref="loginBtn"
                      onClick={this.handleLogin.bind(this)}
                      >SIGN IN</button>
                    </div>
                  </div>
                  <div className="support-signin-wrapper">
                    <div className="sign-up">
                      <span className="new-to">New to {window.config.cc}?</span>
                      <Link to="/signup" title="Sign up" className="pull-right">Sign up.</Link>
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
  const { login } = state
  return {
    login
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(LoginComponent)
