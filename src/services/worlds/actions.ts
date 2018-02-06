import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { World } from './types';
import { StateTree, Action } from 'services/types';
import * as api from 'api';

import { modalActions } from 'ever-modal';

export const requestWorlds: ActionCreator<Action> = () => ({
    type: 'world/REQUEST'
});

export const receiveWorlds: ActionCreator<Action> = ( worlds: World[] )=> ({
    type: 'world/RECEIVE',
    payload: worlds
});

export const setError: ActionCreator<Action> = (jqXHR: any, textStatus: string, errorThrown: any) => ({
    type: 'world/SET_ERROR',
    payload: { jqXHR, textStatus, errorThrown }
});

//I have no idea what the last return type is so I set it to any.........
export const fetchWorlds: ActionCreator<ThunkAction<any, StateTree, void>> = () => {
    return (dispatch: Dispatch<StateTree>): any => {
        dispatch(requestWorlds());
        return api.getWorlds().then (
            resp => dispatch(receiveWorlds(resp)),
            (jqXHR, textStatus, errorThrown) =>{
                 dispatch(setError(jqXHR, textStatus, errorThrown))
             }
        );
    };
};

const putWorld: ActionCreator<Action> = () => ({
    type: 'world/PUT'
});

export const updateWorld: ActionCreator<ThunkAction<any, StateTree, void>> = (values) => {
    return (dispatch: Dispatch<StateTree>, getState: () => StateTree ) => {

        dispatch(putWorld());
        return dispatch(addWorld(values));
    };
}

const createWorld: ActionCreator<Action> = () => ({
    type: 'world/CREATE'
});

export const addWorld: ActionCreator<ThunkAction<any, StateTree, void>> = (values) => {
    return (dispatch: Dispatch<StateTree>, getState: () => StateTree ) => {

        dispatch(createWorld());
        return api.createWorld(values).then(
            resp => {
                dispatch(modalActions.hideModal());
                dispatch(fetchWorlds());
            },
            (jqXHR, textStatus, errorThrown) => dispatch(setError(jqXHR, textStatus, errorThrown))
        );
    };
}
