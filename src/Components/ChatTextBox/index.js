import React, { Component } from 'react';
import { styles } from './styles.scss';

export class ChatTextBox extends Component {
  createMessage(e) {
    e.preventDefault();
    if(this.refs.Message.value == "") return;
    this.props.createMessage(this.refs.Message.value);
    this.refs.Message.value = "";
  }
  render() {
    const { widget } = this.props
    return (
      <div className="post-form-wrapper">
        <form onSubmit={this.createMessage.bind(this)} className="post-form">
          <span className="attach-button"></span>
          <div className="message-input-wrapper">
            <input ref="Message"
            type="text"
            className="message-input"
            placeholder={widget.initialConfig.content ? widget.initialConfig.content.inputMsgholder : "Type here; '/' - commands, '@' - mentions"}
            aria-label={widget.initialConfig.content ? widget.initialConfig.content.inputMsgholder : "Type here; '/' - commands, '@' - mentions"} />
          </div>
          <button type="submit" className="submit-button" style={{color: this.props.keyColor}}>
            {widget.initialConfig.content ? widget.initialConfig.content.sendBtnText : "Send" }
          </button>
        </form>
      </div>
    );
  }
}
