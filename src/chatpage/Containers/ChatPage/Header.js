import React, { Component } from 'react'
import classNames from 'classnames'
import FaAngleDown from 'react-icons/lib/fa/angle-down'
import signInIcon from '../../../common/Components/images/group-3.svg'

import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {updateUser, forgetUser} from '../../../common/actions/user'
import SignInIcon from '../../../common/Components/svgs/SignInIcon'
import InfoIcon from '../../../common/Components/svgs/InfoIcon'
import Register from '../../../common/Containers/Register'
import Login from '../../../common/Containers/Login'
import {RegistrationRouter} from '../RegistrationRouter'
import ChatPageMenu from '../../Components/ChatPageMenu'
import closeIcon from '../../../common/Components/images/x.svg'

import EditUserInfo from '../../../common/Components/Menu/EditUserInfo'

import InfoPopUp from '../../Components/InfoPopUp'

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
      showRegistration: false,
      showLogin: false
    }
  }
  menuToggle() {
    this.setState({showMenu: !this.state.showMenu, showInfo: this.state.showInfo ? !this.state.showInfo : this.state.showInfo})
  }
  infoToggle() {
    this.setState({showInfo: !this.state.showInfo, showMenu: this.state.showMenu ? !this.state.showMenu : this.state.showMenu})
  }
  enterEmailForNotificationsToggle() {
    this.menuToggle()
    this.setState({showEnterEmailForNotifications: !this.state.showEnterEmailForNotifications})
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.register.finished_process && this.props.register.finished_process) {
      this.setState({showRegistration: false})
    }

    if (prevProps.login.loginRequest !== "success" && this.props.login.loginRequest === "success") {
      console.log("success")
      this.showLoginToggle()
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
  showLoginToggle(e) {
    this.menuToggle()
    this.setState({showLogin: !this.state.showLogin})
  }
  forgetMe() {
    // const { dispatch, guest, user } = this.props
    // const token = guest.token || user.token
    // const updates = {email: "", first_name: "", last_name: ""}
    // dispatch(updateUser(updates, token))
    // localStorage.removeItem("guest")
    // localStorage.removeItem("orgs")
    // dispatch(forgetUser())
  }
  handleCloseModal(e) {
    if (e.target.id === 'modal') {
      this.setState({
        showMenu: false,
        showInfo: false,
        showEnterEmailForNotifications: false,
        showRegistration: false,
        showLogin: false
      })
    }
  }
  signOut() {
    const { dispatch } = this.props
    localStorage.removeItem("token")
    dispatch(forgetUser())
  }
  showRegistrationToggle() {
    // this.menuToggle()
    // this.setState({showRegistration: !this.state.showRegistration})
  }
  render() {
    const { chatpage, guest, user, environment } = this.props
    const teamAvatarUrl = chatpage ? chatpage.initialConfig.channel.avatarUrl : null
    const teamChannelUrl = chatpage ? chatpage.initialConfig.channelUrl : "seaShells.com"
    const welcomeMessage = chatpage.initialConfig.content ? chatpage.initialConfig.content.welcomeMessage : "Hi there, thanks for checking out Chat Center, if you have any questions we will be happy to help, just let us know"
    const teamName = chatpage.initialConfig.content ? chatpage.initialConfig.content.teamName : ""
    const currentUserEmail = guest.guest ? guest.data.email : user.data.email
    const currentUserName = guest.guest ? guest.data.first_name : user.data.first_name
    const registration = (
      (<div className="chatpage-registration">
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
              <button type="submit" style={{ backgroundColor: chatpage ? chatpage.initialConfig.keyColor : "#f7a444", height: "48px", borderRadius: "5px", color: "#FFFFFF", display: "flex", justifyContent: "center", width: "100%", borderStyle: "none"}}>
                <div style={{alignSelf: "center", fontSize: "15px"}}>Save Changes</div>
              </button>
            </div>
          </form>
        </div>
      </div>)
    )
    return (
      <div className="header">
      {this.state.showEnterEmailForNotifications && <div id="modal" className="modal" onClick={this.handleCloseModal.bind(this)}>
        <EditUserInfo className="chatpage-userinfo-wrapper" enterEmailForNotificationsToggle={this.enterEmailForNotificationsToggle.bind(this)} handleUserUpdate={this.handleUserUpdate.bind(this)} chatpage={chatpage} currentUserEmail={currentUserEmail} currentUserName={currentUserName} />
      </div>}
        {this.props.environment.userScrollPosition > 150 && <div className="header-arrow" onClick={this.infoToggle.bind(this)}>
          <InfoIcon style={{backgroundColor: chatpage ? chatpage.initialConfig.keyColor : "#f7a444"}}/>
        </div>}
        <div className="sign-in-to-chat-center" style={{color: chatpage ? chatpage.initialConfig.keyColor : "#f7a444"}}>
          <div onClick={this.menuToggle.bind(this)} style={{display: "flex", cursor: "pointer"}}>
            <SignInIcon style={{color: chatpage ? chatpage.initialConfig.keyColor : "#f7a444"}}/>
          </div>
        </div>
        <div>{this.state.showLogin &&
          <div onClick={this.handleCloseModal.bind(this)} id="modal" className="modal">
            <div className="chatpage-registration"><Login /></div>
          </div>}
        </div>
        <div>{this.state.showRegistration && <div className="chatpage-registration"><RegistrationRouter /></div>}</div>
        {this.state.showMenu && <ChatPageMenu enterEmailForNotificationsToggle={this.enterEmailForNotificationsToggle.bind(this)} signOut={this.signOut.bind(this)} chatpage={chatpage}
        user={user} guest={guest} forgetMe={this.forgetMe.bind(this)}
        menuToggle={this.menuToggle.bind(this)}
        showLoginToggle={this.showLoginToggle.bind(this)}
        showRegistrationToggle={this.showRegistrationToggle.bind(this)} />}
        {this.state.showInfo && this.props.environment.userScrollPosition > 150 && <InfoPopUp {...this.props} />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user, guest, environment, register, chatpage, login } = state
  return {
    user,
    guest,
    chatpage,
    environment,
    register,
    login
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
