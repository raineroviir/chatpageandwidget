import React, { Component, PropTypes } from 'react';
import { createMemoryHistory, Router, Route, IndexRoute } from 'react-router'

const history = createMemoryHistory("/")
import Index from "../../common/Containers/Register/index"
import RegisterOrgName from '../../common/Containers/Register/Organization/Name'

import RegisterOrgDomain from '../../common/Containers/Register/Organization/Domain';
import RegisterOrgVerify from '../../common/Containers/Register/Organization/Verify';
import RegisterOrgDetail from '../../common/Containers/Register/Organization/Detail';
import RegisterOrgChannel from '../../common/Containers/Register/Organization/Channel';
import RegisterIndividual from '../../common/Containers/Register/Individual'

export class RegistrationRouter extends Component {
  render() {
    return (
      <Router key={Math.random()} history={history}>
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
