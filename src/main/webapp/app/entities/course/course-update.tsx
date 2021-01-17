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
import { getEntity, updateEntity, createEntity, setBlob, reset } from './course.reducer';
import { ICourse } from 'app/shared/model/course.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICourseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CourseUpdate = (props: ICourseUpdateProps) => {
  const [carrerId, setCarrerId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { courseEntity, carrers, loading, updating } = props;

  const { description, content } = courseEntity;

  const handleClose = () => {
    props.history.push('/course');
  };

  useEffect(() => {
    if (!isNew) {
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
        ...courseEntity,
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
          <h2 id="geekwaycoreApp.course.home.createOrEditLabel">
            <Translate contentKey="geekwaycoreApp.course.home.createOrEditLabel">Create or edit a Course</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : courseEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="course-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="course-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="typeCloneLabel" for="course-typeClone">
                  <Translate contentKey="geekwaycoreApp.course.typeClone">Type Clone</Translate>
                </Label>
                <AvField id="course-typeClone" type="text" name="typeClone" />
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="course-name">
                  <Translate contentKey="geekwaycoreApp.course.name">Name</Translate>
                </Label>
                <AvField
                  id="course-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="course-description">
                  <Translate contentKey="geekwaycoreApp.course.description">Description</Translate>
                </Label>
                <AvInput
                  id="course-description"
                  type="textarea"
                  name="description"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="scoreLabel" for="course-score">
                  <Translate contentKey="geekwaycoreApp.course.score">Score</Translate>
                </Label>
                <AvField id="course-score" type="string" className="form-control" name="score" />
              </AvGroup>
              <AvGroup>
                <Label id="scoreLevelLabel" for="course-scoreLevel">
                  <Translate contentKey="geekwaycoreApp.course.scoreLevel">Score Level</Translate>
                </Label>
                <AvField id="course-scoreLevel" type="text" name="scoreLevel" />
              </AvGroup>
              <AvGroup>
                <Label id="contentLabel" for="course-content">
                  <Translate contentKey="geekwaycoreApp.course.content">Content</Translate>
                </Label>
                <AvInput id="course-content" type="textarea" name="content" />
              </AvGroup>
              <AvGroup>
                <Label id="videoUrlLabel" for="course-videoUrl">
                  <Translate contentKey="geekwaycoreApp.course.videoUrl">Video Url</Translate>
                </Label>
                <AvField id="course-videoUrl" type="text" name="videoUrl" />
              </AvGroup>
              <AvGroup check>
                <Label id="viewedLabel">
                  <AvInput id="course-viewed" type="checkbox" className="form-check-input" name="viewed" />
                  <Translate contentKey="geekwaycoreApp.course.viewed">Viewed</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label for="course-carrer">
                  <Translate contentKey="geekwaycoreApp.course.carrer">Carrer</Translate>
                </Label>
                <AvInput id="course-carrer" type="select" className="form-control" name="carrer.id">
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
              <Button tag={Link} id="cancel-save" to="/course" replace color="info">
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
  courseEntity: storeState.course.entity,
  loading: storeState.course.loading,
  updating: storeState.course.updating,
  updateSuccess: storeState.course.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(CourseUpdate);
