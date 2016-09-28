import React, { Component } from 'react';

/* component styles */
import moment from 'moment';
import { styles } from './styles.scss';
import classNames from 'classnames'
import defaultAvatarUrl from './files/avatar.png'
import defaultBotAvatarUrl from './files/defaultBotAvatar.png'
import { MdCheckCircle } from 'react-icons/lib/md'

export class ChatMessage extends Component {
  computeMessageSidePlacement(message) {
    const { user, guest } = this.props
    let alignSelf = "flex-start"
    let flexDirection = "column"
    let padding = "0 68px 0 0"
    if (message.user_id === 386) {
      alignSelf = "flex-end"
      flexDirection = "column"
      padding = "0 0 0 68px"
    }
    return {
      alignSelf: alignSelf,
      flexDirection: flexDirection,
      padding: padding
    }
  }
  computeMessageBubbleColor(computedStyle) {
    const { widgetConfig } = this.props
    const otherPersonBubbleColor = "#eeeff0"
    let color = "#333"
    let backgroundColor = otherPersonBubbleColor
    let borderColor = "transparent #eeeff0 transparent transparent"
    if (computedStyle.alignSelf === "flex-end") {
      backgroundColor = widgetConfig ? widgetConfig.keyColor :
      "#f7a444"
      borderColor = widgetConfig ? `transparent transparent transparent ${widgetConfig.keyColor}` :
      "transparent transparent transparent #f7a444"
      color = "#FFFFFF"
    }
    return {
      backgroundColor: backgroundColor, //bubble color
      borderColor: borderColor, //bubble-arrow color
      color: color //font-color
    }
  }
  computeBubbleArrow(computedStyle, previousMessageUserId, currentMessageUserId) {
    if (previousMessageUserId === currentMessageUserId) {
      return
    }
    return computedStyle.alignSelf === "flex-start" ? "bubble-arrow-left" : "bubble-arrow-right"
  }
  computeMessageDisplayName(currentMessageUserId, message) {
    const { user, guest } = this.props
    return currentMessageUserId === 386 ? "You" : message.sender_name
  }
  getMessages(messages) {
    const { user, guest, widgetConfig } = this.props
    if(this.props.channelError === true) {
      return (<div className="default-message">Channel not found</div>)
    }
    if( messages && messages.length && !this.props.channelError) {
      return (
        <div className="chat-messages">
          {messages.map((message, index, msgs) => {
            const computedStyle = this.computeMessageSidePlacement(message)
            const previousMessageUserId = msgs[index - 1] ? msgs[index - 1].user_id : null
            const currentMessageUserId = message.user_id
            const msg =
            <div style={computedStyle} key={message.id} className={classNames("received-message fade-in")}>
              {currentMessageUserId !== previousMessageUserId ? <div style={{alignSelf: computedStyle.alignSelf, padding: computedStyle.alignSelf === "flex-start" ? "0 0 0 56px" : "0 56px 0 0"}}>
                {this.computeMessageDisplayName(currentMessageUserId, message)}
              </div> : <div style={{padding: "4px 0 0 0"}}></div>}
              <div style={{flexDirection: computedStyle.alignSelf === "flex-start" ? "row-reverse" : "row"}} className="chat-message">
                <div style={this.computeMessageBubbleColor(computedStyle)} className={classNames("message-bubble",this.computeBubbleArrow(computedStyle, previousMessageUserId, currentMessageUserId))}>
                  {!message.containsInputBox ? message.text : <div style={{height: "32px", display: "flex"}}>
                    <input
                    type="text"
                    className="message-input"
                    placeholder="Enter your email"
                    aria-label="Enter your email" />
                  <MdCheckCircle style={{cursor: "pointer", padding: "0 0 0 4px", fontSize: "32px", color: widgetConfig ? widgetConfig.keyColor : "#f7a444"}} /></div>}
                </div>
                {currentMessageUserId !== previousMessageUserId ? <div style={{padding: computedStyle.alignSelf === "flex-start" ? "3px 8px 0 12px" : "3px 12px 0 8px"}} className="avatar-wrapper">
                  <div style={{backgroundImage: !message.bot ? `url(${defaultAvatarUrl})` : `url(${defaultBotAvatarUrl})`, backgroundRepeat: "no-repeat"}} className="avatar">
                  </div>
                </div> : <div style={{padding: computedStyle.alignSelf === "flex-start" ? "0 0 0 48px" : "0 48px 0 0"}}></div>}
              </div>
            </div>
            return msg
          })}
        </div>
      )
    }
  }
  render() {
    const messages = this.props.messages;
    return (
      <div className="chat-messages-wrapper">
        {this.getMessages(messages)}
      </div>
    );
  }
}
