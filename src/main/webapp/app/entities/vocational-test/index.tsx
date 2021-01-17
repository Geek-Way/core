import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VocationalTest from './vocational-test';
import VocationalTestDetail from './vocational-test-detail';
import VocationalTestUpdate from './vocational-test-update';
import VocationalTestDeleteDialog from './vocational-test-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VocationalTestUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VocationalTestUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VocationalTestDetail} />
      <ErrorBoundaryRoute path={match.url} component={VocationalTest} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VocationalTestDeleteDialog} />
  </>
);

export default Routes;
