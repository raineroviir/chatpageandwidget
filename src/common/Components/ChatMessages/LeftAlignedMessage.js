import React from 'react'
import classNames from 'classnames'
import defaultAvatarUrl from './files/avatar.png'
import defaultBotAvatarUrl from './files/defaultBotAvatar.png'
import { MdCheck } from 'react-icons/lib/md/check'
import { MdCheckCircle} from 'react-icons/lib/md/check-circle'
import moment from 'moment'
import ReactDOM from 'react-dom'
import Gravatar from 'react-gravatar'

export class LeftAlignedMessage extends React.Component {
  computeMessageBubbleColor() {
    const { emailReceived, message, widget } = this.props
    let backgroundColor = "#eeeff0"
    if (emailReceived && message.bot && message.attachment) {
      backgroundColor = widget ? widget.initialConfig.keyColor : "#f7a444"
    }
    const borderColor = "transparent #eeeff0 transparent transparent"
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
  }
  render() {
    const { checkForSameUser, message, widget, emailReceived, guest, previousMessage } = this.props
    const userEmail = "blahblah.com"
    const displayTimeSentPredicate = moment(message.created_at).diff(moment(previousMessage ? previousMessage.created_at : null ), 'seconds') > 60
    const displayedTime = moment(message.created_at).fromNow()
    return (
      <div className={classNames("received-message fade-in, left-aligned-message")}>
        {checkForSameUser ? <div style={{alignSelf: "flex-start", padding: "0 0 0 56px"}}>
          {message.sender_name}
        </div> : <div style={{padding: "4px 0 0 0"}}></div>}
        <div style={{padding: "0 0 0 56px", alignSelf: 'flex-start'}}>
        {displayTimeSentPredicate ? displayedTime : null}
        </div>
        <div style={{flexDirection: "row-reverse"}} className="chat-message">
          <div style={this.computeMessageBubbleColor()} className={classNames("message-bubble", checkForSameUser ? "bubble-arrow-left" : "")}>
            {!message.attachment ? message.text : <div style={{height: "32px", display: "flex"}}>
              {emailReceived ?
              <div style={{display: "flex", color: "#FFFFFF", alignItems: "center"}}>
                {guest.data.email}
                <MdCheck style={{cursor: "pointer", padding: "0 0 0 10px", fontSize: "18px", color: "#FFFFFF"}} />
              </div> :
              <div style={{display: "flex"}}>
                <form onSubmit={this.onSubmit.bind(this)}>
                  <input
                  type="text"
                  ref="emailInput"
                  className="email-input"
                  placeholder="Enter your email"
                  aria-label="Enter your email"
                  />
                </form>
                <MdCheckCircle style={{cursor: "pointer", padding: "0 0 0 10px", fontSize: "32px", color: widget ? widget.initialConfig.keyColor : "#f7a444"}} />
              </div>
            }
            </div>
          }
          </div>
          {checkForSameUser ? <div style={{padding: "3px 8px 0 12px"}} className="avatar-wrapper">
            <div style={{backgroundImage: !message.bot ? `url(${defaultAvatarUrl})` : `url(${defaultBotAvatarUrl})`, backgroundRepeat: "no-repeat"}} className="avatar">
              {!message.bot &&
                <div className="avatar">
                <Gravatar size={28} md5="" email="r@gmail.com" />
              </div>
              }
            </div>
          </div> : <div style={{padding: "0 0 0 48px"}}></div>}
        </div>
      </div>
    )
  }
}
