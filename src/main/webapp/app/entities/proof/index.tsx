import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Proof from './proof';
import ProofDetail from './proof-detail';
import ProofUpdate from './proof-update';
import ProofDeleteDialog from './proof-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProofUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProofUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProofDetail} />
      <ErrorBoundaryRoute path={match.url} component={Proof} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProofDeleteDialog} />
  </>
);

export default Routes;
