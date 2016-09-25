import React, { Component } from 'react';
import { Link } from 'react-router';
import  classNames from 'classnames';


export class SettingsHeader extends Component {
  
  constructor( props ){
    super( props );
    this.state = {
      errorMessage: ''
    }
  }

  saveSettings( e ) {
    e.preventDefault();
    this.setState({
      errorMessage: ''
    });
    this.props.saveSettings( this.props.settings.editSettings, this.props.settings.chat_center_domain, ( status, res ) => {
      if( status === 'error' ) {
        this.setState({
          errorMessage: res.error
        });

      } else {
        alert( 'updated successfully' );
      }
    } );
  }

  render() {
    let unsavedCount = 0;
    let editSettings = this.props.settings.editSettings;    
    let userinfo = this.props.userinfo;

    if( this.props.settings.initialized ) {
      if( editSettings.first_name != userinfo.first_name ) {
        unsavedCount++;
      }
      if( editSettings.last_name != userinfo.last_name ) {
        unsavedCount++;
      }
      if( editSettings.email != userinfo.email ) {
        unsavedCount++;
      }
      if( editSettings.personal_chat_address != userinfo.username ) {
        unsavedCount++;
      }
      if( userinfo.team  ) {
        if( editSettings.organizationName !=  ( userinfo.team.full_name || userinfo.team.description ) ) {
          unsavedCount++;
        }
        if( this.props.settings.chat_center_domain ) {
          if(  editSettings.ccdomain + '.' + window.config.cc != userinfo.team.name

           ) {
            unsavedCount++;
          }
        } else {
          if( editSettings.ownDomain != userinfo.team.name ) {
            unsavedCount++;
          }  
        }
        
      } 
      
    }


    return (
      <div>
        <div className="save-changes-wrapper">
          {
            unsavedCount > 0 ?
            <span className="status-text"> { unsavedCount } unsaved changes</span>
            :
            ''  
          }
          <button disabled = {
            unsavedCount === 0 || this.props.settings.initialized === false
          } className="cc-btn"
          onClick = {
            this.saveSettings.bind(this)
          } 
          refs = {(saveButton)=> 
            this.saveButton = saveButton
          }> SAVE CHANGES </button>
        </div>
        
        <div className={
          classNames("common-error-message", { 
            hide: !this.state.errorMessage
          }) 
        }>
          { this.state.errorMessage }
        </div>

        
        
        <h1 className="primary-title">
          Settings
        </h1>
      </div>
    );
  }
}
