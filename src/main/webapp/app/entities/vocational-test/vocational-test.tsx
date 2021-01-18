import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { byteSize, Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "../vocational-test/vocation.scss"
import { IRootState } from 'app/shared/reducers';
import { getEntities } from './vocational-test.reducer';
import { IVocationalTest } from 'app/shared/model/vocational-test.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVocationalTestProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

export const VocationalTest = (props: IVocationalTestProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { vocationalTestList, match, loading } = props;
  return (
      <div className="tocinho">
        <div className="title">
          <p>Testes Vocacionais </p>
        </div>
        <div className="table-responsive">
          {vocationalTestList && vocationalTestList.length > 0 ? (
            <div className="lol22z">
              {vocationalTestList.map((vocationalTest, i) => (
                <div key={`entity-${i}`} className="loko2">
                  <img src={vocationalTest.typeClone} alt="" />
                  <div className="lokoname">{vocationalTest.name}</div>
                  <div className="descrip">{vocationalTest.description}</div>
                  <div className="status">{vocationalTest.status}</div>
                  <Button tag={Link} to={`${match.url}/${vocationalTest.id}`} >
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

const mapStateToProps = ({ vocationalTest }: IRootState) => ({
  vocationalTestList: vocationalTest.entities,
  loading: vocationalTest.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VocationalTest);
