import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';

/* components */
import Navigation from 'containers/Home/Navigation';
import Header from 'containers/Home/Header';
import Channels from 'containers/Home/Channels';
import Conversations from 'containers/Home/Conversations';
import Messages from 'containers/Home/Messages';
import CreateMessage from 'containers/Home/CreateMessage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChannelsActions from '../../actions/Channels';

const metaData = {
  title: 'Chat Center',
  description: 'Chat Center',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'chat,center',
    },
  },
};

export class HomeView extends Component {
  render() {
    return (
      <div>
          <DocumentMeta {...metaData} />
          <div className="col-xs-12 col-md-3 sidebar">
            <Navigation historyApi={this.props.historyApi} />
            <Channels />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-9 main hidden-xs hidden-sm">
            <Header />
            <section className={ this.props.isGroupChat ? "row group-chat" : "row"}>
              <Conversations />
              <div className={ this.props.isGroupChat ? "col-xs-12 chat" : "col-xs-12 col-sm-7 col-md-7 col-lg-8 chat"}>
                <Messages />
                <CreateMessage />
              </div>
            </section>
          </div>
      </div>
    );
  }
}