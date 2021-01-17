import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Carrer from './carrer';
import Course from './course';
import Proof from './proof';
import UserCaseCompany from './user-case-company';
import Company from './company';
import VocationalTest from './vocational-test';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}carrer`} component={Carrer} />
      <ErrorBoundaryRoute path={`${match.url}course`} component={Course} />
      <ErrorBoundaryRoute path={`${match.url}proof`} component={Proof} />
      <ErrorBoundaryRoute path={`${match.url}user-case-company`} component={UserCaseCompany} />
      <ErrorBoundaryRoute path={`${match.url}company`} component={Company} />
      <ErrorBoundaryRoute path={`${match.url}vocational-test`} component={VocationalTest} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
