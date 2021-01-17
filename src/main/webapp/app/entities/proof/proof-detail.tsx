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
    <div className="pipoca">
    <div className="title">
    <p>{proofEntity.name}</p>
    </div>
    <div className="conteduds">
    <img src={proofEntity.typeClone}></img>
    </div>
    <div className="descrip">{proofEntity.description}</div>
    <div className="scoresz">{proofEntity.score}</div>
    </div>

);
};

const mapStateToProps = ({ proof }: IRootState) => ({
  proofEntity: proof.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProofDetail);
