import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { byteSize, Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './user-case-company.reducer';
import { IUserCaseCompany } from 'app/shared/model/user-case-company.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserCaseCompanyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const UserCaseCompany = (props: IUserCaseCompanyProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { userCaseCompanyList, match, loading } = props;
  return (
    <div>
      <h2 id="user-case-company-heading">
        <Translate contentKey="geekwaycoreApp.userCaseCompany.home.title">User Case Companies</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="geekwaycoreApp.userCaseCompany.home.createLabel">Create new User Case Company</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {userCaseCompanyList && userCaseCompanyList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.typeClone">Type Clone</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.score">Score</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.content">Content</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.feedback">Feedback</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.devStatus">Dev Status</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.devNotes">Dev Notes</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.feedbackStatus">Feedback Status</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.linkProject">Link Project</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.deadline">Deadline</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.user">User</Translate>
                </th>
                <th>
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.company">Company</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userCaseCompanyList.map((userCaseCompany, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${userCaseCompany.id}`} color="link" size="sm">
                      {userCaseCompany.id}
                    </Button>
                  </td>
                  <td>{userCaseCompany.typeClone}</td>
                  <td>{userCaseCompany.name}</td>
                  <td>{userCaseCompany.description}</td>
                  <td>{userCaseCompany.score}</td>
                  <td>{userCaseCompany.content}</td>
                  <td>{userCaseCompany.feedback}</td>
                  <td>{userCaseCompany.devStatus}</td>
                  <td>{userCaseCompany.devNotes}</td>
                  <td>{userCaseCompany.feedbackStatus}</td>
                  <td>{userCaseCompany.linkProject}</td>
                  <td>
                    {userCaseCompany.deadline ? <TextFormat type="date" value={userCaseCompany.deadline} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{userCaseCompany.user ? userCaseCompany.user.login : ''}</td>
                  <td>
                    {userCaseCompany.company ? <Link to={`company/${userCaseCompany.company.id}`}>{userCaseCompany.company.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${userCaseCompany.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userCaseCompany.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userCaseCompany.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="geekwaycoreApp.userCaseCompany.home.notFound">No User Case Companies found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ userCaseCompany }: IRootState) => ({
  userCaseCompanyList: userCaseCompany.entities,
  loading: userCaseCompany.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserCaseCompany);
