import React from 'react'
import classNames from 'classnames'
import defaultAvatarUrl from './files/avatar.png'
import moment from 'moment'
import Gravatar from 'react-gravatar'
export class RightAlignedMessage extends React.Component {
  computeMessageBubbleColor() {
    const { widget } = this.props
      const backgroundColor = widget? widget.initialConfig.keyColor :
      "#f7a444"
      const borderColor = widget ? `transparent transparent transparent ${widget.initialConfig.keyColor}` :
      "transparent transparent transparent #f7a444"
      const color = "#FFFFFF"
    return {
      backgroundColor: backgroundColor, //bubble color
      borderColor: borderColor, //bubble-arrow color
      color: color //font-color
    }
  }
  determineAvatar() {
    const { message, user, guest, widget } = this.props
    // if (!guest.token || !user.token) {
    //   return (
    //     <div style={{backgroundImage:  `url(${defaultAvatarUrl})`, backgroundRepeat: "no-repeat"}} className="avatar" />
    //   )
    // }
    if (guest.token) {
      if (guest.data.avatar_96 ||
      guest.data.avatar_384 ||
      guest.data.avatar_960) {
        return (
          <div style={{backgroundImage:  `url(${guest.data.avatar_96 ||
          guest.data.avatar_384 ||
          guest.data.avatar_960})`, backgroundRepeat: "no-repeat"}} className="avatar" />
        )
      }
      if (guest.data.email) {
        return (
          <div className="avatar">
            <Gravatar size={28} md5="" email={guest.data.email} />
          </div>
        )
      }
      if (guest.data.first_name && guest.data.last_name) {
        return (
          <div style={{borderRadius: "50%", width: "28px", height: "28px", backgroundColor: widget ? widget.initialConfig.keyColor : "#f7a444"}}>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", color: "white"}} className="avatar">{guest.data.first_name.slice(0, 1).toUpperCase()}{guest.data.last_name.slice(0, 1).toUpperCase()}</div>
          </div>
        )
      }
    }
    if (user.token) {
      if (user.data.avatar_96 ||
      user.data.avatar_384 ||
      user.data.avatar_960) {
        return (
          <div style={{backgroundImage:  `url(${user.data.avatar_96 ||
          user.data.avatar_384 ||
          user.data.avatar_960})`, backgroundRepeat: "no-repeat"}} className="avatar" />
        )
      }
      if (user.data.email) {
        return (
          <div className="avatar">
            <Gravatar size={28} md5="" email={user.data.email} />
          </div>
        )
      }
      if (user.data.first_name && user.data.last_name) {
        return (
          <div style={{borderRadius: "50%", width: "28px", height: "28px", backgroundColor: widget ? widget.initialConfig.keyColor : "#f7a444"}}>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", color: "white"}} className="avatar">{user.data.first_name.slice(0, 1).toUpperCase()}{user.data.last_name.slice(0, 1).toUpperCase()}</div>
          </div>
        )
      }
    }
  }
  render() {
    const { checkForSameUser, message, previousMessage, guest, user, nextMessage } = this.props
    const displayTimeSentPredicate = moment(message.created_at).diff(moment(previousMessage ? previousMessage.created_at : null) , 'seconds') > 120
    const displayedTime = moment(message.created_at).fromNow()
    const userEmail = guest.guest ? guest.data.email : user.data.email
    return (
      <div className={classNames("received-message fade-in, right-aligned-message")}>
        {checkForSameUser ? <div style={{alignSelf: "flex-end", padding: "0 56px 0 0"}}>
          You
        </div> : <div style={{padding: "4px 0 0 0"}}></div>}
        <div style={{padding: "0 56px 0 0", alignSelf: 'flex-end'}}>
        {displayTimeSentPredicate ? displayedTime : null}
        </div>
        <div style={{flexDirection: "row"}} className="chat-message">
          <div style={this.computeMessageBubbleColor()} className={classNames("message-bubble", checkForSameUser ? "bubble-arrow-right" : "")}>
            {message.text}
          </div>
          {checkForSameUser ? <div style={{padding: "3px 12px 0 8px"}} className="avatar-wrapper">
            {/* <div className="avatar">
              <Gravatar size={28} md5="" email={userEmail} />
            </div> */}
            {this.determineAvatar()}
          </div> : <div style={{padding: "0 48px 0 0"}}></div>}
        </div>
        {!nextMessage ? message.status ? message.status === "..." ?
        <div className="message-status">
          <div className="loading_dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        : <div className="message-status">
          {message.status}
        </div>
        : null : null}
      </div>
    )
  }
}
