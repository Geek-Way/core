import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "../company/company.scss"
import { IRootState } from 'app/shared/reducers';
import { getEntities } from './company.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompanyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

export const Company = (props: ICompanyProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { companyList, match, loading } = props;
  return (
    <div className="tocinho">
      <div className="title">
        <p>Empresas</p>
      </div>
      <div className="table-responsive">
        {companyList && companyList.length > 0 ? (
          <div className="lol22z">
            {companyList.map((company, i) => (
              <div key={`entity-${i}`} className="loko2">
                <img src={company.identifier} alt="" />
                <div className="lokoname">{company.name}</div>
                <div className="descrip">{company.email}</div>
                <Button tag={Link} to={`${match.url}/${company.id}`} >
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

const mapStateToProps = ({ company }: IRootState) => ({
  companyList: company.entities,
  loading: company.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Company);
