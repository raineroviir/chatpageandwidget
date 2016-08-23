import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { render } from 'react-dom';
import DocumentMeta from 'react-document-meta';
import Navigation from 'containers/Home/Navigation';
import TabNav from '../../components/TabNav';
import * as WidgetActions from '../../actions/Widget';
import * as tabNavActions from '../../actions/TabNav';

import classNames from 'classnames';
import {styles} from './styles.scss';

import { browserHistory } from 'react-router';
import { Link } from 'react-router';

const metaData = {
  title: 'Widget | Chat Center',
  description: 'Widget Chat Center',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'chat,center',
    },
  },
};

export class Settings extends Component {
  

  constructor( props ){
    super( props );
    this.state = {
      tabLinks: [
        {
          toLink: '/settings/organization',
          label: 'Organization'
        },
        {
          toLink: '/settings/personal',
          label: 'Personal settings'
        },
        {
          toLink: '/settings/billing-payment',
          label: 'Billing & Payment'
        }
      ]
    }
  }
  
  componentWillMount() {
    

  }
  saveSettings( e ) {
    e.preventDefault();
  }

  setWidgetMenuState( value ) {
      this.props.tabNavActions.setTabNavState( value );
  }

  render() {
    
    
    
    return (

      <div>
        <DocumentMeta {...metaData} />
        <Navigation historyApi={this.props.historyApi} />
        <div className={
          classNames("primary-tabnav-component", {
            'open-widget-menu' : this.props.tabnav.menuState
          }) 
        }>

       <TabNav tabFooter= {
          this.state.tabFooter
        }

        links= {
          this.state.tabLinks
        }


        />

          <div className="primary-tabnav-content" >
            Settings
            {this.props.children}
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
    tabnav: state.tabnav
  }
}

function mapDispatchToProps(dispatch) {
  return {
    tabNavActions: bindActionCreators(tabNavActions, dispatch)
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);