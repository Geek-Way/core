import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProof, defaultValue } from 'app/shared/model/proof.model';

export const ACTION_TYPES = {
  FETCH_PROOF_LIST: 'proof/FETCH_PROOF_LIST',
  FETCH_PROOF: 'proof/FETCH_PROOF',
  CREATE_PROOF: 'proof/CREATE_PROOF',
  UPDATE_PROOF: 'proof/UPDATE_PROOF',
  DELETE_PROOF: 'proof/DELETE_PROOF',
  SET_BLOB: 'proof/SET_BLOB',
  RESET: 'proof/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProof>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ProofState = Readonly<typeof initialState>;

// Reducer

export default (state: ProofState = initialState, action): ProofState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROOF_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROOF):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PROOF):
    case REQUEST(ACTION_TYPES.UPDATE_PROOF):
    case REQUEST(ACTION_TYPES.DELETE_PROOF):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PROOF_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROOF):
    case FAILURE(ACTION_TYPES.CREATE_PROOF):
    case FAILURE(ACTION_TYPES.UPDATE_PROOF):
    case FAILURE(ACTION_TYPES.DELETE_PROOF):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROOF_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROOF):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROOF):
    case SUCCESS(ACTION_TYPES.UPDATE_PROOF):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROOF):
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

const apiUrl = 'api/proofs';

// Actions

export const getEntities: ICrudGetAllAction<IProof> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PROOF_LIST,
  payload: axios.get<IProof>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IProof> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROOF,
    payload: axios.get<IProof>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IProof> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROOF,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProof> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROOF,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProof> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROOF,
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
