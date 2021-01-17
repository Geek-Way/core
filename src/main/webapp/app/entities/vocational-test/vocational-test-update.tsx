import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './vocational-test.reducer';
import { IVocationalTest } from 'app/shared/model/vocational-test.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVocationalTestUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VocationalTestUpdate = (props: IVocationalTestUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { vocationalTestEntity, loading, updating } = props;

  const { description } = vocationalTestEntity;

  const handleClose = () => {
    props.history.push('/vocational-test');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
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
        ...vocationalTestEntity,
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
          <h2 id="geekwaycoreApp.vocationalTest.home.createOrEditLabel">
            <Translate contentKey="geekwaycoreApp.vocationalTest.home.createOrEditLabel">Create or edit a VocationalTest</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : vocationalTestEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="vocational-test-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="vocational-test-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="typeCloneLabel" for="vocational-test-typeClone">
                  <Translate contentKey="geekwaycoreApp.vocationalTest.typeClone">Type Clone</Translate>
                </Label>
                <AvField id="vocational-test-typeClone" type="text" name="typeClone" />
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="vocational-test-name">
                  <Translate contentKey="geekwaycoreApp.vocationalTest.name">Name</Translate>
                </Label>
                <AvField
                  id="vocational-test-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="vocational-test-description">
                  <Translate contentKey="geekwaycoreApp.vocationalTest.description">Description</Translate>
                </Label>
                <AvInput
                  id="vocational-test-description"
                  type="textarea"
                  name="description"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="vocational-test-status">
                  <Translate contentKey="geekwaycoreApp.vocationalTest.status">Status</Translate>
                </Label>
                <AvField id="vocational-test-status" type="text" name="status" />
              </AvGroup>
              <AvGroup>
                <Label id="carrerLabel" for="vocational-test-carrer">
                  <Translate contentKey="geekwaycoreApp.vocationalTest.carrer">Carrer</Translate>
                </Label>
                <AvField id="vocational-test-carrer" type="text" name="carrer" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/vocational-test" replace color="info">
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
  vocationalTestEntity: storeState.vocationalTest.entity,
  loading: storeState.vocationalTest.loading,
  updating: storeState.vocationalTest.updating,
  updateSuccess: storeState.vocationalTest.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VocationalTestUpdate);
