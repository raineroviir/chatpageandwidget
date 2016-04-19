import React, { Component } from 'react';

/* component styles */
//import { styles } from './styles.scss';

export class ChannelList extends Component {
  render() {
    return (
        <aside className="col-xs-12 col-md-9 channel-list mCustomScrollBar">
          <div className="user-detail">
            <span className="glyphicon glyphicon-menu-hamburger visible-xs" aria-hidden="true"></span>
            <strong className="title">Chat Center</strong>
            <span className="user-presence small online">Alex Komarao</span>
            <span className="team-name">team.chat.center/alex</span>
          </div>
          <div className="messages">
            <h3>
              <strong className="title">Direct Messages</strong>
              <span className="label label-default pull-right">New Chat</span>
              <span className="badge pull-right mrg-rt-10px">42</span>
            </h3>
            <ul className="nav nav-sidebar user-item">
              <li className="header">CHAT CHANNELS<span className="glyphicon glyphicon-plus pull-right" aria-hidden="true"></span></li>
               { this.props.channels.publicChannels.map(channel => {
                return (
                  <li key={channel.id}><a href="#"><img className="img-rounded pull-left" src="dist/images/user.png" title={channel.name} alt={channel.name} /><span className="name middle-content ellipsis">{channel.name}</span><span className="badge">2</span></a></li>
                );
              })}

            </ul>
            <ul className="nav nav-sidebar user-item">
              <li className="header">GROUP CHANNELS<span className="glyphicon glyphicon-plus pull-right" aria-hidden="true"></span></li>
              { this.props.channels.groupChannels.map(channel => {
                  return (
                    <li key={channel.id}><a href="#"><img className="img-rounded pull-left" src="dist/images/user.png" title={channel.name} alt={channel.name} /><span className="name middle-content ellipsis">{channel.name}</span><span className="badge">2</span></a></li>
                  );
                })
              }
            </ul>
            <ul className="nav nav-sidebar user-item">
              <li className="header">RECENT CONTACTS<span className="glyphicon glyphicon-plus pull-right" aria-hidden="true"></span></li>
              { this.props.channels.recentContacts.map(user => {
                return (
                  <li key={user.id}><a href="#"><span className="user-presence small online"></span><img className="img-circle" src="dist/images/user.png" title={user.name} alt={user.name} /><span className="name">{user.name}</span></a></li>
                );
              })}
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
