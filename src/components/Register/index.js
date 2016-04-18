import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as CCActions from '../../actions';

/* component styles */
import { styles } from './styles.scss';

export class Register extends Component {

  handleSubmit() {
    console.log(this.props);
    this.props.actions.submitRegistration();
    //CCActions.submitRegistration();
  }

  render() {
    return (
      <div id="signupbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal" role="form">
                <div className="user-status"><span className="offline"></span><span className="inactive"></span><span className="online"></span></div>
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="title">Add an account</h1>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon user-name" id="username-addon"><img src="dist/images/user-icon.svg" /></span>
                  <input type="text" className="form-control" placeholder="Your team name" aria-describedby="username-addon" />
                  <span className="input-group-addon suffix">.chat.center</span>
                </div>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon email" id="email-addon"><img src="dist/images/user-icon.svg" /></span>
                  <input type="email" className="form-control" placeholder="Email" aria-describedby="email-addon" />
                </div>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon" id="password-addon"><img src="dist/images/password-icon.svg" /></span>
                  <input type="text" className="form-control" placeholder="Password" aria-describedby="password-addon" />
                </div>
                <div className="form-group">
                    <div className="col-sm-12 text-center">
                      <button type="submit" className="btn btn-default sign-up" disabled="disabled">CREATE NEW CHAT.CENTER</button>
                      <a className="quick-link" href="javascript:;" title="Personal account">I want to create a personal account
</a>
                    </div>
                    <div className="col-sm-12 connector">
                      <span>OR</span>
                    </div>
                    <div className="col-sm-12 text-center">
                      <button type="button" className="btn btn-default sign-in" onClick={this.handleSubmit.bind(this)}>SIGN IN</button>
                    </div>
                  </div>
            </form>
       </div> 
    );
  }
}
