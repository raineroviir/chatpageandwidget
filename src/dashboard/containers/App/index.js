import React, { Component, PropTypes} from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux'
/* global styles for app */
import './styles/app.scss';
//import './lib/jquery/jquery-1.12.0.min.js';
//import './scripts/chatcenter.js';

import { initUser, fetchUserInfo } from '../../../common/actions/user'
import { initEnvironment, storeUserScrollPosition
 } from '../../../common/actions/environment'
import { checkForConversation } from '../../../common/actions/conversations'
import { createWidgetChannel, fetchChannelInfo, fetchChannel} from '../../../common/actions/channels'
import {loadServerMsgs, createMessage} from '../../../common/actions/messages'

/* Import all files in images folder */
require.context("./images", true, /.*/);

import Poptart from '../poptart';
import Loader from '../loader';
/* application components */
//import { Header } from 'components/Header';
//import { Footer } from 'components/Footer';

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

class App extends Component {

  static propTypes = {
    children: React.PropTypes.any
  };

  componentDidMount() {
    const { dispatch } = this.props

    
  }

  render() {
    return (
      <div className="row">
        <DocumentMeta {...metaData} />
        {this.props.children}
        <Poptart />
        <Loader />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapDispatchToProps)(App)
