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
    console.log(dispatch)
    const data = {email: "placeholder"}
    const checkLocalStorage = JSON.parse(localStorage.getItem("orgs"))
    const channel_url = checkLocalStorage ? checkLocalStorage[0].name : "r.chat.center/o"
    console.log(channel_url)
    const index = channel_url.indexOf('/')
    const channelname = channel_url.slice(index + 1)
    const team = channel_url.slice(0,index)
    // dispatch(initEnvironment())
    // dispatch(initUser(data))
    // .then((token) => {
    //   token = token.access_token
    //   console.log(token)
    //   dispatch(fetchChannel(channelname, team, token)).then((channel_id) => {
    //     dispatch(checkForConversation(channel_id, token))
    //     dispatch({type: "STORE_CHANNEL_INFO", channelId: channel_id, channelUrl: channel_url})
    //   }).catch(error => console.log(error))
    // }).catch(error => console.log(error))
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
