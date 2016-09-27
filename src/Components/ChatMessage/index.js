import React, { Component } from 'react';

/* component styles */
import moment from 'moment';
import { styles } from './styles.scss';
import classNames from 'classnames'
import defaultAvatarUrl from './files/avatar.png'

export class ChatMessage extends Component {
  computeDate(date){
    if(!date) return false;
    let time = moment(date),
    diff = moment().endOf("day").diff(time, "days", true);
    return (diff <= 1) ? "today" : (diff <= 2) ? "yesterday" : time.format("D MMM YYYY")
  }
  computeMessageSidePlacement(message) {
    const { user, guest } = this.props
    let alignSelf = "flex-start"
    let flexDirection = "column-reverse"
    if (message.user_id === guest.data.id || user.data.id) {
      alignSelf = "flex-end"
      flexDirection = "column"
    }
    return {
      alignSelf: alignSelf,
      flexDirection: flexDirection
    }
  }
  computeMessageBubbleColor(computedStyle) {
    const { widgetConfig } = this.props
    const otherPersonBubbleColor = "#eeeff0"
    let backgroundColor = otherPersonBubbleColor
    let borderColor = "transparent #eeeff0 transparent transparent"
    if (computedStyle.alignSelf === "flex-end") {
      backgroundColor = widgetConfig ? widgetConfig.keyColor :
      "#f7a444"
      borderColor = widgetConfig ? `transparent transparent transparent ${widgetConfig.keyColor}` :
      "transparent transparent transparent #f7a444"
    }
    return {
      backgroundColor: backgroundColor, //bubble color
      borderColor: borderColor //bubble-arrow color
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
    return currentMessageUserId === guest.data.id || user.data.id ? "You" : message.sender_name
  }
  computeAvatar() {

  }
  getMessages(messages) {
    const user = this.props.user
    const guest = this.props.guest
    const lastuser = ""
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
              <div>
                {this.computeMessageDisplayName(currentMessageUserId, message)}
              </div>
              <div style={{flexDirection: computedStyle.alignSelf === "flex-start" ? "row-reverse" : "row"}} className="chat-message">
                <div style={this.computeMessageBubbleColor(computedStyle)} className={classNames("message-bubble",this.computeBubbleArrow(computedStyle, previousMessageUserId, currentMessageUserId))}>
                  {message.text}
                </div>
                <div style={{width: '28px', height: '28px', objectFit: 'contain', backgroundImage: `url(${defaultAvatarUrl})`}}>
                </div>
              </div>
            </div>
            return msg
          })}
        </div>
      )
    }
  }
  render() {
    let messages = this.props.messages;
    return (
      <div className="chat-messages-wrapper">
        {this.getMessages(messages)}
      </div>
    );
  }
}
