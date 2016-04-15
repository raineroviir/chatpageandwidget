import React, { Component } from 'react';

/* component styles */
//import { styles } from './styles.scss';

/* images */
const logo = require('./files/logo.png');

export class ChannelUserList extends Component {
  render() {
    return (
        <div className="col-xs-12 col-sm-5 col-md-5 col-lg-4 chat-contacts mCustomScrollBar hidden-xs">
          <ul className="nav nav-sidebar user-item">
            <li><a href="#" className="active"><img className="img-circle" src="dist/user.png" title="name" alt="name" /><span className="user-presence online pull-right">8:36 PM</span><span className="name-and-message"><strong className="name">Chat Center Support</strong><span className="message">Are you open on monday?</span><span className="message">Also, do you deliver?</span></span></a></li>
            <li><a href="#"><img className="img-circle" src="dist/user.png" title="name" alt="name" /><span className="user-presence online pull-right">8:36 PM</span><span className="name-and-message"><strong className="name">Chat Center Support</strong><span className="message">Are you open on monday?</span><span className="message">Also, do you deliver?</span></span></a></li>
            <li><a href="#"><img className="img-circle" src="dist/user.png" title="name" alt="name" /><span className="user-presence online pull-right">8:36 PM</span><span className="name-and-message"><strong className="name">Chat Center Support</strong><span className="message">Are you open on monday?</span><span className="message">Also, do you deliver?</span></span></a></li>
            <li><a href="#"><img className="img-circle" src="dist/user.png" title="name" alt="name" /><span className="user-presence online pull-right">8:36 PM</span><span className="name-and-message"><strong className="name">Chat Center Support</strong><span className="message">Are you open on monday?</span><span className="message">Also, do you deliver?</span></span></a></li>
            <li><a href="#"><img className="img-circle" src="dist/user.png" title="name" alt="name" /><span className="user-presence online pull-right">8:36 PM</span><span className="name-and-message"><strong className="name">Chat Center Support</strong><span className="message">Are you open on monday?</span><span className="message">Also, do you deliver?</span></span></a></li>
            <li><a href="#"><img className="img-circle" src="dist/user.png" title="name" alt="name" /><span className="user-presence online pull-right">8:36 PM</span><span className="name-and-message"><strong className="name">Chat Center Support</strong><span className="message">Are you open on monday?</span><span className="message">Also, do you deliver?</span></span></a></li>
            <li><a href="#"><img className="img-circle" src="dist/user.png" title="name" alt="name" /><span className="user-presence online pull-right">8:36 PM</span><span className="name-and-message"><strong className="name">Chat Center Support</strong><span className="message">Are you open on monday?</span><span className="message">Also, do you deliver?</span></span></a></li>
            <li><a href="#"><img className="img-circle" src="dist/user.png" title="name" alt="name" /><span className="user-presence online pull-right">8:36 PM</span><span className="name-and-message"><strong className="name">Chat Center Support</strong><span className="message">Are you open on monday?</span><span className="message">Also, do you deliver?</span></span></a></li>
          </ul>
        </div>
    );
  }
}
