import React, { Component } from 'react';
import { styles } from './default-message.scss';
import AvatarOne from './files/bullbasaur.svg'
import AvatarTwo from './files/charmander.svg'
import AvatarThree from './files/eevee.svg'
import AvatarFour from './files/meowth.svg'
import AvatarFive from './files/squirtle.svg'
import Gravatar from 'react-gravatar'

export default class DefaultMessage extends Component {
  checkIfWidget() {
    const { widget } = this.props
    if (!widget) {
      return {display: "flex", justifyContent: "center", textAlign: "center"}
    }
    return
  }
  constructAvatarCollage() {
    const { channels, widget, chatpage } = this.props
    const conversationParticipants = channels.memoizedChannelMembers[channels.activeChannelId]
    return conversationParticipants.map((participant, index) => {
      if (participant) {
        if (participant.avatar_96 ||
        participant.avatar_384 ||
        participant.avatar_960) {
          return (
            <div key={index} style={{backgroundImage:  `url(${participant.avatar_96 ||
            participant.avatar_384 ||
            participant.avatar_960})`, backgroundRepeat: "no-repeat", zIndex: -index, borderColor: "white", borderStyle: "solid"}} className="default-message-member-avatar-icon" />
          )
        }
        if (participant.email) {
          return (
            <div key={index} className="default-message-member-avatar-icon" style={{zIndex: -index}}>
              <Gravatar style={{borderRadius: "50%", borderColor: "white", borderStyle: "solid",}} size={43} md5="" email={participant.email} />
            </div>
          )
        }
        if (participant.first_name && participant.last_name) {
          return (
            <div key={index} className="default-message-member-avatar-icon" style={{zIndex: -index, borderRadius: "50%", borderColor: "white", borderStyle: "solid", backgroundColor: widget ? widget.initialConfig.keyColor : chatpage ? chatpage.initialConfig.keyColor : "#f7a444"}}>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontSize: "22.5px", width: "43px", height: "43px"}} >{participant.first_name.slice(0, 1).toUpperCase()}{participant.last_name.slice(0, 1).toUpperCase()}</div>
            </div>
          )
        }
      }
    })
  }
  render() {
    const { user, guest, widget, channels, chatpage, environment } = this.props
    // if (widget.initialConfig.channel.avatar) {
    //   console.log("channel avatar is true")
    // }
    // if (widget.initialConfig.teamAvatar) {
    //   console.log("team avatar is true")
    // }
    const teamAvatarUrl = widget ? widget.initialConfig.channel.avatarUrl : chatpage ? chatpage.initialConfig.channel.avatarUrl : null
    const teamChannelUrl = widget ? widget.initialConfig.channelUrl : chatpage ? chatpage.initialConfig.channelUrl : null
    const welcomeMessage = widget ? widget.initialConfig.content.welcomeMessage : chatpage ? chatpage.initialConfig.content.welcomeMessage : null
    const teamName = widget ? widget.initialConfig.content.teamName : chatpage ? chatpage.initialConfig.content.teamName : null
    return (
      <div className="default-message-wrapper" style={this.checkIfWidget()}>
        <div className="default-message">
          <div className="team-avatar-url-wrapper" style={this.checkIfWidget(), {display: 'flex', flexDirection: "row"}}>
            {this.constructAvatarCollage()}
          </div>
          <div className="team-details">
            <div className="team-name" style={this.checkIfWidget()}>
              {teamName}
            </div>
            <div className="team-website" style={this.checkIfWidget(), {color: widget ? widget.initialConfig.keyColor : chatpage ? chatpage.initialConfig.keyColor : "#f7a444"}}>
                <a style={{color: widget ? widget.initialConfig.keyColor : chatpage ? chatpage.initialConfig.keyColor : "#f7a444"}} href="javascript:;">{teamChannelUrl}</a>
            </div>
            <div className="welcome-message" style={this.checkIfWidget()}>
              {welcomeMessage}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
