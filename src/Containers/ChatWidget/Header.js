import React, { Component } from 'react'
import classNames from 'classnames'
import {FaAngleDown} from 'react-icons/lib/fa'
import {MdClose} from 'react-icons/lib/md'
import signInAvatar from './files/avatar.png'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: false
    }
  }
  menuToggle() {
    this.setState({showMenu: !this.state.showMenu})
  }
  render() {
    const menu = (
        <div className="menu">
          <div style={{textAlign: "left", padding: "3px 0 0 10px"}}>
            Enter email for notifications
          </div>
          <div className="menu-item">Sign in with chat.center</div>
          <div className="menu-item">Don't have an account?
            <div style={{color: "inherit"}}>Sign up</div>
          </div>
        </div>
      )
    return (
      <div className="header">
        <div className="header-arrow" onClick={this.props.onResize.bind(this)}>
          <FaAngleDown />
        </div>
        <div className="sign-in-to-chat-center" style={{color: this.props.keyColor}}>
          <div style={{display: "flex"}}>
            {this.state.showMenu && menu}
          </div>
          <div style={{display: "flex"}}>
            <div onClick={this.menuToggle.bind(this)} style={{backgroundImage: `url(${signInAvatar})`, backgroundRepeat: "no-repeat"}} className="avatar">
          </div>
        </div>
        </div>
        <div className="header-close"
        onClick={this.props.onClose.bind(this)}>
          <MdClose />
        </div>
      </div>
    )
  }
}
