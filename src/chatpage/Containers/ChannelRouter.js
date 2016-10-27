import React, { Component, PropTypes } from 'react';
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import Messages from '../../common/Containers/Messaging/Messages'

export class ChannelRouter extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/*" component={Messages} />
      </Router>
    )
  }
}
