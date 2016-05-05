import React, { Component } from 'react';

/* component styles */
//import { styles } from './styles.scss';

export class ChannelList extends Component {
  componentDidUpdate (){
    $('.mCustomScrollBar').removeAttr("style").mCustomScrollbar({ 
      theme:"dark-3"        
    });
  }
  selectChannel(channel){
    this.props.selectChannel(channel.id);
  }
  render() {
    let user = this.props.user.userinfo, activeChannel = this.props.activeChannel;
    return (
        <aside className="col-xs-12 col-md-9 channel-list mCustomScrollBar">
          <div className="user-detail">
            <span className="glyphicon glyphicon-menu-hamburger visible-xs" aria-hidden="true"></span>
            <strong className="title">Chat Center</strong>
            <span className="user-presence small online">{user.first_name + " " + user.last_name}</span>
            <span className="team-name">{(user.team) ? (user.team.name + "/" + user.team.description) : ("chat.center/" + user.first_name) }</span>
          </div>
          <div className="messages">
            <h3>
              <strong className="title">Direct Messages</strong>
              <span className="label label-default pull-right">
              <span className="glyphicon glyphicon-pencil"></span></span>
              <span className="badge pull-right mrg-rt-10px">{ this.props.channels.count }</span>
            </h3>
            <ul className="nav nav-sidebar user-item" style={{display:((!user.team) ? "none" : "")}}>
              <li className="header">PUBLIC CHATS<span className="plus-icon-wrapper pull-right"><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></span></li>
               {
                user.team && this.props.channels.publicChannels.map(channel => {
                  return (
                    <li onClick={this.selectChannel.bind(this, channel)} key={channel.id} className={ (channel.id == activeChannel) ? "active" : "" }><a><img className="img-rounded pull-left" src="dist/images/user.png" title={channel.name} alt={channel.name} /><span className="name middle-content ellipsis">{channel.name}</span><span className="badge">2</span></a></li>
                  );
                }) 
              }

            </ul>
            <ul className="nav nav-sidebar user-item" style={{display:((!user.team) ? "none" : "")}}>
              <li className="header">PRIVATE CHATS<span className="plus-icon-wrapper pull-right"><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></span></li>
              { 
                user.team && this.props.channels.privateChannels.map(channel => {
                  return (
                    <li onClick={this.selectChannel.bind(this, channel)} key={channel.id} className={ (channel.id == activeChannel) ? "active" : "" }><a><img className="img-rounded pull-left" src="dist/images/user.png" title={channel.name} alt={channel.name} /><span className="name middle-content ellipsis">{channel.name}</span><span className="badge">2</span></a></li>
                  );
                })
              }
            </ul>
            <ul className="nav nav-sidebar user-item" style={{display:((user.team) ? "none" : "")}}>
              <li className="header">CHATS<span className="plus-icon-wrapper pull-right"><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></span></li>
              { 
                !user.team && this.props.channels.otherChannels.map(channel => {
                  return (
                    <li onClick={this.selectChannel.bind(this, channel)} key={channel.id} className={ (channel.id == activeChannel) ? "active" : "" }><a><img className="img-rounded pull-left" src="dist/images/user.png" title={channel.name} alt={channel.name} /><span className="name middle-content ellipsis">{channel.name}</span><span className="badge">2</span></a></li>
                  );
                })
              }
            </ul>
            <ul className="nav nav-sidebar user-item" style={{display:((user.team) ? "none" : "")}}>
              <li className="header">GROUP CHATS<span className="plus-icon-wrapper pull-right"><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></span></li>
              { 
                !user.team && this.props.channels.groupChannels.map(channel => {
                  return (
                    <li onClick={this.selectChannel.bind(this, channel)} key={channel.id} className={ (channel.id == activeChannel) ? "active" : "" }><a><img className="img-rounded pull-left" src="dist/images/user.png" title={channel.name} alt={channel.name} /><span className="name middle-content ellipsis">{channel.name}</span><span className="badge">2</span></a></li>
                  );
                })
              }
            </ul>
            <ul className="nav nav-sidebar user-item">
              <li className="header">RECENT CONTACTS<span className="plus-icon-wrapper pull-right"><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></span></li>
              { this.props.channels.recentContacts.map(user => {
                return (
                  <li key={user.id}><a><span className="user-presence small online"></span><img className="img-circle" src="dist/images/user.png" title={user.name} alt={user.name} /><span className="name">{user.name}</span></a></li>
                );
              })}
            </ul>
            <ul className="nav nav-sidebar user-item">
              <li className="header">TAGS<span className="plus-icon-wrapper pull-right"><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></span></li>
              <li><a><span>#important</span></a></li>
            </ul>
          </div>
        </aside>
    );
  }
}
