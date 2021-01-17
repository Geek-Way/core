import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vocational-test.reducer';
import { IVocationalTest } from 'app/shared/model/vocational-test.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVocationalTestDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VocationalTestDetail = (props: IVocationalTestDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vocationalTestEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="geekwaycoreApp.vocationalTest.detail.title">VocationalTest</Translate> [<b>{vocationalTestEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="typeClone">
              <Translate contentKey="geekwaycoreApp.vocationalTest.typeClone">Type Clone</Translate>
            </span>
          </dt>
          <dd>{vocationalTestEntity.typeClone}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="geekwaycoreApp.vocationalTest.name">Name</Translate>
            </span>
          </dt>
          <dd>{vocationalTestEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="geekwaycoreApp.vocationalTest.description">Description</Translate>
            </span>
          </dt>
          <dd>{vocationalTestEntity.description}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="geekwaycoreApp.vocationalTest.status">Status</Translate>
            </span>
          </dt>
          <dd>{vocationalTestEntity.status}</dd>
          <dt>
            <span id="carrer">
              <Translate contentKey="geekwaycoreApp.vocationalTest.carrer">Carrer</Translate>
            </span>
          </dt>
          <dd>{vocationalTestEntity.carrer}</dd>
        </dl>
        <Button tag={Link} to="/vocational-test" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vocational-test/${vocationalTestEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vocationalTest }: IRootState) => ({
  vocationalTestEntity: vocationalTest.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VocationalTestDetail);
