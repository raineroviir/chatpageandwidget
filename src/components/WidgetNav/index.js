import React, { Component } from 'react';
import { Link } from 'react-router';
//let classnames = require('classnames');

/* component styles */
import { styles } from './styles.scss';


export class WidgetNav extends Component {
  render() {
    return (
        <div className="widget-nav">
            <ul className="nav-links">
                <li>
                    <Link activeClassName="active-link" to="/widget/installation">Installation</Link>
                </li>
                <li>
                    <Link activeClassName="active-link" to="/widget/appearance">Appearance</Link>
                </li>
                <li>
                    <Link activeClassName="active-link" to="/widget/labels">Labels & Localization</Link>
                </li>
                <li>
                    <Link activeClassName="active-link" to="/widget/invitations">Proactive invitations</Link>
                </li>
            </ul>
            <div className="widget-nav-footer">
                Questions? <a href="#">Chat with us</a>
            </div>
        </div>
    );
  }
}
