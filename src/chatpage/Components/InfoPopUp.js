import React from 'react'

import AvatarOne from '../../common/Components/images/bullbasaur.svg'
import AvatarTwo from '../../common/Components/images/charmander.svg'
import AvatarThree from '../../common/Components/images/eevee.svg'
import AvatarFour from '../../common/Components/images/meowth.svg'
import AvatarFive from '../../common/Components/images/squirtle.svg'

export default class InfoPopUp extends React.Component {
  render() {
    const { chatpage, guest, user, environment } = this.props
    const teamAvatarUrl = chatpage ? chatpage.initialConfig.channel.avatarUrl : null
    const teamChannelUrl = chatpage ? chatpage.initialConfig.channelUrl : "seaShells.com"
    const welcomeMessage = chatpage.initialConfig.content ? chatpage.initialConfig.content.welcomeMessage : "Hi there, thanks for checking out Chat Center, if you have any questions we will be happy to help, just let us know"
    const teamName = chatpage.initialConfig.content ? chatpage.initialConfig.content.teamName : ""
    const currentUserEmail = guest.guest ? guest.data.email : user.data.email
    const currentUserName = guest.guest ? guest.data.first_name : user.data.first_name
    return (
      <div className="info" >
        <div className="team-avatar-wrapper">
          <div style={{display: 'flex'}}>
            <div className="member-avatar-icon" style={{backgroundImage: `url(${AvatarOne})`}}></div>
            <div className="member-avatar-icon" style={{backgroundImage: `url(${AvatarTwo})`}}></div>
            <div className="member-avatar-icon" style={{backgroundImage: `url(${AvatarThree})`}}></div>
            <div className="member-avatar-icon" style={{backgroundImage: `url(${AvatarFour})`}}></div>
            <div className="member-avatar-icon" style={{backgroundImage: `url(${AvatarFive})`}}></div>
          </div>
        </div>
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
