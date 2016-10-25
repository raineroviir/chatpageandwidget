import React, { Component, PropTypes } from 'react';
import { createMemoryHistory, Router, Route, IndexRoute } from 'react-router'

const history = createMemoryHistory("/")
import Index from "./index"
import RegisterOrgName from './Organization/Name'

import RegisterOrgDomain from './Organization/Domain';
import RegisterOrgVerify from './Organization/Verify';
import RegisterOrgDetail from './Organization/Detail';
import RegisterOrgChannel from './Organization/Channel';
import RegisterIndividual from './Individual'

export class RegistrationRouter extends Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/" component={Index}/>
        <Route path="individual" component={RegisterIndividual} />
        <Route path="orgname" component={RegisterOrgName} />
        <Route path="orgaddress" component={RegisterOrgChannel} />
        <Route path="orgdetail" component={RegisterOrgDetail} />
        <Route path="orgverify" component={RegisterOrgVerify} />
        <Route path="orgdomain" component={RegisterOrgDomain} />
      </Router>
    )
  }
}
