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
import Gravatar from 'react-gravatar'
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
  handleUserUpdate(updates) {
    const { dispatch, guest, user } = this.props
    const token = guest.token || user.token
    dispatch(updateUser(updates, token))
    this.enterEmailForNotificationsToggle()
  }
  showLoginToggle(e) {
    this.menuToggle()
    this.setState({showLogin: !this.state.showLogin})
  }
  forgetMe() {
    // disabled waiting to finish rest of this work before forgetMe
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
    // disabled waiting to finish rest of this work before registration
    // this.menuToggle()
    // this.setState({showRegistration: !this.state.showRegistration})
  }
  determineAvatar() {
    const { user, chatpage } = this.props
    if (user.token) {
      if (user.data.avatar_96 ||
      user.data.avatar_384 ||
      user.data.avatar_960) {
        return (
          <div style={{borderRadius: "50%", borderColor: this.state.showMenu ? chatpage ? chatpage.initialConfig.keyColor : "#f7a444" : "grey", borderStyle: "solid", backgroundImage:  `url(${user.data.avatar_96 ||
          user.data.avatar_384 ||
          user.data.avatar_960})`, backgroundRepeat: "no-repeat"}} className="avatar" />
        )

      }
      if (user.data.email) {
        return (
          <div className="avatar">
            <Gravatar default="mm" style={{borderRadius: "50%", borderColor: this.state.showMenu ? chatpage ? chatpage.initialConfig.keyColor : "#f7a444" : "grey", borderStyle: "solid"}} size={28} md5="" email={user.data.email} />
          </div>
        )
      }
      if (user.data.first_name && user.data.last_name) {
        return (
          <div style={{borderRadius: "50%", borderColor: this.state.showMenu ? chatpage ? chatpage.initialConfig.keyColor : "#f7a444" : "grey", borderStyle: "solid", width: "28px", height: "28px", backgroundColor: chatpage ? chatpage.initialConfig.keyColor : "#f7a444"}}>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", color: "white"}} className="avatar">{user.data.first_name.slice(0, 1).toUpperCase()}{user.data.last_name.slice(0, 1).toUpperCase()}</div>
          </div>
        )
      }
    }
  }
  render() {
    const { chatpage, guest, user, environment, channels } = this.props
    const currentUserEmail = guest.guest ? guest.data.email : user.data.email
    const currentUserName = guest.guest ? guest.data.first_name : user.data.first_name
    return (
      <div className="header">
      {this.state.showEnterEmailForNotifications && <div id="modal" className="modal" onClick={this.handleCloseModal.bind(this)}>
        <div style={{height: "480px"}}><EditUserInfo  className="chatpage-userinfo-wrapper" enterEmailForNotificationsToggle={this.enterEmailForNotificationsToggle.bind(this)} handleUserUpdate={this.handleUserUpdate.bind(this)} chatpage={chatpage} currentUserEmail={currentUserEmail} currentUserName={currentUserName} />
        </div>
      </div>}
        {this.props.environment.userScrollPosition > 150 && <div className="header-arrow" onClick={this.infoToggle.bind(this)}>
          <InfoIcon style={{backgroundColor: chatpage ? chatpage.initialConfig.keyColor : "#f7a444"}}/>
        </div>}
        <div className="sign-in-to-chat-center" style={{color: chatpage ? chatpage.initialConfig.keyColor : "#f7a444"}}>
          <div onClick={this.menuToggle.bind(this)} style={{display: "flex", cursor: "pointer"}}>
            {user.token ? this.determineAvatar() : <SignInIcon active={this.state.showMenu} style={{color: "white", activeColor: chatpage ? chatpage.initialConfig.keyColor : "#f7a444" }}/>}
          </div>
        </div>
        <div>{this.state.showLogin &&
          <div onClick={this.handleCloseModal.bind(this)} id="modal" className="modal">
            <div className="chatpage-registration"><Login showLoginToggle={this.showLoginToggle.bind(this)} /></div>
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
  const { user, guest, environment, register, chatpage, login, channels } = state
  return {
    user,
    guest,
    chatpage,
    environment,
    register,
    login,
    channels
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
