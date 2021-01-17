import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './carrer.reducer';
import { ICarrer } from 'app/shared/model/carrer.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICarrerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CarrerDetail = (props: ICarrerDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { carrerEntity } = props;
  return (

        <div className="pipoca">
        <div className="title">
        <p>{carrerEntity.name}</p>
        </div>
        <div className="conteduds">
        <iframe width="960" height="515" src={carrerEntity.typeClone} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </div>
        <div className="descrip">{carrerEntity.description}</div>
        <div className="scoresz">{carrerEntity.score}</div>
        </div>

  );
};

const mapStateToProps = ({ carrer }: IRootState) => ({
  carrerEntity: carrer.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CarrerDetail);
