import { Action } from 'services/types';
import * as Types from './types';

export const defaultState: Types.State = {
    isFetching: false,
    hasFetched: false,
    error: undefined,
    items: []
}

const worldReducer = (state = defaultState, action: Action ): Types.State => {
    switch(action.type) {
        case 'world/REQUEST':
            return { ...state, isFetching: true, error: undefined };
        case 'world/RECEIVE':
            return {
                ...state,
                isFetching: false,
                hasFetched: true,
                error: undefined,
                items: action.payload,
            };
        case 'world/SET_ERROR':
            return { ...state, error: 'Error loading world.' };
        default:
            return state;
    }
}


export default worldReducer;
