import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';

/* components */
import { HomeView } from 'components/Home';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChannelsActions from '../../actions/Channels';


export class Home extends Component {
  render() {
    return (
      <HomeView urlparams={this.props.params} historyApi={this.props.history} isGroupChat={this.props.isGroupChat} />
    );
  }
}

function mapStateToProps(state) {
  return {
    isGroupChat: state.channels.channels.isGroupChat
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChannelsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)