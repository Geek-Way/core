import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUserCaseCompany, defaultValue } from 'app/shared/model/user-case-company.model';

export const ACTION_TYPES = {
  FETCH_USERCASECOMPANY_LIST: 'userCaseCompany/FETCH_USERCASECOMPANY_LIST',
  FETCH_USERCASECOMPANY: 'userCaseCompany/FETCH_USERCASECOMPANY',
  CREATE_USERCASECOMPANY: 'userCaseCompany/CREATE_USERCASECOMPANY',
  UPDATE_USERCASECOMPANY: 'userCaseCompany/UPDATE_USERCASECOMPANY',
  DELETE_USERCASECOMPANY: 'userCaseCompany/DELETE_USERCASECOMPANY',
  SET_BLOB: 'userCaseCompany/SET_BLOB',
  RESET: 'userCaseCompany/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUserCaseCompany>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type UserCaseCompanyState = Readonly<typeof initialState>;

// Reducer

export default (state: UserCaseCompanyState = initialState, action): UserCaseCompanyState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USERCASECOMPANY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USERCASECOMPANY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_USERCASECOMPANY):
    case REQUEST(ACTION_TYPES.UPDATE_USERCASECOMPANY):
    case REQUEST(ACTION_TYPES.DELETE_USERCASECOMPANY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_USERCASECOMPANY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USERCASECOMPANY):
    case FAILURE(ACTION_TYPES.CREATE_USERCASECOMPANY):
    case FAILURE(ACTION_TYPES.UPDATE_USERCASECOMPANY):
    case FAILURE(ACTION_TYPES.DELETE_USERCASECOMPANY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERCASECOMPANY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERCASECOMPANY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_USERCASECOMPANY):
    case SUCCESS(ACTION_TYPES.UPDATE_USERCASECOMPANY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_USERCASECOMPANY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/user-case-companies';

// Actions

export const getEntities: ICrudGetAllAction<IUserCaseCompany> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_USERCASECOMPANY_LIST,
  payload: axios.get<IUserCaseCompany>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IUserCaseCompany> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USERCASECOMPANY,
    payload: axios.get<IUserCaseCompany>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IUserCaseCompany> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USERCASECOMPANY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUserCaseCompany> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USERCASECOMPANY,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUserCaseCompany> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USERCASECOMPANY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
