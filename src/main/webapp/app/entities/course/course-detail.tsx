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
    <div className="pipoca">
    <div className="title">
    <p>{courseEntity.name}</p>
    </div>
    <div className="conteduds">
    <img src={courseEntity.typeClone} ></img>
    </div>
    <div className="descrip">{courseEntity.description}</div>
    <div className="scoresz">{courseEntity.score}</div>
    </div>

);
};
const mapStateToProps = ({ course }: IRootState) => ({
  courseEntity: course.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetail);
