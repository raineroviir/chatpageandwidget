import React, { Component } from 'react';

/* component styles */
//import { styles } from './styles.scss';
import { styles } from './styles.scss';
let classNames = require("classnames");
export class ChannelList extends Component {
  componentDidUpdate (){
    $('.mCustomScrollBar').removeAttr("style").mCustomScrollbar({ 
      theme:"dark-3"        
    });
  }
  selectChannel(channel){
    this.props.selectChannel(channel);
  }
  render() {
    let user = this.props.user.userinfo, activeChannel = this.props.activeChannel;

    return (
        <aside className="secondary-nav mCustomScrollBar">
          <div className="layer1">
            <div className="layer2">
              <div className="user-info">
                <span className="glyphicon glyphicon-menu-hamburger menu-hamburger" aria-hidden="true"></span>
                <h3 className="title ellipsis">{ (user.team && user.team.name) ? user.team.name.replace(/\./g, " ") : "Chat Center"}</h3>
                <p className="ellipsis user-name">
                  <span className="available-status online"></span>
                  { user.first_name  ? (user.first_name + " " + user.last_name ) : '' }
                </p>
                <p className="ellipsis team-name">
                  { this.props.org && this.props.org.name }
                </p>
              </div>
              <div className={"direct-message" + 
              (this.props.channels.directChannel && this.props.channels.directChannel.id === this.props.activeChannel ? ' active' : '')
              } 
              onClick={this.selectChannel.bind(this, this.props.channels.directChannel)}>
                <h3 className="title ellipsis">Direct Messages</h3>
                <div className="item-features">
                  <span className="msg-count">{ this.props.channels.count }</span>
                  <span className="pencil-wrapper">
                  </span>
                  
                </div>              
              </div>
              <div className="chat-lists-wrapper">
                
                <ul className="chat-list" style={{display:((!user.team) ? "none" : "")}}>
                  <li className="chat-list-title">
                      <span className="title-text ellipsis">EXTERNAL CHATS</span>
                      <span className="plus-icon" onClick={this.props.createChannel.bind(this, 'public')}>
                      </span>
                  </li>
                   {
                    user.team && this.props.channels.publicChannels.map(channel => {
                      let avatarText = (channel.name) ? channel.name.charAt(0) : "";
                      return (
                        
                        <li onClick={this.selectChannel.bind(this, channel)} 
                        key={channel.id} 
                        className={ (channel.id == activeChannel) ? "chat-message active" : 
                        "chat-message" }>
                          <a>
                            <img className={classNames("img-rounded", { hide: !channel.avatar_96})} src={channel.avatar_96 || ""} title={channel.name} alt={channel.name} />
                            <span className={classNames("avatar", { hide: !!channel.avatar_96})}>{avatarText}</span>
                            <span className="name ellipsis">
                              <span className="channel-name-text">{channel.name}</span>
                            </span>
                            <span className="msg-count">2</span>
                          </a>
                        </li>
                      );
                    }) 
                  }

                </ul>
                <ul className="chat-list" style={{display:((!user.team) ? "none" : "")}}>
                  <li className="chat-list-title">
                      <span className="title-text ellipsis">INTERNAL CHATS</span>
                      <span className="plus-icon" onClick={this.props.createChannel.bind(this, 'private')}>
                        
                      </span>
                  </li>
                  { 
                    user.team && this.props.channels.privateChannels.map(channel => {
                      let avatarText = (channel.name) ? channel.name.charAt(0) : "";
                      return (

                        <li onClick={this.selectChannel.bind(this, channel)} key={channel.id} className={ (channel.id == activeChannel) ? "chat-message active" : "chat-message" }>
                          <a>
                            <img className={classNames("img-rounded", { hide: !channel.avatar_96})} src={channel.avatar_96 || ""} title={channel.name} alt={channel.name} />
                            <span className={classNames("avatar", { hide: !!channel.avatar_96})}>{avatarText}</span>
                            <span className="name ellipsis">
                              <span className="channel-name-text">{channel.name}</span>
                            </span>
                            <span className="msg-count">2</span>
                          </a>
                        </li>
                      );
                    })
                  }
                </ul>
                <ul className="chat-list" style={{display:((user.team) ? "none" : "")}}>
                  <li className="chat-list-title">
                      <span className="title-text ellipsis">PUBLIC CHATS</span>
                      <span className="plus-icon" onClick={this.props.createChannel.bind(this, 'chat')}>
                        
                      </span>
                  </li>
                  { 
                    !user.team && this.props.channels.otherChannels.map(channel => {
                      let avatarText = (channel.name) ? channel.name.charAt(0) : "";
                      return (
                        <li onClick={this.selectChannel.bind(this, channel)} key={channel.id} className={ (channel.id == activeChannel) ? "chat-message active" : "chat-message" }>
                          <a>
                            <img className={classNames("img-rounded", { hide: !channel.avatar_96})} src={channel.avatar_96 || ""} title={channel.name} alt={channel.name} />
                            <span className={classNames("avatar", { hide: !!channel.avatar_96})}>{avatarText}</span>
                            <span className="name ellipsis">
                              <span className="channel-name-text">{channel.name}</span>
                            </span>
                            <span className="msg-count">2</span>
                          </a>
                        </li>
                      );
                    })
                  }
                </ul>
                <ul className="chat-list group-chat-list" style={{display:((user.team) ? "none" : "")}}>
                  <li className="chat-list-title">
                      <span className="title-text ellipsis">PRIVATE GROUP CHATS</span>
                      <span className="plus-icon" onClick={this.props.createChannel.bind(this, 'group')}>
                        
                      </span>
                  </li>
                  { 
                    !user.team && this.props.channels.groupChannels.map(channel => {
                      let avatarText = (channel.name) ? channel.name.charAt(0) : "";
                      return (
                        <li onClick={this.selectChannel.bind(this, channel)} key={channel.id} className={ (channel.id == activeChannel) ? "chat-message no-user active" : "chat-message no-user" }>
                          <a className={channel.is_public? 'public-channel': 'private-channel'  }>
                            
                            <img className={classNames("img-rounded", { hide: !channel.avatar_96})} src={channel.avatar_96 || ""} title={channel.name} alt={channel.name} />
                            <span className={classNames("avatar", { hide: !!channel.avatar_96})}>{avatarText}</span>
                              <span className="name ellipsis">
                                <span>
                                  <span className="channel-name-text">{channel.name}</span>
                                  <span className="groups-icon"></span>
                                  {!channel.is_public&&<span className="lock-icon"></span>}
                                </span>
                                
                              </span>
                              <span className="msg-count">2</span>
                            
                          </a>
                        </li>
                      );
                    })
                  }
                </ul>
                <ul className="chat-list">
                   <li className="chat-list-title">
                      <span className="title-text ellipsis">RECENT CONTACTS</span>
                      <span className="plus-icon">
                      </span>
                  </li>
                  
                  { this.props.channels.recentContacts.map(user => {
                    return (
                      <li onClick={this.selectChannel.bind(this, channel)} key={channel.id} className={ (channel.id == activeChannel) ? "chat-message active" : "chat-message" }>
                          <a>
                            <img className="img-rounded" src="dist/images/user.png" title={channel.name} alt={channel.name} />
                            <span className="name ellipsis">
                              <span className="channel-name-text">{channel.name}</span>
                            </span>
                            <span className="msg-count">2</span>
                          </a>
                        </li>
                    );
                  })}
                </ul>
                <ul className="chat-list tags">
                  <li className="chat-list-title">TAGS</li>
                  <li><a><span>#important</span></a></li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
    );
  }
}