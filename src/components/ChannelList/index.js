import React, { Component } from 'react';

/* component styles */
//import { styles } from './styles.scss';

/* images */
const logo = require('./files/logo.png');

export class ChannelList extends Component {
  render() {
    return (
        <aside className="col-xs-12 col-md-10 channel-list mCustomScrollBar">
          <div className="user-detail">
            <span className="glyphicon glyphicon-menu-hamburger visible-xs" aria-hidden="true"></span>
            <strong className="title">Chat Center</strong>
            <span className="user-presence small online">Alex Komarao</span>
            <span className="team-name">team.chat.center/alex</span>
          </div>
          <div className="messages">
            <h3>
              <strong className="title">Direct Messages</strong>
              <span className="label label-default pull-right">NEW CHAT</span>
              <span className="badge pull-right mrg-rt-5px">42</span>
            </h3>
            <ul className="nav nav-sidebar user-item">
              <li className="header">CHAT CHANNELS<span className="glyphicon glyphicon-plus pull-right" aria-hidden="true"></span></li>
              <li><a href="#" className="active"><img className="img-rounded" src="dist/user.png" title="name" alt="name" /><span className="name">Chat Center</span><span className="badge pull-right mrg-rt-5px">2</span></a></li>
              <li><a href="#"><img className="img-rounded" src="dist/user.png" title="name" alt="name" /><span className="name">Conceirge</span><span className="badge pull-right mrg-rt-5px">2</span></a></li>
              <li><a href="#"><img className="img-rounded" src="dist/user.png" title="name" alt="name" /><span className="name">Sales</span></a></li>
            </ul>
            <ul className="nav nav-sidebar user-item">
              <li className="header">GROUP CHANNELS<span className="glyphicon glyphicon-plus pull-right" aria-hidden="true"></span></li>
              <li><a href="#"><img className="img-rounded" src="dist/user.png" title="name" alt="name" /><span className="name">Chat Center Support</span></a></li>
              <li><a href="#"><img className="img-rounded" src="dist/user.png" title="name" alt="name" /><span className="name">Conceirge</span></a></li>
              <li><a href="#"><img className="img-rounded" src="dist/user.png" title="name" alt="name" /><span className="name">Sales</span></a></li>
            </ul>
            <ul className="nav nav-sidebar user-item">
              <li className="header">RECENT CONTACTS<span className="glyphicon glyphicon-plus pull-right" aria-hidden="true"></span></li>
              <li><a href="#"><span className="user-presence small online"></span><img className="img-circle" src="dist/user.png" title="name" alt="name" /><span className="name">Keith Teare</span></a></li>
              <li><a href="#"><span className="user-presence small online"></span><img className="img-circle" src="dist/user.png" title="name" alt="name" /><span className="name">Surgey Zhukov</span></a></li>
              <li><a href="#"><span className="user-presence small online"></span><img className="img-circle" src="dist/user.png" title="name" alt="name" /><span className="name">Kannan Ayyar</span></a></li>
              <li><a href="#"><span className="user-presence small online"></span><img className="img-circle" src="dist/user.png" title="name" alt="name" /><span className="name">Alex Utsinov</span></a></li>
            </ul>
            <ul className="nav nav-sidebar user-item">
              <li className="header">TAGS<span className="glyphicon glyphicon-plus pull-right" aria-hidden="true"></span></li>
              <li><a href="#"><span>#important</span></a></li>
            </ul>
          </div>
        </aside>
    );
  }
}
