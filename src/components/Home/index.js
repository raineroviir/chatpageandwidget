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
          <div>
            <Navigation historyApi={this.props.historyApi} />
            <Channels channelname={this.props.channelname} conversationname={this.props.conversationname} />
          </div>
          <div className="main-section">
            <Header poptartActons= {this.props.poptartActons}/>
            <section className={ this.props.isGroupChat ? "group-chat conversations-panel" : "conversations-panel"}>
              <Conversations />
              <div className="chat-panel">
                <Messages />
                <CreateMessage />
              </div>
            
            </section>
          </div>
      </div>
    );
  }
}