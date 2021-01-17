import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { byteSize, Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './proof.reducer';
import { IProof } from 'app/shared/model/proof.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProofProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Proof = (props: IProofProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { proofList, match, loading } = props;
  return (
    <div>
      <h2 id="proof-heading">
        <Translate contentKey="geekwaycoreApp.proof.home.title">Proofs</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="geekwaycoreApp.proof.home.createLabel">Create new Proof</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {proofList && proofList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.proof.typeClone">Type Clone</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.proof.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.proof.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.proof.score">Score</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.proof.scoreLevel">Score Level</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.proof.content">Content</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.proof.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.proof.qoneQuest">Qone Quest</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.proof.qoneAsr">Qone Asr</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.proof.qoneOpt">Qone Opt</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.proof.qoneUsr">Qone Usr</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.proof.qtwoQuest">Qtwo Quest</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.proof.qtwoAsr">Qtwo Asr</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.proof.qtwoOpt">Qtwo Opt</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.proof.qtwoUsr">Qtwo Usr</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.proof.qtreQuest">Qtre Quest</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.proof.qtreAsr">Qtre Asr</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.proof.qtreOpt">Qtre Opt</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.proof.qtreUsr">Qtre Usr</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.proof.carrer">Carrer</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {proofList.map((proof, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${proof.id}`} color="link" size="sm">
                      {proof.id}
                    </Button>
                  </td>
                  <td>{proof.typeClone}</td>
                  <td>{proof.name}</td>
                  <td>{proof.description}</td>
                  <td>{proof.score}</td>
                  <td>{proof.scoreLevel}</td>
                  <td>{proof.content}</td>
                  <td>{proof.status}</td>
                  <td>{proof.qoneQuest}</td>
                  <td>{proof.qoneAsr}</td>
                  <td>{proof.qoneOpt}</td>
                  <td>{proof.qoneUsr}</td>
                  <td>{proof.qtwoQuest}</td>
                  <td>{proof.qtwoAsr}</td>
                  <td>{proof.qtwoOpt}</td>
                  <td>{proof.qtwoUsr}</td>
                  <td>{proof.qtreQuest}</td>
                  <td>{proof.qtreAsr}</td>
                  <td>{proof.qtreOpt}</td>
                  <td>{proof.qtreUsr}</td>
                  <td>{proof.carrer ? <Link to={`carrer/${proof.carrer.id}`}>{proof.carrer.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${proof.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${proof.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${proof.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="geekwaycoreApp.proof.home.notFound">No Proofs found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ proof }: IRootState) => ({
  proofList: proof.entities,
  loading: proof.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Proof);
