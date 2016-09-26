import React, { Component } from 'react'
import classNames from 'classnames'
import {FaAngleDown} from 'react-icons/lib/fa'
import {MdClose} from 'react-icons/lib/md'
export default class Header extends Component {
  backToConversationSummaryView() {
    this.props.backToConversationSummaryView()
  }
  render() {
    // console.log(this.props.activeConversation)
    // if (this.props.activeConversation || this.props.preparingToCreateConversation) {
    //   return (
    //     <div className="widget-header">
    //         <i onClick={this.backToConversationSummaryView.bind(this)} className={classNames("fa fa-angle-down fa-1 header-arrow")} aria-hidden="true"
    //         >
    //         </i>
    //       <div className="sign-in-to-chat-center">
    //         Sign in to Chat Center
    //       </div>
    //     </div>
    //   )
    // }
    return (
      <div className="widget-header">
        <div className="header-arrow" onClick={this.props.onResize.bind(this)}>
          <FaAngleDown />
        </div>
        <div className="sign-in-to-chat-center" style={{color: this.props.keyColor}}>
          Sign in to Chat Center
        </div>
        <div className="header-close"
        onClick={this.props.onClose.bind(this)}>
          <MdClose />
        </div>
      </div>
    )
  }
}
