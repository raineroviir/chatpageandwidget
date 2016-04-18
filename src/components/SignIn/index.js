import React, { Component } from 'react';
import { Link } from 'react-router';

/* component styles */
import { styles } from './styles.scss';

export class SignIn extends Component {
  render() {
    return (
      <div id="loginbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal" role="form">
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="title">Welcome to chat.center</h1>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon user-name" id="username-addon"><img src="dist/images/user-icon.svg" /></span>
                  <input type="text" className="form-control" placeholder="http://your.chat.center" aria-describedby="username-addon" />
                  
                </div>
                <div className="desc">Examples: chat.center/you; yourteam.chat.center/you; chat.yourdomain.com/you</div>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon" id="password-addon"><img src="dist/images/password-icon.svg" /></span>
                  <input type="text" className="form-control" placeholder="Password" aria-describedby="password-addon" />
                </div>
                <div className="form-group">
                    <div className="col-sm-12 text-center">
                      <button type="submit" className="btn btn-default sign-in" disabled="disabled">SIGN IN</button>
                      <a className="quick-link" href="#/forgot-password" title="Forgot password">Forgot Password</a>
                    </div>
                    <div className="col-sm-12 connector">
                      <span>OR</span>
                    </div>
                    <div className="col-sm-12 text-center">
                      <a href="#/register/start" className="btn btn-default sign-up" title="CREATE NEW CHAT.CENTER">CREATE NEW CHAT.CENTER</a>
                    </div>
                  </div>
            </form>
       </div> 
    );
  }
}
