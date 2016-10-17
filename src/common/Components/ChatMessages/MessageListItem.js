import React from 'react'
import {RightAlignedMessage} from './RightAlignedMessage'
import {LeftAlignedMessage} from './LeftAlignedMessage'
import moment from 'moment'
export class MessageListItem extends React.Component {
  render() {
    const { widget, msgs, index, message, currentUser, isGroupChat } = this.props
    const previousMessage = msgs[index - 1]
    const previousMessageUserId = previousMessage ? previousMessage.user_id : null
    const currentMessageUserId = message.user_id
    const checkForSameUser = currentMessageUserId !== previousMessageUserId
    const dateOne = moment(message.created_at)
    const dateTwo = moment(previousMessage ? previousMessage.created_at : null)
    const dateDiff = dateTwo.diff(dateOne, 'days')
    const humanizedMessageDate = moment(message.created_at).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM/YYYY'
    })
    const previousMessageHumanizedDate = previousMessage ?  moment(previousMessage.created_at).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM/YYYY'
    }) : null
    const dateSeparator = <div style={{padding: "5 0 0 0", margin: "5 0 0 0", display: 'flex', justifyContent: 'center', opacity: '0.6', borderTop: "0.5px solid"}}>{humanizedMessageDate}</div>
    if (message.user_id === currentUser) {
       return (<div>
       {dateDiff !== 0 ? dateSeparator : humanizedMessageDate !== previousMessageHumanizedDate ? dateSeparator : null}
       <RightAlignedMessage key={message.id} widget={widget} checkForSameUser={checkForSameUser} message={message} previousMessage={previousMessage} guest={this.props.guest} user={this.props.user}/>
      </div>)
    } else {
      return (<div>
       {dateDiff !== 0 ? dateSeparator : humanizedMessageDate !== previousMessageHumanizedDate ? dateSeparator : null}
      <LeftAlignedMessage key={message.id} widget={widget} checkForSameUser={checkForSameUser} message={message}
      isGroupChat={isGroupChat} handleUserEmailFromBot={this.props.handleUserEmailFromBot} emailReceived={this.props.emailReceived}
      guest={this.props.guest}
      previousMessage={previousMessage}
      user={this.props.user}/>
      </div>)
    }
  }
}
