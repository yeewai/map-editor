import { Action } from 'services/types';
import * as Types from './types';

export const defaultState: Types.State = {
    isFetching: false,
    hasFetched: false,
    error: undefined,
    items: []
}

const usersReducer = (state = defaultState, action: Action ): Types.State => {
    switch(action.type) {
        case 'structureDefinition/REQUEST':
            return { ...state, isFetching: true, error: undefined };
        case 'structureDefinition/RECEIVE':
            return {
                ...state,
                isFetching: false,
                hasFetched: true,
                error: undefined,
                items: action.payload,
            };
        case 'structureDefinition/SET_ERROR':
            return { ...state, error: 'Error loading users.' };
        default:
            return state;
    }
}


export default usersReducer;
