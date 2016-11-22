import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';
import classNames from 'classnames'
import { MessageListItem } from './MessageListItem'
import Waypoint from 'react-waypoint'
import ReactDOM from 'react-dom'
import {saveTotalHeightOfHistoryMessages} from '../../actions/environment'

export class ChatMessages extends Component {
  componentDidUpdate(prevProps) {
    const { dispatch } = this.props
    const node = ReactDOM.findDOMNode(this)
    if (prevProps.messagesList.length !== this.props.messagesList.length) {
      if (node && node.children.length) {
        let totalHeight = 0;
        for (let i = 0; i < (node.children.length < 10 ? node.children.length : 10); i++) {
          totalHeight += node.children[i].offsetHeight
        }
        dispatch(saveTotalHeightOfHistoryMessages(totalHeight))
      }
    }
  }
  render() {
    const { messagesList, user, guest, widget, isGroupChat, channels } = this.props
    const currentUser = guest.token ? guest.data.id : user.data.id
    let activeChannelObject = channels.channels.all.filter((channel) => {
      console.log(channel.id, channels.activeChannelId)
      return channel.id === channels.activeChannelId
    })
    let conversationParticipants = activeChannelObject[0].conversation.users
    if (this.props.channelError === true) {
      return (<div className="default-message">Channel not found</div>)
    }
    if (!this.props.channelError) {
      return (
        <div className="chat-messages">
          {messagesList.map((message, index, msgs) =>
            {
              if (!message) {
                return
              }
              return <MessageListItem
                widget={widget} message={message}
                key={message.id}
                index={index}
                msgs={msgs}
                currentUser={currentUser}
                isGroupChat={isGroupChat}
                handleUserEmailFromBot={this.props.handleUserEmailFromBot}
                emailReceived={this.props.emailReceived}
                guest={guest}
                user={user}
                conversationParticipants={conversationParticipants}
              />
            }
          )}
        </div>
      )
    }
  }
}
