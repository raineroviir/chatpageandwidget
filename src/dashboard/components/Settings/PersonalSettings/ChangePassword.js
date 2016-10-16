import React, { Component, PropTypes } from 'react';
import { common, classNames, Link } from './../common';
import { MaterialInput } from '../../MaterialInput';
const initialState = {
  password_confirmation: '',
  password: '',
  current_password: '',
  pwdErrorMsg: ''
}
export default class ChangePassword extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      showPwdForm: false,
      formValid: false,
      ...initialState
    }
  }

  updateInput( key, e ) {
    let obj = {
      password: this.state.password,
      current_password: this.state.current_password,
      password_confirmation: this.state.password_confirmation
    };

    this.setState({
      [key]: e.target.value
    });
    obj[ key ] = e.target.value;

    this.validateForm( obj );
  }

  validateForm( obj ) {
    if( obj.password.length >= 8 && obj.current_password.length ) {
      if( obj.password  === obj.password_confirmation ) {
        this.setState({
          formValid: true
        });
        return;
      }
    }

    this.setState({
      formValid: false
    });
    return;
  }
  
  togglePwdForm( e ) {
    e&&e.preventDefault();
    this.setState({
      showPwdForm: !this.state.showPwdForm
    });
    if( !this.state.showPwdForm ) {
      this.setState({
        ...initialState
      });
    }
  }

  changePwd( e ) {
    e.preventDefault();
    this.setState({
        pwdErrorMsg: ''
    });

    this.props.changePassword({
      password_confirmation: this.state.password_confirmation,
      password: this.state.password,
      current_password: this.state.current_password
    }, ( status, res ) => {

      if( status === 'error' ) {
        this.setState({
          pwdErrorMsg: res.error
        })
      } else {
        this.togglePwdForm();
        alert( 'password updated' );  
      }
      
    } );
  }

  render() {
    return (
      <div className="change-password-section">
          <div className="change-password-btn-section" style={{display: this.state.showPwdForm ? 'none' : ''}}>
            <h2 className="primary-label">password</h2>
            <div className="btn-wrapper">
              <a href="#" className="cc-btn" onClick={this.togglePwdForm.bind(this)}>CHANGE PASSWORD</a>
            </div>
          </div>
          <div className="change-password-form" style={{display: !this.state.showPwdForm ? 'none' : ''}}>
            <h2 className="primary-label">Change password</h2>
            <div className="form-input-wrapper">
              <MaterialInput>
                <label>Current password</label>
                <input type="password" 
                autoFocus
                className="input-field" 
                value={this.state.current_password} 
                onChange={this.updateInput.bind(this,'current_password')}/> 
            
              </MaterialInput>
            </div>


            <div className="form-input-wrapper">
              <MaterialInput>
                <label>New password</label>
                <input type="password"
                className="input-field" 
                value={this.state.password}
                onChange={this.updateInput.bind(this,'password')}/> 
              </MaterialInput>
            </div>

            <div className="form-input-wrapper">
              <MaterialInput>
                <label>Repeat new password</label>
                <input type="password"
                className="input-field" 
                value={this.state.password_confirmation} 
                onChange={this.updateInput.bind(this,'password_confirmation')}/> 
              </MaterialInput>
            </div>
            {
              this.state.pwdErrorMsg?
              <div className="common-error-message">
                {this.state.pwdErrorMsg}
              </div>:
              ''
            }
            <div className="btns-wrapper">
              <a className="cc-btn" 
                href="#" 
                disabled = {
                  !this.state.formValid
                }
                onClick={this.changePwd.bind(this)}>
                SAVE
              </a>
              <a href="#" className="primary-link" onClick={this.togglePwdForm.bind(this)}>
                CANCEL
              </a>
            </div>
          </div>
        </div>

    )
  }
}
