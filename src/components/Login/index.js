import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as LoginActions from '../../actions/Login';

/* component styles */
import { styles } from './styles.scss';



export class LoginComponent extends Component {

  handleLogin(){
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

    return (
      <div id="loginbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal" role="form">
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="title">Welcome to chat.center</h1>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon user-name" id="username-addon"><img src="dist/images/user-icon.svg" /></span>
                  <input type="text" className="form-control" ref="Username" placeholder="chat.center/username" aria-describedby="username-addon" onChange={this.inputChange.bind(this)}/>
                </div>
                <div className="desc">Examples: chat.center/you; yourteam.chat.center/you; chat.yourdomain.com/you</div>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon" id="password-addon"><img src="dist/images/password-icon.svg" /></span>
                  <input type="password" className="form-control" ref="Password" placeholder="Password" aria-describedby="password-addon" onChange={this.inputChange.bind(this)} />
                </div>
                <div className="error-message">
                {this.props.loginDetails.User.error}
                </div>
                <div className="form-group">
                    <div className="col-sm-12 text-center">
                      <button type="button" className="btn btn-default sign-in" ref="loginBtn" onClick={this.handleLogin.bind(this)}>SIGN IN</button>
                      <a className="quick-link" href="javascript:;" title="Forgot password">Forgot Password</a>
                    </div>
                    <div className="col-sm-12 connector">
                      <span>OR</span>
                    </div>
                    <div className="col-sm-12 text-center">
                      <a href="#/signup/" className="btn btn-default sign-up" title="CREATE NEW CHAT.CENTER">CREATE NEW CHAT.CENTER</a>
                    </div>
                  </div>
            </form>
       </div> 

    );
  }
}

function mapStateToProps(state) {
  return {
    loginDetails: state.loginDetails
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