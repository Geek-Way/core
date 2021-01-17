import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './proof.reducer';
import { IProof } from 'app/shared/model/proof.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProofDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProofDetail = (props: IProofDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { proofEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="geekwaycoreApp.proof.detail.title">Proof</Translate> [<b>{proofEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="typeClone">
              <Translate contentKey="geekwaycoreApp.proof.typeClone">Type Clone</Translate>
            </span>
          </dt>
          <dd>{proofEntity.typeClone}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="geekwaycoreApp.proof.name">Name</Translate>
            </span>
          </dt>
          <dd>{proofEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="geekwaycoreApp.proof.description">Description</Translate>
            </span>
          </dt>
          <dd>{proofEntity.description}</dd>
          <dt>
            <span id="score">
              <Translate contentKey="geekwaycoreApp.proof.score">Score</Translate>
            </span>
          </dt>
          <dd>{proofEntity.score}</dd>
          <dt>
            <span id="scoreLevel">
              <Translate contentKey="geekwaycoreApp.proof.scoreLevel">Score Level</Translate>
            </span>
          </dt>
          <dd>{proofEntity.scoreLevel}</dd>
          <dt>
            <span id="content">
              <Translate contentKey="geekwaycoreApp.proof.content">Content</Translate>
            </span>
          </dt>
          <dd>{proofEntity.content}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="geekwaycoreApp.proof.status">Status</Translate>
            </span>
          </dt>
          <dd>{proofEntity.status}</dd>
          <dt>
            <span id="qoneQuest">
              <Translate contentKey="geekwaycoreApp.proof.qoneQuest">Qone Quest</Translate>
            </span>
          </dt>
          <dd>{proofEntity.qoneQuest}</dd>
          <dt>
            <span id="qoneAsr">
              <Translate contentKey="geekwaycoreApp.proof.qoneAsr">Qone Asr</Translate>
            </span>
          </dt>
          <dd>{proofEntity.qoneAsr}</dd>
          <dt>
            <span id="qoneOpt">
              <Translate contentKey="geekwaycoreApp.proof.qoneOpt">Qone Opt</Translate>
            </span>
          </dt>
          <dd>{proofEntity.qoneOpt}</dd>
          <dt>
            <span id="qoneUsr">
              <Translate contentKey="geekwaycoreApp.proof.qoneUsr">Qone Usr</Translate>
            </span>
          </dt>
          <dd>{proofEntity.qoneUsr}</dd>
          <dt>
            <span id="qtwoQuest">
              <Translate contentKey="geekwaycoreApp.proof.qtwoQuest">Qtwo Quest</Translate>
            </span>
          </dt>
          <dd>{proofEntity.qtwoQuest}</dd>
          <dt>
            <span id="qtwoAsr">
              <Translate contentKey="geekwaycoreApp.proof.qtwoAsr">Qtwo Asr</Translate>
            </span>
          </dt>
          <dd>{proofEntity.qtwoAsr}</dd>
          <dt>
            <span id="qtwoOpt">
              <Translate contentKey="geekwaycoreApp.proof.qtwoOpt">Qtwo Opt</Translate>
            </span>
          </dt>
          <dd>{proofEntity.qtwoOpt}</dd>
          <dt>
            <span id="qtwoUsr">
              <Translate contentKey="geekwaycoreApp.proof.qtwoUsr">Qtwo Usr</Translate>
            </span>
          </dt>
          <dd>{proofEntity.qtwoUsr}</dd>
          <dt>
            <span id="qtreQuest">
              <Translate contentKey="geekwaycoreApp.proof.qtreQuest">Qtre Quest</Translate>
            </span>
          </dt>
          <dd>{proofEntity.qtreQuest}</dd>
          <dt>
            <span id="qtreAsr">
              <Translate contentKey="geekwaycoreApp.proof.qtreAsr">Qtre Asr</Translate>
            </span>
          </dt>
          <dd>{proofEntity.qtreAsr}</dd>
          <dt>
            <span id="qtreOpt">
              <Translate contentKey="geekwaycoreApp.proof.qtreOpt">Qtre Opt</Translate>
            </span>
          </dt>
          <dd>{proofEntity.qtreOpt}</dd>
          <dt>
            <span id="qtreUsr">
              <Translate contentKey="geekwaycoreApp.proof.qtreUsr">Qtre Usr</Translate>
            </span>
          </dt>
          <dd>{proofEntity.qtreUsr}</dd>
          <dt>
            <Translate contentKey="geekwaycoreApp.proof.carrer">Carrer</Translate>
          </dt>
          <dd>{proofEntity.carrer ? proofEntity.carrer.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/proof" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/proof/${proofEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ proof }: IRootState) => ({
  proofEntity: proof.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProofDetail);
