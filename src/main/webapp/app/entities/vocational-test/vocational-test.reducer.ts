import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVocationalTest, defaultValue } from 'app/shared/model/vocational-test.model';

export const ACTION_TYPES = {
  FETCH_VOCATIONALTEST_LIST: 'vocationalTest/FETCH_VOCATIONALTEST_LIST',
  FETCH_VOCATIONALTEST: 'vocationalTest/FETCH_VOCATIONALTEST',
  CREATE_VOCATIONALTEST: 'vocationalTest/CREATE_VOCATIONALTEST',
  UPDATE_VOCATIONALTEST: 'vocationalTest/UPDATE_VOCATIONALTEST',
  DELETE_VOCATIONALTEST: 'vocationalTest/DELETE_VOCATIONALTEST',
  SET_BLOB: 'vocationalTest/SET_BLOB',
  RESET: 'vocationalTest/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVocationalTest>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type VocationalTestState = Readonly<typeof initialState>;

// Reducer

export default (state: VocationalTestState = initialState, action): VocationalTestState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VOCATIONALTEST_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VOCATIONALTEST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_VOCATIONALTEST):
    case REQUEST(ACTION_TYPES.UPDATE_VOCATIONALTEST):
    case REQUEST(ACTION_TYPES.DELETE_VOCATIONALTEST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_VOCATIONALTEST_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VOCATIONALTEST):
    case FAILURE(ACTION_TYPES.CREATE_VOCATIONALTEST):
    case FAILURE(ACTION_TYPES.UPDATE_VOCATIONALTEST):
    case FAILURE(ACTION_TYPES.DELETE_VOCATIONALTEST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VOCATIONALTEST_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VOCATIONALTEST):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_VOCATIONALTEST):
    case SUCCESS(ACTION_TYPES.UPDATE_VOCATIONALTEST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_VOCATIONALTEST):
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

const apiUrl = 'api/vocational-tests';

// Actions

export const getEntities: ICrudGetAllAction<IVocationalTest> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_VOCATIONALTEST_LIST,
  payload: axios.get<IVocationalTest>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IVocationalTest> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VOCATIONALTEST,
    payload: axios.get<IVocationalTest>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IVocationalTest> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VOCATIONALTEST,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVocationalTest> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VOCATIONALTEST,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVocationalTest> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VOCATIONALTEST,
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
