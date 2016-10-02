import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';
import classNames from 'classnames'
import { MessageListItem } from './MessageListItem'
import Waypoint from 'react-waypoint'
import ReactDOM from 'react-dom'
import {saveTotalHeightOfHistoryMessages} from '../../actions/environment'

export class ChatMessages extends Component {
  componentDidUpdate() {
    const { dispatch } = this.props
    const node = ReactDOM.findDOMNode(this)
    console.log(node.children[0])
    let totalHeight = 0;
    for (let i = 0; i < 10; i++) {
      totalHeight += node.children[i].offsetHeight
    }
    dispatch(saveTotalHeightOfHistoryMessages(totalHeight))
  }
  render() {
    const { messages, user, guest, widgetConfig, currentChannelType } = this.props
    const currentUser = guest.data.id || user.data.id
    if(this.props.channelError === true) {
      return (<div className="default-message">Channel not found</div>)
    }
    if(!this.props.channelError) {
      return (
        <div className="chat-messages">
          {messages.map((message, index, msgs) =>
            <MessageListItem
            widgetConfig={widgetConfig}  message={message}
            key={message.id}
            index={index}
            msgs={msgs}
            currentUser={currentUser}
            currentChannelType={currentChannelType}/>
          )}
        </div>
      )
    }
  }
}
