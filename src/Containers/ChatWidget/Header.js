import React, { Component } from 'react'
import classNames from 'classnames'
import {FaAngleDown} from 'react-icons/lib/fa'
import {MdClose} from 'react-icons/lib/md'
import signInAvatar from './files/avatar.png'
import {MdInfo} from 'react-icons/lib/md'
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
    const menu = (
        <div className="menu">
          <div style={{textAlign: "left", padding: "3px 0 0 10px"}}>
            Enter email for notifications
          </div>
          <div className="menu-item">Sign in with chat.center</div>
          <div style={{color: "#000000"}} className="menu-item">Don't have an account?
          </div>
          <div style={{textAlign: "left", padding: "3px 0 0 10px"}}>Sign up</div>
        </div>
      )
    const info = (
      <div className="info">
        <div>
          Info tab contains channel URL, team avatar, etc.
          {widget.channelUrl}
          <div style={{backgroundImage: `url${widget.initialConfig.avatar ? widget.initialConfig.avatar.url : "" }`}}></div>
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
          <span>{this.state.showInfo && info}</span>
          <span>{this.state.showMenu && menu}</span>
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
      </div>
    )
  }
}
