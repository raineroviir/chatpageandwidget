import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { render } from 'react-dom';
import DocumentMeta from 'react-document-meta';
import Navigation from 'containers/Home/Navigation';
import {WidgetNav} from '../../components/WidgetNav/index';
import {Installation} from '../../components/Widget/Installation';
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

export class Widget extends Component {
  

  constructor( props ){
    super( props );
  }
  componentDidMount() {
      $(document).keyup(this.keyupEvent);
      this.props.actions.initWidget( this.props.conversations.channelid );
  }
  componentWillUnmount() {
      //unbind the event keyup binded 
      $(document).unbind( 'keyup', this.goToDashboard );
  }
  keyupEvent(e){
      if (e.which==27){
          window.location.hash = "#/dashboard";
      }
  }
  componentWillMount() {
    if( !this.props.conversations.channelid ) {
      window.location.hash = "#/dashboard";
    }
  }
  render() {
    const { actions } = this.props;
    return (
      <div>
        <DocumentMeta {...metaData} />
        <Navigation historyApi={this.props.historyApi} />
        <div className="widget-component">
          <WidgetNav widget={this.props.widget} conversations={this.props.conversations} actions={this.props.actions}/>
          <div className="widget-content">
          <Installation channelid={this.props.conversations.channelid} widget={this.props.widget}/>
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
)(Widget);