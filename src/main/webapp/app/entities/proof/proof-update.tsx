import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICarrer } from 'app/shared/model/carrer.model';
import { getEntities as getCarrers } from 'app/entities/carrer/carrer.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './proof.reducer';
import { IProof } from 'app/shared/model/proof.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProofUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProofUpdate = (props: IProofUpdateProps) => {
  const [carrerId, setCarrerId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { proofEntity, carrers, loading, updating } = props;

  const { description, content } = proofEntity;

  const handleClose = () => {
    props.history.push('/proof');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCarrers();
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
        ...proofEntity,
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
          <h2 id="geekwaycoreApp.proof.home.createOrEditLabel">
            <Translate contentKey="geekwaycoreApp.proof.home.createOrEditLabel">Create or edit a Proof</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : proofEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="proof-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="proof-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="typeCloneLabel" for="proof-typeClone">
                  <Translate contentKey="geekwaycoreApp.proof.typeClone">Type Clone</Translate>
                </Label>
                <AvField id="proof-typeClone" type="text" name="typeClone" />
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="proof-name">
                  <Translate contentKey="geekwaycoreApp.proof.name">Name</Translate>
                </Label>
                <AvField
                  id="proof-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="proof-description">
                  <Translate contentKey="geekwaycoreApp.proof.description">Description</Translate>
                </Label>
                <AvInput
                  id="proof-description"
                  type="textarea"
                  name="description"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="scoreLabel" for="proof-score">
                  <Translate contentKey="geekwaycoreApp.proof.score">Score</Translate>
                </Label>
                <AvField id="proof-score" type="string" className="form-control" name="score" />
              </AvGroup>
              <AvGroup>
                <Label id="scoreLevelLabel" for="proof-scoreLevel">
                  <Translate contentKey="geekwaycoreApp.proof.scoreLevel">Score Level</Translate>
                </Label>
                <AvField id="proof-scoreLevel" type="text" name="scoreLevel" />
              </AvGroup>
              <AvGroup>
                <Label id="contentLabel" for="proof-content">
                  <Translate contentKey="geekwaycoreApp.proof.content">Content</Translate>
                </Label>
                <AvInput id="proof-content" type="textarea" name="content" />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="proof-status">
                  <Translate contentKey="geekwaycoreApp.proof.status">Status</Translate>
                </Label>
                <AvField id="proof-status" type="text" name="status" />
              </AvGroup>
              <AvGroup>
                <Label id="qoneQuestLabel" for="proof-qoneQuest">
                  <Translate contentKey="geekwaycoreApp.proof.qoneQuest">Qone Quest</Translate>
                </Label>
                <AvField id="proof-qoneQuest" type="text" name="qoneQuest" />
              </AvGroup>
              <AvGroup>
                <Label id="qoneAsrLabel" for="proof-qoneAsr">
                  <Translate contentKey="geekwaycoreApp.proof.qoneAsr">Qone Asr</Translate>
                </Label>
                <AvField id="proof-qoneAsr" type="text" name="qoneAsr" />
              </AvGroup>
              <AvGroup>
                <Label id="qoneOptLabel" for="proof-qoneOpt">
                  <Translate contentKey="geekwaycoreApp.proof.qoneOpt">Qone Opt</Translate>
                </Label>
                <AvField id="proof-qoneOpt" type="text" name="qoneOpt" />
              </AvGroup>
              <AvGroup>
                <Label id="qoneUsrLabel" for="proof-qoneUsr">
                  <Translate contentKey="geekwaycoreApp.proof.qoneUsr">Qone Usr</Translate>
                </Label>
                <AvField id="proof-qoneUsr" type="text" name="qoneUsr" />
              </AvGroup>
              <AvGroup>
                <Label id="qtwoQuestLabel" for="proof-qtwoQuest">
                  <Translate contentKey="geekwaycoreApp.proof.qtwoQuest">Qtwo Quest</Translate>
                </Label>
                <AvField id="proof-qtwoQuest" type="text" name="qtwoQuest" />
              </AvGroup>
              <AvGroup>
                <Label id="qtwoAsrLabel" for="proof-qtwoAsr">
                  <Translate contentKey="geekwaycoreApp.proof.qtwoAsr">Qtwo Asr</Translate>
                </Label>
                <AvField id="proof-qtwoAsr" type="text" name="qtwoAsr" />
              </AvGroup>
              <AvGroup>
                <Label id="qtwoOptLabel" for="proof-qtwoOpt">
                  <Translate contentKey="geekwaycoreApp.proof.qtwoOpt">Qtwo Opt</Translate>
                </Label>
                <AvField id="proof-qtwoOpt" type="text" name="qtwoOpt" />
              </AvGroup>
              <AvGroup>
                <Label id="qtwoUsrLabel" for="proof-qtwoUsr">
                  <Translate contentKey="geekwaycoreApp.proof.qtwoUsr">Qtwo Usr</Translate>
                </Label>
                <AvField id="proof-qtwoUsr" type="text" name="qtwoUsr" />
              </AvGroup>
              <AvGroup>
                <Label id="qtreQuestLabel" for="proof-qtreQuest">
                  <Translate contentKey="geekwaycoreApp.proof.qtreQuest">Qtre Quest</Translate>
                </Label>
                <AvField id="proof-qtreQuest" type="text" name="qtreQuest" />
              </AvGroup>
              <AvGroup>
                <Label id="qtreAsrLabel" for="proof-qtreAsr">
                  <Translate contentKey="geekwaycoreApp.proof.qtreAsr">Qtre Asr</Translate>
                </Label>
                <AvField id="proof-qtreAsr" type="text" name="qtreAsr" />
              </AvGroup>
              <AvGroup>
                <Label id="qtreOptLabel" for="proof-qtreOpt">
                  <Translate contentKey="geekwaycoreApp.proof.qtreOpt">Qtre Opt</Translate>
                </Label>
                <AvField id="proof-qtreOpt" type="text" name="qtreOpt" />
              </AvGroup>
              <AvGroup>
                <Label id="qtreUsrLabel" for="proof-qtreUsr">
                  <Translate contentKey="geekwaycoreApp.proof.qtreUsr">Qtre Usr</Translate>
                </Label>
                <AvField id="proof-qtreUsr" type="text" name="qtreUsr" />
              </AvGroup>
              <AvGroup>
                <Label for="proof-carrer">
                  <Translate contentKey="geekwaycoreApp.proof.carrer">Carrer</Translate>
                </Label>
                <AvInput id="proof-carrer" type="select" className="form-control" name="carrer.id">
                  <option value="" key="0" />
                  {carrers
                    ? carrers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/proof" replace color="info">
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
  carrers: storeState.carrer.entities,
  proofEntity: storeState.proof.entity,
  loading: storeState.proof.loading,
  updating: storeState.proof.updating,
  updateSuccess: storeState.proof.updateSuccess,
});

const mapDispatchToProps = {
  getCarrers,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProofUpdate);
