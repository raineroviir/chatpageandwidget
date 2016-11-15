import React, { Component } from 'react';
import moment from 'moment';
import classNames from 'classnames';
/* component styles */
import { styles } from './styles.scss';

export class ConversationsView extends Component {
  selectConversation(conversation){
    console.log(conversation)
    this.props.selectConversation(conversation)
  }
 render() {
    let getConvresations = () => {
      if(!this.props.conversations || !this.props.conversations.length){
        return( <div className="chats-contacts">
          <ul>
          </ul>
        </div>
        )
      }
      return (
        <div className="chats-contacts">
          <ul>
            { this.props.conversations.map(conversation => {
              console.log(conversation)
              let activeConversation = this.props.activeConversation,
              userName = (conversation.last_message) ? (conversation.last_message.sender_name || conversation.last_message.user_id) : "User",
              avatarText = (conversation.last_message && conversation.last_message.sender_name) ? _.reduce(conversation.last_message.sender_name.split(" "), (res, a) => res + (a + "").charAt(0), "") : ("U" + (userName + "").charAt(0)),
              time = moment(conversation.updated_at),
              diff = moment().endOf("day").diff(moment(conversation.updated_at), "days", true),
              displayTime = (diff <= 1) ? time.format("LT") : (diff <= 2) ? "yesterday" : time.format("D MMM YYYY");
              return (
                <li key={conversation}
                onClick={this.selectConversation.bind(this, conversation)}
                className={ (activeConversation == conversation.id) ? "active" : ""}>
                  <a>
                    <img className={classNames("img-circle", { hide: !(conversation.last_message && conversation.last_message.sender_avatar)})} src={(conversation.last_message) ? conversation.last_message.sender_avatar : ""} title={conversation.name} alt={conversation.name} />
                    <span className={classNames("avatar", { hide: !!(conversation.last_message && conversation.last_message.sender_avatar)})}>{avatarText}</span>

                    <p className="name">
                      { (conversation.last_message) ? conversation.last_message.sender_name || ("User" + conversation.last_message.user_id) : "User user"}
                      <span className="time-wrapper">
                        {
                         /* <span className="available-status online"></span>*/
                        }
                        {displayTime}
                      </span>
                    </p>
                    <p className="message">
                    { (conversation.last_message) ? conversation.last_message.text : ""}
                    </p>
                    </a>
                  </li>
              );
            })
            }
          </ul>
        </div>
      );
    }

    return (<div className="chats-contacts-wrapper ZFBar">
            {getConvresations()}
    </div>);
  }
}
