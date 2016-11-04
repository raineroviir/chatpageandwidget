import React, { Component } from 'react'
import classNames from 'classnames'
import FaAngleDown from 'react-icons/lib/fa/angle-down'
import signInIcon from '../../../common/Components/images/group-3.svg'
import AvatarOne from '../../../common/Components/images/bullbasaur.svg'
import AvatarTwo from '../../../common/Components/images/charmander.svg'
import AvatarThree from '../../../common/Components/images/eevee.svg'
import AvatarFour from '../../../common/Components/images/meowth.svg'
import AvatarFive from '../../../common/Components/images/squirtle.svg'
import closeIcon from '../../../common/Components/images/x.svg'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {updateUser, forgetUser} from '../../../common/actions/user'
import SignInIcon from '../../../common/Components/svgs/SignInIcon'
import InfoIcon from '../../../common/Components/svgs/InfoIcon'
import Register from '../../../common/Components/Register'
import Login from '../../../common/Components/Login'
import {RegistrationRouter} from '../../../common/Components/Register/router'

class Header extends Component {
  constructor(props) {
    super(props)
    this.forgetMe = this.forgetMe.bind(this)
    this.enterEmailForNotificationsToggle =
    this.enterEmailForNotificationsToggle.bind(this)
    this.handleUserUpdate = this.handleUserUpdate.bind(this)
    this.showRegistrationToggle = this.showRegistrationToggle.bind(this)
    this.state = {
      showMenu: false,
      showInfo: false,
      showEnterEmailForNotifications: false,
      showRegistration: false
    }
  }
  menuToggle() {
    this.setState({showMenu: !this.state.showMenu, showInfo: this.state.showInfo ? !this.state.showInfo : this.state.showInfo})
  }
  infoToggle() {
    this.setState({showInfo: !this.state.showInfo, showMenu: this.state.showMenu ? !this.state.showMenu : this.state.showMenu})
  }
  enterEmailForNotificationsToggle() {
    // this.menuToggle()
    // this.setState({showEnterEmailForNotifications: !this.state.showEnterEmailForNotifications})
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.register.finished_process && this.props.register.finished_process) {
      this.setState({showRegistration: false})
    }
  }
  handleUserUpdate(e) {
    e.preventDefault()
    const { dispatch, guest, user } = this.props
    const token = guest.token || user.token
    let updates = {email: this.refs.emailCapture.value, first_name: this.refs.nameCapture.value, last_name: "test"}
    if (!updates.first_name) {
      return
    }
    if (!updates.last_name) {
      return
    }
    if (!updates.email) {
      return
    }
    dispatch(updateUser(updates, token))
    this.refs.nameCapture.value = ""
    this.refs.emailCapture.value = ""
    this.enterEmailForNotificationsToggle()
    return
  }
  forgetMe() {
    const { dispatch } = this.props
    // const token = guest.token || user.token
    // const updates = {email: "forget@me.com", first_name: "forget", last_name: "me"}
    // localStorage.clear()
    // dispatch(forgetUser())
    // dispatch(updateUser(updates, token))
  }
  showRegistrationToggle() {
    // this.menuToggle()
    // this.setState({showRegistration: !this.state.showRegistration})
  }
  render() {
    const { widget, guest, user, environment } = this.props
    const teamAvatarUrl = widget ? widget.initialConfig.channel.avatarUrl : null
    const teamChannelUrl = widget ? widget.initialConfig.channelUrl : "seaShells.com"
    const welcomeMessage = widget ? widget.initialConfig.content.welcomeMessage : "Hi there, thanks for checking out Chat Center, if you have any questions we will be happy to help, just let us know"
    const teamName = widget ? widget.initialConfig.content.teamName : ""
    const currentUserEmail = guest.guest ? guest.data.email : user.data.email
    const currentUserName = guest.guest ? guest.data.first_name : user.data.first_name
    const enterInformationForNotificationsModal =
      (<div className="your-details-entry-form">
        <div style={{padding: "10px", display: "flex", "flexDirection": "column"}}>
        <div onClick={this.enterEmailForNotificationsToggle} style={{cursor: "pointer", alignSelf: 'flex-end', width: "48px", height: "48px", backgroundImage: `url(${closeIcon})`}}></div>
        <div className="your-details" style={{padding: "10 0 10 0"}}>
          Your Details
        </div>
          <form onSubmit={this.handleUserUpdate} style={{fontSize: "15px"}}>
            <div style={{padding: "10px", letterSpacing: "0.1px"}}>
              Name or nickname
            </div>
            <div style={{padding: "10px"}}>
              <input className="capture-details-input" ref="nameCapture" style={{fontSize: "15px", letterSpacing: "0.1px", width: "100%", border: "none", height: "30px", borderBottom: "2px solid"}} placeholder={currentUserName ? currentUserName : "Enter your name"}/>
            </div>
            <div style={{padding: "10px", letterSpacing: "0.1px"}}>
              Email for notifications
            </div>
            <div style={{padding: "10px"}}>
              <input className="capture-details-input" ref="emailCapture" style={{fontSize: "15px", letterSpacing: "0.1px", width: "100%", border: "none", borderBottom: "2px solid", height: "30px"}}  placeholder={currentUserEmail ? currentUserEmail : "Enter your email"}/>
            </div>
            <div style={{padding: "20px 0 0 0"}}>
              <button type="submit" style={{ backgroundColor: widget ? widget.initialConfig.keyColor : "#f7a444", height: "48px", borderRadius: "5px", color: "#FFFFFF", display: "flex", justifyContent: "center", width: "100%", borderStyle: "none"}}>
                <div style={{alignSelf: "center", fontSize: "15px"}}>Save Changes</div>
              </button>
            </div>
          </form>
        </div>
      </div>)
      const registration = (
        (<div className="registration">
          <div style={{padding: "10px", display: "flex", "flexDirection": "column"}}>
          <div onClick={this.enterEmailForNotificationsToggle} style={{cursor: "pointer", alignSelf: 'flex-end', width: "48px", height: "48px", backgroundImage: `url(${closeIcon})`}}></div>
          <div className="your-details" style={{padding: "10 0 10 0"}}>
            Your Details
          </div>
            <form onSubmit={this.handleUserUpdate} style={{fontSize: "15px"}}>
              <div style={{padding: "10px", letterSpacing: "0.1px"}}>
                Name or nickname
              </div>
              <div style={{padding: "10px"}}>
                <input className="capture-details-input" ref="nameCapture" style={{fontSize: "15px", letterSpacing: "0.1px", width: "100%", border: "none", height: "30px", borderBottom: "2px solid"}} placeholder={currentUserName ? currentUserName : "Enter your name"}/>
              </div>
              <div style={{padding: "10px", letterSpacing: "0.1px"}}>
                Email for notifications
              </div>
              <div style={{padding: "10px"}}>
                <input className="capture-details-input" ref="emailCapture" style={{fontSize: "15px", letterSpacing: "0.1px", width: "100%", border: "none", borderBottom: "2px solid", height: "30px"}}  placeholder={currentUserEmail ? currentUserEmail : "Enter your email"}/>
              </div>
              <div style={{padding: "20px 0 0 0"}}>
                <button type="submit" style={{ backgroundColor: widget ? widget.initialConfig.keyColor : "#f7a444", height: "48px", borderRadius: "5px", color: "#FFFFFF", display: "flex", justifyContent: "center", width: "100%", borderStyle: "none"}}>
                  <div style={{alignSelf: "center", fontSize: "15px"}}>Save Changes</div>
                </button>
              </div>
            </form>
          </div>
        </div>)
      )
    const menu = (
        <div style={{color: widget ? widget.initialConfig.keyColor : "#f7a444"}} className="menu">
            <div style={{color: "black"}}>
              <div>
                {guest.data.first_name || user.data.first_name ?
                  <div>
                    {guest.data.first_name || user.data.first_name}
                  </div> : null
                }
                {guest.data.last_name || user.data.last_name ?
                  <div style={{paddingLeft: "5px"}}>
                    {guest.data.last_name || user.data.last_name}
                  </div> : null
                }
              </div>
            {guest.data.email || user.data.email ?
              <div>
                <div>
                  {guest.data.email || user.data.email}
                </div>
                <div>
                  {guest.guest && <div>temporary account</div>}
                </div>
              </div> :
              <div style={{border: "none"}} className="menu-item">
                <div onClick={this.enterEmailForNotificationsToggle} style={{cursor: "pointer"}}>
                  Enter email for notifications
                </div>
              </div>
            }
            </div>
          {guest.data.email && <div>
            <div className="menu-item">
              <div onClick={this.enterEmailForNotificationsToggle} style={{cursor: "pointer"}}>Edit</div>
            </div>
            <div className="menu-item">
              <div onClick={this.forgetMe} style={{cursor: "pointer"}}>Forget me</div>
            </div>
          </div>}
          <div className="menu-item">
            <div style={{cursor: "pointer"}}>Sign in with chat.center</div>
          </div>
          <div className="menu-item">
            <div>
              <div style={{color: "#000000"}}>Don't have an account?</div>
            </div>
            <div onClick={this.showRegistrationToggle} style={{cursor: "pointer"}}>Sign up</div>
          </div>
        </div>
      )
    const widgetMenu = (
      <div style={{color: widget ? widget.initialConfig.keyColor : "#f7a444"}} className="widget-menu">
        <div style={{padding: "10 10 0 0", display: "flex", justifyContent: "flex-end"}}>
          <div onClick={this.menuToggle.bind(this)} style={{cursor: "pointer", alignSelf: 'flex-end', width: "48px", height: "48px", backgroundImage: `url(${closeIcon})`}}></div>
        </div>
          <div style={{color: "black", padding: "10px"}}>
            <div style={{display: "flex", fontSize: "30px"}}>
              {guest.data.first_name || user.data.first_name ?
                <div>
                  {guest.data.first_name || user.data.first_name}
                </div> : null
              }
              {guest.data.last_name || user.data.last_name ?
                <div style={{paddingLeft: "5px"}}>
                  {guest.data.last_name || user.data.last_name}
                </div> : null
              }
            </div>
          {guest.data.email || user.data.email ?
            <div>
              <div>
                {guest.data.email || user.data.email}
              </div>
              <div>
                {guest.guest && <div style={{opacity: "0.6"}}>temporary account</div>}
              </div>
            </div> :
            <div style={{border: "none"}} className="menu-item">
              <div onClick={this.enterEmailForNotificationsToggle} style={{cursor: "pointer"}}>
                Enter email for notifications
              </div>
            </div>
          }
          </div>
        {guest.data.email && <div>
          <div className="menu-item">
            <div onClick={this.enterEmailForNotificationsToggle} style={{cursor: "pointer"}}>Edit</div>
          </div>
          <div className="menu-item">
            <div onClick={this.forgetMe} style={{cursor: "pointer"}}>Forget me</div>
          </div>
        </div>}
        <div className="menu-item">
          <div style={{cursor: "pointer"}}>Sign in with chat.center</div>
        </div>
        <div  className="menu-item">
          <div>
            <div style={{color: "#000000"}}>Don't have an account?</div>
          </div>
          <div>
          <div onClick={this.showRegistrationToggle} style={{cursor: "pointer"}}>Sign up</div>
          </div>
        </div>
      </div>
    )
    const info = (
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
            <a style={{color: widget ? widget.initialConfig.keyColor : "#f7a444"}} href="javascript:;">{teamChannelUrl}</a>
        </div>
        <div className="welcome-message">
          {welcomeMessage}
        </div>
      </div>
    )
    return (
      <div className="header">
      {this.state.showEnterEmailForNotifications && enterInformationForNotificationsModal}
        {this.props.environment.userScrollPosition > 150 && <div className="header-arrow" onClick={this.infoToggle.bind(this)}>
          <InfoIcon />
        </div>}
        <div className="sign-in-to-chat-center" style={{color: widget ? widget.initialConfig.keyColor : "#f7a444"}}>
          <div onClick={this.menuToggle.bind(this)} style={{display: "flex", cursor: "pointer"}}>
            <SignInIcon style={{color: widget ? widget.initialConfig.keyColor : "#f7a444"}}/>
          </div>
        </div>
        <div>{this.state.showRegistration && <div className="registration"><RegistrationRouter /></div>}</div>
        {this.state.showMenu && (widget ? widgetMenu : menu)}
        {this.state.showInfo && this.props.environment.userScrollPosition > 150 && info}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user, guest, widget, environment, register } = state
  return {
    user,
    guest,
    widget,
    environment,
    register
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
