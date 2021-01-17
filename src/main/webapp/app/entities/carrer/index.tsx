import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Carrer from './carrer';
import CarrerDetail from './carrer-detail';
import CarrerUpdate from './carrer-update';
import CarrerDeleteDialog from './carrer-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CarrerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CarrerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CarrerDetail} />
      <ErrorBoundaryRoute path={match.url} component={Carrer} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CarrerDeleteDialog} />
  </>
);

export default Routes;
