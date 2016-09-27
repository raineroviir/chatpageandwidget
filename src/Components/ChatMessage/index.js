import React, { Component } from 'react';

/* component styles */
import moment from 'moment';
import { styles } from './styles.scss';
let classNames = require("classnames");

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
    if (message.user_id === guest.data.id || user.data.id) {
      alignSelf = "flex-end"
    }
    return {
      alignSelf: alignSelf
    }
  }
  computeMessageBubbleColor(computedStyle) {
    console.log(computedStyle)
    const { widgetConfig } = this.props
    const otherPersonBubbleColor = "#eeeff0"
    let backgroundColor = otherPersonBubbleColor
    if (computedStyle.alignSelf === "flex-end") {
      backgroundColor = widgetConfig ? widgetConfig.keyColor :
      "#f7a444"
    }
    return {
      backgroundColor: backgroundColor
    }
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
            let msg =
            <div style={computedStyle} key={message.id} className={classNames("received-message fade-in", {
            'same-user': (lastuser === message.user_id && isShowDate && !relative_time)
            })}>
              <div className="chat-message">
                <div style={this.computeMessageBubbleColor(computedStyle)} className="message-bubble">
                  {message.text}
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
