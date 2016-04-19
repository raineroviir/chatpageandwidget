import React, { Component } from 'react';
import { Link } from 'react-router';

/* component styles */
import { styles } from './styles.scss';

export class Navigation extends Component {
  render() {
    return (
        <nav className="navbar col-xs-2 hidden-xs col-md-3 leftmenu">
          <ul className="nav navbar-nav">
              <li className="available"><span className="user-presence offline"></span><span className="user-presence inactive"></span><span className="user-presence online"></span></li>
              <li className="logo"><a href="#"><img src="dist/images/logo.png" title="Chat Center" /></a></li>
              <li className="active"><a href="#"><span className="glyphicon glyphicon-home" aria-hidden="true"></span></a></li>
              <li><a href="#"><span className="glyphicon glyphicon-dashboard" aria-hidden="true"></span></a></li>
              <li><a href="#"><span className="glyphicon glyphicon-user" aria-hidden="true"></span></a></li>
              <li><a href="#"><span className="glyphicon glyphicon-search" aria-hidden="true"></span></a></li>
              <li><a href="#"><span className="glyphicon glyphicon-cog" aria-hidden="true"></span></a></li>
          </ul>
          <ul className="nav navbar-nav navbar-right fixed-btm-btn">
            <li><a href="#"><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></a></li>
          </ul>
        </nav>
    );
  }
}
