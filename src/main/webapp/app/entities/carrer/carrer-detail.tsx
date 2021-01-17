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
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="geekwaycoreApp.carrer.detail.title">Carrer</Translate> [<b>{carrerEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="typeClone">
              <Translate contentKey="geekwaycoreApp.carrer.typeClone">Type Clone</Translate>
            </span>
          </dt>
          <dd>{carrerEntity.typeClone}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="geekwaycoreApp.carrer.name">Name</Translate>
            </span>
          </dt>
          <dd>{carrerEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="geekwaycoreApp.carrer.description">Description</Translate>
            </span>
          </dt>
          <dd>{carrerEntity.description}</dd>
          <dt>
            <span id="score">
              <Translate contentKey="geekwaycoreApp.carrer.score">Score</Translate>
            </span>
          </dt>
          <dd>{carrerEntity.score}</dd>
          <dt>
            <span id="scoreLevel">
              <Translate contentKey="geekwaycoreApp.carrer.scoreLevel">Score Level</Translate>
            </span>
          </dt>
          <dd>{carrerEntity.scoreLevel}</dd>
          <dt>
            <Translate contentKey="geekwaycoreApp.carrer.vocationalTest">Vocational Test</Translate>
          </dt>
          <dd>{carrerEntity.vocationalTest ? carrerEntity.vocationalTest.id : ''}</dd>
          <dt>
            <Translate contentKey="geekwaycoreApp.carrer.user">User</Translate>
          </dt>
          <dd>{carrerEntity.user ? carrerEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/carrer" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/carrer/${carrerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ carrer }: IRootState) => ({
  carrerEntity: carrer.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CarrerDetail);
