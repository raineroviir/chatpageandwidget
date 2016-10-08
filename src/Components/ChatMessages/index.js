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
    if (prevProps.messages.length !== this.props.messages.length) {
      if (node.children.length) {
        let totalHeight = 0;
        for (let i = 0; i < (node.children.length < 10 ? node.children.length : 10); i++) {
          totalHeight += node.children[i].offsetHeight
        }
        dispatch(saveTotalHeightOfHistoryMessages(totalHeight))
      }
    }
  }
  render() {
    const { messages, user, guest, widgetConfig, isGroupChat} = this.props
    const currentUser = guest.data.id || user.data.id
    if(this.props.channelError === true) {
      return (<div className="default-message">Channel not found</div>)
    }
    if(!this.props.channelError) {
      return (
        <div className="chat-messages">
          {messages.map((message, index, msgs) =>
            <MessageListItem
            widgetConfig={widgetConfig} message={message}
            key={message.id}
            index={index}
            msgs={msgs}
            currentUser={currentUser}
            isGroupChat={isGroupChat}
            handleUserEmailFromBot={this.props.handleUserEmailFromBot}
            />
          )}
        </div>
      )
    }
  }
}
