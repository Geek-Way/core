import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { byteSize, Translate, ICrudGetAllAction, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../course/course.scss'
import { IRootState } from 'app/shared/reducers';
import { getEntities, reset } from './course.reducer';
import { ICourse } from 'app/shared/model/course.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface ICourseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

export const Course = (props: ICourseProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );
  const [sorting, setSorting] = useState(false);

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const resetAll = () => {
    props.reset();
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    props.getEntities();
  };

  useEffect(() => {
    resetAll();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      resetAll();
    }
  }, [props.updateSuccess]);

  useEffect(() => {
    getAllEntities();
  }, [paginationState.activePage]);

  const handleLoadMore = () => {
    if ((window as any).pageYOffset > 0) {
      setPaginationState({
        ...paginationState,
        activePage: paginationState.activePage + 1,
      });
    }
  };

  useEffect(() => {
    if (sorting) {
      getAllEntities();
      setSorting(false);
    }
  }, [sorting]);

  const sort = p => () => {
    props.reset();
    setPaginationState({
      ...paginationState,
      activePage: 1,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
    setSorting(true);
  };

  const { courseList, match, loading } = props;
  return (
    <div className="tocinho">
      <div className="title">
        <p>Cursos</p>
      </div>
      <div className="table-responsive">
        {courseList && courseList.length > 0 ? (
          <div className="lol22z">
            {courseList.map((course, i) => (
              <div key={`entity-${i}`} className="loko2">
                <img src={course.typeClone} alt="" />
                <div className="lokoname">{course.name}</div>
                <div className="descrip">{course.description}</div>
                <div className="scoresz">{course.score}</div>
                <Button tag={Link} to={`${match.url}/${course.id}`} >
                  Entre aqui!
                </Button>
              </div>
            ))}
          </div>
        ) : (
            !loading && (
              <div className="alert alert-warning">
                <Translate contentKey="geekwaycoreApp.carrer.home.notFound">No Carrers found</Translate>
              </div>
            )
          )}
      </div>
    </div>
  );
};
const mapStateToProps = ({ course }: IRootState) => ({
  courseList: course.entities,
  loading: course.loading,
  totalItems: course.totalItems,
  links: course.links,
  entity: course.entity,
  updateSuccess: course.updateSuccess,
});

const mapDispatchToProps = {
  getEntities,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Course);
