import Gravatar from 'react-gravatar'
import React from 'react'
import closeIcon from '../../Components/images/x.svg'

export default class AvatarCollage extends React.Component {
  constructUserAvatars() {
    const { channels, widget, chatpage, size } = this.props
    if (!channels.activeChannelId || !channels.memoizedChannelMembers || !channels.memoizedChannelMembers[channels.activeChannelId]){
      console.log("returning empty div");
      return ("<div></div>")
    }
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
              <Gravatar default="mm" style={{borderRadius: "50%", borderColor: "white", borderStyle: "solid",}} size={size} md5="" email={participant.email} />
            </div>
          )
        }
        if (participant.first_name && participant.last_name) {
          return (
            <div key={index} className="default-message-member-avatar-icon" style={{zIndex: -index, borderRadius: "50%", borderColor: "white", borderStyle: "solid", backgroundColor: widget ? widget.initialConfig.keyColor : chatpage ? chatpage.initialConfig.keyColor : "#f7a444"}}>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontSize: (size/2), width: size, height: size}} >{participant.first_name.slice(0, 1).toUpperCase()}{participant.last_name.slice(0, 1).toUpperCase()}</div>
            </div>
          )
        }
      }
    })
  }
  constructChannelAvatar() {
    const { channels, widget, chatpage, size } = this.props
    if (widget) {
      if (widget.initialConfig.channel.avatar) {
        return (
          <div style={{backgroundImage: `url(${widget.initialConfig.channel.avatarUrl})`}}></div>
        )
      }
    }
    if (chatpage) {
      if (chatpage.initialConfig.channel.avatar) {
        return (
          <div style={{width: "43px", height: "43px", backgroundImage: `url(${chatpage.initialConfig.channel.avatarUrl})`}}></div>
        )
      }
    }
  }
  render() {
    return (
      <div style={{display: "flex", flexDirection: "row"}}>
        {this.constructChannelAvatar()}
        {this.constructUserAvatars()}
      </div>
    )
  }
}
