import React from 'react'
import AvatarCollage from '../../common/Components/Avatar/AvatarCollage'

export default class InfoPopUp extends React.Component {
  render() {
    const { chatpage, guest, user, environment, channels } = this.props
    const teamAvatarUrl = chatpage ? chatpage.initialConfig.channel.avatarUrl : null
    const teamChannelUrl = chatpage ? chatpage.initialConfig.channelUrl : "seaShells.com"
    const welcomeMessage = chatpage.initialConfig.content ? chatpage.initialConfig.content.welcomeMessage : "Hi there, thanks for checking out Chat Center, if you have any questions we will be happy to help, just let us know"
    const teamName = chatpage.initialConfig.content ? chatpage.initialConfig.content.teamName : ""
    const currentUserEmail = guest.guest ? guest.data.email : user.data.email
    const currentUserName = guest.guest ? guest.data.first_name : user.data.first_name
    return (
      <div className="chatpage-info" >
        {chatpage ? chatpage.initialConfig.teamAvatar ?
        <div className="team-avatar-wrapper">
          <div style={{display: 'flex'}}>
           <AvatarCollage {...this.props} size={28}/>
          </div>
        </div> : null : null
        }
        <div className="team-name">
          {teamName ? teamName : "She Sells Sea Shells Customer Support"}
        </div>
        <div className="team-url">
            <a style={{color: chatpage ? chatpage.initialConfig.keyColor : "#f7a444"}} href="javascript:;">{teamChannelUrl}</a>
        </div>
        <div className="welcome-message">
          {welcomeMessage}
        </div>
      </div>
    )
  }
}
