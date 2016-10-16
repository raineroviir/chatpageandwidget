import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { render } from 'react-dom';
import DocumentMeta from 'react-document-meta';
import Navigation from 'containers/Home/Navigation';
import TabNav from '../../components/TabNav';
import * as tabNavActions from '../../actions/TabNav';
import * as settingsActions from '../../actions/Settings';
import { Link } from 'react-router';

import classNames from 'classnames';
import {styles} from './styles.scss';


import { SettingsHeader } from './settings-header';



const metaData = {
  title: 'Settings | Chat Center',
  description: 'Settings Chat Center',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'chat,center',
    },
  },
};

let tabLinks = [
  {
    toLink: '/settings/personal',
    label: 'Personal settings'
  },
  {
    toLink: '/settings/billing-payment',
    label: 'Billing & Payment'
  }
];

let orgLink = {
  toLink: '/settings/organization',
  label: 'Organization'
};

export class Settings extends Component {
  

  constructor( props ){
    super( props );
  }
  
  componentWillMount() {
    //this.props.settingsActions.initializeSettings( this.props.userinfo );
  }
  saveSettings( e ) {
    e.preventDefault();
  }


  render() {
    
    let settings = this.props.settings;
    let navLinks = [];
    if( settings.editSettings.team_id ) {
      navLinks = [ orgLink, ...tabLinks ];
    } else {
      navLinks = [ ...tabLinks ];
    }
    
    return (

      <div className="settings-page">
        <DocumentMeta {...metaData} />
        <Navigation historyApi={this.props.historyApi} />
        <div className={
          classNames("primary-tabnav-component", {
            'open-widget-menu' : this.props.tabnav.menuState
          }) 
        }>
        <div className="ovel-close-wrapper">
          <Link to="/dashboard" className="ovel-close" ></Link>
        </div>
       <TabNav tabFooter= {
          null
        }

        links= {
          navLinks
        } />

          <div className="primary-tabnav-content" >
            <SettingsHeader 
              userinfo= {this.props.userinfo} 
              settings={this.props.settings}
              saveSettings= { this.props.settingsActions.saveSettings}
            />
            <div className="settings-page-content">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  
};

function mapStateToProps(state) {
  return {
    tabnav: state.tabnav,
    userinfo: state.userinfo.userinfo,
    settings: state.settings
  }
}

function mapDispatchToProps(dispatch) {
  return {
    tabNavActions: bindActionCreators(tabNavActions, dispatch),
    settingsActions: bindActionCreators(settingsActions, dispatch),
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);