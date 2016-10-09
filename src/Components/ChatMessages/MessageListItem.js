import React from 'react'
import {RightAlignedMessage} from './RightAlignedMessage'
import {LeftAlignedMessage} from './LeftAlignedMessage'
import moment from 'moment'
export class MessageListItem extends React.Component {
  render() {
    const { widgetConfig, msgs, index, message, currentUser, isGroupChat } = this.props
    const previousMessage = msgs[index - 1]
    const previousMessageUserId = previousMessage ? previousMessage.user_id : null
    const currentMessageUserId = message.user_id
    const checkForSameUser = currentMessageUserId !== previousMessageUserId
    // console.log(moment(message.created_at).fromNow())
    const dateSeparator = <div style={{borderTop: "2px solid"}}></div>
    if (message.user_id === currentUser) {
       return <RightAlignedMessage key={message.id} widgetConfig={widgetConfig} checkForSameUser={checkForSameUser} message={message} />
    } else {
      return <LeftAlignedMessage key={message.id} widgetConfig={widgetConfig} checkForSameUser={checkForSameUser} message={message}
      isGroupChat={isGroupChat} handleUserEmailFromBot={this.props.handleUserEmailFromBot}/>
    }
  }
}
