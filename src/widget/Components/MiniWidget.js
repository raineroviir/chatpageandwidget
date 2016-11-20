import React from 'react'
import AvatarOne from '../Containers/ChatWidget/files/bullbasaur.svg'
import AvatarTwo from '../Containers/ChatWidget/files/charmander.svg'
import AvatarThree from '../Containers/ChatWidget/files/eevee.svg'
import AvatarFour from '../Containers/ChatWidget/files/meowth.svg'
import AvatarFive from '../Containers/ChatWidget/files/squirtle.svg'
import FaAngleDown from 'react-icons/lib/fa/angle-down'

export default class MiniWidget extends React.Component {
  render() {
    const { widget } = this.props
    const teamName = widget.initialConfig.content ? widget.initialConfig.content.teamName : ""
    const welcomeMessage = widget.initialConfig.content ? widget.initialConfig.content.welcomeMessage : "Hi there, thanks for checking out Chat Center, if you have any questions we will be happy to help, just let us know"
    return (
      <div className="mini-widget" style={{boxShadow: "0 1px 5px rgba(0, 50, 100, 0.25)", borderRadius: "5px"}}>
        <div className="initial-info" style={{borderRadius: "5px 5px 0 0", padding: "5 5 0 5"}}>
          <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{flexGrow: "1"}} className="team-avatar-wrapper">
              <div onClick={this.props.onToggle.bind(this)} style={{display: 'flex'}}>
                <div className="member-avatar-icon" style={{backgroundImage: `url(${AvatarOne})`}}></div>
                <div className="member-avatar-icon" style={{backgroundImage: `url(${AvatarTwo})`}}></div>
                <div className="member-avatar-icon" style={{backgroundImage: `url(${AvatarThree})`}}></div>
                <div className="member-avatar-icon" style={{backgroundImage: `url(${AvatarFour})`}}></div>
                <div className="member-avatar-icon" style={{backgroundImage: `url(${AvatarFive})`}}></div>
              </div>
            </div>
            <div className="header-arrow" style={{display: "flex", justifyContent: "flex-end", padding: "10 10 0 0", fontSize: "20"}} onClick={this.props.onClose.bind(this)}>
              <FaAngleDown />
            </div>
          </div>
          <div onClick={this.props.onToggle.bind(this)} className="team-name">
            {teamName ? teamName : "She Sells Sea Shells Customer Support"}
          </div>
          <div onClick={this.props.onToggle.bind(this)} className="welcome-message">
            {welcomeMessage}
          </div>
        </div>
        <div onClick={this.props.onToggle.bind(this)} className="post-form-wrapper" style={{padding: "0 5 5 5", borderRadius: "0 0 5px 5px"}}>
          <form className="post-form" style={{padding: "12 10 0 12"}}>
            <div className="message-input-wrapper">
              <input ref="Message"
              type="text"
              className="message-input"
              placeholder={widget.initialConfig.content ? widget.initialConfig.content.inputMsgholder : "Type here; '/' - commands, '@' - mentions"}
              aria-label={widget.initialConfig.content ? widget.initialConfig.content.inputMsgholder : "Type here; '/' - commands, '@' - mentions"} />
            </div>
            <div className="submit-button" style={{color: widget.initialConfig.keyColor, fontSize: "12px"}}>
              {widget.initialConfig.content ? widget.initialConfig.content.sendBtnText : "Send" }
            </div>
          </form>
        </div>
      </div>
    )
  }
}
