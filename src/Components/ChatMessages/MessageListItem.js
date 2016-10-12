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
    const dateOne = moment(message.created_at)
    const dateTwo = moment(previousMessage ? previousMessage.created_at : null)
    const dateDiff = dateOne.diff(dateTwo, 'days')
    const dateSeparator = <div style={{display: 'flex', justifyContent: 'center', opacity: '0.6', borderTop: "0.5px solid"}}>{moment(message.created_at).calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'DD/MM/YYYY'
})}</div>
    if (message.user_id === currentUser) {
       return (<div>
        {dateDiff > 0 ? dateSeparator : null}
       <RightAlignedMessage key={message.id} widgetConfig={widgetConfig} checkForSameUser={checkForSameUser} message={message} />
      </div>)
    } else {
      return (<div>
       {dateDiff > 0 ? dateSeparator : null} <LeftAlignedMessage key={message.id} widgetConfig={widgetConfig} checkForSameUser={checkForSameUser} message={message}
      isGroupChat={isGroupChat} handleUserEmailFromBot={this.props.handleUserEmailFromBot} emailReceived={this.props.emailReceived}
      guest={this.props.guest}/>
      </div>)
    }
  }
}
