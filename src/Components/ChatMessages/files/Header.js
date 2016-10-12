import React, { Component } from 'react'
import classNames from 'classnames'
export default class Header extends Component {
  backToConversationSummaryView() {
    this.props.backToConversationSummaryView()
  }
  render() {
    // if (this.props.activeConversationId || this.props.preparingToCreateConversation) {
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
        <div className="header-arrow" onClick={this.props.onClick.bind(this)}>
          <i className="fa fa-angle-down fa-4"  aria-hidden="true">
          </i>
        </div>
        <div className="sign-in-to-chat-center">
          Sign in to Chat Center
        </div>
      </div>
    )
  }
}
