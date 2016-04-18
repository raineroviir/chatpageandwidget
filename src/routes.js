import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* containers */
import { App } from 'containers/App';
import { Home } from 'containers/Home';
import { Login } from 'containers/Login';
import Registration from 'containers/Registration';
import RegisterTeamStart from 'components/Register/Start';
import RegisterTeamName from 'components/Register/Team/Name';
import RegisterTeamDomain from 'components/Register/Team/Domain';
import RegisterTeamVerify from 'components/Register/Team/Verify';
import RegisterTeamPersonalDetail from 'components/Register/Team/Personal/Detail';
import RegisterTeamPersonalAddress from 'components/Register/Team/Personal/Address';

export default (
  <Route path="/" component={App}> 
    <IndexRoute component={Home} />
    <Route path="list" component={Home} />
    <Route path="login" component={Login} />
    <Route path="register" component={Registration} />
    <Route path="register/start" component={RegisterTeamStart} />
    <Route path="register/team/name" component={RegisterTeamName} />
    <Route path="register/team/domain" component={RegisterTeamDomain} />
    <Route path="register/team/verify" component={RegisterTeamVerify} />
    <Route path="register/team/personal/detail" component={RegisterTeamPersonalDetail} />
    <Route path="register/team/personal/address" component={RegisterTeamPersonalAddress} />
    <Route status={404} path="*" component={Home} />
  </Route>
);
