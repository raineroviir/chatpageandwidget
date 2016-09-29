import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';
import classNames from 'classnames'
import { LeftAlignedMessage } from './LeftAlignedMessage'
import { RightAlignedMessage } from './RightAlignedMessage'

export class ChatMessage extends Component {
  getMessages(messages) {
    const { user, guest, widgetConfig } = this.props
    const currentUser = guest.data.id || user.data.id
    if(this.props.channelError === true) {
      return (<div className="default-message">Channel not found</div>)
    }
    if( messages && messages.length && !this.props.channelError) {
      return (
        <div className="chat-messages">
          {messages.map((message, index, msgs) => {
            const previousMessageUserId = msgs[index - 1] ? msgs[index - 1].user_id : null
            const currentMessageUserId = message.user_id
            let msg;
            if (message.user_id === currentUser) {
               msg = <RightAlignedMessage key={message.id} widgetConfig={widgetConfig} previousMessageUserId={previousMessageUserId} currentMessageUserId={currentMessageUserId} message={message} />
            } else {
              msg = <LeftAlignedMessage key={message.id} widgetConfig={widgetConfig} previousMessageUserId={previousMessageUserId} currentMessageUserId={currentMessageUserId} message={message} />
            }
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
