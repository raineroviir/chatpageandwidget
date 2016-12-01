import React, { Component } from 'react'
import classNames from 'classnames'
import FaAngleDown from 'react-icons/lib/fa/angle-down'
import closeIcon from '../../../common/Components/images/x.svg'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {updateUser, forgetUser, initUser} from '../../../common/actions/user'
import WidgetSignInIcon from './WidgetSignInIcon'
import Register from '../../../common/Containers/Register'
import Login from '../../../common/Containers/Login'
import {RegistrationRouter} from '../RegistrationRouter'
import WidgetMenu from '../../Components/WidgetMenu'
import EditUserInfo from '../../Components/EditUserInfo'

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
  handleUserUpdate(updates) {
    const { dispatch, guest, user } = this.props
    let token = guest.token || user.token
    console.log(token)
    if (!token) {
      dispatch(initUser(updates))
      this.enterEmailForNotificationsToggle()
      return
    }
    dispatch(updateUser(updates, token))
    this.enterEmailForNotificationsToggle()
  }
  showLoginToggle(e) {
    this.menuToggle()
    this.setState({showLogin: !this.state.showLogin})
  }
  forgetMe() {
    const { dispatch, guest, user } = this.props
    const token = guest.token || user.token
    const updates = {email: "", first_name: "", last_name: ""}
    // dispatch(updateUser(updates, token))
    localStorage.removeItem("guest")
    localStorage.removeItem("orgs")
    dispatch(forgetUser())
  }
  showRegistrationToggle() {
    // this.menuToggle()
    // this.setState({showRegistration: !this.state.showRegistration})
  }
  signOut() {
    const { dispatch } = this.props
    localStorage.removeItem("token")
    dispatch(forgetUser())
  }
  render() {
    const { widget, guest, user, environment } = this.props
    const currentUserEmail = guest.guest ? guest.data.email : user.data.email
    const currentUserName = guest.guest ? guest.data.first_name : user.data.first_name
    return (
      <div className="header">
      {this.state.showEnterEmailForNotifications && <EditUserInfo handleUserUpdate={this.handleUserUpdate.bind(this)} {...this.props} />}
        <div className="header-arrow" onClick={this.props.onClose.bind(this)}>
          <FaAngleDown />
        </div>
        <div className="sign-in-to-chat-center" style={{color: widget.initialConfig.keyColor}}>
          <div onClick={this.menuToggle.bind(this)} style={{display: "flex", cursor: "pointer"}}>
            <WidgetSignInIcon style={{color: widget.initialConfig.keyColor}}/>
          </div>
        </div>
        <div>{this.state.showRegistration && <div className="widget-registration"><RegistrationRouter /></div>}</div>
        <div>{this.state.showLogin && <div className="widget-registration"><Login showLoginToggle={this.showLoginToggle.bind(this)} /></div>}</div>
        <div>{this.state.showMenu && <WidgetMenu widget={widget}
        user={user} guest={guest}
        signOut={this.signOut.bind(this)} forgetMe={this.forgetMe.bind(this)}
        menuToggle={this.menuToggle.bind(this)}
        showLoginToggle={this.showLoginToggle.bind(this)
        }
        handleUserUpdate={this.handleUserUpdate.bind(this)}
        enterEmailForNotificationsToggle={this.enterEmailForNotificationsToggle.bind(this)}
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
