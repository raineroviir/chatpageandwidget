import React, { Component } from 'react'
import classNames from 'classnames'
import FaAngleDown from 'react-icons/lib/fa/angle-down'
import signInIcon from './files/group-3.svg'
import infoIcon from './files/i.svg'
import AvatarOne from './files/bullbasaur.svg'
import AvatarTwo from './files/charmander.svg'
import AvatarThree from './files/eevee.svg'
import AvatarFour from './files/meowth.svg'
import AvatarFive from './files/squirtle.svg'
import closeIcon from './files/x.svg'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {updateUser, forgetUser} from '../../../common/actions/user'
import SignInIcon from './SignInIcon'
import Register from '../../../common/Containers/Register'
import Login from '../../../common/Containers/Login'
import {RegistrationRouter} from '../RegistrationRouter'
import WidgetMenu from '../../Components/WidgetMenu'

class Header extends Component {
  constructor(props) {
    super(props)
    this.forgetMe = this.forgetMe.bind(this)
    this.enterEmailForNotificationsToggle =
    this.enterEmailForNotificationsToggle.bind(this)
    this.handleUserUpdate = this.handleUserUpdate.bind(this)
    this.showRegistrationToggle = this.showRegistrationToggle.bind(this)
    this.showLoginToggle = this.showLoginToggle.bind(this)
    this.state = {
      showMenu: false,
      showEnterEmailForNotifications: false,
      showRegistration: false,
      showLogin: false
    }
  }
  menuToggle() {
    this.setState({showMenu: !this.state.showMenu})
  }
  enterEmailForNotificationsToggle() {
    this.menuToggle()
    this.setState({showEnterEmailForNotifications: !this.state.showEnterEmailForNotifications})
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.register.finished_process && this.props.register.finished_process) {
      this.setState({showRegistration: false, showLogin: false})
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
    const token = guest.token || user.token
    const updates = {email: "forget@me.com", first_name: "forget", last_name: "me"}
    localStorage.clear()
    dispatch(forgetUser())
    dispatch(updateUser(updates, token))
  }
  showLoginToggle() {
    this.menuToggle()
    this.setState({showLogin: !this.state.showLogin})
  }
  showRegistrationToggle() {
    this.menuToggle()
    this.setState({showRegistration: !this.state.showRegistration})
  }
  render() {
    const { widget, guest, user, environment } = this.props
    const teamAvatarUrl = widget.initialConfig.channel.avatarUrl ? widget.initialConfig.channel.avatarUrl : null
    const teamChannelUrl = widget.initialConfig.channelUrl ||  "seaShells.com"
    const welcomeMessage = widget.initialConfig.content ? widget.initialConfig.content.welcomeMessage : "Hi there, thanks for checking out Chat Center, if you have any questions we will be happy to help, just let us know"
    const teamName = widget.initialConfig.content ? widget.initialConfig.content.teamName : ""
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
              <button type="submit" style={{ backgroundColor: widget.initialConfig.keyColor, height: "48px", borderRadius: "5px", color: "#FFFFFF", display: "flex", justifyContent: "center", width: "100%", borderStyle: "none"}}>
                <div style={{alignSelf: "center", fontSize: "15px"}}>Save Changes</div>
              </button>
            </div>
          </form>
        </div>
      </div>)
      const registration = (
        (<div className="widget-registration">
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
                <button type="submit" style={{ backgroundColor: widget.initialConfig.keyColor, height: "48px", borderRadius: "5px", color: "#FFFFFF", display: "flex", justifyContent: "center", width: "100%", borderStyle: "none"}}>
                  <div style={{alignSelf: "center", fontSize: "15px"}}>Save Changes</div>
                </button>
              </div>
            </form>
          </div>
        </div>)
      )

    return (
      <div className="header">
      {this.state.showEnterEmailForNotifications && enterInformationForNotificationsModal}
        <div className="header-arrow" onClick={this.props.onClose.bind(this)}>
          <FaAngleDown />
        </div>
        <div className="sign-in-to-chat-center" style={{color: widget.initialConfig.keyColor}}>
          <div onClick={this.menuToggle.bind(this)} style={{display: "flex", cursor: "pointer"}}>
            <SignInIcon style={{color: widget.initialConfig.keyColor}}/>
          </div>
        </div>
        <div>{this.state.showRegistration && <div className="widget-registration"><RegistrationRouter /></div>}</div>
        <div>{this.state.showLogin && <div className="widget-registration"><Login showLoginToggle={this.showLoginToggle.bind(this)} /></div>}</div>
        <div>{this.state.showMenu && <WidgetMenu widget={widget}
        user={user} guest={guest} forgetMe={this.forgetMe.bind(this)}
        menuToggle={this.menuToggle.bind(this)}
        showLoginToggle={this.showLoginToggle.bind(this)
        }
        showRegistrationToggle={this.showRegistrationToggle.bind(this)}
        />}</div>
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
