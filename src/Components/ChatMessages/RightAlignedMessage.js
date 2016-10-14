import React from 'react'
import classNames from 'classnames'
import defaultAvatarUrl from './files/avatar.png'
import moment from 'moment'
import Gravatar from 'react-gravatar'
export class RightAlignedMessage extends React.Component {
  computeMessageBubbleColor() {
    const { widgetConfig } = this.props
      const backgroundColor = widgetConfig ? widgetConfig.keyColor :
      "#f7a444"
      const borderColor = widgetConfig ? `transparent transparent transparent ${widgetConfig.keyColor}` :
      "transparent transparent transparent #f7a444"
      const color = "#FFFFFF"
    return {
      backgroundColor: backgroundColor, //bubble color
      borderColor: borderColor, //bubble-arrow color
      color: color //font-color
    }
  }
  computeMessageBubbleSharing() {
    return {

    }
  }
  render() {
    const { checkForSameUser, message, previousMessage } = this.props
    const displayTimeSentPredicate = moment(message.created_at).diff(moment(previousMessage ? previousMessage.created_at : null) , 'seconds') > 120
    const displayedTime = moment(message.created_at).fromNow()
    return (
      <div className={classNames("received-message fade-in, right-aligned-message")}>
        {checkForSameUser ? <div style={{alignSelf: "flex-end", padding: "0 56px 0 0"}}>
          You
        </div> : <div style={{padding: "4px 0 0 0"}}></div>}
        <div style={{padding: "0 56px 0 0", alignSelf: 'flex-end'}}>
        {displayTimeSentPredicate ? displayedTime : null}
        </div>
        <div style={{flexDirection: "row"}} className="chat-message">
          <div style={this.computeMessageBubbleColor()} className={classNames("message-bubble", checkForSameUser ? "bubble-arrow-right" : "")}>
            {message.text}
          </div>
          {checkForSameUser ? <div style={{padding: "3px 12px 0 8px"}} className="avatar-wrapper">
            <div className="avatar">
              <Gravatar size="28" md5="" email="roviir@gmail.com" />
            </div>
          </div> : <div style={{padding: "0 48px 0 0"}}></div>}
        </div>
        {message.status ? message.status === "..." ?
        <div className="message-status">
          <div className="loading_dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        : <div className="message-status">
          {message.status}
        </div>
        : null }
      </div>
    )
  }
}
