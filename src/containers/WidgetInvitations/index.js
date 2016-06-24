import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { render } from 'react-dom';
import DocumentMeta from 'react-document-meta';
import Navigation from 'containers/Home/Navigation';
import {WidgetNav} from '../../components/WidgetNav/index';
import {Invitations} from '../../components/Widget/Invitations';

import * as WidgetActions from '../../actions/Widget'

// import App from './components';
// 
const metaData = {
  title: 'Wiget | Chat Center',
  description: 'Widget Chat Center',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'chat,center',
    },
  },
};

export class WidgetInvitations extends Component {
  constructor( props ){
    super( props );
  }
  componentDidMount() {
    this.props.actions.initWidget( this.props.conversations.channelid );
  }
  componentWillMount() {
    if( !this.props.conversations.channelid ) {
      window.location.hash = "#/dashboard";
    }
  }
  render() {
    const { actions } = this.props
    return (
      <div>
        <DocumentMeta {...metaData} />
        <Navigation historyApi={this.props.historyApi} />
        <div className="widget-component">
          <WidgetNav widget={this.props.widget} conversations={this.props.conversations} actions={this.props.actions} />
          <div className="widget-content">
           <Invitations widget={this.props.widget} actions={this.props.actions}/>
          </div>
        </div>
      </div>
    );
  }
}

WidgetInvitations.propTypes = {
  // todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    conversations: state.conversations,
    widget: state.widget,
    historyApi: state.historyApi
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
)(WidgetInvitations);