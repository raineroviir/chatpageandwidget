import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';
import classNames from 'classnames'
import { MessageListItem } from './MessageListItem'
import Waypoint from 'react-waypoint'
import ReactDOM from 'react-dom'

export class ChatMessages extends Component {
  constructor(props) {
    super(props)
    this.handleInfiniteLoad = this.handleInfiniteLoad.bind(this)
    this.state = {
      messages: this.buildElements(0, 20),
      isInifiniteLoading: false,
      containerHeight: 500
    }
  }
  componentDidMount() {
    const { dispatch, token, activeConversation } = this.props

    this.setState({
      containerHeight: ReactDOM.findDOMNode(this).scrollHeight
    })
  }
  buildElements(start, end) {
    return this.props.messages.slice(start, end)
  }
  handleInfiniteLoad() {
    console.log('loading more')
    this.setState({
      isInifiniteLoading: true
    })
    return new Promise((resolve, reject) => {
      const { dispatch } = this.props
      let messagesLength = this.state.messages.length
      let newMessages = this.buildElements(20, 20 + 10)
      this.setState({
        isInfiniteLoading: false,
        // messages: this.state.messages.slice(10, 20).concat(newMessages)
        })
      resolve()
   })
  }
  renderWaypoint() {
    if (!this.state.isInfiniteLoading) {
    console.log('rendering waypoint')
    return (
        <Waypoint topOffset="40px" bottomOffset="74.09px" onEnter={({previousPosition, currentPosition, event}) => {
          console.log(previousPosition, currentPosition, event)
          return this.handleInfiniteLoad()
        }}
        />
      )
    }
  }
  render() {
    const { messages, user, guest, widgetConfig } = this.props
    const currentUser = guest.data.id || user.data.id
    if(this.props.channelError === true) {
      return (<div className="default-message">Channel not found</div>)
    }
    if(messages && messages.length && !this.props.channelError) {
      return (
        <div className="chat-messages">
          {messages.map((message, index, msgs) =>
            <MessageListItem
            widgetConfig={widgetConfig}  message={message}
            key={message.id}
            index={index}
            msgs={msgs}
            currentUser={currentUser}/>
          )}
        </div>
      )
    }
  }
}
