import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { byteSize, Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "../user-case-company/company.scss"
import { IRootState } from 'app/shared/reducers';
import { getEntities } from './user-case-company.reducer';
import { IUserCaseCompany } from 'app/shared/model/user-case-company.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserCaseCompanyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

export const UserCaseCompany = (props: IUserCaseCompanyProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { userCaseCompanyList, match, loading } = props;
  return (
    <div className="tocinho">
      <div className="title">
        <p>Casos de Empresas</p>
      </div>
      <div className="table-responsive">
        {userCaseCompanyList && userCaseCompanyList.length > 0 ? (
          <div className="lol22z">
            {userCaseCompanyList.map((userCaseCompany, i) => (
              <div key={`entity-${i}`} className="loko2">
                <img src={userCaseCompany.typeClone} alt="" />
                <div className="lokoname">{userCaseCompany.name}</div>
                <div className="descrip">{userCaseCompany.description}</div>
                <div className="scoresz">{userCaseCompany.score}</div>
                <Button tag={Link} to={`${match.url}/${userCaseCompany.id}`} >
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

const mapStateToProps = ({ userCaseCompany }: IRootState) => ({
  userCaseCompanyList: userCaseCompany.entities,
  loading: userCaseCompany.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserCaseCompany);
