import React, { Component, PropTypes } from 'react';
import { common, Link } from './../common';
import * as tabNavActions from '../../../actions/TabNav';
import { MaterialInput } from '../../MaterialInput';
import * as settingsActions from '../../../actions/Settings';
import { FileInput } from '../../FileInput';
import styles from './styles.scss';
import classNames from 'classnames';

export class SettingsOrganization extends Component {
    constructor( props ){
        super( props );
        this.state = {
          deleteMessage: '',
          src: ''
        }
    }

    componentDidMount() {
      if( !$('#calc-input-width').length ) {
        $( 'body' ).append( '<span id="calc-input-width">' );  
      } 
    }

    focusInput( ref ) {
      ref.focus();
    }

    ccAddressInputChanged() {
      let value = this.validateCcChatAddress(this.refs.ccChatAddress.value); 
      let width = $('#calc-input-width').html(this.refs.ccChatAddress.value).width();
      this.refs.ccChatAddress.style.width = width + 3;
      this.props.settingsActions.updateEditSettings( 'ccdomain', value );

      let error = this.errorValidation( 'ccdomain', {
        ccdomain: value
      } );
      
      this.props.settingsActions.setSettingsState({
        personalFormInValid: !!error
      }); 
    }

    validateCcChatAddress( team_desc ){
      var finalStr = team_desc.replace(/[^a-zA-Z-0-9]/gi, '');
      return finalStr.toLowerCase().substring(0,18);
    }
    
    toggleUseDomain( e ) {
      e.preventDefault();
      this.props.settingsActions.toggleUseDomain( !this.props.settings.chat_center_domain );
    }

    changedOrgImage( src, input) {
      this.setState({
        src: src
      });
      this.props.settingsActions.updateEditSettings( 'org_avatar', input.files[0] );
    }

    updateInputKey( key, e ) {
      this.props.settingsActions.updateEditSettings( key, e.target.value );
      let error = this.errorValidation( key, {
        [key]: e.target.value
      } );
      
      this.props.settingsActions.setSettingsState({
        personalFormInValid: !!error
      });  
    
    }

    componentWillMount() {
      this.props.tabNavActions.setTabNavState( false );
    }

    componentWillReceiveProps( obj ) {
       //this.refs.ccChatAddress.value = this.validateCcChatAddress(this.refs.ccChatAddress.value); 
      let width = $('#calc-input-width').html(obj.settings.editSettings.ccdomain).width();
      this.refs.ccChatAddress.style.width = width + 3;
    }

    deleteOrg( e ) {
      e.preventDefault();
      if( confirm( 'do you want to delete organization?' ) ) {
        this.props.settingsActions.deleteOrganization( this.props.settings.editSettings.team_id, ( state, res ) => {
          console.log( 'res', res );
          if( state === 'error' ) {
            this.setState({
              deleteMessage: res.error
            });
          }
        } );
      };
    }

    errorValidation( key, obj ) {
      let editSettings = obj || this.props.settings.editSettings;
      let ret = false;
      if( key === 'organizationName'  ) {
        if(!editSettings[key] ) {
          ret = "Required";
        }
      }
      else if( key === 'ccdomain' &&  this.props.settings.chat_center_domain ) {
        if(!editSettings[key] ) {
          ret = "Required";
        }
      } else if( key === 'ownDomain' &&  !this.props.settings.chat_center_domain ){
        if( !editSettings[key] ) {
          ret = "Required";
        }
      }
      return ret;
    }

    render() {
        let editSettings = this.props.settings.editSettings;
        return (
          <div className="organization-settings">
            <h2 className="primary-label">Organization settings</h2>

            <div className="settings-page-content">
              <div className ={
                classNames("form-input-wrapper", {
                'error-field': this.errorValidation( 'organizationName' )
              })}>
                <div className="org-name-wrapper" >
                  <MaterialInput>
                    <label>Organization Name</label>
                    <input type="text" 
                      className="input-field" 
                      autoFocus 
                      value = { editSettings.organizationName }
                      onChange={ this.updateInputKey.bind( this, 'organizationName' ) } /> 
                  </MaterialInput>
                </div>
                <div className="org-img-wrapper">
                  <FileInput 
                  src={ this.state.src || editSettings.org_avatar}
                  srcUpdated={this.changedOrgImage.bind( this )}/>
                </div>
              </div>
              <div className={ 
                classNames("form-input-wrapper chat-center-domain", {
                  'error-field': this.errorValidation( 'ccdomain' )
                })
              }
              style={{display: !this.props.settings.chat_center_domain ? 'none' : ''}}
              >
                  <MaterialInput>
                    <label className="fixed-top-label">Chat Address</label>
                    <div className="with-addon" onClick={
                      this.focusInput.bind( this, this.refs.ccChatAddress )
                    } >
                      <span className="prefix-text">https:<span className="double-slashes">//</span></span>
                      <input type="text" 
                        className="input-field" 
                        ref = "ccChatAddress" 
                        onChange={this.ccAddressInputChanged.bind( this )}
                        value= { editSettings.ccdomain } 
                        /> 
                      <span className="suffix-text">.{window.config.cc}</span>
                    </div>
                  </MaterialInput>
                  <div className="input-status-text">
                    <a href="#" className="primary-link"  onClick={this.toggleUseDomain.bind( this )}>
                      Use my own domain
                    </a>
                  </div>
              </div>
              <div className={ 
                classNames("form-input-wrapper use-own-domain", {
                  'error-field': this.errorValidation( 'ownDomain' )
                })
              } 
              style={{display: this.props.settings.chat_center_domain ? 'none' : ''}}
              >
                  <MaterialInput>
                    <label className="fixed-top-label">Chat Address</label>
                    <div className="with-addon">
                      <span className="prefix-text">https:<span className="double-slashes">//</span></span>
                      <input type="text" 
                      className="input-field"  
                      value = { editSettings.ownDomain }
                      onChange={ this.updateInputKey.bind( this, 'ownDomain' ) }/> 
                    </div>
                  </MaterialInput>
                  <div className="input-status-text">
                    <a href="#" className="primary-link"  onClick={this.toggleUseDomain.bind( this )}>
                      Use {window.config.cc}
                    </a>
                  </div>
              </div>

              <div className="form-input-wrapper">
                <h2 className="primary-label">Delete organization</h2>
                <div className="delete-org-desc">
                  <p>Deleting an organization cannot be undone. </p>
                  <p> All messages and files will be removed.</p>
                </div>
                {
                  this.state.deleteMessage?
                  <div className="common-error-message">
                    {this.state.deleteMessage}
                  </div>:
                  ''
                }
                <div>
                  <a href="#" onClick={this.deleteOrg.bind( this )}  className="primary-link">Delete an organization</a>
                </div>
              </div>

            </div>

          </div>
        )
    }
}


export default common( {
  component: SettingsOrganization,
  mapStateToProps: ( state ) => {
    return {
      tabnav: state.tabnav,
      settings: state.settings  
    }
  },
  actions : {
    tabNavActions: tabNavActions,
    settingsActions: settingsActions
  }
} );