import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './course.reducer';
import { ICourse } from 'app/shared/model/course.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICourseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CourseDetail = (props: ICourseDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { courseEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="geekwaycoreApp.course.detail.title">Course</Translate> [<b>{courseEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="typeClone">
              <Translate contentKey="geekwaycoreApp.course.typeClone">Type Clone</Translate>
            </span>
          </dt>
          <dd>{courseEntity.typeClone}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="geekwaycoreApp.course.name">Name</Translate>
            </span>
          </dt>
          <dd>{courseEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="geekwaycoreApp.course.description">Description</Translate>
            </span>
          </dt>
          <dd>{courseEntity.description}</dd>
          <dt>
            <span id="score">
              <Translate contentKey="geekwaycoreApp.course.score">Score</Translate>
            </span>
          </dt>
          <dd>{courseEntity.score}</dd>
          <dt>
            <span id="scoreLevel">
              <Translate contentKey="geekwaycoreApp.course.scoreLevel">Score Level</Translate>
            </span>
          </dt>
          <dd>{courseEntity.scoreLevel}</dd>
          <dt>
            <span id="content">
              <Translate contentKey="geekwaycoreApp.course.content">Content</Translate>
            </span>
          </dt>
          <dd>{courseEntity.content}</dd>
          <dt>
            <span id="videoUrl">
              <Translate contentKey="geekwaycoreApp.course.videoUrl">Video Url</Translate>
            </span>
          </dt>
          <dd>{courseEntity.videoUrl}</dd>
          <dt>
            <span id="viewed">
              <Translate contentKey="geekwaycoreApp.course.viewed">Viewed</Translate>
            </span>
          </dt>
          <dd>{courseEntity.viewed ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="geekwaycoreApp.course.carrer">Carrer</Translate>
          </dt>
          <dd>{courseEntity.carrer ? courseEntity.carrer.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/course" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/course/${courseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ course }: IRootState) => ({
  courseEntity: course.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetail);
