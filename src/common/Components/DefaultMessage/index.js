import React, { Component } from 'react';
import { styles } from './default-message.scss';
import AvatarOne from './files/bullbasaur.svg'
import AvatarTwo from './files/charmander.svg'
import AvatarThree from './files/eevee.svg'
import AvatarFour from './files/meowth.svg'
import AvatarFive from './files/squirtle.svg'

export default class DefaultMessage extends Component {
  render() {
    const { user, guest, widget } = this.props
    const teamAvatarUrl = widget.initialConfig.channel.avatarUrl ? widget.initialConfig.channel.avatarUrl : null
    const teamChannelUrl = widget.initialConfig.channelUrl ||  "seaShells.com"
    const welcomeMessage = widget.initialConfig.content ? widget.initialConfig.content.welcomeMessage : "Hi there, thanks for checking out Chat Center, if you have any questions we will be happy to help, just let us know"
    const teamName = widget.initialConfig.content ? widget.initialConfig.content.teamName : ""
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
                <a style={{color: widget.initialConfig.keyColor || "#f7a444"}} href="javascript:;">{teamChannelUrl}</a>
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
