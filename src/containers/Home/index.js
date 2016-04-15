import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

/* components */
import { Navigation } from 'components/Navigation';
import { ChannelList } from 'components/ChannelList';
import { Header } from 'components/Header';
import { ChannelUserList } from 'components/ChannelUserList';
import { ChatMessage } from 'components/ChatMessage';
import { ChatTextBox } from 'components/ChatTextBox';

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

export class Home extends Component {
  render() {
    return (
      <div>
          <DocumentMeta {...metaData} />
          <div className="col-xs-12 col-md-3 sidebar">
            <Navigation />
            <ChannelList />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-9 main hidden-xs hidden-sm">
            <Header />
            <section className="row">
              <ChannelUserList />
              <div className="col-xs-12 col-sm-7 col-md-7 col-lg-8 chat">
                <ChatMessage />
                <ChatTextBox />
              </div>
            </section>
          </div>
      </div>
    );
  }
}
