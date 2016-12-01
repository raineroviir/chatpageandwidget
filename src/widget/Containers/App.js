import React from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import ChatWidget from './ChatWidget/ChatWidget'
import { bindActionCreators } from 'redux'
import { styles } from './styles.scss'
import { initUser, fetchUserInfo } from '../../common/actions/user'
import { getWidget } from '../actions/widget'
import { initEnvironment, storeUserScrollPosition
 } from '../../common/actions/environment'
import { checkForConversation } from '../../common/actions/conversations'
import { createWidgetChannel, fetchChannelInfo, fetchChannel, fetchSocket, fetchChannelMembers } from '../../common/actions/channels'
import {createMessage} from '../../common/actions/messages'
import {widgetToggle} from '../../common/actions/environment'
import MiniWidget from '../Components/MiniWidget'
import ChatCenterLogo from '../../common/Components/svgs/ChatCenterLogo'
import moment from 'moment'
import Gravatar from 'react-gravatar'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      show: false,
      miniWidgetShow: true
    }
  }
  componentWillMount() {
    const { dispatch } = this.props
    dispatch({type: "BEGUN_INITIAL_LOADING"})
  }
  componentDidMount() {
    const { dispatch, channel_url } = this.props
    // clearing storage has its drawbacks as well for now it's off for testing
    // localStorage.clear()
    // setting some dummy data here for now while we get the actual data flow set up
    const data = {email: "placeholder"}
    const index = channel_url.indexOf('/')
    const channelname = channel_url.slice(index + 1)
    const team = channel_url.slice(0,index)
    dispatch(initEnvironment())
    dispatch(initUser(data))
    .then((token) => {
      dispatch(fetchSocket(token))
      dispatch(fetchChannel(channelname, team, token)).then((channel) => {
        dispatch(getWidget(channel.id, channel_url, token)).then(() => dispatch({type: "FINISHED_INITIAL_LOADING"}))
        dispatch(checkForConversation(channel.id, token))
        dispatch(fetchChannelMembers(token, channel.id))
        // dispatch({type: "STORE_CHANNEL_INFO", channelId: channel_id, channelUrl: channel_url})
      }).catch(error => console.log(error))
    }).catch(error => console.log(error))
  }
  onCloseMiniWidget() {
    this.setState({miniWidgetShow: !this.state.miniWidgetShow})
  }
  onToggle() {
    const { dispatch } = this.props
    this.setState({ show: !this.state.show });
    dispatch(widgetToggle())
  }
  determineConversationParticipants() {
    const { channels } = this.props
    console.log('************************************')
    console.log(channels.memoizedChannelMembers[channels.activeChannelId])
    const channelMembers = channels.memoizedChannelMembers[channels.activeChannelId]
    return channelMembers
  }
  determineAvatar(lastMessage) {
    const { widget } = this.props
    const conversationParticipants = this.determineConversationParticipants()
    console.log(conversationParticipants)
    const matchParticipantIdToMessageId = conversationParticipants.filter((participant) => {
      console.log(participant.id, lastMessage.user_id)
      return participant.id === lastMessage.user_id
    })
    // if (matchParticipantIdToMessageId.length === 0) {
    //   return (
    //     <div style={{backgroundImage:  `url(${defaultAvatarUrl})`, backgroundRepeat: "no-repeat"}}  />
    //   )
    // }
    // if (message.bot) {
    //   return (
    //     <div style={{backgroundImage:  `url(${defaultBotAvatarUrl})`, backgroundRepeat: "no-repeat"}}  />
    //   )
    // }
    console.log(matchParticipantIdToMessageId)
    if (matchParticipantIdToMessageId[0]) {
      if (matchParticipantIdToMessageId[0].avatar_96 ||
      matchParticipantIdToMessageId[0].avatar_384 ||
      matchParticipantIdToMessageId[0].avatar_960) {
        return (
          <div style={{backgroundImage:  `url(${matchParticipantIdToMessageId[0].avatar_96 ||
          matchParticipantIdToMessageId[0].avatar_384 ||
          matchParticipantIdToMessageId[0].avatar_960})`, backgroundRepeat: "no-repeat"}}  />
        )
      }
      if (matchParticipantIdToMessageId[0].email) {
        return (
          <div >
            <Gravatar default="mm" style={{borderRadius: "50%", borderColor: "white", borderStyle: "solid"}} size={48} md5="" email={matchParticipantIdToMessageId[0].email} />
          </div>
        )
      }
      if (matchParticipantIdToMessageId[0].first_name && matchParticipantIdToMessageId[0].last_name) {
        return (
          <div style={{borderRadius: "50%", width: "28px", height: "28px", backgroundColor: widget ? widget.initialConfig.keyColor : "#f7a444"}}>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", color: "white"}} >{matchParticipantIdToMessageId[0].first_name.slice(0, 1).toUpperCase()}{matchParticipantIdToMessageId[0].last_name.slice(0, 1).toUpperCase()}</div>
          </div>
        )
      }
    }
  }
  render() {
    const { widget, environment, messages, channels } = this.props
    if (environment.initialLoading) {
      return null
    }
    const lastMessage = messages.messagesWhileInactive ? messages.messagesWhileInactive[messages.messagesWhileInactive.length - 1] : null
    const teamChannelUrl = widget.initialConfig.channelUrl ||  "seaShells.com"
    // console.log(lastMessage.text)
    return (
      <div>
        {environment.inactive && messages.messagesWhileInactive.length > 0 && lastMessage.text &&
        <div className="proactive-notification-container">
          <div style={{display: "flex", flexDirection: "column"}}>
            {this.state.miniWidgetShow && <MiniWidget onToggle={this.onToggle.bind(this)} widget={widget} onClose={this.onCloseMiniWidget.bind(this)}/>}
            {this.state.miniWidgetShow && <div style={{alignSelf: "flex-end"}}>
              <div style={{padding: "10 0 0 0"}}></div>
              <div onClick={this.onToggle.bind(this)} style={{cursor: "pointer", borderRadius: "30px", width: "48px", height: "48px", boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)", backgroundColor: "white", alignSelf: "flex-end", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <ChatCenterLogo style={{width: "40px", height: "40px"}}/>
              </div>
              <div style={{padding: "40 0 0 0"}}></div>
            </div>
          }
          </div>
          <div style={{alignSelf: "flex-end", boxShadow: "0 1px 5px rgba(0, 50, 100, 0.25)", borderRadius: "5px", padding: "5px", margin: "0 0 0 20px"}}>
            <div>
              {lastMessage.text.length > 121 ? `${lastMessage.text.slice(0, 121).trim()}...` : `${lastMessage.text}`}
            </div>
          </div>
        </div>
        }
        {messages.messagesList.length === 0 ? <div className="minimized-welcome-message">
          {!this.state.show && this.state.miniWidgetShow && <MiniWidget  onToggle={this.onToggle.bind(this)} {...this.props} onClose={this.onCloseMiniWidget.bind(this)} />}
        </div> : null}
        {messages.messagesWhileInactive.length > 0 ? <div onClick={this.onToggle.bind(this)} style={{cursor: "pointer", top: "auto", left: "auto", bottom: "15px", right: "15px", position: "absolute"}}>{this.determineAvatar(lastMessage)}
          <div style={{top: "auto", left: "auto", bottom: "33px", right: "33px", position: "absolute", backgroundColor: widget.initialConfig.keyColor}} className="unread-message-bubble">
            <div style={{alignSelf: 'center'}}>{messages.messagesWhileInactive.length}</div>
          </div>
        </div> :
        <div className="chat-widget-button" style={{backgroundColor: widget.initialConfig.keyColor,
          backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}} onClick={this.onToggle.bind(this)}>
        </div>}
        {this.state.show && <ChatWidget onClose={this.onToggle.bind(this)} dispatch={this.props.dispatch} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { widget, environment, messages, guest, user, channels, conversations } = state
  return {
    widget,
    environment,
    messages,
    guest,
    user,
    channels,
    conversations
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
