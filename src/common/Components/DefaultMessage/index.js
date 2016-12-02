import React, { Component } from 'react';
import { styles } from './default-message.scss';
import AvatarCollage from '../Avatar/AvatarCollage'
import Gravatar from 'react-gravatar'

export default class DefaultMessage extends Component {
  checkIfWidget() {
    const { widget } = this.props
    if (!widget) {
      return {display: "flex", justifyContent: "center", textAlign: "center"}
    }
    return
  }
  render() {
    const { user, guest, widget, channels, chatpage, environment } = this.props
    const teamAvatarUrl = widget ? widget.initialConfig.channel.avatarUrl : chatpage ? chatpage.initialConfig.channel.avatarUrl : null
    const teamChannelUrl = widget ? widget.initialConfig.channelUrl : chatpage ? chatpage.initialConfig.channelUrl : null
    const welcomeMessage = widget ? widget.initialConfig.content.welcomeMessage : chatpage.initialConfig.content ? chatpage.initialConfig.content.welcomeMessage : ""
    const teamName = widget ? widget.initialConfig.content.teamName : chatpage.initialConfig.content ? chatpage.initialConfig.content.teamName : ""
    return (
      <div className="default-message-wrapper" style={this.checkIfWidget()}>
        <div className="default-message">
          {widget ? widget.initialConfig.teamAvatar ?
          <div className="team-avatar-url-wrapper" style={this.checkIfWidget(), {display: 'flex', flexDirection: "row"}}>
             <AvatarCollage {...this.props} size={43}/>
          </div>  : null : null
          }
          {chatpage ? chatpage.initialConfig.teamAvatar ?   <div className="team-avatar-url-wrapper" style={this.checkIfWidget(), {display: 'flex', flexDirection: "row"}}>
            <AvatarCollage {...this.props} size={43}/>
          </div>  : null : null}
          <div className="team-details">
            {teamName &&
            <div className="team-name" style={this.checkIfWidget()}>
              {teamName}
            </div>}
            {teamChannelUrl &&
            <div className="team-website" style={this.checkIfWidget(), {color: widget ? widget.initialConfig.keyColor : chatpage ? chatpage.initialConfig.keyColor : "#f7a444"}}>
                <a style={{color: widget ? widget.initialConfig.keyColor : chatpage ? chatpage.initialConfig.keyColor : "#f7a444"}} href="javascript:;">{teamChannelUrl}</a>
            </div>}
          </div>
          <div className="welcome-message" style={this.checkIfWidget()}>
            {welcomeMessage}
          </div>
        </div>
      </div>
    );
  }
}
