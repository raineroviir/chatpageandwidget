import React, { Component } from 'react'
import classNames from 'classnames'
import {FaAngleDown} from 'react-icons/lib/fa'
import {MdClose} from 'react-icons/lib/md'
import signInAvatar from './files/avatar.png'
import {MdInfo} from 'react-icons/lib/md'
import {GoTriangleUp} from 'react-icons/lib/go'
import defaultTeamAvatar from './files/chat-btn.png'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: false,
      showInfo: false
    }
  }
  menuToggle() {
    this.setState({showMenu: !this.state.showMenu})
  }
  infoToggle() {
    this.setState({showInfo: !this.state.showInfo})
  }
  render() {
    const { widget } = this.props
    const teamAvatarUrl = widget.initialConfig.channel.avatarUrl ? widget.initialConfig.channel.avatarUrl : defaultTeamAvatar
    const teamChannelUrl = widget.initialConfig.channelUrl ||  "seaShells.com"
    const welcomeMessage = widget.initialConfig.content ? widget.initialConfig.content.welcomeMessage : "Hi there, thanks for checking out Chat Center, if you have any questions we will be happy to help, just let us know"
    const teamName = widget.initialConfig.content ? widget.initialConfig.content.teamName : ""

    const menu = (
        <div style={{color: widget.initialConfig.keyColor}} className="menu">
          <div className="menu-popup-triangle"><GoTriangleUp /></div>
          <div style={{border: "none"}} className="menu-item">
            <div style={{cursor: "pointer"}}>Enter email for notifications</div>
          </div>
          <div className="menu-item">
            <div style={{cursor: "pointer"}}>Sign in with chat.center</div>
          </div>
          <div className="menu-item">
            <div>
              <div style={{color: "#000000"}}>Don't have an account?</div>
            </div>
            <div style={{cursor: "pointer"}}>Sign up</div>
          </div>
        </div>
      )
    const info = (
      <div className="info">
        <div className="info-popup-triangle"><GoTriangleUp /></div>
        <div className="team-avatar-wrapper">
          <div className="team-avatar" style={{backgroundImage: `url(${teamAvatarUrl})`}}>
          </div>
        </div>
        <div className="team-name">
          {teamName ? teamName : "She Sells Sea Shells Customer Support"}
        </div>
        <div className="team-url">
            <a style={{color: widget.initialConfig.keyColor || "#f7a444"}} href="javascript:;">{teamChannelUrl}</a>
        </div>
        <div className="welcome-message">
          {welcomeMessage}
        </div>
      </div>
    )
    return (
      <div className="header">
        <div className="header-arrow" onClick={this.props.onResize.bind(this)}>
          <FaAngleDown />
        </div>
        {this.props.userScrollPosition > 150 &&
        <div className="header-info">
          <MdInfo onClick={this.infoToggle.bind(this)}/>
        </div>}
        <div className="sign-in-to-chat-center" style={{color: this.props.keyColor}}>
          <div style={{display: "flex"}}>
          </div>
          <div style={{display: "flex"}}>
            <div onClick={this.menuToggle.bind(this)} style={{cursor: "pointer", backgroundImage: `url(${signInAvatar})`, backgroundRepeat: "no-repeat"}} className="avatar">
          </div>
        </div>
        </div>
        <div className="header-close"
        onClick={this.props.onClose.bind(this)}>
          <MdClose />
        </div>
        {this.state.showInfo && this.props.userScrollPosition > 150 && info}
        {this.state.showMenu && menu}
      </div>
    )
  }
}
