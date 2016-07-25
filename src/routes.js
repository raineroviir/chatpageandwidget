import React from 'react';
import { browserHistory, Route, IndexRoute } from 'react-router';

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
import Channel from 'containers/Channel/Index';
import ChannelCreate from 'containers/Channel/Create';
import ChannelMembers from 'containers/Channel/Members';

import Installation from 'components/Widget/Installation';
import Invitations from 'components/Widget/Invitations';
import Appearance from 'components/Widget/Appearance';
import Labels from 'components/Widget/Labels';
import Widget from 'containers/Widget';

import UpgradeVew from 'containers/Upgrade';
import UpgradePlans from 'components/Upgrade/UpgradePlans';
import UpgradeForm from 'components/Upgrade/UpgradeForm';
import UpgradeSuccess from 'components/Upgrade/UpgradeSuccess';




export default (
    
<Route path="/" component={App} > 
    <IndexRoute component={Login} />
    <Route path="dashboard">
        <IndexRoute component={Home} />
        <Route path="/dashboard/:channel" component={Home}/>
        <Route path="/dashboard/:channel/:conversation" component={Home}/>
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
    <Route path="channel/type" component={Channel} />
    <Route path="channel/create" component={ChannelCreate} />
    <Route path="channel/edit/:id" component={ChannelCreate} />
    <Route path="channel/members" component={ChannelMembers} />
    <Route path="channel/members/:id" component={ChannelMembers} />


    <Route path="upgrade" component={UpgradeVew}>
        <IndexRoute  component={UpgradePlans} />
        <Route path="plans" component={UpgradePlans}/>
        <Route path="form" component={UpgradeForm}/>
        <Route path="success" component={UpgradeSuccess}/>
    </Route>


    <Route path="widget" component={Widget}>
        <IndexRoute  component={Installation} />
        <Route path="installation" component={Installation}/>
        <Route path="appearance" component={Appearance}/>
        <Route path="invitations" component={Invitations}/>
        <Route path="labels" component={Labels}/>
    </Route>

    <Route path=":user">
        <IndexRoute component={Home} />
        <Route path=":user" component={Home}/>
    </Route>
    <Route status={404} path="*" component={Login} />

</Route>
  
);
