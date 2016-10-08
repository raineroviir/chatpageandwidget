import React from 'react'
import classNames from 'classnames'
import defaultAvatarUrl from './files/avatar.png'
import defaultBotAvatarUrl from './files/defaultBotAvatar.png'
import { MdCheckCircle } from 'react-icons/lib/md'
import moment from 'moment'

export class LeftAlignedMessage extends React.Component {
  computeMessageBubbleColor() {
    const backgroundColor = "#eeeff0"
    const borderColor = "transparent transparent transparent #f7a444"
    const color = "#000000"
    return {
      backgroundColor: backgroundColor, //bubble color
      borderColor: borderColor, //bubble-arrow color
      color: color //font-color
    }
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.refs.emailInput.value == "") {
      return
    }
    this.props.handleUserEmailFromBot(this.refs.emailInput.value)
    this.refs.emailInput.value = ""
    console.log(this.refs.emailInput)
  }
  render() {
    const { checkForSameUser, message, widgetConfig, submittedEmail } = this.props
    const userEmail = "blahblah.com"
    return (
      <div className={classNames("received-message fade-in, left-aligned-message")}>
        {checkForSameUser ? <div style={{alignSelf: "flex-start", padding: "0 0 0 56px"}}>
          {message.sender_name}
        </div> : <div style={{padding: "4px 0 0 0"}}></div>}
        <div style={{flexDirection: "row-reverse"}} className="chat-message">
          <div style={this.computeMessageBubbleColor()} className={classNames("message-bubble", checkForSameUser ? "bubble-arrow-left" : "")}>
            {!message.attachment ? message.text : <div style={{height: "32px", display: "flex"}}>
              <form onSubmit={this.onSubmit.bind(this)}>
                <input
                type="text"
                ref="emailInput"
                className="email-input"
                placeholder="Enter your email"
                aria-label="Enter your email"
                />
              </form>
            <MdCheckCircle style={{cursor: "pointer", padding: "0 0 0 4px", fontSize: "32px", color: widgetConfig ? widgetConfig.keyColor : "#f7a444"}} /></div>}
          </div>
          {checkForSameUser ? <div style={{padding: "3px 8px 0 12px"}} className="avatar-wrapper">
            <div style={{backgroundImage: !message.bot ? `url(${defaultAvatarUrl})` : `url(${defaultBotAvatarUrl})`, backgroundRepeat: "no-repeat"}} className="avatar">
            </div>
          </div> : <div style={{padding: "0 0 0 48px"}}></div>}
        </div>
      </div>
    )
  }
}
