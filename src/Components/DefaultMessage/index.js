import React, { Component } from 'react';
import { styles } from './default-message.scss';
import seaShellsTeamAvatarUrl from './files/chat-btn.png'
export default class DefaultMessage extends Component {
  render() {
    const { user, guest, widgetConfig } = this.props
    const teamAvatarUrl = widgetConfig.channel ? widgetConfig.channel.avatarUrl : seaShellsTeamAvatarUrl
    const teamChannelUrl = widgetConfig.channelUrl ||  "https://team.seashells.com/support"
    const welcomeMessage = widgetConfig.content ? widgetConfig.content.welcomeMessage : "Hi there, thanks for checking out Chat Center, if you have any questions we will be happy to help, just let us know"
    const teamName = widgetConfig.content ? widgetConfig.content.teamName : "She Sells Sea Shells Support"
    return (
      <div className="default-message-wrapper">
        <div className="default-message">
          <div className="team-avatar-url-wrapper">
          <div className="team-avatar-url" style={{backgroundImage: `url(${teamAvatarUrl})`}}>
          </div>
          </div>
          <div className="team-details">
          <div className="team-name">
            {teamName}
          </div>
          <div className="team-website">
              <a style={{color: widgetConfig.keyColor || "#f7a444"}} href="javascript:;">{teamChannelUrl}</a>
          </div>
          <div className="welcome-message">
            {welcomeMessage}
          </div>
          </div>
        </div>
      </div>
    );
  }
}
