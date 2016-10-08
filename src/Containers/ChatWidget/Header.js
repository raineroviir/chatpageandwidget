import React, { Component } from 'react'
import classNames from 'classnames'
import {FaAngleDown} from 'react-icons/lib/fa'
import {MdClose} from 'react-icons/lib/md'
import signInIcon from './files/group-3.svg'
import infoIcon from './files/i.svg'
import {GoTriangleUp} from 'react-icons/lib/go'
import AvatarOne from './files/bullbasaur.svg'
import AvatarTwo from './files/charmander.svg'
import AvatarThree from './files/eevee.svg'
import AvatarFour from './files/meowth.svg'
import AvatarFive from './files/squirtle.svg'
import closeIcon from './files/x.svg'
import ReactDOM from 'react-dom'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: false,
      showInfo: false,
      showEnterEmailForNotifications: false
    }
  }
  menuToggle() {
    this.setState({showMenu: !this.state.showMenu, showInfo: this.state.showInfo ? !this.state.showInfo : this.state.showInfo})
  }
  infoToggle() {
    this.setState({showInfo: !this.state.showInfo, showMenu: this.state.showMenu ? !this.state.showMenu : this.state.showMenu})
  }
  enterEmailForNotificationsToggle() {
    this.setState({showEnterEmailForNotifications: !this.state.showEnterEmailForNotifications, showMenu: this.state.showMenu ? !this.state.showMenu : this.state.showMenu})
  }
  componentDidMount() {
    window.addEventListener('click', event => {
      if (event.target.id === "your-details-modal") {
        this.setState({showEnterEmailForNotifications: !this.state.showEnterEmailForNotifications})
      }
    })
  }
  componentWillUnmount() {
    window.removeEventListener('click', event => {
      if (event.target.id === "your-details-modal") {
        this.setState({showEnterEmailForNotifications: !this.state.showEnterEmailForNotifications})
      }
    })
  }
  render() {
    const { widget } = this.props
    const teamAvatarUrl = widget.initialConfig.channel.avatarUrl ? widget.initialConfig.channel.avatarUrl : null
    const teamChannelUrl = widget.initialConfig.channelUrl ||  "seaShells.com"
    const welcomeMessage = widget.initialConfig.content ? widget.initialConfig.content.welcomeMessage : "Hi there, thanks for checking out Chat Center, if you have any questions we will be happy to help, just let us know"
    const teamName = widget.initialConfig.content ? widget.initialConfig.content.teamName : ""
    const enterInformationForNotificationsModal =
    <div id="your-details-modal" className="modal">
      <div className="email-for-notifications-modal">
        <div style={{padding: "10 10 40 40", display: "flex", "flexDirection": "column"}}>
        <div onClick={this.enterEmailForNotificationsToggle.bind(this)} style={{cursor: "pointer", alignSelf: 'flex-end', width: "48px", height: "48px", backgroundImage: `url(${closeIcon})`}}></div>
        <div className="your-details">
          Your Details
        </div>
        <div>
          <div style={{padding: "0 40 0 10", letterSpacing: "0.1px"}}>
            Name or nickname
          </div>
          <form style={{padding: "0 40 0 10", opacity: "0.6", letterSpacing: "0.1px"}}><input style={{width: "100%", border: "none", height: "30px", borderBottom: "2px solid"}} placeholder="Enter your name"/>
          </form>
        </div>
        <div>
          <div style={{padding: "0 40 0 10", letterSpacing: "0.1px"}}>
            Email for notifications
          </div>
          <form style={{border: "none", padding: "0 40 0 10", opacity: "0.6", letterSpacing: "0.1px"}}><input style={{width: "100%", border: "none", borderBottom: "2px solid", height: "30px"}}  placeholder="Enter your email"/>
          </form>
        </div>
        <div style={{width: "75%", backgroundColor: widget.initialConfig.keyColor, height: "48px", borderRadius: "5px", color: "#FFFFFF", display: "flex", justifyContent: "center"}}><div style={{alignSelf: "center"}}>Save Changes</div></div>
        </div>
      </div>
    </div>
    const menu = (
        <div style={{color: widget.initialConfig.keyColor}} className="menu">
          <div className="menu-popup-triangle"><GoTriangleUp /></div>
            {null && <div>
              <div>John</div>
              <div>mermaid@gmail.com</div>
              <div>temporary account</div>
            </div>}
            <div style={{border: "none"}} className="menu-item">
              <div onClick={this.enterEmailForNotificationsToggle.bind(this)} style={{cursor: "pointer"}}>Enter email for notifications</div>
            </div>
          {null && <div>
            <div className="menu-item">
              <div style={{cursor: "pointer"}}>Edit</div>
            </div>
            <div className="menu-item">
              <div style={{cursor: "pointer"}}>Forget me</div>
            </div>
          </div>}
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
            <a style={{color: widget.initialConfig.keyColor || "#f7a444"}} href="javascript:;">{teamChannelUrl}</a>
        </div>
        <div className="welcome-message">
          {welcomeMessage}
        </div>
      </div>
    )
    return (
      <div className="header">
      {this.state.showEnterEmailForNotifications && enterInformationForNotificationsModal}
        <div className="header-arrow" onClick={this.props.onResize.bind(this)}>
          <FaAngleDown />
        </div>
        {this.props.userScrollPosition > 150 &&
        <div className="header-info">
          <div style={{width: "25px", height: "25px", cursor: "pointer", backgroundImage: `url(${infoIcon})`, backgroundRepeat: "no-repeat"}} onClick={this.infoToggle.bind(this)} ></div>
        </div>}
        <div className="sign-in-to-chat-center" style={{color: this.props.keyColor}}>
          <div style={{display: "flex"}}>
          </div>
          <div style={{display: "flex"}}>
            <div onClick={this.menuToggle.bind(this)} style={{width: "50px", height: "28px", cursor: "pointer", backgroundImage: `url(${signInIcon})`, backgroundRepeat: "no-repeat"}}>
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
