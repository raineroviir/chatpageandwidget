import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { render } from 'react-dom';
import DocumentMeta from 'react-document-meta';
import Navigation from 'containers/Home/Navigation';
import {WidgetNav} from '../../components/WidgetNav/index';
//import {Installation} from '../../components/Widget/Installation';
import * as WidgetActions from '../../actions/Widget';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

// import App from './components';
// 
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

export class Widget extends Component {
  

  constructor( props ){
    super( props );
  }
  
  componentWillMount() {
    if( !this.props.conversations.channelid ) {
      browserHistory.push("/dashboard");
    } else {
       this.props.actions.initWidgetConfig( this.props.conversations.channelid );
    }

  }
  saveWidgetConfig( e ) {
      e.preventDefault();
      this.props.actions.saveWidgetConfig( this.props.widgetConfig, this.props.conversations.channelid, this.props.widget.isNewChannelConfig );
  }

  render() {
    let classId = this.props.widget ? this.props.widget.classId : '';
    return (
      <div>
        <DocumentMeta {...metaData} />
        <Navigation historyApi={this.props.historyApi} />
        <div className={"widget-component " + (this.props.widget.widgetMenuState? 'open-widget-menu' : '') }  >
          <WidgetNav 
          widget={this.props.widget} 
          conversations={this.props.conversations} 
          actions={this.props.actions}/>
          <div className="widget-content" >
            <div className={ "widget-" + classId }>
              <div className="widget-feature-buttons">
                <button className="cc-btn save-button" onClick={this.saveWidgetConfig.bind(this)}>SAVE</button>
                <Link to="/dashboard" className="widget-close">
                </Link>
              </div>
              <div className="email-camp-channel">
                  <span className="email-icon-wrapper">
                      <span className="msg-env"></span>
                  </span>
                  Email Campaign channel
              </div>
              <h1 className="widget-title">
                  Website widget setup
              </h1>
              {this.props.children}
            </div>
            <div className="widget-save-button-bottom">
                <button className="cc-btn save-button" onClick={this.saveWidgetConfig.bind(this)}>SAVE</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Widget.propTypes = {
  // todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    conversations: state.conversations,
    widgetConfig: state.widgetConfig,
    historyApi: state.historyApi,
    widget: state.widget
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(WidgetActions, dispatch)
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Widget);