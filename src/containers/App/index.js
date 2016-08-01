import React, { Component, PropTypes} from 'react';

/* global styles for app */
import './styles/app.scss';
//import './lib/jquery/jquery-1.12.0.min.js';
//import './scripts/chatcenter.js';

/* Import all files in images folder */
require.context("./images", true, /.*/);

import Poptart from '../poptart';

/* application components */
//import { Header } from 'components/Header';
//import { Footer } from 'components/Footer';

export class App extends Component {

  static propTypes = {
    children: React.PropTypes.any
  };

  render() {
    return (
      <div className="row">
        {this.props.children}
        <Poptart />
      </div>
    );
  }
}
