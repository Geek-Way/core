import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './user-case-company.reducer';
import { IUserCaseCompany } from 'app/shared/model/user-case-company.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUserCaseCompanyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserCaseCompanyUpdate = (props: IUserCaseCompanyUpdateProps) => {
  const [userId, setUserId] = useState('0');
  const [companyId, setCompanyId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { userCaseCompanyEntity, users, companies, loading, updating } = props;

  const { description, content, feedback, devNotes } = userCaseCompanyEntity;

  const handleClose = () => {
    props.history.push('/user-case-company');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getCompanies();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.deadline = convertDateTimeToServer(values.deadline);

    if (errors.length === 0) {
      const entity = {
        ...userCaseCompanyEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="geekwaycoreApp.userCaseCompany.home.createOrEditLabel">
            <Translate contentKey="geekwaycoreApp.userCaseCompany.home.createOrEditLabel">Create or edit a UserCaseCompany</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : userCaseCompanyEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="user-case-company-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="user-case-company-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="typeCloneLabel" for="user-case-company-typeClone">
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.typeClone">Type Clone</Translate>
                </Label>
                <AvField id="user-case-company-typeClone" type="text" name="typeClone" />
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="user-case-company-name">
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.name">Name</Translate>
                </Label>
                <AvField
                  id="user-case-company-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="user-case-company-description">
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.description">Description</Translate>
                </Label>
                <AvInput
                  id="user-case-company-description"
                  type="textarea"
                  name="description"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="scoreLabel" for="user-case-company-score">
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.score">Score</Translate>
                </Label>
                <AvField id="user-case-company-score" type="string" className="form-control" name="score" />
              </AvGroup>
              <AvGroup>
                <Label id="contentLabel" for="user-case-company-content">
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.content">Content</Translate>
                </Label>
                <AvInput id="user-case-company-content" type="textarea" name="content" />
              </AvGroup>
              <AvGroup>
                <Label id="feedbackLabel" for="user-case-company-feedback">
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.feedback">Feedback</Translate>
                </Label>
                <AvInput id="user-case-company-feedback" type="textarea" name="feedback" />
              </AvGroup>
              <AvGroup>
                <Label id="devStatusLabel" for="user-case-company-devStatus">
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.devStatus">Dev Status</Translate>
                </Label>
                <AvField id="user-case-company-devStatus" type="text" name="devStatus" />
              </AvGroup>
              <AvGroup>
                <Label id="devNotesLabel" for="user-case-company-devNotes">
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.devNotes">Dev Notes</Translate>
                </Label>
                <AvInput id="user-case-company-devNotes" type="textarea" name="devNotes" />
              </AvGroup>
              <AvGroup>
                <Label id="feedbackStatusLabel" for="user-case-company-feedbackStatus">
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.feedbackStatus">Feedback Status</Translate>
                </Label>
                <AvField id="user-case-company-feedbackStatus" type="text" name="feedbackStatus" />
              </AvGroup>
              <AvGroup>
                <Label id="linkProjectLabel" for="user-case-company-linkProject">
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.linkProject">Link Project</Translate>
                </Label>
                <AvField id="user-case-company-linkProject" type="text" name="linkProject" />
              </AvGroup>
              <AvGroup>
                <Label id="deadlineLabel" for="user-case-company-deadline">
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.deadline">Deadline</Translate>
                </Label>
                <AvInput
                  id="user-case-company-deadline"
                  type="datetime-local"
                  className="form-control"
                  name="deadline"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.userCaseCompanyEntity.deadline)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="user-case-company-user">
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.user">User</Translate>
                </Label>
                <AvInput id="user-case-company-user" type="select" className="form-control" name="user.id">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.login}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="user-case-company-company">
                  <Translate contentKey="geekwaycoreApp.userCaseCompany.company">Company</Translate>
                </Label>
                <AvInput id="user-case-company-company" type="select" className="form-control" name="company.id">
                  <option value="" key="0" />
                  {companies
                    ? companies.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/user-case-company" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  companies: storeState.company.entities,
  userCaseCompanyEntity: storeState.userCaseCompany.entity,
  loading: storeState.userCaseCompany.loading,
  updating: storeState.userCaseCompany.updating,
  updateSuccess: storeState.userCaseCompany.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getCompanies,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserCaseCompanyUpdate);
