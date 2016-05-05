import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* containers */
import { App } from 'containers/App';
import Home from 'containers/Home';
import Login from 'containers/Login';
import Registration from 'containers/Registration';
import RegisterStart from 'components/Register';
import RegisterOrgName from 'containers/Registration/Organization/Name';
import RegisterOrgDomain from 'containers/Registration/Organization/Domain';
import RegisterOrgVerify from 'containers/Registration/Organization/Verify';
import RegisterOrgDetail from 'containers/Registration/Organization/Detail';
import RegisterOrgAddress from 'containers/Registration/Organization/Address';
import OrgInvite from 'components/Register/Organization/Invite';
import OrgJoin from 'components/Register/Organization/Join';
import RegisterIndividual from 'components/Register/Individual';
import RegisterIndividualDomain from 'components/Register/Individual/Domain';

export default (
  <Route path="/" component={App}> 
    <IndexRoute component={Login} />
    <Route path="dashboard/:user">
        <IndexRoute component={Home} />
        <Route path="/dashboard/:user/:channel" component={Home}/>
    </Route>
    <Route path="login" component={Login} />
    <Route path="signup" component={Registration} />
    <Route path="signup/organization" component={RegisterStart} />
    <Route path="signup/organization/name" component={RegisterOrgName} />
    <Route path="signup/organization/domain" component={RegisterOrgDomain} />
    <Route path="signup/organization/verify" component={RegisterOrgVerify} />
    <Route path="signup/organization/detail" component={RegisterOrgDetail} />
    <Route path="signup/organization/address" component={RegisterOrgAddress} />
    <Route path="organization/invite" component={OrgInvite} />
    <Route path="organization/join" component={OrgJoin} />
    <Route path="signup/individual" component={RegisterIndividual} />
    <Route path="signup/individual/domain" component={RegisterIndividualDomain} />
    <Route status={404} path="*" component={Login} />

  </Route>
);
