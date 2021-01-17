import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { byteSize, Translate, ICrudGetAllAction, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../carrer/carrer.scss'
import { IRootState } from 'app/shared/reducers';
import { getEntities, reset } from './carrer.reducer';
import { ICarrer } from 'app/shared/model/carrer.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface ICarrerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

export const Carrer = (props: ICarrerProps) => {
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

  const { carrerList, match, loading } = props;
  return (
    <div className="tocinho">
      <div className="title">
        <p>Carreiras</p>
      </div>
      <div className="table-responsive">
        {carrerList && carrerList.length > 0 ? (
          <div className="lol22z">
            {carrerList.map((carrer, i) => (
              <div key={`entity-${i}`} className="loko2">
                <img src={carrer.typeClone} alt="" />
                <div className="lokoname">{carrer.name}</div>
                <div className="descrip">{carrer.description}</div>
                <div className="scoresz">{carrer.score}</div>
                <Button tag={Link} to={`${match.url}/${carrer.id}`} >
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

const mapStateToProps = ({ carrer }: IRootState) => ({
  carrerList: carrer.entities,
  loading: carrer.loading,
  totalItems: carrer.totalItems,
  links: carrer.links,
  entity: carrer.entity,
  updateSuccess: carrer.updateSuccess,
});

const mapDispatchToProps = {
  getEntities,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Carrer);
