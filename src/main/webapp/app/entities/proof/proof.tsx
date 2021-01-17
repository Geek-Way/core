import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { byteSize, Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "../proof/proof.scss"
import { IRootState } from 'app/shared/reducers';
import { getEntities } from './proof.reducer';
import { IProof } from 'app/shared/model/proof.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProofProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

export const Proof = (props: IProofProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { proofList, match, loading } = props;
  return (
    <div className="tocinho">
      <div className="title">
        <p>Certificações</p>
      </div>
      <div className="table-responsive">
        {proofList && proofList.length > 0 ? (
          <div className="lol22z">
            {proofList.map((proof, i) => (
              <div key={`entity-${i}`} className="loko2">
                <img src={proof.typeClone} alt="" />
                <div className="lokoname">{proof.name}</div>
                <div className="descrip">{proof.description}</div>
                <div className="scoresz">{proof.score}</div>
                <Button tag={Link} to={`${match.url}/${proof.id}`} >
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

const mapStateToProps = ({ proof }: IRootState) => ({
  proofList: proof.entities,
  loading: proof.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Proof);
