import React from 'react'
import classNames from 'classnames'
import defaultAvatarUrl from './files/avatar.png'

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
  render() {
    const { checkForSameUser, message } = this.props
    return (
      <div className={classNames("received-message fade-in, right-aligned-message")}>
        {checkForSameUser ? <div style={{alignSelf: "flex-end", padding: "0 56px 0 0"}}>
          You
        </div> : <div style={{padding: "4px 0 0 0"}}></div>}
        <div style={{flexDirection: "row"}} className="chat-message">
          <div style={this.computeMessageBubbleColor()} className={classNames("message-bubble", checkForSameUser ? "bubble-arrow-right" : "")}>
            {message.text}
          </div>
          {checkForSameUser ? <div style={{padding: "3px 12px 0 8px"}} className="avatar-wrapper">
            <div style={{backgroundImage: `url(${defaultAvatarUrl})`, backgroundRepeat: "no-repeat"}} className="avatar">
            </div>
          </div> : <div style={{padding: "0 48px 0 0"}}></div>}
        </div>
      </div>
    )
  }
}
