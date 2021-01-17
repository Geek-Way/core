import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { byteSize, Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './vocational-test.reducer';
import { IVocationalTest } from 'app/shared/model/vocational-test.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVocationalTestProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const VocationalTest = (props: IVocationalTestProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { vocationalTestList, match, loading } = props;
  return (
    <div>
      <h2 id="vocational-test-heading">
        <Translate contentKey="geekwaycoreApp.vocationalTest.home.title">Vocational Tests</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="geekwaycoreApp.vocationalTest.home.createLabel">Create new Vocational Test</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {vocationalTestList && vocationalTestList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.vocationalTest.typeClone">Type Clone</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.vocationalTest.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.vocationalTest.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.vocationalTest.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.vocationalTest.carrer">Carrer</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vocationalTestList.map((vocationalTest, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${vocationalTest.id}`} color="link" size="sm">
                      {vocationalTest.id}
                    </Button>
                  </td>
                  <td>{vocationalTest.typeClone}</td>
                  <td>{vocationalTest.name}</td>
                  <td>{vocationalTest.description}</td>
                  <td>{vocationalTest.status}</td>
                  <td>{vocationalTest.carrer}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${vocationalTest.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vocationalTest.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vocationalTest.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="geekwaycoreApp.vocationalTest.home.notFound">No Vocational Tests found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ vocationalTest }: IRootState) => ({
  vocationalTestList: vocationalTest.entities,
  loading: vocationalTest.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VocationalTest);
