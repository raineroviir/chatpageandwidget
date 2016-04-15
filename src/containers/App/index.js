import React, { Component } from 'react';

/* global styles for app */
import './styles/app.scss';
const logo = require('./images/logo.png');
const user = require('./images/user.png');
//import './lib/jquery/jquery-1.12.0.min.js';
//import './scripts/chatcenter.js';

/* application components */
//import { Header } from 'components/Header';
//import { Footer } from 'components/Footer';

export class App extends Component {
  static propTypes = {
    children: React.PropTypes.any,
  };

  render() {
    return (
      <div className="row">
        {this.props.children}
      </div>
    );
  }
}
