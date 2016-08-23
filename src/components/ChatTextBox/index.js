import React, { Component } from 'react';
//import { Link } from 'react-router';

/* component styles */
import { styles } from './styles.scss';

export class ChatTextBox extends Component {
  createMessage(e){
    e.preventDefault();
    if(this.refs.Message.value == "") return;
    this.props.createMessage(this.refs.Message.value);
    this.refs.Message.value = "";
  }
  render() {
    return (
      <footer className="post-form-wrapper">
            <form onSubmit={ this.createMessage.bind(this)} className="post-form">
                <span className="attach-button-wrapper">
                  <span className="attach-button"></span>
                </span>

                <div className="message-input-wrapper">
                  <input ref="Message"
                  type="text"
                  className="message-input"
                  placeholder="Type here; '/' - commands, '@' - mentions"
                  aria-label="Type here; '/' - commands, '@' - mentions" />
                </div>
                <span className="submit-button-wrapper">
                  <button type="submit" className="submit-button"
                >Send</button>
                </span>
            </form>

       </footer>
    );
  }
}
