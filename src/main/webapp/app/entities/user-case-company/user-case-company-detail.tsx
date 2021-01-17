import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-case-company.reducer';
import { IUserCaseCompany } from 'app/shared/model/user-case-company.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserCaseCompanyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserCaseCompanyDetail = (props: IUserCaseCompanyDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { userCaseCompanyEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="geekwaycoreApp.userCaseCompany.detail.title">UserCaseCompany</Translate> [<b>{userCaseCompanyEntity.id}</b>
          ]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="typeClone">
              <Translate contentKey="geekwaycoreApp.userCaseCompany.typeClone">Type Clone</Translate>
            </span>
          </dt>
          <dd>{userCaseCompanyEntity.typeClone}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="geekwaycoreApp.userCaseCompany.name">Name</Translate>
            </span>
          </dt>
          <dd>{userCaseCompanyEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="geekwaycoreApp.userCaseCompany.description">Description</Translate>
            </span>
          </dt>
          <dd>{userCaseCompanyEntity.description}</dd>
          <dt>
            <span id="score">
              <Translate contentKey="geekwaycoreApp.userCaseCompany.score">Score</Translate>
            </span>
          </dt>
          <dd>{userCaseCompanyEntity.score}</dd>
          <dt>
            <span id="content">
              <Translate contentKey="geekwaycoreApp.userCaseCompany.content">Content</Translate>
            </span>
          </dt>
          <dd>{userCaseCompanyEntity.content}</dd>
          <dt>
            <span id="feedback">
              <Translate contentKey="geekwaycoreApp.userCaseCompany.feedback">Feedback</Translate>
            </span>
          </dt>
          <dd>{userCaseCompanyEntity.feedback}</dd>
          <dt>
            <span id="devStatus">
              <Translate contentKey="geekwaycoreApp.userCaseCompany.devStatus">Dev Status</Translate>
            </span>
          </dt>
          <dd>{userCaseCompanyEntity.devStatus}</dd>
          <dt>
            <span id="devNotes">
              <Translate contentKey="geekwaycoreApp.userCaseCompany.devNotes">Dev Notes</Translate>
            </span>
          </dt>
          <dd>{userCaseCompanyEntity.devNotes}</dd>
          <dt>
            <span id="feedbackStatus">
              <Translate contentKey="geekwaycoreApp.userCaseCompany.feedbackStatus">Feedback Status</Translate>
            </span>
          </dt>
          <dd>{userCaseCompanyEntity.feedbackStatus}</dd>
          <dt>
            <span id="linkProject">
              <Translate contentKey="geekwaycoreApp.userCaseCompany.linkProject">Link Project</Translate>
            </span>
          </dt>
          <dd>{userCaseCompanyEntity.linkProject}</dd>
          <dt>
            <span id="deadline">
              <Translate contentKey="geekwaycoreApp.userCaseCompany.deadline">Deadline</Translate>
            </span>
          </dt>
          <dd>
            {userCaseCompanyEntity.deadline ? (
              <TextFormat value={userCaseCompanyEntity.deadline} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="geekwaycoreApp.userCaseCompany.user">User</Translate>
          </dt>
          <dd>{userCaseCompanyEntity.user ? userCaseCompanyEntity.user.login : ''}</dd>
          <dt>
            <Translate contentKey="geekwaycoreApp.userCaseCompany.company">Company</Translate>
          </dt>
          <dd>{userCaseCompanyEntity.company ? userCaseCompanyEntity.company.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/user-case-company" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-case-company/${userCaseCompanyEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ userCaseCompany }: IRootState) => ({
  userCaseCompanyEntity: userCaseCompany.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserCaseCompanyDetail);
