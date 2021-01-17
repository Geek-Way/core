import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserCaseCompany from './user-case-company';
import UserCaseCompanyDetail from './user-case-company-detail';
import UserCaseCompanyUpdate from './user-case-company-update';
import UserCaseCompanyDeleteDialog from './user-case-company-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserCaseCompanyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserCaseCompanyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserCaseCompanyDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserCaseCompany} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={UserCaseCompanyDeleteDialog} />
  </>
);

export default Routes;
