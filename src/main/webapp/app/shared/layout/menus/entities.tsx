import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/carrer">
      <Translate contentKey="global.menu.entities.carrer" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/course">
      <Translate contentKey="global.menu.entities.course" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/proof">
      <Translate contentKey="global.menu.entities.proof" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/user-case-company">
      <Translate contentKey="global.menu.entities.userCaseCompany" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/company">
      <Translate contentKey="global.menu.entities.company" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/vocational-test">
      <Translate contentKey="global.menu.entities.vocationalTest" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
