import React, { Component, PropTypes } from 'react';
import { common, classNames, Link } from './../common';
import * as tabNavActions from '../../../actions/TabNav';
import * as settingsActions from '../../../actions/Settings';
import { MaterialInput } from '../../MaterialInput';
import ChangePassword from './ChangePassword';

import { FileInput } from '../../FileInput';

import styles from './styles.scss';
import { browserHistory } from 'react-router';

export class PersonalSettings extends Component {
   

    constructor( props ){
        super( props );
        this.state = {
          src: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTOLxYk4-Pid7UmTM803YWqHXbrB8_4O0s3hxHMSpoA0LiNUTIrIX2Dkg',
          owndomain: false
          
        }
    }

    
    toggleUseDomain( e ) {
      e.preventDefault();
      this.setState({
        owndomain: !this.state.owndomain
      })
    }

    

    changedProfileImage( src) {
      this.setState({
        src: src
      });
    }

    updateInputKey( key, e ) {
      this.props.settingsActions.updateEditSettings( key, e.target.value );
    }

    componentWillMount() {
      this.props.tabNavActions.setTabNavState( false );
    }

    

    render() {

        let editSettings = this.props.settings.editSettings;
        return (
          <div className="personal-settings">
            <h2 className="primary-label">Personal settings</h2>

            <div className="settings-page-content">
              <div className="form-input-wrapper">
                <div className="first-name-wrapper">
                  <MaterialInput>
                    <div className="with-addon-icon">
                      <label>First Name</label>
                      <span className="prefix-text">
                        <span className="cc-icon-user"></span>
                      </span>
                      <input type="text" 
                      className="input-field" 
                      autoFocus
                      value = { editSettings.first_name }
                      onChange={ this.updateInputKey.bind( this, 'first_name' ) }
                       /> 
                    </div>
                  </MaterialInput>
                </div>
                <div className="profile-img-wrapper">
                  <FileInput 
                  src={this.state.src}
                  srcUpdated={this.changedProfileImage.bind( this )}/>
                </div>
              </div>

              <div className="form-input-wrapper">
                <MaterialInput>
                  <div className="with-addon-icon">
                    <label>Last Name</label>
                    <span className="prefix-text">
                      <span className="cc-icon-user"></span>
                    </span>
                    <input type="text" 
                    className="input-field"  
                    value = { editSettings.last_name }
                    onChange={ this.updateInputKey.bind( this, 'last_name' ) }/> 
                  </div>
                </MaterialInput>
              </div>


              <div className="form-input-wrapper">
                <MaterialInput>
                  <div className="with-addon-icon">
                    <label>Email</label>
                    <span className="prefix-text">
                      <span className="cc-icon-icon-mail"></span>
                    </span>
                    <input type="text" 
                    className="input-field"  
                    value = { editSettings.email }
                    onChange={ this.updateInputKey.bind( this, 'email' ) } /> 
                  </div>
                </MaterialInput>
              </div>

              <ChangePassword changePassword={this.props.settingsActions.changePassword}/>
              
              
              <div className="personal-chat-address">
                <h2 className="primary-label">Personal Chat Address</h2>
                <div className="form-input-wrapper use-cc-domain" style={{display: this.state.owndomain ? 'none' : ''}}>
                  <span className="use-cc-address-label">https://{window.config.cc}</span>
                  <MaterialInput>
                    <span className="prefix-text">/</span>
                    <input 
                    className="input-field"  
                    value = { editSettings.personal_chat_address }
                    onChange={ this.updateInputKey.bind( this, 'personal_chat_address' ) } /> 
                  </MaterialInput>
                  <div className="input-status-text">
                    <a href="#" className="primary-link"  onClick={this.toggleUseDomain.bind( this )}>
                      Use my own domain
                    </a>
                  </div>
                </div>
                <div className="form-input-wrapper use-own-domain" style={{display: !this.state.owndomain ? 'none' : ''}}>
                    <MaterialInput>
                      <div className="with-addon">
                        <span className="prefix-text">https:<span className="double-slashes">//</span></span>
                        <input type="text" 
                        className="input-field"  
                        value = { editSettings.personal_chat_address }
                        onChange={ this.updateInputKey.bind( this, 'personal_chat_address' ) } /> 
                      </div>
                    </MaterialInput>
                    <div className="input-status-text">
                      <a href="#" className="primary-link"  onClick={this.toggleUseDomain.bind( this )}>
                        Use {window.config.cc}
                      </a>
                    </div>
                </div>

              </div>


            </div>

          </div>
        )
    }
}


export default common( {
  component: PersonalSettings,
  mapStateToProps: ( state ) => {
    return {
      tabnav: state.tabnav  ,
      settings: state.settings
    }
  },
  actions : {
    tabNavActions: tabNavActions,
    settingsActions: settingsActions
  }
} );