import React, { Component } from 'react';
import { styles } from './default-message.scss';
import AvatarOne from './files/bullbasaur.svg'
import AvatarTwo from './files/charmander.svg'
import AvatarThree from './files/eevee.svg'
import AvatarFour from './files/meowth.svg'
import AvatarFive from './files/squirtle.svg'

export default class DefaultMessage extends Component {
  render() {
    const { user, guest, widgetConfig } = this.props
    const teamAvatarUrl = widgetConfig.channel.avatarUrl ? widgetConfig.channel.avatarUrl : null
    const teamChannelUrl = widgetConfig.channelUrl ||  "seaShells.com"
    const welcomeMessage = widgetConfig.content ? widgetConfig.content.welcomeMessage : "Hi there, thanks for checking out Chat Center, if you have any questions we will be happy to help, just let us know"
    const teamName = widgetConfig.content ? widgetConfig.content.teamName : ""
    return (
      <div className="default-message-wrapper">
        <div className="default-message">
          <div className="team-avatar-url-wrapper">
          <div style={{display: 'flex'}}>
            <div className="member-avatar-icon" style={{backgroundImage: `url(${AvatarOne})`}}></div>
            <div className="member-avatar-icon" style={{backgroundImage: `url(${AvatarTwo})`}}></div>
            <div className="member-avatar-icon" style={{backgroundImage: `url(${AvatarThree})`}}></div>
            <div className="member-avatar-icon" style={{backgroundImage: `url(${AvatarFour})`}}></div>
            <div className="member-avatar-icon" style={{backgroundImage: `url(${AvatarFive})`}}></div>
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
