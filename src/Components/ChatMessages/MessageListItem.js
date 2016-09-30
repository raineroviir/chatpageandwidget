import React from 'react'
import {RightAlignedMessage} from './RightAlignedMessage'
import {LeftAlignedMessage} from './LeftAlignedMessage'

export class MessageListItem extends React.Component {
  render() {
    const { widgetConfig, msgs, index, message, currentUser } = this.props
    const previousMessageUserId = msgs[index - 1] ? msgs[index - 1].user_id : null
    const currentMessageUserId = message.user_id
    const checkForSameUser = currentMessageUserId !== previousMessageUserId
    if (message.user_id === currentUser) {
       return <RightAlignedMessage key={message.id} widgetConfig={widgetConfig} checkForSameUser={checkForSameUser} message={message} />
    } else {
      return <LeftAlignedMessage key={message.id} widgetConfig={widgetConfig} checkForSameUser={checkForSameUser} message={message} />
    }
  }
}
