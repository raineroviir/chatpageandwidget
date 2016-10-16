import React, { Component, PropTypes} from 'react';
import DocumentMeta from 'react-document-meta';

/* global styles for app */
import './styles/app.scss';
//import './lib/jquery/jquery-1.12.0.min.js';
//import './scripts/chatcenter.js';

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

export class App extends Component {

  static propTypes = {
    children: React.PropTypes.any
  };



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
