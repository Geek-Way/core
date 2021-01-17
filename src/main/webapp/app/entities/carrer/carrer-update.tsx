import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IVocationalTest } from 'app/shared/model/vocational-test.model';
import { getEntities as getVocationalTests } from 'app/entities/vocational-test/vocational-test.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './carrer.reducer';
import { ICarrer } from 'app/shared/model/carrer.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICarrerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CarrerUpdate = (props: ICarrerUpdateProps) => {
  const [vocationalTestId, setVocationalTestId] = useState('0');
  const [userId, setUserId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { carrerEntity, vocationalTests, users, loading, updating } = props;

  const { description } = carrerEntity;

  const handleClose = () => {
    props.history.push('/carrer');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getVocationalTests();
    props.getUsers();
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
    if (errors.length === 0) {
      const entity = {
        ...carrerEntity,
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
          <h2 id="geekwaycoreApp.carrer.home.createOrEditLabel">
            <Translate contentKey="geekwaycoreApp.carrer.home.createOrEditLabel">Create or edit a Carrer</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : carrerEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="carrer-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="carrer-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="typeCloneLabel" for="carrer-typeClone">
                  <Translate contentKey="geekwaycoreApp.carrer.typeClone">Type Clone</Translate>
                </Label>
                <AvField id="carrer-typeClone" type="text" name="typeClone" />
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="carrer-name">
                  <Translate contentKey="geekwaycoreApp.carrer.name">Name</Translate>
                </Label>
                <AvField
                  id="carrer-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="carrer-description">
                  <Translate contentKey="geekwaycoreApp.carrer.description">Description</Translate>
                </Label>
                <AvInput
                  id="carrer-description"
                  type="textarea"
                  name="description"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="scoreLabel" for="carrer-score">
                  <Translate contentKey="geekwaycoreApp.carrer.score">Score</Translate>
                </Label>
                <AvField id="carrer-score" type="string" className="form-control" name="score" />
              </AvGroup>
              <AvGroup>
                <Label id="scoreLevelLabel" for="carrer-scoreLevel">
                  <Translate contentKey="geekwaycoreApp.carrer.scoreLevel">Score Level</Translate>
                </Label>
                <AvField id="carrer-scoreLevel" type="text" name="scoreLevel" />
              </AvGroup>
              <AvGroup>
                <Label for="carrer-vocationalTest">
                  <Translate contentKey="geekwaycoreApp.carrer.vocationalTest">Vocational Test</Translate>
                </Label>
                <AvInput id="carrer-vocationalTest" type="select" className="form-control" name="vocationalTest.id">
                  <option value="" key="0" />
                  {vocationalTests
                    ? vocationalTests.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="carrer-user">
                  <Translate contentKey="geekwaycoreApp.carrer.user">User</Translate>
                </Label>
                <AvInput id="carrer-user" type="select" className="form-control" name="user.id">
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
              <Button tag={Link} id="cancel-save" to="/carrer" replace color="info">
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
  vocationalTests: storeState.vocationalTest.entities,
  users: storeState.userManagement.users,
  carrerEntity: storeState.carrer.entity,
  loading: storeState.carrer.loading,
  updating: storeState.carrer.updating,
  updateSuccess: storeState.carrer.updateSuccess,
});

const mapDispatchToProps = {
  getVocationalTests,
  getUsers,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CarrerUpdate);
