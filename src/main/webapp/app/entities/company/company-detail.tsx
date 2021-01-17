import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './company.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompanyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CompanyDetail = (props: ICompanyDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { companyEntity } = props;
  return (
    <div className="pipoca">
    <div className="title">
    <p>{companyEntity.name}</p>
    </div>
    <div className="conteduds">
      <img src={companyEntity.identifier} alt=""/>
    </div>
    <div className="descrips">{companyEntity.phone}</div>
    <div className="descrips">{companyEntity.email}</div>
    </div>

);
};

const mapStateToProps = ({ company }: IRootState) => ({
  companyEntity: company.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetail);
