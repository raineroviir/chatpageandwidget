import React, { Component } from 'react';

/* component styles */
//import { styles } from './styles.scss';

/* images */
const logo = require('./files/logo.png');

export class ChatMessage extends Component {
  render() {
    return (
        <div className="chat-group mCustomScrollBar">
          <ul className="chat-flow">
              <li className="col-md-12">
                <img className="img-circle pull-left" src="dist/user.png" title="name" alt="name" />
                <span className="bubble">
                  Hey, need some help
                </span>
              </li>
               <li className="col-md-12">
                <div className="bubble combine">
                  Hello are you there
                </div>
              </li>
              <li className="col-md-12">
                <img className="img-circle pull-right" src="dist/user.png" title="name" alt="name" />
                <div className="bubble bubble--alt">
                  Hey, so tell me, what is so cool about Chat Center?
                </div>
              </li>
              <li className="col-md-12">
                <img className="img-circle pull-left" src="dist/user.png" title="name" alt="name" />
                <div className="bubble">
                  Your service SUCKS!
                </div>
              </li>
              <li className="col-md-12">
                <div className="bubble combine">
                  Hey, need some help Hey, need some help Hey, need some help Hey, need some help
                </div>
              </li>
               <li className="col-md-12">
                <div className="bubble combine">
                  Hello are you there
                </div>
              </li>
              <li className="col-md-12">
                <img className="img-circle pull-right" src="dist/user.png" title="name" alt="name" />
                <div className="bubble bubble--alt">
                  Hey, so tell me, what is so cool about Chat Center?
                </div>
              </li>
              <li className="col-md-12">
                <img className="img-circle pull-left" src="dist/user.png" title="name" alt="name" />
                <div className="bubble">
                  Your service SUCKS!
                </div>
              </li>
              <li className="col-md-12">
                <div className="bubble combine">
                  Hey, need some help
                </div>
              </li>
               <li className="col-md-12">
                <div className="bubble combine">
                  Hello are you there
                </div>
              </li>
              <li className="col-md-12">
                <img className="img-circle pull-right" src="dist/user.png" title="name" alt="name" />
                <div className="bubble bubble--alt">
                  Hey, so tell me, what is so cool about Chat Center?
                </div>
              </li>
              <li className="col-md-12">
                <img className="img-circle pull-left" src="dist/user.png" title="name" alt="name" />
                <div className="bubble">
                  Your service SUCKS!
                </div>
              </li>
            </ul>
          </div>
    );
  }
}
