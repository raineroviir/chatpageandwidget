import React from 'react';
import { browserHistory, Route, IndexRoute } from 'react-router';

/* containers */
import App from './containers/App';
import Home from './containers/Home';
import Login from '../common/Containers/Login';

import Registration from '../common/Containers/Register';
import RegisterStart from '../common/Containers/Register';
import RegisterOrgName from '../common/Containers/Register/Organization/Name';
import RegisterOrgDomain from '../common/Containers/Register/Organization/Domain';
import RegisterOrgVerify from '../common/Containers/Register/Organization/Verify';
import RegisterOrgDetail from '../common/Containers/Register/Organization/Detail';
import RegisterOrgAddress from '../common/Containers/Register/Organization/Channel';

import OrgInvite from './components/Register/Organization/Invite';
import OrgJoin from './components/Register/Organization/Join';
import RegisterIndividual from './components/Register/Individual';
import RegisterIndividualDomain from './components/Register/Individual/Domain';
import Channel from './containers/Channel/Index';
import ChannelCreate from './containers/Channel/Create';
import ChannelMembers from './containers/Channel/Members';

import Installation from './components/Widget/Installation';
import Invitations from './components/Widget/Invitations';
import Appearance from './components/Widget/Appearance';
import Labels from './components/Widget/Labels';
import Widget from './containers/Widget';


import Settings from './containers/Settings';
import BillingPayment from './components/Settings/BillingPayment';
import PersonalSettings from './components/Settings/PersonalSettings';
import SettingsOrganization from './components/Settings/Organization';






import UpgradeVew from './containers/Upgrade';
import UpgradePlans from './components/Upgrade/UpgradePlans';
import UpgradeForm from './components/Upgrade/UpgradeForm';
import UpgradeSuccess from './components/Upgrade/UpgradeSuccess';
import TransactionHistory from './components/Upgrade/TransactionHistory';
import UpdateCard from './components/Upgrade/UpdateCard';

import RegisterJoinDetail from './containers/Registration/Join/Detail';
import RegisterJoinAddress from './containers/Registration/Join/Address';


export default (

<Route path="/" component={App} >
    <IndexRoute component={Login} />
    <Route path=".">
        <IndexRoute component={Home} />
        <Route path="/./:channel" component={Home}/>
        <Route path="/./:channel/:conversation" component={Home}/>
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
    <Route path="join/address" component={RegisterJoinAddress} />
    <Route path="join/:invite_token" component={RegisterJoinDetail} />

    <Route path="upgrade" component={UpgradeVew}>
        <IndexRoute  component={UpgradePlans} />
        <Route path="plans" component={UpgradePlans}/>
        <Route path="form" component={UpgradeForm}/>
        <Route path="success" component={UpgradeSuccess}/>
        <Route path="history" component={TransactionHistory}/>
        <Route path="update-card" component={UpdateCard}/>
    </Route>


    <Route path="widget" component={Widget}>
        <IndexRoute  component={Installation} />
        <Route path="installation" component={Installation}/>
        <Route path="appearance" component={Appearance}/>
        <Route path="invitations" component={Invitations}/>
        <Route path="labels" component={Labels}/>
    </Route>


    <Route path="settings" component={Settings}>
        <IndexRoute component={SettingsOrganization} />
        <Route path="organization" component={SettingsOrganization}/>
        <Route path="personal" component={PersonalSettings}/>
        <Route path="billing-payment" component={BillingPayment}/>
    </Route>

    <Route path=":user">
        <IndexRoute component={Home} />
        <Route path=":user" component={Home}/>
    </Route>
    <Route status={404} path="*" component={Login} />

</Route>

);
